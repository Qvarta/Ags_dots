import icons from "./../icons.js";

const opened = Variable("");

// App.connect("window-toggled", (_, name, visible) => {
//   if (name === "control_panel" && !visible)
//     Utils.timeout(500, () => opened.value = "")
// })

export const Arrow = (name, disableIcon, text, activate) => {
  let deg = 0;
  let iconOpened = false;
  const icon = Widget.Icon(icons.ui.arrow.right).hook(opened, () => {
    if (
      (opened.value === name && !iconOpened) ||
      (opened.value !== name && iconOpened)
    ) {
      const step = opened.value === name ? 10 : -10;
      iconOpened = !iconOpened;
      for (let i = 0; i < 9; ++i) {
        Utils.timeout(15 * i, () => {
          deg += step;
          icon.setCss(`-gtk-icon-transform: rotate(${deg}deg);`);
        });
      }
    }
  });
  return Widget.Button({
    child: disableIcon ? Widget.Label({ label: text }) : icon,
    class_name: "arrow",
    on_clicked: () => {
      opened.value = opened.value === name ? "" : name;
      if (typeof activate === "function") activate();
    },
  });
};

export const ToggleButton = ({ name, content }) =>
  Widget.Button({
    class_name: "toggle_button",
    child: content,
    on_clicked: () => {
      opened.value = opened.value === name ? "" : name;
    },
  });
export const ArrowToggleButton = ({
  name,
  icon,
  label,
  activate,
  deactivate,
  activateOnArrow = true,
  connection: [service, condition],
}) =>
  Widget.Box({
    class_name: "toggle-button",
    children: [
      Widget.Button({
        setup: (self) =>
          self.hook(service, () => {
            self.toggleClassName("active", condition());
          }),
        child: Widget.Box({
          hexpand: true,
          children: [
            Widget.Icon({
              class_name: "icon",
              icon,
            }),
            Widget.Label({
              class_name: "label",
              max_width_chars: 10,
              truncate: "end",
              label,
            }),
          ],
        }),
        on_clicked: () => {
          if (condition()) {
            deactivate();
            if (opened.value === name) opened.value = "";
          } else {
            activate();
          }
        },
      }),
      Arrow(name, false, "", activateOnArrow && activate),
    ],
  });
export const Menu = ({ title_content, name, main_content }) =>
  Widget.Revealer({
    transitionDuration: 1000,
    transition: "slide_down",
    reveal_child: opened.bind().as((v) => v === name),
    child: Widget.Box({
      class_names: ["menu", name],
      vertical: true,
      children: [
        Widget.Box({
          class_name: "title-box",
          hpack: "end",
          children: title_content,
        }),
        Widget.Box({
          vertical: true,
          class_name: "main_content",
          children: main_content,
        }),
      ],
    }),
  });
export const Row = (toggles = [], menus = []) =>
  Widget.Box({
    vertical: true,
    children: [
      Widget.Box({
        homogeneous: true,
        spacing: 10,
        children: toggles.map((w) => w()),
      }),
      ...menus.map((w) => w()),
    ],
  });
