import { App } from "../../import.js";
import icons from "../../options.js";
import Weather from "../../services/weatherService.js";
import {dayNumber} from "../../weather/weatherWidget.js";


export default () =>
    Widget.Button({
      visible: Weather.bind("status"),
      onClicked: () => {dayNumber.value = "Day0"; App.toggleWindow("weather");
      },
      className: "weather",
      cursor: "pointer",
      child: Widget.Box({
        spacing: 3,
        children: [
          Widget.Box({
            hexpand: true,
            vpack: "center",
            hpack: "center",
            css: Weather.bind("weather_data")
              .transform((data) => data?.DailyForecasts?.[0]?.Day?.Icon)
              .transform((icon) => `${icons.paths.weather_icons}/${icon}.png`)
              .transform(
                (path) => `
                  min-width: 30px;
                  min-height: 30px;
                  background-image: url('${path}');
                  background-repeat: no-repeat;
                  background-position: center;
                  background-size: contain;
              `
              ),
          }),
          Widget.Label({
            class_name: "temp",
            label: Weather.bind("weather_data")
              .transform(
                (data) => `${data?.DailyForecasts?.[0]?.Temperature?.Maximum?.Value.toFixed(0)}°C`
              ),
          })
        ],
      })
    });