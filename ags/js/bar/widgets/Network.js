import { Network } from "../../import.js";

const WifiIndicator = () =>
  Widget.Box({
    children: [
      Widget.Icon({
        icon: Network.wifi.bind("icon-name"),
        tooltip_text: Network.wifi.bind("ssid"),
      }),
    ],
  });
  const WiredIndicator = () => Widget.Icon({
    icon: Network.wired.bind('icon_name'),
})

export default () =>
  Widget.Stack({
    className: "network",
    children: {
      wifi: WifiIndicator(),
      wired: WiredIndicator(),
    },
    shown: Network.bind("primary").transform((p) => p || "wired"),
  });
