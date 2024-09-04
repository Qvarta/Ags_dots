import { time } from "../../util/My_util.js";
const ClockLabel = ({ format = "%H:%M", ...props } = {}) =>
  Widget.Label({
    className: "clock",
    label: time.bind().transform((t) => t.format(format) || "wrong format"),
    ...props,
  });


export default () =>
  Widget.Button({
    className: "clockBtn",
    cursor: "pointer",
    onClicked: () => {
      App.toggleWindow("calendar");
    },
    child: ClockLabel(),
  });
  
