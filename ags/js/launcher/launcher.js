const Applications = await Service.import("applications");
import options from "../options.js";
import { Widget } from "../import.js";
import PopupWindow from "../util/PopupWindow.js";
import icons from "../util/icons.js";
const WINDOW_NAME = "launcher";

const AppItem = (app) =>
  Widget.Button({
    className: "app_item",
    tooltip_text: app.description,
    onClicked: () => {
      App.closeWindow(WINDOW_NAME);
      app.launch();
      ++app.frequency;
    },
    setup: (self) => (self.app = app),
    child: Widget.Box({
      children: [
        Widget.Icon({
          icon: app.iconName || "",
          size: 44,
        }),
        Widget.Label({
          label: app.name,
          xalign: 0,
          vpack: "center",
          truncate: "end",
        }),
      ],
    }),
  });

const Launcher = () => {
  const list = Widget.Box({vertical: true});

  const entry = Widget.Entry({
    className: "launcherEntry",
    primary_icon_name: icons.ui.search,
    hexpand: true,
    placeholder_text: "Search...",

    onAccept: ({ text }) => {
      const appList = Applications.query(text || "");
      appList[0].launch();
    },
    onChange: ({ text }) =>
      list.children.map((item) => {
        item.visible = item.app.match(text);
      }),
  });

  return Widget.Box({
    className: "app_launcher",
    child:
    Widget.Box({
      className: "app_list",
      vertical: true,
      setup: (self) => {
        self.hook(App, (_, name, ) => {
          if (name !== WINDOW_NAME) return;
          entry.grab_focus();
          entry.text = "";
          Applications.list.sort((a, b) => { return a.frequency < b.frequency;});
          list.children = Applications.list.map(AppItem);
        });
      },
      children: [
        entry,
        Widget.Scrollable({
          class_name: "scrollable",
          hscroll: "never",
          child: list,
        }),
      ],
    }),
  });
};

export default () =>
  PopupWindow({
    name: WINDOW_NAME,
    transition: "slide_down",
    anchor: ["top", "left"],
    margins: [0,(options.screen.width - options.bar.width)/2],
    child: Launcher(),
    setup: (self) => {
      self.keybind("Escape", () => App.closeWindow(WINDOW_NAME));
    },
  });
