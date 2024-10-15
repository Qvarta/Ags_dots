const hyprland = await Service.import('hyprland')
import settings from "../../services/settingsServise.js";


const dispatch = (ws) => hyprland.messageAsync(`dispatch workspace ${ws}`);

const Workspaces = (ws) =>
  Widget.Box({
    spacing: 10,
    children: Array.from({ length: ws }, (_, i) => i + 1).map((i) =>
      Widget.Button({
        attribute: i,
        vpack: "center",
        onClicked: () => dispatch(i),
        child: Widget.Label({
          css: "font-size: 10px;",
          label: i.toString(),
        }),
        setup: (self) =>
          self.hook(hyprland, () => {
            self.toggleClassName("active", hyprland.active.workspace.id === i);
            self.toggleClassName("occupied",(hyprland.getWorkspace(i)?.windows || 0) > 0);
          }),
      })
    ),
  });
export default () =>
  Widget.EventBox({
    onScrollUp: () => dispatch("+1"),
    onScrollDown: () => dispatch("-1"),
    setup: (self) => {
      self.hook(settings, () => {
        self.child = Workspaces(settings.settings.workspasesNumber);
      });
    },
  });
