import { user, get_screen_resolution } from "./util/helpers.js";

export default {
  powermenu: {
    shutdown: "systemctl poweroff",
    reboot: "systemctl reboot",
    lock: `playerctl -a pause
    swaylock -f -c "#141319"`,
    logout: "hyprctl dispatch exit",
  },
  transition: {
    duration: 300,
  },
  themes: {
    vscode_dark: "Tokyo Night",
    vscode_light: "Tokyo Night Light",
    gtk_dark: "Tokyonight-Dark",
    gtk_light: "Tokyonight-Light",
    icon_light: "Tokyonight-Light",
    icon_dark: "Tokyonight-Dark",
    set_theme: `gsettings set org.gnome.desktop.interface gtk-theme`,
    set_icons: `gsettings set org.gnome.desktop.interface icon-theme`,
    get_theme: "gsettings get org.gnome.desktop.interface gtk-theme",
    pref_dark: "gsettings set org.gnome.desktop.interface color-scheme 'prefer-dark'",
    pref_light: "gsettings set org.gnome.desktop.interface color-scheme 'prefer-light'",
  },
  screenshot: {
    desktop: "hyprshot -m output -o",
    region: "hyprshot -m region -o",
    window: "hyprshot -m window -o",
  },
  paths: {
    current: `${App.configDir}/scss/colors.scss`,
    wallpapers: `${App.configDir}/wallpapers`,
    thumbnails: `${Utils.CACHE_DIR}/wallpapers/`,
    notify:`${Utils.CACHE_DIR}/notifications/notifications.json`,
    scss: `${App.configDir}/scss`,
    gtk3: `${user.config}/gtk-3.0`,
    gtk4: `${user.config}/gtk-4.0`,
    micro: `${user.config}/micro`,
    vscode: `${user.config}/VSCodium/User/settings.json`,
    hyprland: `${user.config}/hypr/vars/theme.conf`,
    kitty: `${user.config}/kitty`,
    weather_icons: `${App.configDir}/icons`,
    weather: `${Utils.CACHE_DIR}/weather/`,
    request: `${Utils.CACHE_DIR}/weather/`,
  },
  screen:{
    width: get_screen_resolution().width,
    height: get_screen_resolution().height,
  },
  bar: {
      width: 1000,
    },
};
