import { Widget, Mpris } from "../../import.js";
import icons from "../../util/icons.js";

const players = Mpris.bind("players");

function lengthStr(length) {
  const min = Math.floor(length / 60);
  const sec = Math.floor(length % 60);
  const sec0 = sec < 10 ? "0" : "";
  return `${min}:${sec0}${sec}`;
}

const Player = (player) => {
  const cover = Widget.Box({
    class_name: "cover",
    vpack: "start",
    css: player.bind("cover_path").as(
      (path) => `
            min-width: 80px;
            min-height: 80px;
            background-image: url('${path}');
        `
    ),
  });

  const title = Widget.Label({
    class_name: "title",
    max_width_chars: 30,
    truncate: "end",
    hpack: "start",
    label: player.bind("track_title"),
  });

  const artist = Widget.Label({
    visible: player.bind("track_artists").as((a) => a[0].length > 0),
    class_name: "artist",
    max_width_chars: 30,
    truncate: "end",
    hpack: "start",
    label: player.bind("track_artists").as((a) => a.join(", ")),
  });

  const positionSlider = Widget.Slider({
    class_name: "position",
    draw_value: false,
    on_change: ({ value }) => (player.position = value * player.length),
    setup: (self) => {
      const update = () => {
        const { length, position } = player;
        self.visible = length > 0;
        self.value = length > 0 ? position / length : 0;
      };
      self.hook(player, update);
      self.hook(player, update, "position");
      self.poll(1000, update);
    },
  });

  const positionLabel = Widget.Label({
    class_name: "position",
    hpack: "start",
    setup: (self) => {
      const update = (_, time) => {
        self.label = lengthStr(time || player.position);
        self.visible = player.length > 0;
      };
      self.hook(player, update, "position");
      self.poll(1000, update);
    },
  });

  const lengthLabel = Widget.Label({
    class_name: "length",
    hpack: "end",
    truncate: 'end',
    maxWidthChars: 5,
    wrap: true,
    visible: player.bind("length").as((l) => l > 0),
    label: player.bind("length").as(lengthStr),
  });

  const playPause = Widget.Button({
    class_name: "playerBtn",
    on_clicked: () => player.playPause(),
    visible: player.bind("can_play"),
    child: Widget.Icon({
      icon: player.bind("play_back_status").as((s) => {
        switch (s) {
          case "Playing":
            return icons.mpris.playing;
          case "Paused":
          case "Stopped":
            return icons.mpris.stopped;
        }
      }),
      size: 15,
    }),
  });

  const prev = Widget.Button({
    class_name: "playerBtn",
    on_clicked: () => player.previous(),
    visible: player.bind("can_go_prev"),
    child: Widget.Icon({size: 15,icon: icons.mpris.prev,}),
  });

  const next = Widget.Button({
    class_name: "playerBtn",
    on_clicked: () => player.next(),
    visible: player.bind("can_go_next"),
    child: Widget.Icon({ icon: icons.mpris.next, size: 15 }),
  });

  return Widget.Box({
    class_name: "player",
    vexpand: false,
    hexpand: true,
    children: [
      cover,
      Widget.Box({
        class_name: "controls",
        vertical: true,
        hexpand: true,
        children: [
          title,
          artist,
          Widget.Box({ vexpand: true }),
          positionSlider,
          Widget.CenterBox({
            start_widget: positionLabel,
            center_widget: Widget.Box([prev, playPause, next]),
            end_widget: lengthLabel,
          }),
        ],
      }),
    ],
  });
};

export const Media = () =>
  Widget.Box({
    vertical: true,
    class_name: "media",
    spacing: 10,
    children: players.as((p) => p.map(Player)),
  });
