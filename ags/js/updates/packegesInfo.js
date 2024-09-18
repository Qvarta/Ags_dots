import { Widget } from "../import.js";
import PopupWindow from "../util/PopupWindow.js";
import updates from "../services/updateService.js";

const WINDOW_NAME = "info";
const packagesInfo = () =>
  Widget.Button({
    class_name: "info",
    on_clicked: () => {
      updates.reset = "";
      App.closeWindow(WINDOW_NAME);
    },
    child: Widget.Box({
      children: [
        Widget.Box({
          class_name: "info_box",
          visible: updates.bind("description").as((d) => d.length > 0),
          vertical: true,
          children: [
            Widget.Label({
              class_name: "title",
              label: updates.bind("name"),
            }),
            Widget.Box({
              children: [
                Widget.Label({
                  hexpand: true,
                  class_name: "description",
                  label: updates.bind("description"),
                  justification: "left",
                  xalign: 0,
                  maxWidthChars: 35,
                  wrap: true,
                }),
                Widget.Label({
                  class_name: "size",
                  label: updates.bind("size"),
                }),
              ],
            }),
          ],
        }),
        Widget.Icon({
          class_name: "spinner",
          icon: "hourglass-symbolic",
          visible: updates.bind("description").as((d) => d.length === 0),
          size: 40
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
