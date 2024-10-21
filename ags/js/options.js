import {getScreenResolution} from "./util/functions/imageUtils.js";

export default {
  powermenu: {
    shutdown: "systemctl poweroff",
    reboot: "systemctl reboot",
    lock: `hyprlock`,
    logout: "hyprctl dispatch exit",
  },
  transition: {
    duration: 300,
  },
  themes: {
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
    cashdir: `${Utils.CACHE_DIR}/wallpapers/`,
    weather_icons: `${App.configDir}/assets/icons`,
    weather: `${Utils.CACHE_DIR}/weather/`,
    cover: `${App.configDir}/assets/cover.png`,
    settings: `${App.configDir}/assets/settings.json`,
  },
  screen:{
    width: getScreenResolution().width,
    height: getScreenResolution().height,
  },
  avatar: {
    image: `${App.configDir}/assets/qvarta.png`,
    size:35,
  },
  vpn:{
    icon: `${App.configDir}/assets/vpn.png`,
    size: 18,
  },
  colors:{
    number: 8,
  }
};
