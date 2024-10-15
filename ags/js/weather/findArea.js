import weather from "../services/weatherService.js";
import settings from "../services/settingsServise.js";
import icons from "../util/icons.js";
const infoItem = (city) =>
  Widget.Button({
    onClicked: () => (weather.city = [city.name, city.code]),
    class_name: "cityInfo",
    child: Widget.Box({
      vertical: true,
      children: [
        Widget.Label({ label: city.name, class_name: "cityName", xalign: 0 }),
        Widget.Label({
          label: `${city.name}, ${city.administrativeArea}, ${city.country}`,
          xalign: 0,
        }),
      ],
    }),
  });

const CityList = () =>
  Widget.Scrollable({
    class_name: "scrollable",
    visible: weather.bind("city_data").as((jsonData) => jsonData.length > 0),
    vscroll: "always",
    hscroll: "never",
    child: Widget.Box({
      vertical: true,
      children: weather
        .bind("city_data")
        .as((jsonData) => jsonData.map((update) => infoItem(update))),
    }),
  });

export default () => {
  const searchEntry = Widget.Entry({
    class_name: "searchEntry",
    text: weather.bind("city"),
    placeholder_text: weather.bind("city"),
    setup: (self) => {
      self.primary_icon_name = "user-home-symbolic";
      self.hexpand = true;
    },
    onAccept: ({ text }) =>
      (weather.area = text),
  });

  return Widget.Box({
    class_name: "weatherOptionsForm",
    vertical: true,
    setup: (self) => {
      self.hook(App, (_) => {
        searchEntry.text = "";
      });
    },
    spacing: 10,
    children: [
      Widget.Box({
        spacing: 10,
        children: [Widget.Icon({ icon: icons.ui.search, size: 22 }), searchEntry],
      }),
      CityList(),
      Widget.Button({
        class_name: "saveBtn",
        onClicked: () => {
          weather.request = searchEntry.text;
          App.toggleWindow("findArea");
        },
        child: Widget.Label({ label: "Save" }),
      }),
    ],
  });
};
