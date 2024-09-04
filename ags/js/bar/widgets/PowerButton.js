import icons from "../../util/icons.js";


export default () =>
  Widget.Button({
    onClicked: () => App.toggleWindow("powermenu"),
    className: "bar_module right red",
    cursor: "pointer",
    child: Widget.Icon({
      className: "icon",
      icon: icons.powermenu.shutdown,
    }),
  });
