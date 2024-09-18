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
        wallpapers: ["jsobject", "rw"],
      }
    );
  }

  _walldir = options.paths.wallpapers;
  _cashdir = options.paths.thumbnails;
  wallpapers = [];

  set gtk_theme([gtk_theme, icon_theme, colorsheme]) {
    if (!isInstalled("gsettings")) return;
    print(`${options.themes.set_theme} "${gtk_theme}"`);
    Utils.execAsync(["sh", "-c", `${options.themes.set_theme} "${gtk_theme}"`]);
    colorsheme === "Dark" ? Utils.execAsync(["sh", "-c", `${options.themes.pref_dark}`]) : Utils.execAsync(["sh", "-c", `${options.themes.pref_light}`]);
    Utils.execAsync(["sh", "-c", `${options.themes.set_icons} "${icon_theme}"`]);
    symlink(`${options.paths.micro}/themes/${colorsheme}.json`, `${options.paths.micro}/settings.json`);
  }
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
  get wallpapers() {
    // console.log (this._listWallpapers);
    return this.wallpapers;
  }
  constructor() {
    super();
    Utils.ensureDirectory(this._cashdir);
    if(is_empty(this._cashdir)) this._cash_wallpapers();
    this.wallpapers = list_dir(this._walldir);
    Utils.monitorFile(this._walldir, () => this._cash_wallpapers());
  }
  _cash_wallpapers() {
    const new_list = list_dir(this._walldir);
    const for_cash = new_list.filter((item) => !this.wallpapers.includes(item));
    const for_del = this.wallpapers.filter((item) => !new_list.includes(item));
    for_del.forEach((item) => {
      del_file(this._cashdir, item);
      console.log(`Удалено ${this._cashdir}${item}`);
    });
    for_cash.forEach((item) => {
      cash_image(this._walldir, item, this._cashdir, 150, 100);
      console.log(`Кэшировано ${this._cashdir}${item}`);
    });
    this.updateProperty("wallpapers", new_list);
  }
}

export default new Appearance();
