import FrameObject from '../FrameObject';

export default class StackItem implements FrameObject {
    location: number;
    label: string;

    constructor(location: number, label: string) {
        this.location = location;
        this.label = label;
    }
}
