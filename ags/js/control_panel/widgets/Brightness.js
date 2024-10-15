import icons from "../../util/icons.js"
import brightness from "../../services/brightnessService.js"


const PercentLabel = () =>
  Widget.Label({
    class_name: "label-percent",
    label: brightness.bind("screen").as(v =>`${Math.floor(v * 100)}%`),
  });
const BrightnessSlider = () => Widget.Slider({
  draw_value: false,
  hexpand: true,
  value: brightness.bind("screen"),
  on_change: ({ value }) => brightness.screen = value,
})
export const BrightnessIndicator = () => Widget.Button({
  vpack: "center",
  class_name: "volume-indicator",
  child: Widget.Icon(icons.brightness.indicator),
  on_clicked: () => brightness.screen = 0.5,
  tooltip_text: brightness.bind("screen").as(v =>
    `Screen Brightness: ${Math.floor(v * 100)}%`),
});
export default () =>
  Widget.Box({
    class_name: "sliderContainer",
    children: [
      BrightnessIndicator(),
      BrightnessSlider(),
      PercentLabel(),
    ],
  });