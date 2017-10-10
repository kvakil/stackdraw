import FrameObject from '../FrameObject';

export default class Pointer implements FrameObject {
    kind: string = typeof this;
    location: number;
    label: string;
    to: number;
}
