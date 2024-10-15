// @ts-nocheck
class Keyboard extends Service {
  static {
    Service.register(
      this,
      {},
      {
        cl: ["boolean", "r"],
      }
    );
  }

  _keyboard = "";
  cl = false;
  get layout() {
    const json = JSON.parse(Utils.exec("hyprctl -j devices"));
    const keyboards = json.keyboards;
    for (let i = 0; i < keyboards.length; i++) {
      const keyboard = keyboards[i];
      if (keyboard.main === true) {
        this._keyboard = keyboard.name;
        return keyboard.active_keymap.slice(0, 2).toUpperCase();
      }
    }
    console.error("No keyboard active found.");
  }

  get cl() {
    return this.cl;
  }
  set layout(command) {
    Utils.execAsync(["sh","-c",`hyprctl switchxkblayout ${this._keyboard} ${command}`,]).catch(print);
  }

  constructor() {
    super();
    Utils.interval(500, this.CapsLockState.bind(this));
  }
  CapsLockState() {
    this.cl = Boolean(parseInt(Utils.exec(`brightnessctl -d input4::capslock g`)));
    this.changed("cl");
  }

}

export default new Keyboard();