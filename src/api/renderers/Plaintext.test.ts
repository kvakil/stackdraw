import PlaintextRenderer from './Plaintext';
import Frame from '../Frame';
import Caption from '../fos/Caption';
import StackItem from '../fos/StackItem';

function dataURIToPlaintext(dataURI: string): string | null {
    const header = 'data:text/plain;base64,';
    if (!dataURI.startsWith(header)) {
        return null;
    }
    const base64 = dataURI.replace(header, '');
    return atob(base64);
}

it('can create a basic stack frame', () => {
    const frame = new Frame();
    frame.change('eax', new StackItem(0, 'eax'));
    frame.change('ebx', new StackItem(1, 'ebx'));
    
    const expectedResult = [
        '',
        '+-----+',
        '| eax |',
        '| ebx |',
        '+-----+',
        ''
    ].join('\n');

    const result = (new PlaintextRenderer()).export(frame);
    expect(result.errors).toHaveLength(0);
    expect(dataURIToPlaintext(result.dataURI)).toBe(expectedResult);
});

it('errors on double captions', () => {
    const frame = new Frame();
    frame.change('eax', new StackItem(0, 'eax'));
    frame.change('ebx', new StackItem(1, 'ebx'));
    frame.change('cap1', new Caption('hi'));
    frame.change('cap2', new Caption('hi'));

    const result = (new PlaintextRenderer()).export(frame);
    expect(result.errors).not.toHaveLength(0);
});

it('shows the caption', () => {
    const frame = new Frame();
    frame.change('eax', new StackItem(0, 'eax'));
    frame.change('cap', new Caption('caption'));

    const expectedResult = [
        'caption',
        '+-----+',
        '| eax |',
        '+-----+',
        ''
    ].join('\n');

    const result = (new PlaintextRenderer()).export(frame);
    expect(result.errors).toHaveLength(0);
    expect(dataURIToPlaintext(result.dataURI)).toBe(expectedResult);
});

it('can deal with very long lengths', () => {
    const frame = new Frame();
    frame.change('eax', new StackItem(0, 'eax'));
    frame.change('ebx', new StackItem(1, 'ebx'));
    const LONG = 20;
    frame.change('long', new StackItem(2, 'A'.repeat(LONG)));
    frame.change('ecx', new StackItem(3, 'ecx'));

    const result = (new PlaintextRenderer()).export(frame);
    expect(result.errors).toHaveLength(0);

    const plaintext = dataURIToPlaintext(result.dataURI);
    expect(plaintext).not.toBeNull();
    if (plaintext != null) {
        expect(plaintext.split('\n').every(line => line.length === LONG + 4 || line.length === 0)).toBeTruthy();
    }
});

it('can deal with unordered stack frames', () => {
    const frame = new Frame();
    frame.change('0', new StackItem(1, 'ebx'));
    frame.change('1', new StackItem(0, 'eax'));
    
    const expectedResult = [
        '',
        '+-----+',
        '| eax |',
        '| ebx |',
        '+-----+',
        ''
    ].join('\n');

    const result = (new PlaintextRenderer()).export(frame);
    expect(result.errors).toHaveLength(0);
    expect(dataURIToPlaintext(result.dataURI)).toBe(expectedResult);
});
