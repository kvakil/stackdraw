import Renderer from '../Renderer';
import Frame from '../Frame';
import FrameObject from '../FrameObject';
import Caption from '../fos/Caption';
import StackItem from '../fos/StackItem';

class RendererState {
    /** An error for when multiple captions are set. */
    private static readonly TOO_MANY_CAPTIONS: string =
        'Too many captions: only one allowed.';
    
    /** Number of padding spaces to add around each stack element. */
    private static readonly EXTRA_SPACES = 2;

    /** An array of all the objects to render. */
    private objects: FrameObject[];

    /**
     * An array containing all errors encountered while rendering. 
     * 
     * @see getErrors
     * @see addError
     */
    private errors: Error[];

    /**
     * Creates a new renderer with the given objects and no errors.
     * 
     * @param objects {FrameObject[]} the objects to render
     */
    constructor(objects: FrameObject[]) {
        this.objects = objects;
        this.errors = [];
    }

    /**
     * Finalizes the renderer, returning a string representing the render.
     * 
     * @return {string} the resulting plaintext render
     */
    finalize(): string {
        const caption: string = this.getCaption();
        const layout: string = this.getStackLayout();
        return caption + '\n' + layout;
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
     * Returns the caption of this render.
     * 
     * Adds an error if multiple captions are set.
     * 
     * @return {string} the caption.
     */
    private getCaption(): string {
        const captions = this.objects.filter((x: FrameObject): x is Caption => x instanceof Caption);
        if (captions.length > 1) {
            this.addError(new Error(RendererState.TOO_MANY_CAPTIONS));
            return '';
        }
        return captions.map((fobj) => fobj.caption).join('');
    }

    /**
     * Returns the stack layout of this render.
     * 
     * A stack layout is a drawing depicting each thing on the stack.
     * The layout is padded appropriately for aesthetic reasons.
     * 
     * @return {string} the stack layout.
     */
    private getStackLayout(): string {
        const items = this.objects.filter((x: FrameObject): x is StackItem => x instanceof StackItem)
                                  .sort((a, b) => a.location - b.location);

        if (items.length === 0) {
            return '';
        }

        const maxItemWidth = items.map(fobj => fobj.label.length)
                                  .reduce((a, b) => a > b ? a : b);

        const itemsWithPadding = items.map(fobj => {
            const len = fobj.label.length;
            const spacing = RendererState.EXTRA_SPACES + maxItemWidth - len;
            const rightPad = ' '.repeat((1 + spacing) / 2);
            const leftPad = ' '.repeat(spacing / 2);
            return '|' + leftPad + fobj.label + rightPad + '|\n';
        });

        const header = '+' + '-'.repeat(maxItemWidth + RendererState.EXTRA_SPACES) + '+\n';
        const footer = header;

        return header + itemsWithPadding.join('') + footer;
    }

    /**
     * Adds an error to the list of current errors.
     * @param e the error to add.
     */
    private addError(e: Error) {
        this.errors.push(e);
    }
}

/**
 * A Renderer which outputs in plaintext.
 * 
 * @implements Renderer
 */
export default class PlaintextRenderer extends Renderer {
    export(frame: Frame): {dataURI: string, errors: Error[]} {
        const dump = frame.dump();
        const objects = Object.keys(dump).map(id => dump[id]);
        const state = new RendererState(objects);
        const finalText = btoa(state.finalize());
        const dataURI = `data:text/plain;base64,${finalText}`;
        const errors = state.getErrors();
        return {dataURI: dataURI, errors: errors};
    }

    /**
     * @todo Implement this.
     */
    exportAll(frames: Frame[]): {dataURI: string, errors: Array<Error>} {
        return {dataURI: '', errors: new Array<Error>()};
    }
}
