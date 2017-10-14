import FrameObject from '../FrameObject';

/**
 * Describes an item on the stack.
 */
export default class StackItem implements FrameObject {
    /**
     * The location of this item, relative to others. Lower locations
     * appear higher on the stack.
     */
    location: number;
    /**
     * The label, which appears inside the stack.
     */
    label: string;

    /**
     * Creates a new StackItem with a location and label.
     * 
     * @param location relative location of the item. 
     * @param label label which appears on the stack frame.
     */
    constructor(location: number, label: string) {
        this.location = location;
        this.label = label;
    }
}
