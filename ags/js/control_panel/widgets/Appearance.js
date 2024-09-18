// @ts-nocheck
import { css, scss } from "../../main.js";
import options from "../../options.js";
import themes from "../../services/appearanceService.js";
import { checkTheme } from "../../util/helpers.js";

const theme = Variable();

const current_theme = Utils.exec(`bash -c "readlink -f ${options.paths.current}"`);
theme.value = current_theme.split("/").pop().split(".")[0];

const change_theme = () => {
  theme.value = theme.value === "Dark" ? "Light" : "Dark";
  
  themes.ags = theme.value;
  Utils.exec(`sassc ${scss} ${css}`);
  App.resetCss();
  App.applyCss(css);

  themes.vscode = theme.value === "Dark" ? options.themes.vscode_dark : options.themes.vscode_light;
  themes.kitty = theme.value;
  themes.gtk_theme = theme.value === "Dark" 
    ? [options.themes.gtk_dark, options.themes.icon_dark, theme.value]
    : [ options.themes.gtk_light, options.themes.icon_light, theme.value];
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
