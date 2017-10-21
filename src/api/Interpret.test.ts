import { plaintext } from './Interpret';

it('interprets simple stack frames', () => {
    const {text, errors} = plaintext([
        'frame',
        'push label=eax',
        'push label=ebx'
    ].join('\n'));
    expect(errors).toHaveLength(0);
    const expectedResult = [
        '       ',
        '┌─────┐',
        '│ eax │',
        '│ ebx │',
        '└─────┘'
    ].join('\n');
    expect(text).toHaveLength(1);
    expect(text[0]).toBe(expectedResult);
});

it('interprets multiple stack frames', () => {
    const {text, errors} = plaintext([
        'frame',
        'push label=eax',
        'push label=ebx',
        'frame',
        'push label=ecx'
    ].join('\n'));
    expect(errors).toHaveLength(0);
    const expectedResult1 = [
        '       ',
        '┌─────┐',
        '│ eax │',
        '│ ebx │',
        '│     │',
        '└─────┘'
    ].join('\n');
    const expectedResult2 = [
        '       ',
        '┌─────┐',
        '│ eax │',
        '│ ebx │',
        '│ ecx │',
        '└─────┘'
    ].join('\n');
    expect(text).toHaveLength(2);
    expect(text[0]).toBe(expectedResult1);
    expect(text[1]).toBe(expectedResult2);
});
