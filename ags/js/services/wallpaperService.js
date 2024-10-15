// @ts-nocheck
import {listFiles,isDirectoryEmpty,delFile,copyFile} from "../util/functions/fileUtils.js";
import { isInstalled} from "../util/functions/systemUtils.js";
import {getImageSize, cacheImage} from "../util/functions/imageUtils.js";
import { initialConfig } from "../util/functions/variableUtils.js";
import options from "../options.js";

class WallpaperService extends Service {
  static {
    Service.register(
      this,
      {},
      {
        wallpapers: ["jsobject", "rw"],
        walldir: ["rw"],
      }
    );
  }

  _walldir = '';
  _cashdir = options.paths.cashdir;
  wallpapers = [];
  _ext = "png";
  get walldir() {
    return this._walldir;
  }
  get wallpapers() {
    return this.wallpapers;
  }
  set wallpaper(path) {
    if (!isInstalled("swww")) return;
    copyFile(`${this._walldir}/${path}`, `${this._cashdir}/swww.png`);
    Utils.execAsync(["sh","-c",`swww img ${this._walldir}/${path}`,]);
  }
  constructor() {
    super();
    this._walldir = initialConfig.wallpaperFolder;
    Utils.ensureDirectory(this._cashdir);
    if(isDirectoryEmpty(this._cashdir)) this.cash_wallpapers();
    this.wallpapers = listFiles(this._walldir);
    Utils.monitorFile(this._walldir, () => this.cash_wallpapers());
  }
  cash_wallpapers() {
    const new_list = listFiles(this._walldir);
    
    const for_cash = new_list.filter((item) => !this.wallpapers.includes(item));
    const for_del = this.wallpapers.filter((item) => !new_list.includes(item));

    for_del.forEach((item) => {
      delFile(this._cashdir, item);
      console.log(`Удалено ${this._cashdir}${item}`);
    });
    for_cash.forEach((item) => {
      const [name, ext] = item.split(".");
      if (ext !== this._ext) {
        const img = getImageSize(`${this._walldir}/${item}`);
        cacheImage(`${this._walldir}/${item}`, `${this._walldir}/${name}.png`, img.width, img.height);
        delFile(this._walldir, item);
        console.log(`Преобразован ${this._walldir}${item}`);
      };
      cacheImage(`${this._walldir}/${item}`, `${this._cashdir}/${item}`, 150, 100);
      console.log(`Кэшировано ${this._cashdir}${item}`);
    });
    this.wallpapers = new_list;
    this.changed('wallpapers');
  }
  clear_cash() {
    const list = listFiles(this._cashdir);
    list.forEach((item) => {
      delFile(this._cashdir, item);
    })
  }
}

export default new WallpaperService();
