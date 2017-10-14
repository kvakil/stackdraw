import 'core-js/es7/string';

/**
 * A type represting a location on the 2D grid.
 */
export type Location = { row: number, col: number };

/**
 * The box-drawing glyphs.
 */
export enum Glyph {
    TOP_LEFT_CORNER = '┌',
    BOTTOM_LEFT_CORNER = '└',
    TOP_RIGHT_CORNER = '┐',
    BOTTOM_RIGHT_CORNER = '┘',
    VWALL = '│',
    HWALL = '─',
    CROSS = '┼' // also VWALL + HWALL
}

/**
 * A canvas which can be drawn on and exports to ASCII.
 * Its coordinates are labelled starting from (0, 0) at the top-left,
 * and increasing as one moves towards the bottom-right.
 */
export class TextCanvas {
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
     * @param location the location of the new character.
     * @param col the column of the new character.
     * @param char a string containing only one character.
     */
    set(loc: Location, char: string) {
        this.text(loc, char);
    }

    /**
     * Writes a string starting at the given row and column.
     * 
     * @param loc the location to start writing at
     * @param toWrite the string to write.
     */
    text(loc: Location, toWrite: string) {
        const maxColumn = loc.col + toWrite.length - 1;
        this.expand({row: loc.row, col: maxColumn});
        const rowToChange = this.grid[loc.row];
        const left = rowToChange.slice(0, loc.col);
        const right = rowToChange.slice(maxColumn + 1);
        this.grid[loc.row] = left + toWrite + right;
    }

    /**
     * Adds a glyph to the given location.
     * 
     * If a glyph already exists there, it might be combined with the
     * new glyph. If the glyphs cannot be combined, the new glyph
     * will taken precedence.
     * 
     * @param loc the location to write the glyph at.
     * @param glyph the glyph to write.
     */
    add(loc: Location, glyph: Glyph) {
        this.expand(loc);
        const current = this.grid[loc.row][loc.col];
        if ((current === Glyph.HWALL && glyph === Glyph.VWALL) ||
            (current === Glyph.VWALL && glyph === Glyph.HWALL)) {
            this.set(loc, Glyph.CROSS);
        } else {
            this.set(loc, glyph);
        }
    }

    /**
     * Expands the canvas such that writing to the given location is
     * possible. Adds spaces in order to do so.
     * 
     * @param loc the location that the canvas should be expanded to     
     */
    private expand(loc: Location) {
        while (this.grid.length <= loc.row) {
            this.grid.push('');
        }

        /**
         * Only expand column-wise if the first row is too short.
         * Since we maintain the invariants that all rows are the
         * same length and that the first row always exists, this
         * check always works.
         */
        const rowLength = this.grid[0].length;
        if (rowLength < loc.col) {
            this.grid = this.grid.map(line => line.padEnd(loc.col + 1, ' '));            
        }
    }
}
