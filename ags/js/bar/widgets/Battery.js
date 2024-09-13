import { Battery} from "../../import.js";

  const BatteryPercent = () =>
    Widget.Icon().hook(
      Battery,
      (self) => {
        self.class_name = Battery.charging ? "charging" : "";
        self.icon = Battery.icon_name;
        self.tooltip_text = Battery.charging ? `Charging: ${Battery.percent}%`: `Battery: ${Battery.percent}%`;
        self.visible = Battery.available;
      },
      "changed"
    );
  
  export default () =>
    Widget.Box({
      child: BatteryPercent(),
    });
  