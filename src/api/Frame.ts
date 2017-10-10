import FrameObject from './FrameObject';

/**
 * Describes the objects in the current scene.
 */
export default class Frame {
    private objects: {[id: string]: FrameObject};

    /**
     * Change an object `id` equal to the FrameObject the given frame.
     * 
     * If the object does not exist, it is created. If this behavior is not
     * desired, existence can be checked with {@link exists}.
     * 
     * The effect of the `props` dictionary depends on the Renderer.
     * Invalid properties will be ignored by the renderer, although no error
     * will occur when adding to the frame. Every concrete implementation
     * should document properties and their effects.
     *
     * @param {string} id - the id of the object.
     * @param {object} props - the FrameObject to set.
     */
    change(id: string, props: FrameObject): void {
        this.objects[id] = props;
    }

    /**
     * Remove the object with the given `id` from the current frame.
     * If the object does not exist, nothing happens. If this behavior is not
     * desired, existence can be checked with {@link Frame.exists}.
     *
     * @param {string} id - the id of the object to check
     */
    remove(id: string): void {
        delete this.objects[id];
    }
    
    /**
     * Checks if the object `id` exists in the current frame.
     * 
     * @param {string} id - the id of the object to check.
     * @return {boolean} true if the object exists.
     */
    exists(id: string): boolean {
        return id in this.objects;
    }

    /**
     * Outputs a map from ids to the objects.
     * 
     * @see Renderer
     * 
     * @return {Readonly<{[id: string]: Readonly<FrameObject>}>} map of id to objects
     */
    dump(): Readonly<{[id: string]: Readonly<FrameObject>}> {
        return this.objects;
    }
}
