import { tokenize } from './Tokenizer';

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
