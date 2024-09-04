import {UpdatesWidget, Title, Footer} from "./updatesWidget.js";
import PopupWindow from "../util/PopupWindow.js";
import { Widget } from "../import.js";

const WINDOW_NAME = "updates";

export default () =>
  PopupWindow({
    name: WINDOW_NAME,
    transition: "crossfade",
    layer: "overlay",
    child: Widget.Box({
      class_name: 'updates',
      vertical: true,
      children: [Title(),UpdatesWidget(),Footer()],
    }),
    setup: (self) => {
      self.keybind("Escape", () => App.closeWindow(WINDOW_NAME));
    },
  });
