import { Widget } from "../import.js";
import PopupWindow from "../util/PopupWindow.js";
import { p_name, p_size, p_description } from "./updatesWidget.js";
const WINDOW_NAME = "info";
const packagesInfo = () =>
  Widget.Button({
    class_name: "info",
    on_clicked: () => App.closeWindow(WINDOW_NAME),
    child: Widget.Box({
      class_name: "info_box",
      vertical: true,
      children: [
        Widget.Label({
          class_name: "title",
          label: p_name.bind(),
        }),
        Widget.Box({
          children: [
            Widget.Label({
              hexpand: true,
              class_name:"description",
              label: p_description.bind(),
              justification: 'left',
              xalign: 0,
              maxWidthChars: 35,
              wrap: true,
            }),
            Widget.Label({
              class_name: "size",
              label: p_size.bind(),
            }),
          ],
        })


      ],
    }),
  });

export default () =>
  PopupWindow({
    name: WINDOW_NAME,
    transition: "crossfade",
    anchor: [],
    layer: "overlay",
    child: packagesInfo(),
    setup: (self) => {
      self.keybind("Escape", () => App.closeWindow(WINDOW_NAME));
    },
  });

