const audio = await Service.import('audio')
import icons from '../../util/icons.js';

export default () =>
    Widget.Icon({
        className: 'micro',
        visible: audio.microphone.bind("is_muted").as(isMuted => isMuted ? false : true),

        icon: audio.microphone.bind("is_muted").as(isMuted => isMuted ? icons.audio.microphone.muted : icons.audio.microphone.high),
    });