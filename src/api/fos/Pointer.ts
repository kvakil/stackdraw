import FrameObject from '../FrameObject';

export default class Pointer implements FrameObject {
    location: number;
    label: string;
    to: number;

    constructor(location: number, label: string, to: number) {
        this.location = location;
        this.label = label;
        this.to = to;
    }
}
