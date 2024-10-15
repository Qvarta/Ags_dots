import { WeekForecast } from "./weatherWidget.js";
import findArea from "./findArea.js";
import PopupWindow from "../util/Widgets/PopupWindow.js";
import settings from "../services/settingsServise.js";
import options from "../options.js";

const WINDOW_NAME_1 = "weather";
const WINDOW_NAME_2 = "findArea";

export const WeatherForecast = () =>
  PopupWindow({
    name: WINDOW_NAME_1,
    transition: "slide_down",
    css:'background-color: transparent;',

    anchor: ["top", "left"],
    layer: "top",
    child: WeekForecast(),
    setup: (self) => {
      self.hook(settings, () => {
        self.margins = [0,(options.screen.width - settings.settings.barSize) / 2 ,];
      })
      self.keybind("Escape", () => App.closeWindow(WINDOW_NAME_1));
    },
  });
export const WeatherOptions = () =>
  PopupWindow({
    name: WINDOW_NAME_2,
    css:'background-color: transparent;',
    transition: "slide_down",
    anchor: ["top", "left"],
    layer: "top",
    child: findArea(),
    setup: (self) => {
      self.hook(settings, () => {
        self.margins = [0,(options.screen.width - settings.settings.barSize) / 2 ,];
      })
      self.keybind("Escape", () => App.closeWindow(WINDOW_NAME_2));
    },
  });
