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
    expect(result.text[0]).toBe(expectedResult);
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
    expect(result.text[0]).toBe(expectedResult);
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

    expect(result.text[0]).toBe(expected);
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
    expect(result.text[0]).toBe(expectedResult);
});

it('can render multiple frames', () => {
    const frame1 = new Frame();
    frame1.change('cap', new Caption('Frame 1'));
    frame1.change('0', new StackItem(0, 'eax'));
    frame1.change('1', new StackItem(1, 'ebx'));
    const frame2 = new Frame();
    frame2.change('cap', new Caption('Frame 2'));
    frame2.change('0', new StackItem(0, 'eax'));
    frame2.change('1', new StackItem(1, 'ebx'));
    frame2.change('2', new StackItem(2, 'abcde'));

    const expected1 = [
        'Frame 1  ',
        '┌───────┐',
        '│  eax  │',
        '│  ebx  │',
        '│       │',
        '└───────┘'
    ].join('\n');
    const expected2 = [
        'Frame 2  ',
        '┌───────┐',
        '│  eax  │',
        '│  ebx  │',
        '│ abcde │',
        '└───────┘',
    ].join('\n');

    const result = plaintextExport([frame1, frame2]);
    expect(result.errors).toHaveLength(0);
    expect(result.text[0]).toBe(expected1);
    expect(result.text[1]).toBe(expected2);
});
