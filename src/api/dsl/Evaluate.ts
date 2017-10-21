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
                frames.push(new Frame());
                break;
            case 'push':
                const currentFrame = frames[frames.length - 1];
                pushIntoFrame(currentFrame, sp, args);
                sp++;
                break;
            case 'pop':
                sp--;
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
