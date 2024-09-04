// @ts-nocheck
import * as Utils2 from "../util/My_util.js";
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
    if (!Utils2.checkProgramInstalled("codium")) return;
    const content = JSON.parse(Utils.readFile(options.paths.vscode));
    content["workbench.colorTheme"] = theme;
    const jsonString = JSON.stringify(content);
    Utils.writeFile(jsonString, options.paths.vscode);
  }
  set ags(theme) {
    Utils2.symlink(`${options.paths.scss}/themes/${theme}.scss`, `${options.paths.scss}/colors.scss`);
  }
  set kitty(theme) {
    if (!Utils2.checkProgramInstalled("kitty")) return;
    Utils2.symlink(`${options.paths.kitty}/${theme}.conf`, `${options.paths.kitty}/current-theme.conf`);
  }
  set wallpaper(path) {
    if (!Utils2.checkProgramInstalled("swww")) return;
    Utils.execAsync(["sh","-c",`swww img ${options.paths.wallpapers}/${path}`,]);
  }
  // Not woking whithout restart Hyprland !!!!!
  set hyprland(theme) {
    Utils.execAsync(["sh", "-c", `${options.themes.set_icons}${theme}"`]);
    Utils.writeFile(`$theme = GTK_THEME,Tokyonight-${theme}`,options.paths.hyprland);
    Utils2.symlink(`${options.paths.gtk3}/themes/${theme}.ini`, `${options.paths.gtk3}/settings.ini`);
    Utils2.symlink(`${options.paths.micro}/themes/${theme}.json`, `${options.paths.micro}/settings.json`);
  }
  get listWallpapers() {
    return this._listWallpapers;
  }
  constructor() {
    super();
    Utils.ensureDirectory(this._cashdir);
    if(Utils2.is_empty(this._cashdir)) this._cash_wallpapers();
    this._listWallpapers = Utils2.list_dir(this._walldir);
    Utils.monitorFile(this._walldir, () => this._cash_wallpapers());
  }
  _cash_wallpapers() {
    const new_list = Utils2.list_dir(this._walldir);
    const for_cash = new_list.filter((item) => !this._listWallpapers.includes(item));
    const for_del = this._listWallpapers.filter((item) => !new_list.includes(item));
    for_del.forEach((item) => {
      Utils2.del_file(this._cashdir, item);
      console.log(`Удалено ${this._cashdir}${item}`);
    });
    for_cash.forEach((item) => {
      Utils2.cash_image(this._walldir, item, this._cashdir, 150, 100);
      console.log(`Кэшировано ${this._cashdir}${item}`);
    });
    this.updateProperty("listWallpapers", new_list);
  }
}

export default new Appearance();
