import Frame from '../Frame';

export default abstract class Renderer {
    /**
     * Export the given frame to a data URI.
     * 
     * @return {string} a valid data URI representing the given frame.
     * @return {Error[]} any errors that occurred.
     */
    abstract export(frame: Frame): {dataURI: string, errors: Error[]};

    /**
     * Export all frames to a data URI. Implementations should ensure that this
     * is visually similar to calling {@link export} on each frame and then
     * stitching the resulting frames together.
     * 
     * @param {Frame[]} frames - all the frames to export.
     * @return {string} a valid data URI representing all frames.
     * @return {Error[]} any errors that occurred.
     */
    abstract exportAll(frames: Frame[]): {dataURI: string, errors: Error[]};
}
