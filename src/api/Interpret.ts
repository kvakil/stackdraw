import plaintextExport from './renderers/plaintext/Plaintext';
import evaluate from './dsl/Evaluate';

export function plaintext(code: string): {text: string[], errors: Error[]} {
    const {frames, errors: evalErrors} = evaluate(code);
    if (evalErrors.length > 0) { return {text: [], errors: evalErrors}; }

    const {text, errors: exportErrors} = plaintextExport(frames);
    if (exportErrors.length > 0) { return {text: [], errors: evalErrors}; }

    return {text: text, errors: []};
}
