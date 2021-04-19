/**
 * Generate a sprite using the canvas API
 * @param {number} width
 * @param {number} height
 * @param {(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void} fn
 */
export default function createSprite(width: number, height: number, fn: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void): HTMLCanvasElement;
