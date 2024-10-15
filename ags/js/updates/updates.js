import {UpdatesWidget, Title, Footer} from "./updatesWidget.js";
import PopupWindow from "../util/Widgets/PopupWindow.js";

const WINDOW_NAME = "updates";

export default () =>
  PopupWindow({
    name: WINDOW_NAME,
    css:'background-color: transparent;',
    transition: "crossfade",
    layer: "top",
    child: Widget.Box({
      class_name: 'updates',
      vertical: true,
      children: [Title(),UpdatesWidget(),Footer()],
    }),
    setup: (self) => {
      self.keybind("Escape", () => App.closeWindow(WINDOW_NAME));
    },
  });
