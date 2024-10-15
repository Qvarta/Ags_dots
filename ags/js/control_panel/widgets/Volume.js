import { Arrow } from "../../util/Widgets/ToggleButton.js";
import icons from "../../util/icons.js";
// import { Widget, Audio } from "../../import.js";
import {isInstalled} from "../../util/functions/systemUtils.js";
const audio = await Service.import('audio')

const VolumeIndicator = (type = "speaker") =>
  Widget.Button({
    class_name: "volume-indicator",
    vpack: "center",
    on_primary_click: () => (audio[type].is_muted = !audio[type].is_muted),
    on_secondary_click: () => {
      if(!isInstalled("pavucontrol")) {
        return;
      } else {
        App.toggleWindow("control_panel");
        Utils.execAsync(["bash", "-c", "pavucontrol"]);
      }
    },
    child: Widget.Icon({
      icon: audio[type].bind("is_muted").as((isMuted) =>isMuted ? icons.audio[type].muted : icons.audio[type].high),
      tooltipText: audio[type].bind("volume").as((vol) => `Volume: ${Math.floor(vol * 100)}%`),
    }),
  });
const VolumeSlider = (type = "speaker") =>
  Widget.Slider({
    hexpand: true,
    draw_value: false,
    on_change: ({ value }) => (audio[type].volume = value),
    value: audio[type].bind("volume"),
  });
const PercentLabel = (type = "speaker") =>
  Widget.Label({ class_name: "label-percent" }).hook(audio, (label) => {
    if (audio[type]) label.label = `${Math.floor(audio[type].volume * 100)}%`;
  });
export const Volume = () =>
  Widget.Box({
    class_name: "sliderContainer",
    children: [
      VolumeIndicator("speaker"),
      VolumeSlider("speaker"),
      PercentLabel("speaker"),
      Widget.Box({
        vpack: "center",
        hpack: "end",
        child: Arrow("audio"),
      }),
    ],
  });
export const Microphone = () =>
  Widget.Box({
    class_name: "sliderContainer",
    children: [
      VolumeIndicator("microphone"),
      VolumeSlider("microphone"),
      PercentLabel("microphone"),
    ],
  });


