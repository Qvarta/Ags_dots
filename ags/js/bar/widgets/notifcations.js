const notifications = await Service.import("notifications")


export default () =>  Widget.Box({
    visible: notifications.bind("notifications").transform((n) => n.length > 0),
    child: Widget.Icon("mail-unread-symbolic"),
    tooltip_text: notifications.bind("notifications").transform((n) => `${n.length} notifications`),
  });