import {App, Utils} from "./import.js";
import options from "./options.js";

import Bar from "./bar/bar.js";
import Calendar from "./calendar/Calendar.js";
import PowerMenu from "./power_menu/PowerMenu.js";
import ScreenshotMenu from "./screenshot/ScreenShot.js";
import Launcher from "./launcher/launcher.js";
import ContolPanel from "./control_panel/ContolPanel.js";
import {WeatherForecast} from "./weather/Weather.js";
import NotificationPopups from "./notifications/NotificationPopups.js";
import { PromtPopup } from "./control_panel/widgets/Network.js"; 
import Desktop from "./desktop/desktop.js";
import Wallpapers from "./wallpapers/Wallpapers.js";
import Updates from "./updates/updates.js";
import PackegesInfo from "./updates/packegesInfo.js";

// main scss file
export const scss = `${App.configDir}/style.scss`;

// target css file
export const css = `/tmp/my-style.css`;

// make sure sassc is installed on your system
Utils.exec(`sassc ${scss} ${css}`);

App.config({
  style: css,
  windows: [
    Bar(),
    Launcher(),
    WeatherForecast(),
    Calendar(),
    ContolPanel(),
    PowerMenu(),
    ScreenshotMenu(),
    Desktop(),
    NotificationPopups(),
    PromtPopup(),
    Wallpapers(),
    Updates(),
    PackegesInfo(),
  ],
  closeWindowDelay: {
    dashboard: options.transition.duration,
  },
});
