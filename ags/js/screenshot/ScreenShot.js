import icons from "../util/icons.js";
import options from "../options.js";
import PopupWindow from "../util/Widgets/PopupWindow.js";

const WINDOW_NAME = "screenshotmenu";
const screen_path = `$HOME/Screenshots/`;

const ScreenshotButton = (action) =>
  Widget.Button({
    className: "bigBtn",
    onClicked: () => {
      App.closeWindow("screenshotmenu");
      Utils.execAsync(["sh", "-c", `${options.screenshot[action]}${screen_path}`]).catch((error) => console.log(error));
    },
    child: Widget.Icon({
      className: "icon",
      icon: icons.screenshot[action],
      size: 80,
    }),
    setup: (self) => {
      self.on("enter-notify-event", (self) => {
        self.grab_focus();
      });
    },
  });

export default () =>
  PopupWindow({
    name: WINDOW_NAME,
    layer: "overlay",
    css:'background-color: transparent;',
    child: Widget.Box({
      className: "screenMenu",
      spacing: 15,
      children: [
        ScreenshotButton("desktop"),
        ScreenshotButton("window"),
        ScreenshotButton("region"),
      ],
      setup: (self) => {
        self.on("map", (self) => {
          self.children[0].grab_focus();
        });
        self.keybind("Escape", () => App.closeWindow(WINDOW_NAME));
      },
    }),
  });
