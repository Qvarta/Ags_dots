import colorpicker from "../../services/colorService.js";

export const pickerBtn = () =>
  Widget.Button({
    class_name: "panelBtn",
    on_primary_click: () => colorpicker.pick_color(),
    child: Widget.Box({
      spacing: 10,
      children: [
        Widget.Icon("color-picker-symbolic"),
        Widget.Label({
          label: "Color picker",
          hexpand: true,
          xalign: 0,
        }),
      ],
    }),
  });
export const colors = () => Widget.Box({
  class_name: "color_picker",
  children: colorpicker.bind("colors").as((colors) =>
    colors.map((color) =>
      Widget.Button({
        css:`* {background-color: ${color};}`,
        class_name: "colorBtn",
        on_primary_click: () => colorpicker.to_clipboard = color,
        on_secondary_click: () => colorpicker.remove = color,
      })
    )
  ),
});

