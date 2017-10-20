import { tokenize, splitKeyValue } from './Tokenizer';

it('splits lines into their tokens', () => {
    const {tokens, error} = tokenize('push ecx color=blue');
    expect(error).toBeNull();
    expect(tokens).toEqual(['push', 'ecx', 'color=blue']);
});

it('handles extra whitespace', () => {
    const {tokens, error} = tokenize('  push   ecx\t color=blue');
    expect(error).toBeNull();
    expect(tokens).toEqual(['push', 'ecx', 'color=blue']);
});

it('handles quoted things', () => {
    const {tokens, error} = tokenize('push ecx `color=blue`');
    expect(error).toBeNull();
    expect(tokens).toEqual(['push', 'ecx', 'color=blue']);
});

it('handles multiple quoted things', () => {
    const {tokens, error} = tokenize('push ecx `color=blue` `caption=Hello World!`');
    expect(error).toBeNull();
    expect(tokens).toEqual(['push', 'ecx', 'color=blue', 'caption=Hello World!']);
});

it('handles quoted things with spaces inside', () => {
    const {tokens, error} = tokenize('push ecx `caption=Hello World`');
    expect(error).toBeNull();
    expect(tokens).toEqual(['push', 'ecx', 'caption=Hello World']);
});

it('errors on dangling quotes', () => {
    const {error} = tokenize('push ecx `caption=Hello World');
    expect(error).not.toBeNull();
});

it('can split key=value pairs', () => {
    const {key, value} = splitKeyValue('color=blue');
    expect(key).toBe('color');
    expect(value).toBe('blue');
});

it('can deal with when there is no = sign', () => {
    const {key, value} = splitKeyValue('blue');
    expect(key).toBe('blue');
    expect(value).toBe('');
});

it('can deal with multiple = signs', () => {
    const {key, value} = splitKeyValue('color=blue=red');
    expect(key).toBe('color');
    expect(value).toBe('blue=red');
});
