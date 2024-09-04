export const substitutes = {
  "transmission-gtk": "transmission",
  "blueberry.py": "blueberry",
  Caprine: "facebook-messenger",
  "com.raggesilver.BlackBox-symbolic": "terminal-symbolic",
  "audio-headset-bluetooth": "audio-headphones-symbolic",
  "audio-card-analog-usb": "audio-speakers-symbolic",
  "audio-card-analog-pci": "audio-card-symbolic",
  "preferences-system": "emblem-system-symbolic",
  "com.github.Aylur.ags-symbolic": "controls-symbolic",
  "com.github.Aylur.ags": "controls-symbolic",
};

export default {
  fallback: {
    executable: "application-x-executable-symbolic",
    notification: "mail-mark-important-symbolic",
    video: "video-display-symbolic",
    audio: "audio-speakers-symbolic",
  },
  ui: {
    password: "auth-fingerprint-symbolic",
    home: "󱁍",
    keyboard: "input-keyboard-symbolic",
    close: "window-close-symbolic",
    colorpicker: "color-select-symbolic",
    info: "info-symbolic",
    link: "external-link-symbolic",
    lock: "system-lock-screen-symbolic",
    menu: "open-menu-symbolic",
    refresh: "view-refresh-symbolic",
    search: "system-search-symbolic",
    settings: "emblem-system-symbolic",
    themes: "applications-graphics-symbolic",
    tick: "",
    time: "hourglass-symbolic",
    toolbars: "toolbars-symbolic",
    warning: "dialog-warning-symbolic",
    person: "person-symbolic",
    arrow: {
      right: "pan-end-symbolic",
      left: "pan-start-symbolic",
      down: "pan-down-symbolic",
      up: "pan-up-symbolic",
    },
  },
  audio: {
    microphone: {
      muted: "microphone-disabled-symbolic",
      low: "microphone-sensitivity-low-symbolic",
      medium: "microphone-sensitivity-medium-symbolic",
      high: "microphone-sensitivity-high-symbolic",
    },
    speaker: {
      muted: "audio-volume-muted-symbolic",
      low: "audio-volume-low-symbolic",
      medium: "audio-volume-medium-symbolic",
      high: "audio-volume-high-symbolic",
      overamplified: "audio-volume-overamplified-symbolic",
    },
    type: {
      headset: "audio-headphones-symbolic",
      speaker: "audio-speakers-symbolic",
      card: "audio-card-symbolic",
    },
    mixer: "mixer-symbolic",
    player: "multimedia-player-symbolic",
  },
  battery: {
    full: "battery-empty-symbolic",
    warning: "battery-empty-symbolic",
  },
  bluetooth: {
    enabled: "bluetooth-active-symbolic",
    disabled: "bluetooth-disabled-symbolic",
  },
  brightness: {
    indicator: "display-brightness-symbolic",
    keyboard: "keyboard-brightness-symbolic",
    screen: "display-brightness-symbolic",
  },
  powermenu: {
    sleep: "weather-clear-night-symbolic",
    reboot: "system-reboot-symbolic",
    logout: "system-log-out-symbolic",
    shutdown: "system-shutdown-symbolic",
    lock: "system-lock-screen-symbolic",
  },
  recorder: {
    recording: "media-record-symbolic",
  },
  notifications: {
    noisy: "org.gnome.Settings-notifications-symbolic",
    silent: "notifications-disabled-symbolic",
    message: "chat-bubbles-symbolic",
  },
  trash: {
    full: "user-trash-full-symbolic",
    empty: "user-trash-symbolic",
  },
  mpris: {
    shuffle: {
      enabled: "media-playlist-shuffle-symbolic",
      disabled: "media-playlist-consecutive-symbolic",
    },
    loop: {
      none: "media-playlist-repeat-symbolic",
      track: "media-playlist-repeat-song-symbolic",
      playlist: "media-playlist-repeat-symbolic",
    },
    playing: "media-playback-pause-symbolic",
    paused: "media-playback-start-symbolic",
    stopped: "media-playback-start-symbolic",
    prev: "media-skip-backward-symbolic",
    next: "media-skip-forward-symbolic",
  },
  system: {
    cpu: "org.gnome.SystemMonitor-symbolic",
    ram: "drive-harddisk-solidstate-symbolic",
    temp: "temperature-symbolic",
  },
  color: {
    dark: "dark-mode-symbolic",
    light: "light-mode-symbolic",
  },
  network: {
    wired: {
      connected: "network-wired-symbolic",
      portal: "network-wired-acquiring-symbolic",
      limited: "network-wired-no-route-symbolic",
      disconnected: "network-wired-acquiring-symbolic",
    },
  },
  screenshot: {
    desktop: "preferences-desktop-display-symbolic",
    region: "edit-cut-symbolic",
    window: "edit-copy-symbolic",
  },
};
