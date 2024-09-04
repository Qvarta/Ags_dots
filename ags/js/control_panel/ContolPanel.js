import { Widget, Mpris, Variable } from "../import.js";
import icons from "../util/icons.js";
import options from "../options.js";
import PopupWindow from "../util/PopupWindow.js";
import { Menu2, Row } from "../util/ToggleButton.js";
import { Volume, Microphone } from "./widgets/Volume.js";
import { Brightness } from "./widgets/Brightness.js";
import { NetworkToggle, WifiSelection } from "./widgets/Network.js";
import { BluetoothToggle, BluetoothDevices } from "./widgets/Bluetooth.js";
import { Media } from "./widgets/Media.js";
import {NotificationColumn} from "./widgets/NotificationColumn.js";
import {setGlobal, WallpaperToggle, ThemeToggle} from "./widgets/Appearance.js";
import { colorPicker } from "./widgets/Color_picker.js";


const media = Mpris.bind("players");
const WINDOW_NAME = "control_panel";


const Audio = () =>
  Menu2({
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
      Row([NetworkToggle, BluetoothToggle], [WifiSelection, BluetoothDevices]),
      Widget.Box({ 
        vertical: true,
        class_name: "sliders",
        children:[
          Row([Volume], [Audio]),
          Brightness(),
        ]
      }),
      Widget.Box({
        visible: media.as((l) => l.length > 0),
        child: Media(),
      }),
      Widget.Box({
        vertical: true,
        spacing: 10,
        class_name: "appearance",
        children:[
          Row([WallpaperToggle, ThemeToggle]),
          setGlobal(),
          colorPicker(),
        ]
      }),
      NotificationColumn(),
    ],
  });

export default () =>
  PopupWindow({
    name: WINDOW_NAME,
    transition: "slide_down",
    layer: "overlay",
    anchor: ["top", "right"],
    margins: [0, (options.screen.width - options.bar.width)/2 - 10],
    child: Panel(),
    setup: (self) => {
      self.keybind("Escape", () => App.closeWindow(WINDOW_NAME));
    },
  });
