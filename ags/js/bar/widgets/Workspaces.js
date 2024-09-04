import { Hyprland, Widget } from "../../import.js";

const ws = 7;
const dispatch = (ws) => Hyprland.messageAsync(`dispatch workspace ${ws}`);

const Workspaces = (ws) =>
  Widget.Box({
    spacing: 10,
    children: Array.from({ length: ws }, (_, i) => i + 1).map((i) =>
      Widget.Button({
        attribute: i,
        vpack: "center",
        onClicked: () => dispatch(i),
        setup: (self) =>
          self.hook(Hyprland, () => {
            self.toggleClassName("active", Hyprland.active.workspace.id === i);
            self.toggleClassName("occupied",(Hyprland.getWorkspace(i)?.windows || 0) > 0);
          }),
      })
    ),
  });
export default () =>
  Widget.EventBox({
    onScrollUp: () => dispatch("+1"),
    onScrollDown: () => dispatch("-1"),
    child: Workspaces(ws),
  });
