import Battery from "./Battery.js";
import Network from "./Network.js";
import Bluetooth from "./Bluetooth.js";
import Volume from "./Volume.js";
import Micro from "./Micro.js";
import Update from "./Update.js";
import Notifications  from "./notifcations.js";

export default () =>
  Widget.EventBox({
    className: "trayContainer",
    onPrimaryClick: () => App.toggleWindow("control_panel"),
    child: Widget.Box({
      className: "bar_module left",
      spacing: 10,
      children: [Notifications(), Battery(), Network(), Bluetooth(), Micro(), Volume(), Update()],
    })
  });
