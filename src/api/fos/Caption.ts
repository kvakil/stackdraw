import FrameObject from '../FrameObject';

export default class Caption implements FrameObject {
    kind: string = typeof this;
    caption: string;
}
