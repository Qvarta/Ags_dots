import { Menu, ArrowToggleButton } from "../../util/Widgets/ToggleButton.js"
import icons from "../../util/icons.js"
const bluetooth = await Service.import("bluetooth")

export const BluetoothToggle = () => ArrowToggleButton({
    name: "bluetooth",
    icon: bluetooth.bind("enabled").as(p => icons.bluetooth[p ? "enabled" : "disabled"]),
    label: Utils.watch("Disabled", bluetooth, () => {
        if (!bluetooth.enabled)
            return "Disabled"

        if (bluetooth.connected_devices.length === 1)
            return bluetooth.connected_devices[0].alias

        return `${bluetooth.connected_devices.length} Connected`
    }),
    connection: [bluetooth, () => bluetooth.enabled],
    deactivate: () => bluetooth.enabled = false,
    activate: () => bluetooth.enabled = true,
})

const DeviceItem = (device) => Widget.Box({
    children: [
        Widget.Icon({icon:device.icon_name + "-symbolic", class_name: "bt_icon"}),
        Widget.Label({label:device.name, class_name: "bt_name"}),
        Widget.Label({
            label: `${device.battery_percentage}%`,
            visible: device.bind("battery_percentage").as(p => p > 0),
        }),
        Widget.Box({ hexpand: true }),
        Widget.Spinner({
            active: device.bind("connecting"),
            visible: device.bind("connecting"),
        }),
        Widget.Switch({
            active: device.connected,
            hexpand: false,
            visible: device.bind("connecting").as(p => !p),
            setup: self => self.on("notify::active", () => {
                device.setConnection(self.active)
            }),
        }),
    ],
})

export const BluetoothDevices = () => Menu({
  name: "bluetooth",
  title_content:[],
  main_content: [
    Widget.Box({
      class_name: "bluetooth-devices",
      hexpand: true,
      vertical: true,
      children: bluetooth.bind("devices").as(ds => ds.filter(d => d.name).map(DeviceItem)),
    }),
  ],
})
