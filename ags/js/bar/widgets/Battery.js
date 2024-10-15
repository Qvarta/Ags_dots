const battery = await Service.import('battery')
  const BatteryPercent = () =>
    Widget.Icon().hook(
      battery,
      (self) => {
        self.class_name = battery.charging ? "charging" : "";
        self.icon = battery.icon_name;
        self.tooltip_text = battery.charging ? `Charging: ${battery.percent}%`: `Battery: ${battery.percent}%`;
        self.visible = battery.available;
      },
      "changed"
    );
  
  export default () =>
    Widget.Box({
      child: BatteryPercent(),
    });
  