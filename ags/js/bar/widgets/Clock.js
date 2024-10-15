import { time} from "../../util/functions/variableUtils.js";
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
    onPrimaryClick: () => {
      App.toggleWindow("calendar");
    },
    onSecondaryClick: () => {},
    child: ClockLabel(),
  });