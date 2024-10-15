import icons from '../../util/icons.js';
const bluetooth = await Service.import('bluetooth')

export default () =>
    Widget.Icon({
        class_name: 'bluetooth',
        visible: bluetooth.bind("enabled").as(enabled => enabled ? true : false),
        icon: icons.bluetooth.enabled,
    });