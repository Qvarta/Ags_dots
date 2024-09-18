import { App } from "../../import.js";
import icons from "../../options.js";
import Weather from "../../services/weatherService.js";
import {dayNumber} from "../../weather/weatherWidget.js";


export default () =>
  Widget.Box({
    tooltip_text: "LCM => Open Weather\nRCM => Open Options",
    children: [
      Widget.Button({
        visible: Weather.bind("status"),
        on_primary_click: () => {dayNumber.value = "Day0"; App.toggleWindow("weather")},
        on_secondary_click: () => App.toggleWindow("optionsW"),
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
      }),
      Widget.Button({
        className: "weather",
        visible: Weather.bind("status").as((result) => !result),
        onClicked: () => App.toggleWindow("optionsW"),
        child: Widget.Label({
          label: `Recieving weather ...`,
        })
      }),
    ]
  });
