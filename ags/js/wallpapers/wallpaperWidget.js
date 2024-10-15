import wallpapers from "../services/wallpaperService.js";
import options from "../options.js";


const wallpaperItem = (file) =>
  Widget.Button({
    vexpand: true,
    class_name: "wallpaperButton",
    cursor: "pointer",
    onClicked: () => (wallpapers.wallpaper = file),
    child: Widget.Box({
      class_name: "wallpaperImage",
      css: `
            min-width:150px;
            min-height: 100px;
            background-image: url('${options.paths.cashdir}/${file}');
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            border-radius:10px;
        `,
    }),
  });

export default () => {
  const flowBox =  Widget.FlowBox({
    vpack: "start",
    hpack: "start",
    minChildrenPerLine: 5,
    setup(self) {
      wallpapers.wallpapers.forEach(path => self.add(wallpaperItem(path)));
    },
  });
  return Widget.Scrollable({
    class_name: "scrollable",
    vscroll: "always",
    hscroll: "never",
    child: flowBox,
  });
};
