import { Audio } from '../../import.js';
import icons from '../../util/icons.js';

export default () =>
    Widget.Icon({
        className: 'micro',
        visible: Audio.microphone.bind("is_muted").as(isMuted => isMuted ? false : true),

        icon: Audio.microphone.bind("is_muted").as(isMuted => isMuted ? icons.audio.microphone.muted : icons.audio.microphone.high),
    });