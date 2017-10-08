import { Frame } from './Frame';

export default abstract class Renderer {
    private validProperties: Set<String>;

    constructor(validProperties: Set<String>) {
        this.validProperties = validProperties;
    }

    /**
     * Checks if the given property is valid for the concrete Renderer.
     * 
     * @param {string} prop - the property's name.
     * @returns {boolean} true if the property is valid.
     */
    isValidProperty(prop: string): boolean {
        return prop in this.validProperties;
    }

    /**
     * Export the given frame to a data URI.
     * 
     * @return {string} a valid data URI representing the given frame.
     */
    abstract export(frame: Frame): string;

    /**
     * Export all frames to a data URI. Implementations should ensure that this
     * is visually similar to calling {@link export} on each frame and then
     * stitching the resulting frames together.
     * 
     * @return {string} a valid data URI representing all frames.
     */
    abstract exportAll(frames: Frame[]): string;    
}
