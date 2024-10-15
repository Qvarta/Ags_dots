import Notification from "../../notifications/Notification.js"
import { ToggleButton, Menu, Row } from "../../util/Widgets/ToggleButton.js";

import options from "../../options.js"

const notifications = await Service.import("notifications")

const Animated = (n) => Widget.Revealer({
  transition_duration: options.transition.duration,
  transition: "slide_down",
  child: Notification(n),
  setup: self => Utils.timeout(options.transition.duration, () => {
    if (!self.is_destroyed)
      self.reveal_child = true
  }),
})

const ClearButton = () =>
  Widget.Button({
    onPrimaryClick: () => notifications.clear(),
    child: Widget.Box({
      children: [Widget.Label("Clear "), Widget.Icon({icon:"user-trash-symbolic", size: 22})],
    }),
    visible: notifications.bind("notifications").transform((n) => n.length > 0),
  });
const Header = () =>
  Widget.Box({
    className: "header",
    children: [
      ToggleButton({
        name: "notify_center",
        content: Widget.Box({
          hpack: "start",
          spacing: 10,
          children: [
            Widget.Icon({icon:"mail-unread-symbolic", size: 22}),
            Widget.Label({
              label: notifications.bind("notifications").transform((n) => `${n.length}`),
            }),
          ],
        }),
      }),
      Widget.Label({hexpand:true}),
      ClearButton(),
    ],
  });

const NotificationList = () => {
  const map = new Map
  const box = Widget.Box({
    vertical: true,
    children: notifications.notifications.map(n => {
      const w = Animated(n)
      map.set(n.id, w)
      return w
    }),
    visible: notifications.bind("notifications").as(n => n.length > 0),
  })

  function remove(_, id) {
    const n = map.get(id)
    if (n) {
      n.reveal_child = false
      Utils.timeout(options.transition.duration, () => {
        n.destroy()
        map.delete(id)
      })
    }
  }

  return box
    .hook(notifications, remove, "closed")
    .hook(notifications, (_, id) => {
      if (id !== undefined) {
        if (map.has(id))
          remove(null, id)

        const n = notifications.getNotification(id)
        const w = Animated(n)
        map.set(id, w)
        box.children = [w, ...box.children]
      }
    }, "notified")
}

const Placeholder = () =>
  Widget.Label({
    vpack: "center",
    hpack: "center",
    vexpand: true,
    label: "No notifications",
    visible: notifications.bind("notifications").transform((n) => n.length === 0),
  });

const notificationsScolable = () =>Menu({
  name: "notify_center",
  title_content: [],
  main_content: [
    Placeholder(),
    Widget.Scrollable({
      class_name: "notify_container",
      vscroll: "always",
      hscroll: "never",
      vexpand: true,
      child: NotificationList(),
      visible: notifications.bind("notifications").transform((n) => n.length > 0),
    }),
  ],
});


export default () =>
  Widget.Box({
    class_name: "notification_widget",
    vertical: true,
    children: [Row([Header],[notificationsScolable])]
    });
