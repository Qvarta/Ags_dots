const audio = await Service.import('audio')

export default () =>
  Widget.Button({
    className: "volume",
    onPrimaryClick: () => {
      App.toggleWindow("control_panel");
    },
    onSecondaryClick: () => {
      audio.speaker.isMuted = !audio.speaker.isMuted;
    },
    onScrollUp: () => {
      audio.speaker.volume += 0.05;
    },
    onScrollDown: () => {
      audio.speaker.volume -= 0.05;
    },
    child: Widget.Box({
      vpack: "fill",
      children: [
        Widget.Icon().hook(audio.speaker, (self) => {
          const vol = audio.speaker.volume * 100;
          let isMuted = audio.speaker.isMuted;
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
