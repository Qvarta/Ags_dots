import { Hyprland } from "../../import.js";
import keyboard from "../../services/keyboardService.js";
import { capsLockState } from "../../util/helpers.js";

export default () =>
  Widget.Button({
    class_name: "layoutBtn",
    tooltip_text: capsLockState.bind().as((s) => s === '1' ? `Caps Lock ON` : ""),
    onClicked: () => {keyboard.layout="next"},
    child: Widget.Box({
      spacing:5,
      children:[
         Widget.Label({
          class_name: capsLockState.bind().as((s) => s === '1' ? `layout cups` : "layout"),
          setup: (self) =>
            self.hook(Hyprland, () => {
              self.label = keyboard.getLayout();
            }),
        }),
    ]
    }),
  });
