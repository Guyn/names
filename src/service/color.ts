import Names from '../data/names.json';
import { RGB, Hex, hexToRgb, getColorDistance } from '@guyn/tools';

interface ClosestColor {
	name: string;
	color: Hex;
	distance: number;
}

export const getClosestColor = (input: RGB, source = Names): ClosestColor => {
	let closest = {
		name: '',
		color: '',
		distance: 999
	};

	Names.colors
		.map((c) => {
			return {
				...c,
				rgb: hexToRgb('#' + c.code)
			};
		})
		.forEach((color) => {
			const distance = getColorDistance(color.rgb, input);
			if (closest.distance > distance) {
				closest = {
					name: color.name,
					color: '#' + color.code,
					distance: distance
				};
			}
		});
	return closest;
};
