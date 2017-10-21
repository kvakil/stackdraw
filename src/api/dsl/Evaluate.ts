import Frame from  '../Frame';
import { splitIntoLines, tokenize, splitKeyValue, getByUniqueKey } from './Tokenizer';
import StackItem from  '../fos/StackItem';

/**
 * @param code the code which should be used to create the frame.
 */
export default function evaluate(code: string): {frames: Frame[], errors: Error[]} {
    const lines = splitIntoLines(code);
    const frames: Frame[] = [];
    const errors: Error[] = [];
    var sp = 0;
    for (const line of lines) {
        const {tokens, error: tokenError} = tokenize(line);
        if (tokenError != null) {
            errors.push(tokenError);
            continue;
        }
        if (tokens.length === 0) {
            continue;
        }
        const instruction = tokens[0].toLowerCase();
        const args = tokens.slice(1);
        switch (instruction) {
            case 'frame':
                if (frames.length === 0) {
                    frames.push(new Frame());
                } else {
                    const curFrame = frames[frames.length - 1];
                    frames.push(curFrame.copy());
                }
                break;
            case 'push':
                if (frames.length === 0) {
                    errors.push(new Error('must have a frame to push to'));
                    break;
                }
                const currentFrame = frames[frames.length - 1];
                pushIntoFrame(currentFrame, sp, args);
                sp++;
                break;
            default:
                break;
        }
    }
    return {frames: frames, errors: []};
}

function pushIntoFrame(frame: Frame, sp: number, args: string[]): Error | null {
    const pairs = args.map(splitKeyValue);
    const label = getByUniqueKey(pairs, 'label');
    if (label instanceof Error) { return label; }
    const fobj = new StackItem(sp, label);
    frame.change(`stack_${sp}`, fobj);
    return null;
}
