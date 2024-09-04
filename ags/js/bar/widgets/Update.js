import Updates from "../../services/updateService.js";

export default () =>
  Widget.Button({
    visible: Updates.bind("updates").as((updates) => updates.length > 0),
    on_primary_click: () => App.toggleWindow("control_panel"),
    on_secondary_click: () => App.toggleWindow("updates"),
    cursor: "pointer",
    tooltip_text: Updates.bind("updates").transform((updates) => updates.length + " updates available"),
    child: Widget.Icon({ icon: "dialog-warning-symbolic" }),
  });

