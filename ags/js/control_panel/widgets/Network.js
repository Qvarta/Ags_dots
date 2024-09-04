import { Menu2, ArrowToggleButton } from "../../util/ToggleButton.js";
import PopupWindow from "../../util/PopupWindow.js";
import icons from "../../util/icons.js";
import { Widget, Utils, Variable } from "../../import.js";
import { checkProgramInstalled } from "../../util/My_util.js";

const { wifi } = await Service.import("network");
const WINDOW_NAME = "promt";
const ssid = Variable("");
const password = Variable("");

export const NetworkToggle = () =>
  ArrowToggleButton({
    name: "network",
    icon: wifi.bind("icon_name"),
    label: wifi.bind("ssid").as((ssid) => ssid || "Not Connected"),
    connection: [wifi, () => wifi.enabled],
    deactivate: () => (wifi.enabled = false),
    activate: () => {
      wifi.enabled = true;
      wifi.scan();
    },
  });

export const WifiSelection = () =>
  Menu2({
    name: "network",
    title_content: [],
    main_content: [
      Widget.Box({
        vertical: true,
        setup: (self) =>
          self.hook(
            wifi,
            () =>
              (self.children = wifi.access_points.map((network) =>
                Widget.Button({
                  on_clicked: () => {
                    ssid.value = network.ssid;
                    password.value = "";
                    App.closeWindow("control_panel");
                    App.toggleWindow("promt");
                  },
                  child: Widget.Box({
                    children: [
                      Widget.Icon(network.iconName),
                      Widget.Label(network.ssid || ""),
                      Widget.Icon({
                        icon: icons.ui.tick,
                        hexpand: true,
                        hpack: "end",
                        setup: (self) =>
                          Utils.idle(() => {
                            if (!self.is_destroyed)
                              self.visible = network.active;
                          }),
                      }),
                    ],
                  }),
                })
              ))
          ),
      }),
    ],
  });

const promtEntry = () =>
  Widget.Box({
    vertical: true,
    spacing: 10,
    children:[
      Widget.Label({
        label:ssid.bind().as(ssid => `Enter password for ${ssid}`),
      }),
      Widget.Entry({
        hexpand: true,
        class_name: "promt",
        primary_icon_name: icons.ui.password,
        visibility: false,
        text: password.bind(),
        setup: (self) =>
          self.on("map", (self) => {
            if (checkProgramInstalled("nmcli")) {
              const device = Utils.exec(`bash -c "nmcli -t -f DEVICE device | head -n 1"`);
              Utils.exec(`nmcli device disconnect ${device}`);
            }
            self.grab_focus();
            self.text = "";
          }),
        onAccept: ({ text }) => {
          if (checkProgramInstalled("nmcli")) {
            Utils.exec(`nmcli device wifi connect ${ssid.value} password ${text}`);
            setTimeout(() => {
              if (wifi.ssid === ssid.value) {
                Utils.notify(
                  "Сompleted successfully",
                  `Connected to ${ssid.value}`,
                  "indicator-feedindicator-symbolic"
                );
              } else {
                Utils.notify(
                  "Error",
                  `Failed connect to" ${ssid.value}`,
                  "network-wireless-offline-symbolic"
                );
              }
            }, 2000);
          };
          App.closeWindow("promt");
        },
      }),
    ]
  })
;

export const PromtPopup = () =>
  PopupWindow({
    name: WINDOW_NAME,
    transition: "slide_down",
    anchor: ["top", "right"],
    margins: [10, 450],
    layer: "top",
    child: Widget.Box({
      class_name: "promt_content",
      vexpand: true,
      child: promtEntry(),
    }),
    setup: (self) => {
      self.keybind("Escape", () => App.closeWindow(WINDOW_NAME));
    },
  });
