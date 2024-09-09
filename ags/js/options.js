import { user, get_screen_resolution } from "./util/My_util.js";

export default {
  powermenu: {
    shutdown: "systemctl poweroff",
    reboot: "systemctl reboot",
    suspend: `
    playerctl -a pause & 
    ags -q
    swaylock -f -c "#141319"
    pid=$(pgrep swaylock)
    systemctl suspend
    waitpid $pid
    hyprctl dispatch exec ags`,
    lock: `
    playerctl -a pause
    swaylock -f -c "#141319"`,
    logout: "hyprctl dispatch exit",
  },
  transition: {
    duration: 300,
  },
  themes: {
    dark: "Dark",
    light: "Light",
    set_theme: `gsettings set org.gnome.desktop.interface gtk-theme "Tokyonight-`,
    set_icons: `gsettings set org.gnome.desktop.interface icon-theme "Tokyonight-`,
    get_theme: "gsettings get org.gnome.desktop.interface gtk-theme",
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
    test_json: `${App.configDir}/js/weather/test2.json`,
  },
  accuwearther: {
    api_key: "",
    city: "",
    language: "",
  },
  screen:{
    width: get_screen_resolution().width,
    height: get_screen_resolution().height,
  },
  bar: {
      width: 1000,
    },
};
