import Gtk from "gi://Gtk";

declare global {
  namespace Gtk {
    interface FlowBox extends Gtk.Container {
      // Add FlowBox specific properties and methods here
    }
  }
}

// Определение FlowBoxProps
function FlowBoxProps(Child, Attr, Self) {
  return {
    child: Child,
    children: [Child],
    vertical: Boolean,
  };
}

// Функция newFlowBox
function newFlowBox(...props) {
  return new FlowBox(...props);
}

// Определение FlowBox
class FlowBox extends Gtk.FlowBox {
  static {
    Object.defineProperties(FlowBox.prototype, {
      vertical: {
        get: function () { return this.orientation === Gtk.Orientation.VERTICAL; },
        set: function (v) { this.orientation = v ? Gtk.Orientation.VERTICAL : Gtk.Orientation.HORIZONTAL; },
        configurable: true,
      },
      children: {
        get: function () { return this.get_children(); },
        set: function (children) {
          const newChildren = children || [];

          this.get_children()
            .filter(ch => !newChildren.includes(ch))
            .forEach(ch => ch.destroy());

          this.get_children()
            .forEach(ch => this.remove(ch));

          if (!children)
            return;

          children.forEach(w => w && this.add(w));
          this.notify('children');
          this.show_all();
        },
        configurable: true,
      },
    });
  }

  constructor(propsOrChildren, ...children) {
    const props = Array.isArray(propsOrChildren) ? {} : propsOrChildren;

    if (Array.isArray(propsOrChildren))
      props.children = propsOrChildren;

    else if (children.length > 0)
      props.children = children;

    super(props);
    this.connect('notify::orientation', () => this.notify('vertical'));
  }
}

export { FlowBoxProps, newFlowBox, FlowBox };