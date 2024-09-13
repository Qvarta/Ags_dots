// @ts-nocheck
import {symlink, isInstalled, is_empty, list_dir, del_file, cash_image} from "../util/helpers.js";
import { Service, Utils} from "../import.js";
import options from "../options.js";

class Appearance extends Service {
  static {
    Service.register(
      this,
      {},
      {
        listWallpapers: ["jsobject", "rw"],
      }
    );
  }

  _walldir = options.paths.wallpapers;
  _cashdir = options.paths.thumbnails;
  _listWallpapers = [];

  set vscode(theme) {
    if (!isInstalled("codium")) return;
    const content = JSON.parse(Utils.readFile(options.paths.vscode));
    content["workbench.colorTheme"] = theme;
    const jsonString = JSON.stringify(content);
    Utils.writeFile(jsonString, options.paths.vscode);
  }
  set ags(theme) {
    symlink(`${options.paths.scss}/themes/${theme}.scss`, `${options.paths.scss}/colors.scss`);
  }
  set kitty(theme) {
    if (!isInstalled("kitty")) return;
    symlink(`${options.paths.kitty}/${theme}.conf`, `${options.paths.kitty}/current-theme.conf`);
  }
  set wallpaper(path) {
    if (!isInstalled("swww")) return;
    Utils.execAsync(["sh","-c",`swww img ${options.paths.wallpapers}/${path}`,]);
  }
  // Not woking whithout restart Hyprland !!!!!
  set hyprland(theme) {
    Utils.execAsync(["sh", "-c", `${options.themes.set_icons}${theme}"`]);
    Utils.writeFile(`$theme = GTK_THEME,Tokyonight-${theme}`,options.paths.hyprland);
    symlink(`${options.paths.gtk3}/themes/${theme}.ini`, `${options.paths.gtk3}/settings.ini`);
    symlink(`${options.paths.micro}/themes/${theme}.json`, `${options.paths.micro}/settings.json`);
  }
  get listWallpapers() {
    return this._listWallpapers;
  }
  constructor() {
    super();
    Utils.ensureDirectory(this._cashdir);
    if(is_empty(this._cashdir)) this._cash_wallpapers();
    this._listWallpapers = list_dir(this._walldir);
    Utils.monitorFile(this._walldir, () => this._cash_wallpapers());
  }
  _cash_wallpapers() {
    const new_list = list_dir(this._walldir);
    const for_cash = new_list.filter((item) => !this._listWallpapers.includes(item));
    const for_del = this._listWallpapers.filter((item) => !new_list.includes(item));
    for_del.forEach((item) => {
      del_file(this._cashdir, item);
      console.log(`Удалено ${this._cashdir}${item}`);
    });
    for_cash.forEach((item) => {
      cash_image(this._walldir, item, this._cashdir, 150, 100);
      console.log(`Кэшировано ${this._cashdir}${item}`);
    });
    this.updateProperty("listWallpapers", new_list);
  }
}

export default new Appearance();
