/**
 * Generate a sprite using the canvas API
 * @param {number} width
 * @param {number} height
 * @param {(ctx: CanvasRenderingContext2D, w: number, h: number) => void} fn
 */
export default function createSprite(width, height, fn) {
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d');

	fn(ctx, canvas.width, canvas.height);

	return canvas;
}
