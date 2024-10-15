import keyboard from "../../services/keyboardService.js";
const hyprland = await Service.import("hyprland");
export default () =>
  Widget.Button({
    class_name: "layoutBtn",
    tooltip_text: keyboard.bind("cl").as((c) => (c ? "Caps Lock ON" : "")),
    onClicked: () => {
      keyboard.layout = "next";
    },
    child: Widget.Box({
      children: [
        Widget.Label({
          class_name: keyboard.bind("cl").as((c) => (c ? "layout cups" : "layout")),
          setup: (self) =>
            self.hook(hyprland, () => {
              self.label = keyboard.layout;
            }),
        }),
      ],
    }),
  });
