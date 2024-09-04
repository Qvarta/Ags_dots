import { Widget} from "../import.js";
import options from "../options.js";
import Wallpapers from "../services/appearanceService.js";

const wallpaperItem = (file) => {
  return Widget.Button({
    vexpand: true,
    class_name: "wallpaperButton",
    cursor: "pointer",
    onClicked: () => (Wallpapers.wallpaper = file),
    child: Widget.Box({
      class_name: "wallpaperImage",
      css: `
            min-width:150px;
            min-height: 100px;
            background-image: url('${options.paths.thumbnails}${file}');
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            border-radius:10px;
        `,
    }),
  });
};

export  default () =>
  Widget.Scrollable({
    class_name: "scrollable",
    vscroll: "always",
    hscroll: "never",
    child: Widget.FlowBox({
      vpack: "center",
      hpack: "center",
      minChildrenPerLine: 5,
      setup(self) {
        Wallpapers.listWallpapers.forEach(path => self.add(wallpaperItem(path)));
      },
    }),
  });

