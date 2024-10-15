import { DayForecast } from "../weather/weatherWidget.js";
import { time, cpuval, ramval } from "../util/functions/variableUtils.js";
import { getTimezone} from "../util/functions/systemUtils.js";
import options from "../options.js";
import CavaWidget from "../cava/cava.js";

const WINDOW_NAME = "desktop";
const mpris = await Service.import('mpris')
const players = mpris.bind("players");

const NowPlaying = (player) =>
  Widget.Box({
    class_name: "nowPlaying",
    hexpand: true,
    vertical: true,
    spacing: 5,
    children: [
      Widget.Box({
        spacing: 10,
        children: [
          Widget.Icon({icon:"audio-headphones-symbolic", class_name: "player_icon", vexpand: true}),
          Widget.Box({
            vertical: true,
            children: [
              Widget.Label({
                visible: player.bind("track_artists").as((a) => a[0].length > 0 && a[0] !== "Unknown artist"),
                hpack: "start",
                class_name: "track_artist",
                max_width_chars: 30,
                truncate: "end",
                vpack: "center",
                label: player.bind("track_artists").as((a) => a.join(", ")),
              }),
              Widget.Label({
                class_name: "track_title",
                hpack: "start",
                max_width_chars: 30,
                truncate: "end",
                vpack: "center",
                vexpand: true,
                label: player.bind("track_title"),
              }),
            ]
          })

        ],
      }),
      CavaWidget(),
    ],
  });
const TimeNow = () => Widget.Box({
    class_name: "timeNow",
    hexpand: true,
    vertical: true,
    children: [ 
      Widget.Label({
        className: "time_digit",
        vexpand: true,
        // hexpand: true,
        label: time.bind().transform((t) => t.format("%H:%M") || "wrong format"),
      }),
      Widget.Label({
        vpack:"end",
        className: "zone_text",
        // hexpand: true,
        label: getTimezone(),
      }),
    ]
});
const DayNow = () => Widget.Box({
    class_name: "dayNow",
    children:  [
        Widget.Label({
            class_name: "date_digit",
            hpack: "start",
            label: time.bind().transform((t) => t.format("%d")),
          }),
        Widget.Box({
            vertical: true,
            vpack: "center",
            class_name: "date_text",
            children:[
                Widget.Label({
                    hpack: "start",
                    class_name: "weekday",
                    label: time.bind().transform((t) => t.format("%A")),
                  }),
                  Widget.Label({
                    hpack: "start",
                    label: time.bind().transform((t) => t.format("%b. %Y г.")),
                  }),  
            ],
        }),
    ],
});
const SystemInfo = () => Widget.Box({
    vertical: true,
    hexpand: true,
    class_name: "system_info",
    children:[
        Widget.Box({
          vpack: "center",
            children: [
                Widget.Label({label:"CPU", class_name: "sys_label"}),
                Widget.Label({ label: cpuval.bind(), hpack: "end"}),
            ]
        }),
        Widget.Box({
            children: [
                Widget.Label({label:"RAM", class_name: "sys_label"}),
                Widget.Label({label: ramval.bind(), hpack: "end"}),
            ]
        })
       
    ]
    
})
const DesktopWidget = () => Widget.Box({
  vertical: true,
  class_name: "desktopWindow",
  spacing: 5,
  children: [
    Widget.Box({
        children: [
            TimeNow(),
            SystemInfo(),
        ],    
    }),
    DayNow(),
    DayForecast(),
    Widget.Box({
        vertical: true,
        spacing: 5,
        children: players.as((p) => p.map(NowPlaying)),
    }),
  ]
});
export default () =>
  Widget.Window({
    name: WINDOW_NAME,
    css:'background-color: transparent;',
    anchor: ["top", "left"],
    exclusivity: "normal",
    keymode: "on-demand",
    layer: "bottom",
    margins: [options.screen.height * 0.2, 50],
    monitor: 0,
    child: DesktopWidget(),
  });
