import settings from "../services/settingsServise.js";
import themes from "../services/themesService.js";
import Page1 from "./widgets/page1.js";
import Page2 from "./widgets/page2.js";

const WINDOW_NAME = "settings";
const pageNumber = Variable("Page1");

const Header = () =>
  Widget.Box({
    class_name: "header",
    spacing: 10,
    children: [
      Widget.Separator({
        hexpand: true,
        css: "background-color: transparent;",
      }),
      Widget.Button({
        onPrimaryClick: () => {
          pageNumber.value = "Page1";
        },
        child: Widget.Icon({
          class_name: pageNumber
            .bind()
            .transform((p) => (p === "Page1" ? "blue" : "")),
          icon: pageNumber
            .bind()
            .transform((p) =>
              p === "Page1" ? "radio-checked-symbolic" : "pan-end-symbolic-rtl"
            ),
            size: 20,
          }),
      }),
      Widget.Button({
        onPrimaryClick: () => {
          pageNumber.value = "Page2";
        },
        child: Widget.Icon({
          class_name: pageNumber
            .bind()
            .transform((p) => (p === "Page2" ? "blue" : "")),

          icon: pageNumber
            .bind()
            .transform((p) =>
              p === "Page2" ? "radio-checked-symbolic" : "pan-end-symbolic"
            ),
          size: 20,
        }),
      }),
    ],
  });
const Footer = () =>
  Widget.Box({
    hexpand: true,
    class_name: "footer",
    spacing: 10,
    children: [
      Widget.Button({
        class_name: "saveBtn",
        onPrimaryClick: () => {
          App.closeWindow("settings");
          settings.save();
          setTimeout(function() {
            themes.changeTheme();
          }, 1000); 
        },
        child: Widget.Label("Save"),
      }),
      Widget.Button({
        class_name: "saveBtn",
        onPrimaryClick: () => {
          App.closeWindow("settings");
        },
        child: Widget.Label("Close"),
      }),
    ],
  });
const Middle = () =>
  Widget.Box({
    class_name: "middle",
    child: Widget.Stack({
      children: {
        Page1: Page1(),
        Page2: Page2(),
      },
      shown: pageNumber.bind(),
      transition: "over_left_right",
    }),
  });
export default () =>
  Widget.Window({
    name: WINDOW_NAME,
    css: "background-color: transparent;",
    exclusivity: "normal",
    keymode: "on-demand",
    // visible: settings.bind('settings').transform((n) => n.showOnStart),
    visible: false,
    layer: "overlay",
    child: Widget.Box({
      class_name: "settings",
      vertical: true,
      children: [Header(), Middle(), Footer()],
    }),
    setup: (self) => {
      self.keybind("Escape", () => App.closeWindow(WINDOW_NAME));
    },
  });
