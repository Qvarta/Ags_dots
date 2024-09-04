import Notification from "./Notification.js"
import options from "../options.js"

const notifications = await Service.import("notifications")
const { timeout, idle } = Utils

function Animated(id) {
  const n = notifications.getNotification(id)
  const widget = Notification(n)

  const inner = Widget.Revealer({
    css: "border: 1px solid magenta;",
    transition: "slide_down",
    transition_duration: options.transition.duration,
    child: widget,
  })

  const outer = Widget.Revealer({
    css: "border: 1px solid yellow;",
    transition: "slide_up",
    transition_duration: options.transition.duration,
    child: inner,
  })

  const box = Widget.Box({
    hpack: "end",
    child: outer,
  })

  idle(() => {
    outer.reveal_child = true
    timeout(options.transition.duration, () => {
      inner.reveal_child = true
    })
  })

  return Object.assign(box, {
    dismiss() {
      inner.reveal_child = false
      timeout(options.transition.duration, () => {
        outer.reveal_child = false
        timeout(options.transition.duration, () => {
          box.destroy()
        })
      })
    },
  })
}

function PopupList() {
  const map = new Map
  const box = Widget.Box({
    hpack: "end",
    vertical: true,
    css: `min-width: 440px;`,
  })

  function remove(_, id) {
    map.get(id)?.dismiss()
    map.delete(id)
  }

  return box
    .hook(notifications, (_, id) => {
      if (id !== undefined) {
        if (map.has(id))
          remove(null, id)

        if (notifications.dnd)
          return

        const w = Animated(id)
        map.set(id, w)
        box.children = [w, ...box.children]
      }
    }, "notified")
    .hook(notifications, remove, "dismissed")
    .hook(notifications, remove, "closed")
}

export default (monitor=0) => Widget.Window({
  monitor,
  name: `notifications${monitor}`,
  anchor: ["top"],
  layer: "top",
  class_name: "notifications",
  child: Widget.Box({
    css: "padding: 2px;",
    child: PopupList(),
  }),
})
