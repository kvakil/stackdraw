interface Renderer {
    /**
     * Change an object `id` to have the gives properties in the current frame.
     * 
     * If the object does not exist, it is created. If this behavior is not
     * desired, existence can be checked with {@link exists}.
     * 
     * The effect of the `props` dictionary depends on the implementation.
     * Invalid properties will be ignored, {@link isValidProperty} can be used
     * to check if the given property is valid. Every concrete implementation
     * should document properties and their effects.
     *
     * @param {string} id - the id of the object.
     * @param {object} props - the properties to set.
     */
    change(id: string, props: {[prop: string]: {}}): void;
    
    /**
     * Checks if the given property is valid for the concrete Renderer.
     * 
     * @param {string} prop - the property's name.
     * @returns {boolean} true if the property is valid.
     */
    isValidProperty(prop: string): boolean;

    /**
     * Remove the object with the given `id` from the current frame.
     * If the object does not exist, nothing happens. If this behavior is not
     * desired, existence can be checked with {@link exists}.
     *
     * @param {string} id - the id of the object to check
     */
    remove(id: string): void;

    /**
     * Checks if the object `id` exists in the current frame.
     * 
     * @param {string} id - the id of the object to check.
     * @return {boolean} true if the object exists.
     */
    exists(id: string): boolean;
   
    /**
     * Export the current frame to a data URI.
     * 
     * @return {string} a valid data URI representing the current frame.
     */
    export(): string;

    /**
     * Export all frames to a data URI. Implementations should ensure that this
     * is visually similar to calling {@link export} on each frame and then
     * stitching the resulting frames together.
     * 
     * @return {string} a valid data URI representing all frames.
     */
    exportAll(): string;

    /**
     * Adds a new frame.
     */
    newFrame(): void;

    /**
     * Adds a new frame, whose content is the same as the current frame.
     */
    newFrameFromLast(): void;

    /**
     * Sets the active frame to the given frame number.
     * 
     * If the given frame number is not a valid frame number, the behavior is
     * left undefined and may cause an error. {@link getFrameCount} can be
     * used to check if the frame number is valid.
     * 
     * @param {number} n - the frame number to set as active.
     */
    setActiveFrame(n: number): void;

    /**
     * Returns the number of frames. This includes the last frame, which might
     * not have been finalized yet.
     * 
     * @returns {number} the number of frames
     */
    getFrameCount(): number;
}
