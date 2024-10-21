import { wireguard } from "../../util/functions/variableUtils.js";
import options from "../../options.js";
const network = await Service.import('network')

export default () =>
  Widget.Box({
    spacing: 10,
    setup: () => console.log(network),
    children: [
      Widget.Icon({
        visible: network.wifi.bind("state").as((state) => state === "unavailable" ? false : true),
        icon: network.wifi.bind("icon-name"),
        tooltip_text: network.wifi.bind("ssid"),
      }),
      Widget.Icon({
        icon: network.wired.bind('icon_name'),
        visible: network.wired.bind("state").as((state) => state === "unavailable" ? false : true),
      }),
      Widget.Icon({
        class_name: "cyan",
        // setup:(self) => console.log(network.vpn),
        icon: network.wifi.bind("icon-name"),

        visible: network.vpn.bind("activated-connections").as((con) => con.length > 0 ? true : false),
        icon:  network.vpn.bind("activated-connections").transform((con) => {
          if (con.length > 0) return con[0]["icon-name"];
          return "";
        }),
        tooltip_text: network.vpn.bind("activated-connections").transform((con) => {
          if (con.length > 0) return con[0].id;
          return "";
        }),
      }),
      Widget.Icon({
        class_name: "cyan",
        icon: options.vpn.icon,
        size: options.vpn.size,
        visible: wireguard.bind(),
        tooltip_text: "Wireguard VPN",
      }),
    ],
  });
