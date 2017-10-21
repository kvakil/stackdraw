/**
 * Splits a line into tokens (non-whitespace strings not separated).
 * 
 * @param line the line to split into tokens
 */
export function tokenize(line: string): {tokens: string[], error: Error | null} {
    const tokens: string[] = [];
    var token = '';
    var quoted = false;
    for (const char of line) {
        switch (char) {
            case '`':
                quoted = !quoted;
                break;
            case ' ':
            case '\t':
                if (token.length === 0) {
                    continue;
                }
                if (quoted) {
                    token += char;
                } else {
                    tokens.push(token);
                    token = '';
                }
                break;
            default:
                token += char;
        }
    }

    if (quoted) {
        const error = new Error('expected quote to be ended before end of line');
        return {tokens: tokens, error: error};
    }

    if (token.length > 0) {
        tokens.push(token);
    }

    return {tokens: tokens, error: null};
}

/**
 * Splits a string into its corresponding lines.
 * 
 * @param code a single string which should be split
 */
export function splitIntoLines(code: string): string[] {
    return code.split('\n');
}

/**
 * Splits an argument into parameter and value components.
 * 
 * @param arg the argument to split
 */
export function splitKeyValue(arg: string): {key: string, value: string} {
    const index = arg.indexOf('=');
    if (index === -1) {
        return {key: arg, value: ''};
    }
    return {key: arg.substr(0, index), value: arg.substr(index + 1)};
}

/**
 * Gets all the values with the given key.
 * 
 * @param pairs the key value pairs
 * @param needle the key to search for
 * 
 * @return a list of values with the given key
 */
export function getByKey(pairs: {key: string, value: string}[], needle: string): string[] {
    return pairs.filter(({key, value}) => key === needle).map(kv => kv.value);
}

export function getByUniqueKey(pairs: {key: string, value: string}[], needle: string): string | Error {
    const allValues = getByKey(pairs, needle);
    switch (allValues.length) {
        case 0: return '';
        case 1: return allValues[0];
        default: return new Error('multiple unique keys found');
    }
}
