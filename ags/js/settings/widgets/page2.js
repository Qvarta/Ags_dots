import Gdk from "gi://Gdk";
import settings from "../../services/settingsServise.js";
import themes from "../../services/themesService.js";

const ThemeSelector = (themeName, type, mode) => {
  const label = Widget.Entry({
    placeholder_text: themeName,
    class_name: "entry",
    setup: (self) => {
      self.set_alignment(0.5);
    },
  });

  const menu = Widget.Menu({
    class_name: "menu",
    children: themes.bind(type === "GTK" ? "themes" : "icons").as((t) =>
      t.map((theme) =>
        Widget.MenuItem({
          class_name: "menu_item",
          setup: (self) => self.set_label(theme),
          onActivate: (self) => {
            label.text = self.label;
            settings.change = [
              mode === "Dark"
                ? type === "GTK"
                  ? "gtkThemeD"
                  : "iconThemeD"
                : type === "GTK"
                ? "gtkThemeL"
                : "iconThemeL",
              theme,
            ];
          },
        })
      )
    ),
  });

  return Widget.Box({
    children: [
      Widget.Label({
        label: `${type} theme:`,
        xalign: 0,
      }),
      Widget.Button({
        class_name: "menuBtn",
        hexpand: true,
        onPrimaryClick: (self) => {
          menu.popup_at_widget(
            self,
            Gdk.Gravity.SOUTH,
            Gdk.Gravity.NORTH,
            null
          );
        },
        child: label,
      }),
    ],
  });
};
const ColorButton = (color, type, mode) => {
  const label = Widget.Label({
    label: type,
    xalign: 0,
  });
  const colorbutton = Widget.ColorButton({
    hexpand: true,
    use_alpha: false,
    class_name: "colorBtn",
    color: new Gdk.Color({
      red: parseInt(color.slice(4, -1).split(", ")[0]) * 256,
      green: parseInt(color.slice(4, -1).split(", ")[1]) * 256,
      blue: parseInt(color.slice(4, -1).split(", ")[2]) * 256,
    }),
    onColorSet: ({ color: { red, green, blue} }) => {
      const newColor = `rgb(${parseInt(red/256)}, ${parseInt(green/256)}, ${parseInt(blue/256)})`;
      settings.change = [
        mode === "Dark" 
          ? type === "Foreground:" ? "ForegroundD" : "BackgroundD"
          : type === "Foreground:" ? "ForegroundL" : "BackgroundL",
        newColor,
      ];
    },
  });
  return Widget.Box({
    children: [label, colorbutton],
  });
};
export default () =>
  Widget.Box({
    class_name: "page",
    spacing: 10,
    vertical: true,

    children: [
      Widget.Label({
        label: "Dark mode",
        class_name: "blue",
        xalign: 0,
      }),
      Widget.Box({
        class_name: "optionsItem",
        vertical: true,
        spacing: 4,
        children: [
          ThemeSelector(
            settings.bind("settings").as((s) => s.gtkThemeD),
            "GTK",
            "Dark"
          ),
          ThemeSelector(
            settings.bind("settings").as((s) => s.iconThemeD),
            "Icons",
            "Dark"
          ),
          ColorButton(
            settings.bind("settings").emitter.settings.ForegroundD,
            "Foreground:",
            "Dark"
          ),
          ColorButton(
            settings.bind("settings").emitter.settings.BackgroundD,
            "Background:",
            "Dark"
          ),
        ],
      }),
      Widget.Label({
        label: "Light mode",
        class_name: "blue",
        xalign: 0,
      }),
      Widget.Box({
        class_name: "optionsItem",
        vertical: true,
        spacing: 4,
        children: [
          ThemeSelector(
            settings.bind("settings").as((s) => s.gtkThemeL),
            "GTK",
            "Light"
          ),
          ThemeSelector(
            settings.bind("settings").as((s) => s.iconThemeL),
            "Icons",
            "Light"
          ),
          ColorButton(
            settings.bind("settings").emitter.settings.ForegroundL,
            "Foreground:",
            "Light"
          ),
          ColorButton(
            settings.bind("settings").emitter.settings.BackgroundL,
            "Background:",
            "Light"
          ),
        ],
      }),
    ],
  });
