import WallpapersWidget from "./wallpaperWidget.js";
import PopupWindow from "../util/PopupWindow.js";
import { Widget } from "../import.js";

const WINDOW_NAME = "wallpapers";


export default () =>
  PopupWindow({
    name: WINDOW_NAME,
    transition: "crossfade",
    layer: "overlay",
    child: Widget.Box({
      class_name: 'wallpaper',
      vertical: true,
      child: WallpapersWidget(),
    }),
    setup: (self) => {
      self.keybind("Escape", () => App.closeWindow(WINDOW_NAME));
    },
  });
