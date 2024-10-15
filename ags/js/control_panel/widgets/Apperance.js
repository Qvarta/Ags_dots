// @ts-nocheck
import themes from "../../services/themesService.js";

export const WallpaperToggle = () =>
  Widget.Button({
    class_name: "panelBtn",
    hexpand: true,
    onClicked: () => App.toggleWindow("wallpapers"),
    child: Widget.Box({
      spacing: 10,
      children: [
        Widget.Icon("folder-symbolic"),
        Widget.Label({label:"Wallpaper", hexpand: true, xalign: 0}),
      ],
    }),
  });

export const ThemeToggle = () =>
  Widget.Button({
    class_name: themes.bind('mode').as(t => t === "Dark" ? "panelBtn active" : "panelBtn"),
    // "panelBtn",
    hexpand: true,
    onClicked: () => themes.toggle(),
    child: Widget.Box({
      spacing: 10,
      children:[
        Widget.Icon({
          icon: "preferences-desktop-screensaver-symbolic",
          size: 22,
        }),
        Widget.Label({
          label: "Dark Mode",
          hexpand: true, 
          xalign: 0
        }),

      ],
    })
  });
