import PopupWindow from "../util/Widgets/PopupWindow.js";
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
            Widget.Label({
              hexpand: true,
              class_name: "description",
              label: updates.bind("description"),
              justification: "left",
              xalign: 0,
              maxWidthChars: 35,
              wrap: true,
            }),
          ],
        }),
        Widget.Spinner({
          active:  updates.bind("description").as((d) => d.length === 0),
          visible: updates.bind("description").as((d) => d.length === 0),
      }),
      ],
    }),
  });

export default () =>
  PopupWindow({
    name: WINDOW_NAME,
    transition: "crossfade",
    css:'background-color: transparent;',
    anchor: [],
    layer: "overlay",
    child: packagesInfo(),
    setup: (self) => {
      self.keybind("Escape", () => App.closeWindow(WINDOW_NAME));
    },
  });
