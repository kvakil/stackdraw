import FrameObject from '../FrameObject';

/**
 * Describes a frames "caption".
 */
export default class Caption implements FrameObject {
    /** The caption of the frame. */
    caption: string;

    /**
     * Creates a caption from a string.
     * 
     * @param caption the string to set the caption to.
     */
    constructor(caption: string) {
        this.caption = caption;
    }
}
