import { Arrow } from "../../util/ToggleButton.js";
import icons from "../../util/icons.js";
import { Widget, Audio } from "../../import.js";
import {checkProgramInstalled} from "../../util/My_util.js";

const VolumeIndicator = (type = "speaker") =>
  Widget.Button({
    class_name: "volume-indicator",
    vpack: "center",
    on_primary_click: () => (Audio[type].is_muted = !Audio[type].is_muted),
    on_secondary_click: () => {
      if(!checkProgramInstalled("pavucontrol")) {
        return;
      } else {
        App.toggleWindow("control_panel");
        Utils.execAsync(["bash", "-c", "pavucontrol"]);
      }
    },
    child: Widget.Icon({
      icon: Audio[type].bind("is_muted").as((isMuted) =>isMuted ? icons.audio[type].muted : icons.audio[type].high),
      tooltipText: Audio[type].bind("volume").as((vol) => `Volume: ${Math.floor(vol * 100)}%`),
    }),
  });
const VolumeSlider = (type = "speaker") =>
  Widget.Slider({
    hexpand: true,
    draw_value: false,
    on_change: ({ value }) => (Audio[type].volume = value),
    value: Audio[type].bind("volume"),
  });
const PercentLabel = (type = "speaker") =>
  Widget.Label({ class_name: "label-percent" }).hook(Audio, (label) => {
    if (Audio[type]) label.label = `${Math.floor(Audio[type].volume * 100)}%`;
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


