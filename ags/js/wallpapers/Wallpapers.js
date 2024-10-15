import WallpapersWidget from "./wallpaperWidget.js";
import PopupWindow from "../util/Widgets/PopupWindow.js";

const WINDOW_NAME = "wallpapers";


export const Wallpapers = () =>
  PopupWindow({
    name: WINDOW_NAME,
    transition: "crossfade",
    css:'background-color: transparent;',
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
