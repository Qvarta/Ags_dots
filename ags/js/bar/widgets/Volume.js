import { Audio } from "../../import.js";

export default () =>
  Widget.Button({
    className: "volume",
    onPrimaryClick: () => {
      App.toggleWindow("control_panel");
    },
    onSecondaryClick: () => {
      Audio.speaker.isMuted = !Audio.speaker.isMuted;
    },
    onScrollUp: () => {
      Audio.speaker.volume += 0.05;
    },
    onScrollDown: () => {
      Audio.speaker.volume -= 0.05;
    },
    child: Widget.Box({
      vpack: "fill",
      children: [
        Widget.Icon().hook(Audio.speaker, (self) => {
          const vol = Audio.speaker.volume * 100;
          let isMuted = Audio.speaker.isMuted;
          const icon = [
            [101, "overamplified"],
            [67, "high"],
            [34, "medium"],
            [1, "low"],
            [0, "muted"],
          ].find(([threshold]) => threshold <= vol)?.[1];

          self.icon = !isMuted ? `audio-volume-${icon}-symbolic` : 'audio-volume-muted-symbolic';
          self.tooltip_text = `Volume ${Math.floor(vol)}%`;
        }),
      ],
    }),
  });
