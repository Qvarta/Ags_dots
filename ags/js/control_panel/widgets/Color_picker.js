import colorpicker from "../../services/colorService.js"


const css = (color) => `
* {
    background-color: ${color};
    min-height: 40px;
    min-width: 40px;
    margin: 5px;
    border-radius: 10px;
}
`

export const colorPicker = () => {
    const colors = Widget.Box({
      children: colorpicker.bind("colors").as(colors => colors.map(color => Widget.Button({
        css: css(color),
        class_name: "colorBtn",
        on_primary_click: () => colorpicker.to_clipboard(color),
        on_secondary_click: () => colorpicker.colors = [],
      }))),
      
    })
    return Widget.Box({
        class_name: "color_picker",
        spacing: 5,
        vertical: true,
        children: [
          Widget.Box({
            children: [
              Widget.Label({ label: "Color picker:", hexpand: true, xalign: 0 }),
              Widget.Button({
                class_name: "pickerBtn",
                on_primary_click: () => colorpicker.pick_color(),
                child: Widget.Icon({
                  icon: "color-picker-symbolic",
                  size: 22,
                  hpack: "center",
                }),
              }),
            ],
          }),
          Widget.Box({
            visible: colorpicker.bind("colors").as(colors => colors.length > 0),
            child: colors,
          }),
        ]

      })
};