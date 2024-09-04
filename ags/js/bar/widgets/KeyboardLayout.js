import { Widget, Hyprland } from "../../import.js";
import icons from "../../util/icons.js";
import keyboard from "../../services/keyboardService.js";

export default () =>
  Widget.Button({
    class_name: "layoutBtn",
    onClicked: () => {keyboard.layout="next"},
    child: Widget.Box({
      spacing:5,
      children:[
        // Widget.Icon(icons.ui.keyboard),
         Widget.Label({
          class_name: "layout",
          setup: (self) =>
            self.hook(Hyprland, () => {
              self.label = keyboard.getLayout();
            }),
        }),
    ]
    }),
  });
