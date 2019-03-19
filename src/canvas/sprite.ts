export default function createSprite(
	width: number,
	height: number,
	fn: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void
) {
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d');

	fn(ctx, canvas);

	return canvas;
}