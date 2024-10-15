// @ts-nocheck
import {run, runAsync} from "../util/functions/fileUtils.js";
import {isInstalled} from "../util/functions/systemUtils.js";
import options from "../options.js";

class ColorPicker extends Service {
  static {
    Service.register(
      this,
      {},
      {
        colors: ["array", "rw"],
      }
    );
  }

  colors = [];

  get colors() {
    return this.colors;
  }
  set remove(color) {
    const colors_list = this.colors.filter(item => item !== color);
    this.colors = colors_list;
    this.changed("colors");
  }
  set to_clipboard(color) {
    if (!isInstalled("wl-copy")) return;
    runAsync(`"wl-copy '${color}'"`);
    Utils.notify({summary:color,body: `Color copied to clipboard`,iconName: "color-picker-symbolic"});
  }
  constructor() {
    super();
  }

  pick_color() {
    if (!isInstalled("hyprpicker")) return;
    const color = run('hyprpicker -a');
    const list = this.colors;
    if (!list.includes(color)) {
      list.push(color);
      if (list.length > options.colors.number) list.shift();
      this.colors = list;
      this.changed("colors");
    return color;
    }
  }

}

export default new ColorPicker();
