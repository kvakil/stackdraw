import TextCanvas from './TextCanvas';

it('can be initialized and exported', () => {
    const tc = new TextCanvas();
    expect(tc.toString()).toBe('');
});
