
  export default () =>
    Widget.Button({
      onClicked: () => App.toggleWindow("launcher"),
      className: "bar_module left",
      cursor: "pointer",
      child: Widget.Icon({
        className: "icon",
        icon: "fedorasettings-symbolic",
        size: 18,
      }),
    });