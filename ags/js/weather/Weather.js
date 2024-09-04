import { WeekForecast} from "./weatherWidget.js";
import PopupWindow from "../util/PopupWindow.js";
import options from "../options.js";

const WINDOW_NAME = "weather";


export const WeatherForecast =() =>
  PopupWindow({
    name: WINDOW_NAME,
    transition: "slide_down",
    anchor: ["top", "left"],
    layer: "top",
    margins: [0,(options.screen.width - options.bar.width)/2 -30],
    child: WeekForecast(),
    setup: (self) => {
      self.keybind("Escape", () => App.closeWindow(WINDOW_NAME));
    },
  });
