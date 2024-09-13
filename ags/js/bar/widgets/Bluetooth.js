import icons from '../../util/icons.js';
import {Bluetooth } from '../../import.js';

export default () =>
    Widget.Icon({
        class_name: 'bluetooth',
        visible: Bluetooth.bind("enabled").as(enabled => enabled ? true : false),
        icon: icons.bluetooth.enabled,
    });