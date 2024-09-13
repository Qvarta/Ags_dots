import { distro } from "../../util/helpers.js";

  export default () =>
    Widget.Button({
      onClicked: () => App.toggleWindow("launcher"),
      className: "bar_module left",
      cursor: "pointer",
      child: Widget.Icon({
        className: "icon",
        icon: distro.logo,
        size: 20,
      }),
    });