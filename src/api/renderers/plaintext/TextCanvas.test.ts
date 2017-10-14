import TextCanvas from './TextCanvas';

it('can be initialized and exported', () => {
    const tc = new TextCanvas();
    expect(tc.toString()).toBe('');
});

it('correctly sets individual characters', () => {
    const tc = new TextCanvas();
    tc.set(0, 0, 'a');
    expect(tc.toString()).toBe('a');
});

it('appropriately expands the canvas', () => {
    const tc = new TextCanvas();
    tc.set(2, 3, 'a');
    const expected = [
        '    ',
        '    ',
        '   a'
    ].join('\n');
    expect(tc.toString()).toBe(expected);
});

it('allows multiple sets', () => {
    const tc = new TextCanvas();
    tc.set(2, 3, 'a');
    tc.set(1, 1, 'b');
    tc.set(0, 5, 'c');
    const expected = [
        '     c',
        ' b    ',
        '   a  '
    ].join('\n');
    expect(tc.toString()).toBe(expected);
});

it('allows writing strings to locations', () => {
    const tc = new TextCanvas();
    tc.text(2, 3, 'abc');
    const expected = [
        '      ',
        '      ',
        '   abc'
    ].join('\n');
    expect(tc.toString()).toBe(expected);
});
