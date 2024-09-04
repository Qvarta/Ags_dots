import updates from "../services/updateService.js";
import PopupWindow from "../util/PopupWindow.js";
import { get_package_info } from "../util/My_util.js";

export const p_name = Variable("none");
export const p_size = Variable("none");
export const p_description = Variable("none");

const WINDOW_NAME = "info";

export const Title = () => {
  return Widget.Box({
    class_name: "title",
    hexpand: true,
    child: Widget.Box({
      spacing: 10,
      children: [
        Widget.Label({ label: "Name", class_name: "max-width", xalign: 0 }),
        Widget.Label({ label: "Arch", class_name: "min-width", xalign: 0 }),
        Widget.Label({ label: "Version", class_name: "max-width", xalign: 0 }),
        Widget.Label({ label: "Repository", hpack: "center" }),
      ],
    }),
  });
};
export const Footer = () =>
  Widget.Box({
    class_name: "footer",
    hexpand: true,
    child: Widget.Label({
      label: updates
        .bind("updates")
        .transform((updates) => updates.length + " updates available"),
      hpack: "center",
    }),
  });
const updateItem = (item) => {
  const update = (package_name) => {
    get_package_info(package_name)
      .then((result) => {
        const json_data = JSON.parse(result);
        p_name.value = json_data.name;
        p_size.value = json_data.size;
        p_description.value = json_data.description;
        App.openWindow(WINDOW_NAME);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return Widget.Button({
    class_name: "updates_item",
    on_clicked: () => update(item.name),
    hexpand: true,
    child: Widget.Box({
      spacing: 10,
      children: [
        Widget.Label({ label: item.name, class_name: "max-width", xalign: 0, maxWidthChars: 25,
          wrap: true, }),
        Widget.Label({ label: item.arch, class_name: "min-width", xalign: 0 }),
        Widget.Label({
          label: item.version,
          class_name: "max-width",
          xalign: 0,
        }),
        Widget.Label({ label: item.repository }),
      ],
    }),
  });
};

export const UpdatesWidget = () =>
  Widget.Scrollable({
    class_name: "scrollable",
    vscroll: "always",
    hscroll: "never",
    child: Widget.Box({
      vertical: true,
      children: updates
        .bind("updates")
        .as((jsonData) => jsonData.map((update) => updateItem(update))),
    }),
  });

