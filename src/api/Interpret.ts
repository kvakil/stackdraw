import plaintextExport from './renderers/plaintext/Plaintext';
import evaluate from './dsl/Evaluate';

/**
 * Attempts to render the DSL code into a plaintext stack drawing.
 * 
 * @param code the DSL code which should be parsed
 * @return {string[]} a list of strings, each of which contains one frame
 * @return {Error[]} a list of errors which occurred
 */
export function plaintext(code: string): {text: string[], errors: Error[]} {
    const {frames, errors: evalErrors} = evaluate(code);
    if (evalErrors.length > 0) { return {text: [], errors: evalErrors}; }

    const {text, errors: exportErrors} = plaintextExport(frames);
    if (exportErrors.length > 0) { return {text: [], errors: evalErrors}; }

    return {text: text, errors: []};
}
