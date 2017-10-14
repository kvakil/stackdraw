import { TextCanvas, Glyph } from './TextCanvas';

it('can be initialized and exported', () => {
    const tc = new TextCanvas();
    expect(tc.toString()).toBe('');
});

it('correctly sets individual characters', () => {
    const tc = new TextCanvas();
    tc.set({row: 0, col: 0}, 'a');
    expect(tc.toString()).toBe('a');
});

it('appropriately expands the canvas', () => {
    const tc = new TextCanvas();
    tc.set({row: 2, col: 3}, 'a');
    const expected = [
        '    ',
        '    ',
        '   a'
    ].join('\n');
    expect(tc.toString()).toBe(expected);
});

it('allows multiple sets', () => {
    const tc = new TextCanvas();
    tc.set({row: 2, col: 3}, 'a');
    tc.set({row: 1, col: 1}, 'b');
    tc.set({row: 0, col: 5}, 'c');
    const expected = [
        '     c',
        ' b    ',
        '   a  '
    ].join('\n');
    expect(tc.toString()).toBe(expected);
});

it('allows writing strings to locations', () => {
    const tc = new TextCanvas();
    tc.text({row: 2, col: 3}, 'abc');
    const expected = [
        '      ',
        '      ',
        '   abc'
    ].join('\n');
    expect(tc.toString()).toBe(expected);
});

it('allows writing special glyphs', () => {
    const tc = new TextCanvas();
    tc.add({row: 0, col: 0}, Glyph.BOTTOM_LEFT_CORNER);
    const expected = Glyph.BOTTOM_LEFT_CORNER;
    expect(tc.toString()).toBe(expected);
});

it('combines glyphs where appropriate', () => {
    const tc = new TextCanvas();
    tc.add({row: 0, col: 0}, Glyph.HLINE);
    tc.add({row: 0, col: 0}, Glyph.VLINE);
    const expected = Glyph.CROSS;
    expect(tc.toString()).toBe(expected);
});

it('overrides glyphs if they cannot be combined', () => {
    const tc = new TextCanvas();
    tc.add({row: 0, col: 0}, Glyph.HLINE);
    tc.add({row: 0, col: 0}, Glyph.BOTTOM_LEFT_CORNER);
    const expected = Glyph.BOTTOM_LEFT_CORNER;
    expect(tc.toString()).toBe(expected);
});

it('extends the canvas as necessary with glyphs', () => {
    const tc = new TextCanvas();
    tc.add({row: 2, col: 3}, Glyph.HLINE);
    const expected = [
        '    ',
        '    ',
        '   ' + Glyph.HLINE
    ].join('\n');
    expect(tc.toString()).toBe(expected);
});
