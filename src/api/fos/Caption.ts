import FrameObject from '../FrameObject';

export default class Caption implements FrameObject {
    caption: string;

    constructor(caption: string) {
        this.caption = caption;
    }
}
