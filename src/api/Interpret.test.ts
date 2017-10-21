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
