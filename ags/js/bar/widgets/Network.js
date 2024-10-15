const network = await Service.import('network')
export default () =>
  Widget.Box({
    spacing: 10,
    // setup: (self) => console.log(network),
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
        visible: network.vpn.connections[0].bind("state").transform((state) => state === "connected" ? true : false),
        icon:  network.vpn.connections[0].bind("icon_name"),
        tooltip_text: network.vpn.connections[0].bind("id"),
      })
    ],
  });
