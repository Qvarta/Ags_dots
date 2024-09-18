import weather from "../services/weatherService.js";

const infoItem = (city) => 
  Widget.Button({
    onClicked: () => weather.city = [city.name, city.code],
    class_name: "cityInfo",
    child: Widget.Box({
      vertical: true,
      children: [
        Widget.Label({ label: city.name, class_name: "cityName", xalign: 0}),
        Widget.Label({
          label: `${city.name}, ${city.administrativeArea}, ${city.country}`, 
          xalign: 0
        }),
      ],
    })
  });

const CityList = () =>
  Widget.Scrollable({
    class_name: "scrollable",
    visible:  weather.bind("city_data").as((jsonData) => jsonData.length > 0),
    vscroll: "always",
    hscroll: "never",
    child: Widget.Box({
      vertical: true,
      children: weather.bind("city_data").as((jsonData) => jsonData.map((update) => infoItem(update))),
    }),
  });

export const WeatherOptionsForm = () => {
  const keyEntry = Widget.Entry({
    hexpand: true,
    text: weather.bind("key"),
    visibility: false,
    primary_icon_name: "channel-secure-symbolic",
    placeholder_text: "api-key",
    tooltip_text: "https://developer.accuweather.com/",
  });
  const langEntry = Widget.Entry({
    hexpand: true,
    text: weather.bind("lang"),
    primary_icon_name: "font-x-generic-symbolic",
    placeholder_text: "e.g. en-US",
  });
  const searchEntry = Widget.Entry({
    primary_icon_name: "user-home-symbolic",
    hexpand: true,
    text: weather.bind('city'),
    placeholder_text: weather.bind('city'),
    onAccept: ({ text }) => weather.area = [keyEntry.text, text, langEntry.text],
  });

  return Widget.Box({
    class_name: "weatherOptionsForm",
    vertical: true,
    setup: (self) => {
      self.hook(App, (_, ) => {
        searchEntry.text = "";
      });
    },
    spacing: 10,
    children: [
      Widget.Box({
        vertical: true,
        spacing: 10,
        class_name: "weatherOptions",
        children: [
          Widget.Box({
            spacing: 10,
            children: [Widget.Label({ label: "Api key:", xalign: 0 }), keyEntry],
          }),
          Widget.Box({
            spacing: 10,
            children: [Widget.Label({ label: "Lang:", xalign: 0 }), langEntry],
          }),
          Widget.Box({
            spacing: 10,
            children: [
              Widget.Label({ label: "City:", xalign: 0 }), searchEntry],
          }),
        ]
      }),
      CityList(),
      Widget.Button({
        class_name: "saveBtn",
        onClicked: () => {
          weather.request = [searchEntry.text, keyEntry.text, langEntry.text]; 
          App.toggleWindow("optionsW")
        },
        child: Widget.Label({ label: "Save" }),
      }),
    ],
  });
};
