import { wireguard } from "../../util/functions/variableUtils.js";
import { vpnToggle } from "../../util/functions/systemUtils.js";
import options from "../../options.js";
export default () =>
    Widget.Button({
      class_name: wireguard.bind().as(t => t ? "panelBtn active" : "panelBtn"),
      hexpand: true,
      onClicked: () => vpnToggle(),
      child: Widget.Box({
        spacing: 10,
        children:[
          Widget.Icon({
            icon: options.vpn.icon,
            size: 22,
          }),
          Widget.Label({
            label: "VPN",
            hexpand: true, 
            xalign: 0
          }),
        ],
      })
    });