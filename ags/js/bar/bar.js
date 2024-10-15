import options from "../options.js";
import settings from "../services/settingsServise.js";
import LauncherButton from "./widgets/launcherButton.js";
import Weather from "./widgets/Weather.js";
import Workspaces from "./widgets/Workspaces.js";
import Clock from "./widgets/Clock.js";
import KeyboardLayout from "./widgets/KeyboardLayout.js";
import Tray from "./widgets/Tray.js";
import PowerMenu from "./widgets/PowerButton.js";

const Left = () =>
  Widget.Box({
    className: "left",
    hpack: "start",
    children: [LauncherButton(), Weather()],
  });

const Center = () =>
  Widget.Box({
    className: "center",
    children: [Workspaces()],
  });

const Right = () =>
  Widget.Box({
    className: "right",
    hpack: "end",
    children: [
      Widget.EventBox({
        className: "eventbox",
        child: Widget.Box({
          spacing: 5,
          children: [
            Widget.Box({
              homogeneous: false,
              vertical: false,
              children: [Clock(), KeyboardLayout()],
            }),
            Widget.Box({
              homogeneous: false,
              vertical: false,
              children: [Tray(), PowerMenu()],
            }),
          ],
        }),
      }),
    ],
  });

export default () =>
  Widget.Window({
    name: `bar`,
    exclusivity: "exclusive",
    anchor: ["top"],
    css: "background-color: transparent;",
    child: Widget.CenterBox({
      setup: (self) =>
        self.hook(settings, () => {
          self.css = `min-width: ${settings.settings.barSize}px;`;
        }),
      className: "bar",
      hexpand: false,
      vertical: false,
      startWidget: Left(),
      centerWidget: Center(),
      endWidget: Right(),
    }),
  });
