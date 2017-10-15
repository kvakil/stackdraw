import Frame from '../../Frame';
import FrameObject from '../../FrameObject';
import Caption from '../../fos/Caption';
import StackItem from '../../fos/StackItem';
import { Glyph, TextCanvas } from './TextCanvas';

/**
 * This describes the current rendering state for plaintext rendering.
 * It does all the actual work of figuring out what needs to be drawn and where.
 */
class RendererState {
    /** An error for when multiple captions are set. */
    private static readonly TOO_MANY_CAPTIONS: string =
        'Too many captions: only one allowed.';
    
    /** Number of padding spaces to add around each stack element. */
    private static readonly EXTRA_SPACES = 2;

    /** Number of lines used by the caption. */
    private static readonly CAPTION_LINES = 1;

    /** Number of lines used by the header. */
    private static readonly HEADER_LINES = 1;
    
    /** An array of all the objects to render. */
    private frames: Frame[];

    /**
     * An array containing all errors encountered while rendering. 
     * 
     * @see getErrors
     * @see addError
     */
    private errors: Error[];

    /** The underlying canvas being drawn. */
    private canvas: TextCanvas;

    /** The width of the stack, determined by its largest item. */
    private stackWidth: number;

    /** The height of the stack, determined by its largest item. */
    private stackHeight: number;

    /**
     * Creates a new renderer with the given frames and no errors.
     * 
     * @param frames the frames to render.
     */
    constructor(frames: Frame[]) {
        this.frames = frames;
        this.errors = [];
        this.canvas = new TextCanvas();
        
        const items = this.getAllFrameObjects()
                          .filter((x: FrameObject): x is StackItem => x instanceof StackItem);
        this.stackWidth = Math.max(...items.map(fobj => fobj.label.length));
        this.stackHeight = Math.max(...items.map(fobj => fobj.location));
    }

    /**
     * Finalizes the renderer, returning a string representing the render.
     * 
     * @return {string} the resulting frame-by-frame plaintext render
     */
    finalize(): string[] {
        const renders: string[] = [];
        for (const frame of this.frames) {
            const objects = frame.getObjects();
            this.renderCaption(objects);
            this.renderStackLayout(objects);
            renders.push(this.canvas.toString());
            this.canvas = new TextCanvas();
        }
        return renders;
    }

    /**
     * Returns all errors which occured while rendering.
     * 
     * @return {Error[]} the errors which occured while rendering.
     */
    getErrors(): Error[] {
        return this.errors;
    }

    /**
     * Renders the caption as the first line on the canvas.
     * 
     * Adds an error if multiple captions are set.
     */
    private renderCaption(objects: FrameObject[]): void {
        const captions = objects.filter((x: FrameObject): x is Caption => x instanceof Caption);
        if (captions.length > 1) {
            this.addError(new Error(RendererState.TOO_MANY_CAPTIONS));
            return;
        } else if (captions.length === 0) {
            return;
        }
        const caption = captions[0].caption;
        this.canvas.text({row: 0, col: 0}, caption);
    }

    /**
     * Renders the stack layout of this renderer.
     * 
     * A stack layout is a drawing depicting each thing on the stack.
     * The layout is padded appropriately for aesthetic reasons.
     */
    private renderStackLayout(objects: FrameObject[]): void {
        const items = objects.filter((x: FrameObject): x is StackItem => x instanceof StackItem);
        if (items.length === 0) {
            return;
        }

        const maxItemWidth = this.stackWidth;

        items.forEach(fobj => this.addStackItem(fobj, maxItemWidth));

        const maxItemLocation = this.stackHeight;

        this.drawBox(maxItemLocation, maxItemWidth);
    }

    /**
     * Returns all objects in all frames.
     */
    private getAllFrameObjects(): FrameObject[] {
        const objects: FrameObject[] = [];
        for (const frame of this.frames) {
            const frameObjects = frame.getObjects();
            for (const object of frameObjects) {
                objects.push(object);
            }
        }
        return objects;
    }

    /**
     * Renders a single stack item on the stack layout.
     * 
     * @param fobj the StackItem to add to the renderer.
     * @param maxLength the length of the largest StackItem (used for centering).
     */
    private addStackItem(fobj: StackItem, maxLength: number) {
        const row = fobj.location + RendererState.CAPTION_LINES + RendererState.HEADER_LINES;
        // Approximately center the text.
        const col = 1 + (RendererState.EXTRA_SPACES + maxLength - fobj.label.length) / 2;

        this.canvas.text({row: row, col: col}, fobj.label);
    }

    /**
     * Draws a bounding box around the stack layout.
     * 
     * @param lowest the location of the lowest stack item.
     * @param largest the width of the largest stack item.
     */
    private drawBox(lowest: number, largest: number) {
        const boxRowStart = RendererState.CAPTION_LINES;
        const boxRowEnd = boxRowStart + RendererState.HEADER_LINES + lowest + 1;
        const boxColStart = 0;
        const boxColEnd = largest + RendererState.EXTRA_SPACES + 1;

        // Some of these are off, but they will be overwritten by the corners.
        this.canvas.hline({row: boxRowStart, col: boxColStart}, boxColEnd - boxColStart);
        this.canvas.hline({row: boxRowEnd, col: boxColStart}, boxColEnd - boxColStart);
        this.canvas.vline({row: boxRowStart, col: boxColStart}, boxRowEnd - boxRowStart);
        this.canvas.vline({row: boxRowStart, col: boxColEnd}, boxRowEnd - boxRowStart);

        this.canvas.add({row: boxRowStart, col: boxColStart}, Glyph.TOP_LEFT_CORNER);
        this.canvas.add({row: boxRowStart, col: boxColEnd}, Glyph.TOP_RIGHT_CORNER);
        this.canvas.add({row: boxRowEnd, col: boxColStart}, Glyph.BOTTOM_LEFT_CORNER);
        this.canvas.add({row: boxRowEnd, col: boxColEnd}, Glyph.BOTTOM_RIGHT_CORNER);
    }

    /**
     * Adds an error to the list of current errors.
     * 
     * @param e the error to add.
     */
    private addError(e: Error) {
        this.errors.push(e);
    }
}

/**
 * This exports a list of frames as plaintext.
 * @param frames the frames to export
 * 
 * @todo At the moment, this only exports the first frame.
 * 
 * @return text - the resulting plaintext render, frame-by-frame.
 * @return errors - any errors which occurred.
 */
export default function plaintextExport(frames: Frame[]): {text: string[], errors: Error[]} {
    const state = new RendererState(frames);
    const text = state.finalize();
    const errors = state.getErrors();
    return {text: text, errors: errors};
}
