import 'core-js/es7/string';

/**
 * A canvas which can be drawn on and exports to ASCII.
 * Its coordinates are labelled starting from (0, 0) at the top-left,
 * and increasing as one moves towards the bottom-right.
 */
export default class TextCanvas {
    /**
     * Internal representation of the current canvas.
     */
    private grid: string[];

    /**
     * Creates an empty canvas.
     */
    constructor() {
        this.grid = [''];
    }

    /**
     * Outputs the canvas as a text string.
     * 
     * @return the canvas as a text string.
     */
    toString(): string {
        return this.grid.join('\n');
    }

    /**
     * Adds a character to the given location, overwriting any old ones.
     * 
     * It is undefined behavior if this is called with `char` having
     * length greater than 1.
     * 
     * @param row the row of the new character.
     * @param col the column of the new character.
     * @param char a string containing only one character.
     */
    set(row: number, col: number, char: string) {
        this.text(row, col, char);
    }

    /**
     * Writes a string starting at the given row and column.
     * 
     * @param row the row to start writing at.
     * @param col the column to start writing at.
     * @param toWrite the string to write.
     */
    text(row: number, col: number, toWrite: string) {
        const maxColumn = col + toWrite.length - 1;
        this.expand(row, maxColumn);
        const rowToChange = this.grid[row];
        const left = rowToChange.slice(0, col);
        const right = rowToChange.slice(maxColumn + 1);
        this.grid[row] = left + toWrite + right;
    }

    /**
     * Expands the canvas to the given dimensions.
     * 
     * @param row the new maximum row.
     * @param col the new maximum column.
     */
    private expand(row: number, col: number) {
        while (this.grid.length <= row) {
            this.grid.push('');
        }

        this.grid = this.grid.map(line => line.padEnd(col + 1, ' '));
    }
}
