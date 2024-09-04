// @ts-nocheck

import { Service, Utils } from "../import.js";
import * as Utils2 from "../util/My_util.js";

const MAX_NUM_COLORS = 6;

class ColorPicker extends Service {
  static {
    Service.register(
      this,
      {},
      {
        colors: ["jsobject", "rw"],
      }
    );
  }

  #colors = [];
  set colors(colors) {
    this.#colors = colors;
    this.UpdateProperty("colors", colors);
  }
  get colors() {
    return [...this.#colors];
  }
  set colors(colors) {
    this.#colors = colors;
    this.changed("colors");
  }
  constructor() {
    super();
  }
  to_clipboard(color) {
    if (!Utils2.checkProgramInstalled("wl-copy")) return;
    Utils2.exec_async(`"wl-copy '${color}'"`);
    Utils.notify({summary:color,body: `Color copied to clipboard`,iconName: "color-picker-symbolic"});
  }
  pick_color() {
    if (!Utils2.checkProgramInstalled("hyprpicker")) return;
    const color = Utils2.exec_sync('hyprpicker -a');
    const list = this.colors;
    if (!list.includes(color)) {
      list.push(color);
      if (list.length > MAX_NUM_COLORS) list.shift();
      this.colors = list;
    }
  }
}

export default new ColorPicker();
