import options from "./options.js";
import Bar from "./bar/bar.js";
import Calendar from "./calendar/Calendar.js";
import PowerMenu from "./power_menu/PowerMenu.js";
import ScreenshotMenu from "./screenshot/ScreenShot.js";
import Launcher from "./launcher/launcher.js";
import ContolPanel from "./control_panel/ContolPanel.js";
import {WeatherForecast} from "./weather/Weather.js";
import { WeatherOptions } from "./weather/Weather.js";
import NotificationPopups from "./notifications/NotificationPopups.js";
import { PromtPopup } from "./control_panel/widgets/Network.js"; 
import Desktop from "./desktop/desktop.js";
import {Wallpapers} from "./wallpapers/Wallpapers.js";
import Updates from "./updates/updates.js";
import PackegesInfo from "./updates/packageInfo.js";
import Settings from "./settings/settings.js";
import { isInstalled } from "./util/functions/systemUtils.js";
import {css, scss} from "./util/functions/variableUtils.js";


if (!isInstalled("sassc")) {
  Utils.notify("Error", "Sassc is not installed", "dialog-error-symbolic");
};
Utils.exec(`sassc ${scss} ${css}`);

App.config({
  style: css,
  windows: [
    Bar(),
    Launcher(),
    WeatherForecast(),
    WeatherOptions(),
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
    Settings(),
  ],
  closeWindowDelay: {
    dashboard: options.transition.duration,
  },
});
