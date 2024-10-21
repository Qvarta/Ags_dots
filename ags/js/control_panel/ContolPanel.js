import options from "../options.js";
import settings from "../services/settingsServise.js";
import Header from "./widgets/Header.js";
import PopupWindow from "../util/Widgets/PopupWindow.js";
import { Menu, Row } from "../util/Widgets/ToggleButton.js";
import { Volume, Microphone } from "./widgets/Volume.js";
import Brightness from "./widgets/Brightness.js";
import { NetworkToggle, WifiSelection } from "./widgets/Network.js";
import { BluetoothToggle, BluetoothDevices } from "./widgets/Bluetooth.js";
import Player from "./widgets/Media.js";
import Notification from "./widgets/NotificationColumn.js";
import {WallpaperToggle, ThemeToggle} from "./widgets/Apperance.js";
import { pickerBtn, colors } from "./widgets/Color_picker.js";
import Radio from "./widgets/Radio.js";
// import Vpn from "./widgets/Vpn.js";

const WINDOW_NAME = "control_panel";

const Audio = () =>
  Menu({
    name: "audio",
    title_content: [],
    main_content: [Microphone()],
  });
const Panel = () =>
  Widget.Box({
    class_name: "panel",
    vertical: true,
    vexpand: true,
    spacing: 10,
    children: [
      Header(),
      Row([NetworkToggle, BluetoothToggle], [WifiSelection, BluetoothDevices]),
      Row([Radio, ThemeToggle]),
      // Row([Vpn,Widget.Separator]),
      Widget.Box({ 
        vertical: true,
        class_name: "sliders",
        children:[
          Row([Volume], [Audio]),
          Brightness(),
        ]
      }),
      Player(),
      Row([WallpaperToggle, pickerBtn]),
      colors(),
      Notification(),
    ],
  });
export default () =>
  PopupWindow({
    name: WINDOW_NAME,
    css:'background-color: transparent;',
    transition: "slide_down",
    layer: "overlay",
    anchor: ["top", "right"],
    child: Panel(),
    setup: (self) => {
      self.hook(settings, () => {
        self.margins = [0, (options.screen.width - settings.settings.barSize)/2 - 10];
      })
      self.keybind("Escape", () => App.closeWindow(WINDOW_NAME));
    },
  });
