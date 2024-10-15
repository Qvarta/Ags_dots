// @ts-nocheck
import { user, css, scss, time ,initialConfig} from "../util/functions/variableUtils.js";
import {createSymbolicLink} from "../util/functions/fileUtils.js";
import { isInstalled} from "../util/functions/systemUtils.js";
import { getScreenResolution } from "../util/functions/imageUtils.js";
import options from "../options.js";
import Workspaces from "../bar/widgets/Workspaces.js";

class Themes extends Service {
  static {
    Service.register(
      this,
      {},
      {
        mode: ["string", "rw"],
        themes: ["array", "rw"],
        icons: ["array", "rw"],
      }
    );
  }
  _scss =`${App.configDir}/scss/`;
  _mode = '';
  _themes = [];
  _icons = [];

  get icons(){
    return this._icons;
  }
  get themes(){
    return this._themes;
  }
  get mode(){
    return this._mode;
  }
  constructor() {
    super();
    const current = Utils.exec(`bash -c "readlink -f ${this._scss}/currentTheme.scss"`);
    this._mode = current.split("/").pop().split(".")[0];
    this._getInstalledThemes();
    this._getInstalledIcons();
  }
  changeTheme() {
    createSymbolicLink(`${this._scss}/themes/${this._mode}.scss`, `${this._scss}/currentTheme.scss`);
    print(`Theme changed to ${this._mode}`);
    Utils.exec(`sassc ${scss} ${css}`);
    App.resetCss();
    App.applyCss(css);
  
    this._setCodium();
    this._setKitty();
    this._setMicro();
    const mode = this._mode === "Dark"
      ? [initialConfig.gtkThemeD, initialConfig.iconThemeD] 
      : [initialConfig.gtkThemeL, initialConfig.iconThemeL ];
    this._setGTK(mode);
  }
  toggle() {
    this._mode = this._mode === "Dark" ? "Light" : "Dark";
    this.changed("mode");
    this.changeTheme();
  } 
   _setCodium() {
    if (!isInstalled("codium")) return;
    const scheme = this._mode === "Dark" ? initialConfig.codiumThemeD : initialConfig.codiumThemeL;
    const config = `${user.config}/VSCodium/User/settings.json`;
    const content = JSON.parse(Utils.readFile(config));
    content["workbench.colorTheme"] = scheme;
    const jsonString = JSON.stringify(content);
    Utils.writeFile(jsonString, config);
  }
  _setKitty() {
    if (!isInstalled("kitty")) return;
    const config = `${user.config}/kitty/`;
    createSymbolicLink(`${config}/${this._mode}.conf`, `${config}/current-theme.conf`);
  }
  _setMicro() {
    if (!isInstalled("micro")) return;
    const config = `${user.config}/micro/`;
    createSymbolicLink(`${config}/themes/${this._mode}.json`, `${config}/settings.json`);
  }
  _setGTK([gtk_theme, icon_theme]) {
    if (!isInstalled("gsettings")) return;
    Utils.execAsync(["sh", "-c", `${options.themes.set_theme} "${gtk_theme}"`]);
    this._mode === "Dark" ? Utils.execAsync(["sh", "-c", `${options.themes.pref_dark}`]) : Utils.execAsync(["sh", "-c", `${options.themes.pref_light}`]);
    Utils.execAsync(["sh", "-c", `${options.themes.set_icons} "${icon_theme}"`]);
  }
  _getInstalledThemes() {
    Utils.execAsync(['bash', '-c', "find ~/.themes /usr/share/themes -name gtk-3.0 2>/dev/null | find ~/.themes /usr/share/themes -name gtk-3.0 2>/dev/null | grep -vE '(Default|Emacs|HighContrast)'"])
    .then(result =>{
      const lines = result.split('\n');
    
      lines.forEach(line => {
        if (line.includes('/gtk-3.0')) {
          const themePath = line.split('/');
          const themeName = themePath[themePath.length - 2];
          this.themes.push(themeName);
        }
      });
      this._themes = this.themes.sort();
      this.changed("themes");
    })
    .catch(err => print(err));
  }
  _getInstalledIcons() {
    Utils.execAsync(['bash', '-c', "find ~/.icons /usr/share/icons -name index.theme 2>/dev/null | grep -vE '(default|hicolor)'"])
    .then(result =>{
      const lines = result.split('\n');
      lines.forEach(line => {
        if (line.includes('/index.theme')) {
          const iconPath = line.split('/');
          const iconName = iconPath[iconPath.length - 2];
          this.icons.push(iconName);
        }
      });
      this._icons = this.icons.sort();
      this.changed("icons");
    })
    .catch(err => print(err));
  }
}

export default new Themes();

