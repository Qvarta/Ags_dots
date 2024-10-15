import updates from "../services/updateService.js";

const WINDOW_NAME = "info";

export const Title = () => {
  return Widget.Box({
    class_name: "title",
    hexpand: true,
    child: Widget.Box({
      spacing: 10,
      children: [
        Widget.Label({ label: "Name", class_name: "max-width"}),
        Widget.Label({ label: "Version", class_name: "max-width"}),
        Widget.Label({ label: "Repository", hpack: "center" }),
      ],
    }),
  });
};
export const Footer = () =>
  Widget.Box({
    class_name: "footer",
    hexpand: true,
    children:[Widget.Label({
      label: updates
        .bind("updates")
        .transform((updates) => updates.length + " updates available"),
      hpack: "center",
    }),
    Widget.Separator({hexpand: true, css:"background-color: transparent;"}),
    Widget.Button({
      class_name: "button",
      on_clicked: () => {
        App.closeWindow('updates');
        updates._update();
      },
      child: Widget.Label({ label: "Update", hpack: "center" }),
    })], 
  });
const updateItem = (item) => {
  return Widget.Button({
    class_name: "updates_item",
    on_clicked: () => {
      updates.info = item.name;
      updates.reset = "";
      App.openWindow(WINDOW_NAME);
    },
    hexpand: true,
    child: Widget.Box({
      spacing: 10,
      children: [
        Widget.Label({ 
          label: item.name, 
          class_name: "max-width", 
          xalign: 0, 
          maxWidthChars: 20,
          truncate: "end",
          wrap: true, 
          tooltip_text: item.name
        }),
        Widget.Label({
          label: item.version,
          class_name: "max-width",
          maxWidthChars: 15,
          truncate: "end",
          wrap: true,
        }),
        Widget.Label({ 
          label: item.repository,
          maxWidthChars: 20,
          truncate: "end",
          wrap: true,
          tooltip_text: item.repository,
         }),
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
      children: updates.bind("updates").as((jsonData) => jsonData.map((update) => updateItem(update))),
    }),
  });

