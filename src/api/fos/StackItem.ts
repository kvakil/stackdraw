import FrameObject from '../FrameObject';

export default class StackItem implements FrameObject {
    kind: string = typeof this;
    location: number;
    label: string;
}
