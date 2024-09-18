import { WeekForecast } from "./weatherWidget.js";
import { WeatherOptionsForm } from "./optionsWeather.js";
import PopupWindow from "../util/PopupWindow.js";
import options from "../options.js";

const WINDOW_NAME_1 = "weather";
const WINDOW_NAME_2 = "optionsW";

export const WeatherForecast = () =>
  PopupWindow({
    name: WINDOW_NAME_1,
    transition: "slide_down",
    anchor: ["top", "left"],
    layer: "top",
    margins: [0, (options.screen.width - options.bar.width) / 2 - 30],
    child: WeekForecast(),
    setup: (self) => {
      self.keybind("Escape", () => App.closeWindow(WINDOW_NAME_1));
    },
  });
export const WeatherOptions = () =>
  PopupWindow({
    name: WINDOW_NAME_2,
    transition: "slide_down",
    anchor: ["top", "left"],
    layer: "top",
    margins: [0, (options.screen.width - options.bar.width) / 2],
    child: WeatherOptionsForm(),
    setup: (self) => {
      self.keybind("Escape", () => App.closeWindow(WINDOW_NAME_2));
    },
  });
