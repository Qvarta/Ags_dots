import PopupWindow from "../util/PopupWindow.js";

const WINDOW_NAME = "calendar";

export default () =>
  PopupWindow({
    name: WINDOW_NAME,
    transition: "slide_down",
    location: "top",
    layer: "overlay",
    child: Widget.Calendar({
      showDayNames: true
    }),
    setup: (self) => {
      self.keybind("Escape", () => App.closeWindow(WINDOW_NAME));
    },
  });
