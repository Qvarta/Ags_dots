// @ts-nocheck

import { Service, Utils } from "../import.js";

class Keyboard extends Service {
  static {
    Service.register(
      this,
      {},
      {
        layout: ["string", "rw"],
        keyboard: ["jsobject", "rw"],
      }
    );
  }

  _layout = "";
  _name = "at-translated-set-2-keyboard";
  _keyboard = {};


  set layout( command) {
    Utils.execAsync(["sh","-c",`hyprctl switchxkblayout ${this._name} ${command}`,]).catch(print);
  }

  constructor() {
    super();
  }

  getLayout() {
    this.updateProperty("keyboard",JSON.parse(Utils.exec("hyprctl -j devices"))
    .keyboards.find( k => k.name === this._name));
    this.updateProperty("layout",this._keyboard?.active_keymap.slice(0, 2).toUpperCase());
    return this._layout;
  }
}

export default new Keyboard();