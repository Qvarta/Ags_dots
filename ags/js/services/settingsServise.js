// @ts-nocheck
import options from "../options.js";
import { getScreenResolution } from "../util/functions/imageUtils.js";
import { initialConfig } from "../util/functions/variableUtils.js";
class Settings extends Service {
  static {
    Service.register(
      this,
      {},
      {
        settings: ["jsobject", "rw"],
      }
    );
  }
  colorsLight = `${App.configDir}/scss/themes/colorsLight.scss`;
  colorsDark = `${App.configDir}/scss/themes/colorsDark.scss`;
  settings = {};
  set change([key, value]) {
    this.settings[key] = value;
    this.changed("settings");
  }
  get settings() {
    return this.settings;
  }
  set workspasesNumber(value) {
      this.settings.workspasesNumber = value;
      this.changed("settings");
  }
  set barSize(value) {
    this.settings.barSize = value;
    this.changed("settings");
  }
  constructor() {
    super();
    this.settings = initialConfig;
    this.changed("settings");
  }
  save() {
    const jsonData = JSON.stringify(this.settings);
    Utils.writeFile(jsonData, options.paths.settings).catch(err => print(err));
    this.dumpColors(this.settings.ForegroundD, this.settings.BackgroundD, this.colorsDark);
    this.dumpColors(this.settings.ForegroundL, this.settings.BackgroundL, this.colorsLight);
  }
  dumpColors(foreground, background, path) {
    const colorsData = `$foreground: ${foreground};\n$background:${background};`
    Utils.writeFile(colorsData, path).catch(err => print(err));
  }
}

export default new Settings();
