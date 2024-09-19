import { Widget, Variable } from "../import.js";
import weather from "../services/weatherService.js";
import options from "../options.js";

export const dayNumber = Variable("Day0");


const updates = () =>
  Widget.Box({
    spacing: 10,
    children: [
      Widget.Label({
        vpack: "end",
        label: weather.bind("city"),
      }),
      Widget.Label({
        vpack: "end",
        class_name: "update",
        label: weather.bind("update").transform((result) => `󰚰  ${result}`),
      }),
    ]
  });
const short_date = (number) =>
  Widget.Label({
    label: weather
      .bind("weather_data")
      .transform((data) => data?.DailyForecasts?.[number]?.Date)
      .transform((date) =>
        new Date(date).toLocaleDateString("ru-RU", { weekday: "short" })
      ),
  });
const icon = (number, daytime, iconsize) =>
  Widget.Box({
    hexpand: true,
    vpack: "center",
    hpack: "center",
    css: weather
      .bind("weather_data")
      .transform((data) => data?.DailyForecasts?.[number]?.[daytime]?.Icon)
      .transform((icon) => `${options.paths.weather_icons}/${icon}.png`)
      .transform(
        (path) => `
            min-width: ${iconsize}px;
            min-height: ${iconsize}px;
            background-image: url('${path}');
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
        `
      ),
  });
const tempMax = (number) =>
  Widget.Label({
    label: weather
      .bind("weather_data")
      .transform(
        (data) =>
          `${data?.DailyForecasts?.[
            number
          ]?.Temperature?.Maximum?.Value.toFixed(0)}°C`
      ),
  });
const tempMin = (number) =>
  Widget.Box({
    spacing: 10,
    class_name: "smallContainer",
    children: [
      Widget.Icon("weather-clear-night-symbolic"),
      Widget.Label({
        label: weather
          .bind("weather_data")
          .transform(
            (data) =>
              `${data?.DailyForecasts?.[
                number
              ]?.Temperature?.Minimum?.Value.toFixed(0)}°C`
          ),
      }),
    ],
  });
const feelsLike = (number) =>
  Widget.Label({
    class_name: "feelsLike",
    hexpand: true,
    label: weather
      .bind("weather_data")
      .transform(
        (data) =>
          `${data?.DailyForecasts?.[
            number
          ]?.RealFeelTemperature?.Maximum?.Value.toFixed(0)}°C`
      ),
  });
const precip = (number, daytime) =>
  Widget.Box({
    spacing: 10,
    class_name: "smallContainer",
    children: [
      Widget.Icon("weather-showers-scattered-symbolic"),
      Widget.Label({
        hpack: "start",
        label: weather
          .bind("weather_data")
          .transform(
            (data) =>
              data?.DailyForecasts?.[number]?.[daytime]
                ?.PrecipitationProbability
          )
          .transform((precip) => `${precip}%`),
      }),
    ],
  });
const windSpeed = (number, daytime) =>
  Widget.Box({
    spacing: 10,
    class_name: "smallContainer",
    children: [
      Widget.Icon("weather-windy-symbolic"),
      Widget.Label({
        label: weather
          .bind("weather_data")
          .transform(
            (data) =>
              data?.DailyForecasts?.[number]?.[daytime]?.Wind?.Speed?.Value
          )
          .transform((speed) => parseFloat(speed))
          .transform((speed) => ((speed * 1000) / 3600).toFixed(0).toString())
          .transform((speed) => `${speed}м/с`),
      }),
    ],
  });
const windDirection = (number, daytime) =>
  Widget.Box({
    spacing: 10,
    class_name: "smallContainer",
    children: [
      Widget.Icon("window-pop-out-symbolic"),
      Widget.Label({
        label: weather
          .bind("weather_data")
          .transform(
            (data) =>
              `${data?.DailyForecasts?.[number]?.[daytime]?.Wind?.Direction?.Localized}`
          ),
      }),
    ],
  });
const forecastDay = (number, daytime) =>
  Widget.Button({
    class_name: "weatherBtn",
    cursor: "pointer",
    tooltip_text: weather
      .bind("weather_data")
      .transform(
        (data) => `${data?.DailyForecasts?.[number]?.[daytime]?.IconPhrase}`
      ),
    on_clicked: () => {
      // dayNumber.value = number;
      dayNumber.value = `Day${number}`;
      console.log(dayNumber.value);
    },
    child: Widget.Box({
      vertical: true,
      children: [
        short_date(number),
        icon(number, daytime, 40),
        tempMax(number),
      ],
    }),
  });
const Week = () =>
  Widget.Box({
    class_name: "weekForecast",
    children: [
      Widget.Box({
        hexpand: true,
        children: Array.from({ length: 5 }, (_, i) => forecastDay(i, "Day")),
      }),
    ],
  });
export const WeekForecast = () =>
  Widget.Box({
    class_name: "weatherWidget",
    child: Widget.Box({
      class_name: "weatherNow",
      child: Week(),
    }),
  });
const currentDay = (number, daytime) =>
  Widget.Box({
    class_name: "weatherInfo",
    vpack: "center",
    hexpand: true,
    spacing: 10,
    children: [
      Widget.Box({
        vertical: true,
        spacing: 5,
        vpack: "center",
        children: [
          Widget.Box({
            hpack: "start",
            spacing: 5,
            children: [precip(number, daytime), tempMin(number)],
          }),
          Widget.Box({
            hpack: "start",
            spacing: 5,
            children: [
              windSpeed(number, daytime),
              windDirection(number, daytime),
            ],
          }),
          updates(),
        ],
      }),
      Widget.Box({
        vertical: true,
        children: [
          icon(number, daytime, 65),
          feelsLike(number),
        ],
      }),
    ],
  });
export const DayForecast = () =>
  Widget.Stack({
    class_name: "dayForecast",
    visible: weather.bind("status"),
    children: {
      Day0: currentDay(0, "Day"),
      Day1: currentDay(1, "Day"),
      Day2: currentDay(2, "Day"),
      Day3: currentDay(3, "Day"),
      Day4: currentDay(4, "Day"),
    },
    shown: dayNumber.bind(),
    transition: "over_right_left",
  });
