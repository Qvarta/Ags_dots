import icons from "../util/icons.js";
import { App, Widget } from "../import.js";
import options from "../options.js";
import PopupWindow from "../util/PopupWindow.js";

const WINDOW_NAME = "powermenu";

const PowerMenuButton = (action) =>
  Widget.Button({
    className: "bigBtn",
    onClicked: () => {
      Utils.execAsync(["sh", "-c", `${options.powermenu[action]}`]);
      App.closeWindow("powermenu");
    },
    child: Widget.Icon({
      className: "icon",
      icon: icons.powermenu[action],
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
    child: Widget.Box({
      className: "screenMenu",
      children: [
        PowerMenuButton("logout"),
        PowerMenuButton("reboot"),
        PowerMenuButton("shutdown"),
        PowerMenuButton("lock"),
      ],
      setup: (self) => {
        self.on("map", (self) => {
          self.children[0].grab_focus();
        });
        self.keybind("Escape", () => App.closeWindow(WINDOW_NAME));
      },
    }),
  });
