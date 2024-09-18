import { Widget, Variable } from "../import.js";
import weather from "../services/weatherService.js";
import options from "../options.js";

export const dayNumber = Variable("Day0");

const updateTime = () =>
  Widget.Box({
    hpack: "end",
    spacing: 15,
    children:[
      Widget.Label({
        class_name: "update",
        label: weather.bind('city'),
      }),
      Widget.Label({
        class_name: "update",
        hpack: "start",
        label: weather.bind("update").transform((result) => `󰚰  ${result}`),
      })
    ]
  });
const short_date = (number) =>
  Widget.Label({
    label: weather.bind("weather_data")
      .transform((data) => data?.DailyForecasts?.[number]?.Date)
      .transform((date) =>
        new Date(date).toLocaleDateString("ru-RU", { weekday: "short" })
      ),
  });
const long_date = (number) =>
  Widget.Label({
    class_name: "long_date yellow",
    hpack: "start",
    label: weather.bind("weather_data")
      .transform((data) => data?.DailyForecasts?.[number]?.Date)
      .transform((date) => new Date(date).toLocaleDateString("ru-RU", { weekday: "long" }))
      .transform((date) => date ===  new Date().toLocaleDateString("ru-RU", { weekday: "long" }) ? "СЕГОДНЯ:" : `${date.toUpperCase()}:`),
  });
const description = (number, daytime) =>
  Widget.Label({
    class_name: "description",
    hpack: "start",
    label: weather.bind("weather_data").transform(
      (data) => `${data?.DailyForecasts?.[number]?.[daytime]?.IconPhrase}`
    ),
  });
const icon = (number, daytime, iconsize) =>
  Widget.Box({
    hexpand: true,
    vpack: "center",
    hpack: "center",
    css: weather.bind("weather_data")
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
    label: weather.bind("weather_data").transform(
      (data) =>
        `${data?.DailyForecasts?.[number]?.Temperature?.Maximum?.Value.toFixed(
          0
        )}°C`
    ),
  });
const feelsLike = (number) =>
  Widget.Label({
    class_name: "description small",
    hpack: "start",
    label: weather.bind("weather_data").transform(
      (data) =>
        `Ощущается как ${data?.DailyForecasts?.[
          number
        ]?.RealFeelTemperature?.Maximum?.Value.toFixed(0)}°C`
    ),
  });
const precip = (number, daytime) =>
  Widget.Label({
    hpack: "start",
    label: weather.bind("weather_data")
      .transform(
        (data) =>
          data?.DailyForecasts?.[number]?.[daytime]?.PrecipitationProbability
      )
      .transform((precip) => `Верояность осадков: ${precip}%`),
  });
const windSpeed = (number, daytime) =>
  Widget.Label({
    label: weather.bind("weather_data")
      .transform(
        (data) => data?.DailyForecasts?.[number]?.[daytime]?.Wind?.Speed?.Value
      )
      .transform((speed) => parseFloat(speed))
      .transform((speed) => ((speed * 1000) / 3600).toFixed(1).toString())
      .transform((speed) => `Ветер: ${speed}м/с`),
  });
const windDirection = (number, daytime) =>
  Widget.Label({
    label: weather.bind("weather_data")
      .transform(
        (data) =>
          data?.DailyForecasts?.[number]?.[daytime]?.Wind?.Direction?.Localized
      )
      .transform((dir) => `󱗺 (${dir})`),
  });

const forecastDay = (number, daytime) =>
  Widget.Button({
    class_name: "weatherBtn",
    cursor: "pointer",
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
    class_name: "down",
    children: [
      Widget.Box({
        hexpand: true,
        children: Array.from({ length: 5 }, (_, i) => forecastDay(i, "Day")),
      }),
    ],
  });
const currentDay = (number, daytime) =>
  Widget.Box({
    class_name: "weatherInfo",
    vertical: true,
    vpack: "center",
    hexpand: true,
    // hpack: "start",
    children: [
      Widget.Box({
        spacing: 10,
        children:[
          long_date(number),
          description(number, daytime),
        ]
      }),
      
      feelsLike(number),
      precip(number, daytime),
      Widget.Box({
        hpack: "start",
        spacing: 8,
        children: [windSpeed(number, daytime), windDirection(number, daytime)],
      }),
      updateTime(),
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

export const DayForecast = () =>
  Widget.Stack({
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
