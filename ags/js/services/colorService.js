// @ts-nocheck
import { Service, Utils } from "../import.js";
import {isInstalled, run_async, run} from "../util/helpers.js";

const MAX_NUM_COLORS = 6;

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

  #colors = [];

  get colors() {
    return this.#colors;
  }
  set colors(colors) {
    this.#colors = colors;
    this.changed("colors");
  }
  constructor() {
    super();
  }
  to_clipboard(color) {
    if (!isInstalled("wl-copy")) return;
    run_async(`"wl-copy '${color}'"`);
    Utils.notify({summary:color,body: `Color copied to clipboard`,iconName: "color-picker-symbolic"});
  }
  pick_color() {
    if (!isInstalled("hyprpicker")) return;
    const color = run('hyprpicker -a');
    const list = this.colors;
    if (!list.includes(color)) {
      list.push(color);
      if (list.length > MAX_NUM_COLORS) list.shift();
      this.colors = list;
    }
  }
  remove_color(color) {
    const colors_list = this.#colors.filter(item => item !== color);
    this.#colors = colors_list;
    this.changed("colors");
  }
}

export default new ColorPicker();
