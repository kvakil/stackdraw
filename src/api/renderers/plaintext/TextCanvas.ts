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
}
