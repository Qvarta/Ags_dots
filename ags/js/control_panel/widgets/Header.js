import options from "../../options.js";
import icons from "../../util/icons.js";
import { user, upTime } from "../../util/functions/variableUtils.js";
const battery = await Service.import("battery");

const headerButton = () =>
  Widget.Button({
    class_name: "settingsBtn",
    onClicked: () => {
      App.toggleWindow("settings");
    },
    child: Widget.Icon({
      icon: "applications-system-symbolic",
      size: 22,
    }),
  });

export default () =>
  Widget.Box({
    class_name: "tytle",
    spacing: 20,
    children: [
      Widget.Icon({
        class_name: "avatar",
        icon: options.avatar.image,
        size: options.avatar.size,
      }),
      Widget.Box({
        spacing: 5,
        css: "padding: 5px 0;",
        hexpand: true,
        children: [
          Widget.Label({ label: "󰭖 ", css: "font-size:22px" }),
          Widget.Label({ label: upTime.bind().transform((t) => `${t}`) }),
        ],
      }),
      Widget.Box({
        css: "padding: 5px 0;",
        spacing: 5,
        hexpand: true,
        visible: battery.bind("available"),
        children: [
          Widget.Label({ label: " ", css: "font-size:22px" }),
          Widget.Label({
            label: battery.bind("percent").transform((p) => `${p}%`),
          }),
        ],
      }),
      headerButton(),
    ],
  });
