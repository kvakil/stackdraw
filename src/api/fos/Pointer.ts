import FrameObject from '../FrameObject';

/**
 * A pointer from one location on the stack to another.
 */
export default class Pointer implements FrameObject {
    /**
     * Location of the pointer, relative to other stack items.
     */
    location: number;

    /**
     * Label to be displayed with the pointer.
     */
    label: string;

    /**
     * The location that the pointer points to. It is expected that
     * a {@link StackItem} exists at this location.
     */
    to: number;

    /**
     * Creates a pointers with the given parameters.
     * 
     * @param location the location of the pointer.
     * @param label the label on the pointer.
     * @param to the location the pointer points to.
     */
    constructor(location: number, label: string, to: number) {
        this.location = location;
        this.label = label;
        this.to = to;
    }
}
