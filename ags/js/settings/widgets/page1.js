import Gdk from "gi://Gdk";
import Gtk from "gi://Gtk";
import Gio from "gi://Gio";
import wallpapers from "../../services/wallpaperService.js";
import settings from "../../services/settingsServise.js";

const BarOptions = () =>
  Widget.Box({
    class_name: "optionsItem",
    vertical: true,
    spacing: 10,
    children: [
      Widget.Box({
        children: [
          Widget.Label({
            label: "Size:",
            xalign: 0,
          }),
          Widget.Box({
            class_name: "sliderContainer",
            children: [
              Widget.Slider({
                draw_value: false,
                min: 900,
                max: 1920,
                step: 100,
                hexpand: true,
                value: settings.bind("settings").transform((n) => n.barSize),
                on_change: ({ value }) => {
                  settings.barSize = Math.round(value);
                },
              }),
              Widget.Label({
                label: settings
                  .bind("settings")
                  .transform((n) => `${n.barSize}px`),
                xalign: 1,
              }),
            ],
          }),
        ],
      }),
    ],
  });
const WorkspaceOptions = () =>
  Widget.Box({
    class_name: "optionsItem",
    vertical: true,
    spacing: 10,
    children: [
      Widget.Box({
        children: [
          Widget.Label({
            label: "Number:",
            xalign: 0,
          }),
          Widget.Box({
            class_name: "sliderContainer",
            children: [
              Widget.Slider({
                draw_value: false,
                min: 3,
                max: 9,
                step: 1,
                hexpand: true,
                value: settings
                  .bind("settings")
                  .transform((n) => n.workspasesNumber),
                on_change: ({ value }) => {
                  settings.workspasesNumber = Math.round(value);
                  settings.changed("settings");
                },
              }),
              Widget.Label({
                label: settings
                  .bind("settings")
                  .transform((n) => ` ${n.workspasesNumber}`),
                xalign: 1,
              }),
            ],
          }),
        ],
      }),
    ],
  });
const PathOptions = () =>
  Widget.Box({
    class_name: "optionsItem",
    vertical: true,
    spacing: 10,
    children: [
      Widget.Box({
        children: [
          Widget.Label({
            label: "Wallpaper Folder:",
            xalign: 0,
          }),
          Widget.FileChooserButton({
            class_name: "fileChooserBtn",
            setup: (self) => {
              const folder =
                settings.bind("settings").emitter.settings.wallpaperFolder;
              self.action = Gtk.FileChooserAction.SELECT_FOLDER;
              self.set_current_folder(folder);
              self.set_title("Select folder");
            },
            onFileSet: ({ uri }) => {
              const newFolder = uri.replace("file://", "");
              settings.change = ["wallpaperFolder", newFolder];
              wallpapers.clear_cash();
            },
            hexpand: true,
          }),
        ],
      }),
      Widget.Box({
        children: [
          Widget.Label({
            label: "Screenshot Folder:",
            xalign: 0,
          }),
          Widget.FileChooserButton({
            class_name: "fileChooserBtn",
            setup: (self) => {
              const folder =
                settings.bind("settings").emitter.settings.screenShotFolder;
              self.action = Gtk.FileChooserAction.SELECT_FOLDER;
              self.set_current_folder(folder);
              self.set_title("Select folder");
            },
            onFileSet: ({ uri }) => {
              const newFolder = uri.replace("file://", "");
              settings.change = ["screenShotFolder", newFolder];
            },
            hexpand: true,
          }),
        ],
      }),
      Widget.Box({
        children: [
          Widget.Label({
            label: "Radio list:",
            xalign: 0,
          }),
          Widget.FileChooserButton({
            class_name: "fileChooserBtn",
            setup: (self) => {
              const file =
                settings.bind("settings").emitter.settings.radioJSON;
              self.set_title("Select file");
              self.set_filename(file); 
            },
            onFileSet: ({ uri }) => {
              const newFile = uri.replace("file://", "");
              settings.change = ["radioJSON", newFile];
            },
            hexpand: true,
          }),
        ],
      }),
    ],
  });
const WeatherOptions = () =>
  Widget.Box({
    class_name: "optionsItem",
    vertical: true,
    spacing: 10,
    children: [
      Widget.Box({
        children: [
          Widget.Label({
            label: "Language:",
            xalign: 0,
          }),
          LanguageMenu(
            settings.bind("settings").as((s) => {
              const language = s.language === "ru-RU" ? "Русский" : "English";
              return language;
            })
          ),
        ],
      }),
      Widget.Box({
        children: [
          Widget.Label({
            label: "Api-key:",
            xalign: 0,
          }),
          Widget.Entry({
            class_name: "entry",
            hexpand: true,
            placeholder_text: settings
              .bind("settings")
              .transform((n) => n.apiKey.replace(/./g, "*").slice(0, 20)),
            tooltip_text: "Api-key from https://developer.accuweather.com/",
            xalign: 0.5,
            visibility: false,
            on_change: ({ text }) => (settings.change = ["apiKey", text]),
          }),
        ],
      }),
    ],
  });
const LanguageMenu = (language) => {
  const label = Widget.Entry({
    placeholder_text: language,
    class_name: "entry",
    setup: (self) => {
      self.set_alignment(0.5);
    },
  });
  const menu = Widget.Menu({
    class_name: "menu",
    children: [
      Widget.MenuItem({
        class_name: "menu_item",
        hexpand: true,
        setup: (self) => self.set_label("English"),
        onActivate: () => {
          label.text = "English";
          settings.change = ["language", "en-US"];
        },
      }),
      Widget.MenuItem({
        class_name: "menu_item",
        setup: (self) => self.set_label("Русский"),
        onActivate: () => {
          label.text = "Русский";
          settings.change = ["language", "ru-RU"];
        },
      }),
    ],
  });
  return Widget.Button({
    class_name: "menuBtn",
    hexpand: true,
    onPrimaryClick: (self) => {
      menu.popup_at_widget(self, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null);
    },
    child: label,
  });
};
export default () =>
  Widget.Box({
    class_name: "page",
    spacing: 10,
    vertical: true,
    children: [
      Widget.Box({
        vertical: true,
        spacing: 4,
        children: [
          Widget.Label({
            class_name: "blue",
            label: "Bar",
            xalign: 0,
          }),
          BarOptions(),
        ],
      }),
      Widget.Box({
        vertical: true,
        spacing: 4,
        children: [
          Widget.Label({
            class_name: "blue",
            label: "Workspaces",
            xalign: 0,
          }),
          WorkspaceOptions(),
        ],
      }),
      Widget.Box({
        vertical: true,
        spacing: 4,
        children: [
          Widget.Label({
            label: "Paths",
            class_name: "blue",
            xalign: 0,
          }),
          PathOptions(),
        ],
      }),
      Widget.Box({
        vertical: true,
        spacing: 4,
        children: [
          Widget.Label({
            class_name: "blue",
            label: "Weather",
            xalign: 0,
          }),
          WeatherOptions(),
        ],
      }),
    ],
  });
