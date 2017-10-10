import Renderer from '../Renderer';
import Frame from '../Frame';
import FrameObject from '../FrameObject';
import Caption from '../fos/Caption';
import StackItem from '../fos/StackItem';

class RendererState {    
    private static readonly TOO_MANY_CAPTIONS: string =
        'Too many captions: only one allowed.';
    private objects: FrameObject[];
    private errors: Error[];

    constructor(objects: FrameObject[]) {
        this.objects = objects;
    }

    finalize(): string {
        const caption: string = this.getCaption();
        const layout: string = this.getStackLayout();
        return caption + '\n' + layout;
    }

    getErrors(): Error[] {
        return this.errors;
    }

    private getCaption(): string {
        const captions = this.objects.filter((x: FrameObject): x is Caption => x instanceof Caption);
        if (captions.length > 1) {
            this.addError(new Error(RendererState.TOO_MANY_CAPTIONS));
            return '';
        }
        return captions.map((fobj) => fobj.caption).join('');
    }

    private getStackLayout(): string {
        const items = this.objects.filter((x: FrameObject): x is StackItem => x instanceof StackItem)
                                  .sort((a, b) => b.location - a.location);

        if (items.length === 0) {
            return '';
        }

        const maxItemWidth = items.map(fobj => fobj.label.length)
                                  .reduce((a, b) => a > b ? a : b);

        const EXTRA_SPACES = 2;

        const itemsWithPadding = items.map(fobj => {
            const len = fobj.label.length;
            const spacing = maxItemWidth - len;
            const rightPad = ' '.repeat((1 + EXTRA_SPACES + spacing) / 2);
            const leftPad = ' '.repeat((EXTRA_SPACES + spacing) / 2);
            return '|' + leftPad + fobj.label + rightPad + '|';
        });

        const header = '+' + '-'.repeat(maxItemWidth + EXTRA_SPACES) + '+\n';

        return header + itemsWithPadding.join('\n') + header;
    }

    private addError(e: Error) {
        this.errors.push(e);
    }
}

export default class PlaintextRenderer extends Renderer {
    export(frame: Frame): {dataURI: string, errors: Error[]} {
        const objects = frame.dump();
        const state = new RendererState(Object.values(objects));
        const finalText = btoa(state.finalize());
        const dataURI = `data:text/plain;base64,${finalText}`;
        const errors = state.getErrors();
        return {dataURI: dataURI, errors: errors};
    }

    exportAll(frames: Frame[]): {dataURI: string, errors: Array<Error>} {
        return {dataURI: '', errors: new Array<Error>()};
    }
}
