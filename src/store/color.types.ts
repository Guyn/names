export interface RGB {
	r: number;
	g: number;
	b: number;
}
export interface HSL {
	h: number;
	s: number;
	l: number;
}
export type Hex = string;

export interface Color {
	hex: string;
	rgb: RGB;
	hsl: HSL;
}
export interface ColorState {
	output: Color[];
	input: string;
}
export type GroupType = 'comma' | 'spaced' | 'array' | 'object' | 'none';
