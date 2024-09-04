// @ts-nocheck
import { css, scss } from "../../main.js";
import options from "../../options.js";
import Themes from "../../services/appearanceService.js";

const theme = Variable();
const global = Variable(false);

const current_theme = Utils.exec(`bash -c "readlink -f ${options.paths.current}"`);
theme.value = current_theme.split("/").pop().split(".")[0];

const change_theme = () => {
  theme.value = theme.value === "Dark" ? "Light" : "Dark";
  
  Themes.ags = theme.value;
  Utils.exec(`sassc ${scss} ${css}`);
  App.resetCss();
  App.applyCss(css);

  if (global.value === true) {
    Themes.hyprland = theme.value;
    Themes.vscode =theme.value === "Dark" ? "Tokyo Night" : "Tokyo Night Light";
    Themes.kitty = theme.value;
    // Themes.gtk_theme = theme.value;
  }
};

export const WallpaperToggle = () =>
  Widget.Button({
    class_name: "toggleBtn",
    hexpand: true,
    onClicked: () => App.toggleWindow("wallpapers"),
    child: Widget.Box({
      children: [
        Widget.Label({label:"Wallpaper", hexpand: true, xalign: 0}),
        Widget.Icon({ icon: "folder-symbolic", size: 22 ,hpack:"end"}),
      ],
    }),
  });

export const ThemeToggle = () =>
  Widget.Button({
    class_name: "toggleBtn",
    hexpand: true,
    onClicked: () => change_theme(),
    child: Widget.Box({
      children:[
        Widget.Label({
          label: theme.bind().as((s) => (s === "Dark" ? "Dark Mode" : "Light Mode")),
          hexpand: true, 
          xalign: 0
        }),
        Widget.Icon({
          icon: theme.bind().as((s) =>  s === "Dark" ? "to-the-moon-symbolic" : "sunflower-symbolic"),
          size: 22,
          hpack:"end"
        })
      ],
    })
  });
export const setGlobal = () =>
  Widget.Box({
    class_name: "setGlobal",
    children: [
      Widget.Label({ label: "Global Theme:", hexpand: true, xalign: 0 }),
      Widget.Box({
        class_name: "my-switch",
        child: Widget.Switch({
          hpack: "start",
          onActivate: ({ active }) => (global.value = active),
        })
      })
    ],
  });
