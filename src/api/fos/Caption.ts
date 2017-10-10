import FrameObject from '../FrameObject';

export default class Caption implements FrameObject {
    constructor(caption: string) {
        this.caption = caption;
    }
    caption: string;
}
