import {
	isHex,
	hexToRgb,
	hexToHsl,
	Hex,
	toHexCharsGroup,
	findHex
} from '@guyn/tools';

import { Color } from '../types';

export interface ColorState {
	output: Color[];
	input: string;
	valid: boolean;
}
export type GroupType =
	| 'comma'
	| 'comma-space'
	| 'spaced'
	| 'array'
	| 'break'
	| 'object'
	| 'none';

const isJsonString = (str: string): boolean => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};

const establishGroupType = (input: string): GroupType => {
	console.log(input);
	if (isJsonString(input)) {
		return 'object';
	} else if (input.includes('[') && input.includes(']')) {
		return 'array';
	} else if (input.includes(', ')) {
		return 'comma-space';
	} else if (input.includes(',')) {
		return 'comma';
	} else if (input.includes(' ')) {
		return 'spaced';
	} else if (/\r|\n/.exec(input)) {
		return 'break';
	}
	return 'none';
};

const splitByGroupType = (input: string): string[] => {
	const groupType = establishGroupType(input);

	switch (groupType) {
		case 'comma':
			return input.split(',');
		case 'comma-space':
			return input.split(', ');
		case 'spaced':
			return input.split(' ');
		case 'break':
			return input.split('\n');
		case 'array':
			return findHex(input);
		case 'object':
			return findHex(input);
		default:
			return [input];
	}
};

const convertToColorGroup = (colors: string): Hex[] => {
	const colorsArray: string[] = splitByGroupType(colors);

	return toHexCharsGroup(colorsArray);
};

export default {
	namespaced: true,
	state: {
		input: '#222222',
		output: [
			{
				hex: '#222222',
				rgb: { r: 0, g: 0, b: 0 },
				hsl: { h: 0, s: 0, l: 0 }
			}
		],
		valid: true
	},

	getters: {
		output: (state: ColorState) => state.output,
		input: (state: ColorState) => state.input,
		valid: (state: ColorState) => state.valid,
		currentColor: (state: ColorState) => state.output[0],
		currentColors: (state: ColorState) => state.output
	},
	actions: {
		SET_COLOR: ({ commit, state }: any, color: Hex) => {
			if (isHex(color)) commit('setValid', true);
			else commit('setValid', false);

			commit('resetOutputColor');
			commit('setInputColor', color);

			if (!state.valid) return;
			commit('setOutputColor', [color]);
		},
		SET_COLORS: ({ commit, state }: any, colors: string) => {
			const colorGroup = convertToColorGroup(colors);
			console.log(colorGroup);
			if (colorGroup.find((c) => isHex(c) == false)) commit('setValid', false);
			else commit('setValid', true);

			commit('resetOutputColor');
			commit('setInputColor', colors);

			if (!state.valid) return;
			commit('setOutputColor', colorGroup);
		}
	},
	mutations: {
		setValid(state: ColorState, valid = true) {
			state.valid = valid;
		},
		setInputColor(state: ColorState, color: Hex) {
			state.input = color;
		},
		resetOutputColor(state: ColorState) {
			state.output = [];
		},
		setOutputColor(state: ColorState, colors: Hex[]) {
			colors
				.filter((c) => c)
				.forEach((color) =>
					state.output.push({
						hex: color,
						rgb: hexToRgb(color),
						hsl: hexToHsl(color)
					})
				);
		}
	}
};
