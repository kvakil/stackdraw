import plaintextExport from './Plaintext';
import Frame from '../../Frame';
import Caption from '../../fos/Caption';
import StackItem from '../../fos/StackItem';

it('can create a basic stack frame', () => {
    const frame = new Frame();
    frame.change('eax', new StackItem(0, 'eax'));
    frame.change('ebx', new StackItem(1, 'ebx'));
    
    const expectedResult = [
        '       ',
        '┌─────┐',
        '│ eax │',
        '│ ebx │',
        '└─────┘'
    ].join('\n');

    const result = plaintextExport([frame]);
    expect(result.errors).toHaveLength(0);
    expect(result.text).toBe(expectedResult);
});

it('errors on double captions', () => {
    const frame = new Frame();
    frame.change('eax', new StackItem(0, 'eax'));
    frame.change('ebx', new StackItem(1, 'ebx'));
    frame.change('cap1', new Caption('hi'));
    frame.change('cap2', new Caption('hi'));

    const result = plaintextExport([frame]);
    expect(result.errors).not.toHaveLength(0);
});

it('shows the caption', () => {
    const frame = new Frame();
    frame.change('eax', new StackItem(0, 'eax'));
    frame.change('cap', new Caption('longcaption'));

    const expectedResult = [
        'longcaption',
        '┌─────┐    ',
        '│ eax │    ',
        '└─────┘    ',
    ].join('\n');

    const result = plaintextExport([frame]);
    expect(result.errors).toHaveLength(0);
    expect(result.text).toBe(expectedResult);
});

it('can deal with very long lengths', () => {
    const frame = new Frame();
    frame.change('eax', new StackItem(0, 'eax'));
    frame.change('ebx', new StackItem(1, 'ebx'));
    const LONG = 20;
    frame.change('long', new StackItem(2, 'A'.repeat(LONG)));
    frame.change('ecx', new StackItem(3, 'ecx'));

    const result = plaintextExport([frame]);
    expect(result.errors).toHaveLength(0);

    const expected = [
        '                        ',
        '┌──────────────────────┐',
        '│         eax          │',
        '│         ebx          │',
        '│ AAAAAAAAAAAAAAAAAAAA │',
        '│         ecx          │',
        '└──────────────────────┘'
    ].join('\n');

    expect(result.text).toBe(expected);
});

it('can deal with unordered stack frames', () => {
    const frame = new Frame();
    frame.change('0', new StackItem(1, 'ebx'));
    frame.change('1', new StackItem(0, 'eax'));
    
    const expectedResult = [
        '       ',
        '┌─────┐',
        '│ eax │',
        '│ ebx │',
        '└─────┘'
    ].join('\n');

    const result = plaintextExport([frame]);
    expect(result.errors).toHaveLength(0);
    expect(result.text).toBe(expectedResult);
});
