import radio from "../../services/radioService.js";
import Gdk from "gi://Gdk";

const RadioMenu = () => {
  const label = Widget.Label({
    label: radio.bind("station").transform((s) => `${s}`),
    hexpand: true,
    xalign: 0,
    max_width_chars: 20,
    truncate: "end",
  });
  const cont = Widget.Box({
    children: [
      label,
    ],
  });
  const menu = Widget.Menu({
    class_name: "menu",
    children: radio.bind("stations").as((s) =>
      s.map((station) =>
        Widget.MenuItem({
          class_name: "menu_item",
          setup: (self) => self.set_label(station.name),
          onActivate: (self) => {
            label.label = self.label;
            radio.station = [station.name, station.url];
            radio.playStation();
          },
        })
      )
    ),
  });
  return Widget.Box({
    class_name: "toggle-button",
    children:[
      Widget.Button({
        child: cont,
        setup: (self) =>
          self.hook(radio, () => {
            self.toggleClassName("active", radio.enabled === true);
          }),
        onPrimaryClick: () =>  radio.toggleService(),
      }),
      Widget.Button({
        child: Widget.Icon({ icon: "media-eject-symbolic" }),
        onPrimaryClick: (self) => {
          menu.popup_at_widget(self, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null);
      },
      }),
    ]
  });
};

let RadioWidget = () => RadioMenu();

export default RadioWidget;
