import { rgbToHex, hexToRgb, RGB, Hex } from '@guyn/tools';

interface NearestColor {
	name?: String;
	source?: String;
	value?: string;
	rgb?: RGB;
	distance?: number;
}

interface NearestColorSource {
	[name: string]: string;
}

// DEFAULTS

const STANDARD_COLORS: NearestColorSource = {
	aqua: '#0ff',
	black: '#000',
	blue: '#00f',
	fuchsia: '#f0f',
	gray: '#808080',
	green: '#008000',
	lime: '#0f0',
	maroon: '#800000',
	navy: '#000080',
	olive: '#808000',
	orange: '#ffa500',
	purple: '#800080',
	red: '#f00',
	silver: '#c0c0c0',
	teal: '#008080',
	white: '#fff',
	yellow: '#ff0'
};
const createColorSpec = (input: string, name: string): NearestColor => {
	return { name: name, source: input, rgb: parseColor(input) };
};

const parseComponentValue = (string: string): number => {
	if (string.charAt(string.length - 1) === '%') {
		return Math.round((parseInt(string, 10) * 255) / 100);
	}

	return Number(string);
};

const mapColors = (colors: string[]) => {
	if (colors instanceof Array) {
		return colors.map(function(color) {
			return createColorSpec(color, '');
		});
	}

	return Object.keys(colors).map(function(name) {
		return createColorSpec(colors[name], name);
	});
};

const DEFAULT_COLORS = mapColors([
	'#f00', // r
	'#f80', // o
	'#ff0', // y
	'#0f0', // g
	'#00f', // b
	'#008', // i
	'#808' // v
]);

const VERSION = '0.4.4';

// Functions

export const nearestColor = (
	needle: RGB,
	colors: NearestColorSource[]
): NearestColor => {
	needle = parseColor(needle);

	let distanceSq,
		minDistanceSq = Infinity,
		rgb,
		value = {
			name: '',
			source: '',
			rgb: { r: 0, g: 0, b: 0 },
			distance: 0
		};

	colors || (colors = DEFAULT_COLORS);

	for (var i = 0; i < colors.length; ++i) {
		rgb = hexToRgb(colors[i]);

		distanceSq =
			Math.pow(needle.r - rgb.r, 2) +
			Math.pow(needle.g - rgb.g, 2) +
			Math.pow(needle.b - rgb.b, 2);

		if (distanceSq < minDistanceSq) {
			minDistanceSq = distanceSq;
			value = colors[i];
		}
	}

	if (value.name) {
		return {
			name: value.name,
			source: value.source,
			rgb: value.rgb,
			distance: Math.sqrt(minDistanceSq)
		};
	} else {
		return value;
	}
};

const from = (availableColors) => {
	var colors = mapColors(availableColors),
		nearestColorBase = nearestColor;

	var matcher = function nearestColor(hex) {
		return nearestColorBase(hex, colors);
	};

	// Keep the 'from' method, to support changing the list of available colors
	// multiple times without needing to keep a reference to the original
	// nearestColor function.
	matcher.from = from;

	// Also provide a way to combine multiple color lists.
	matcher.or = function or(alternateColors) {
		var extendedColors = colors.concat(mapColors(alternateColors));
		return nearestColor.from(extendedColors);
	};

	return matcher;
};

const parseColor = (source) => {
	var red, green, blue;

	if (typeof source === 'object') {
		return source;
	}

	if (source in STANDARD_COLORS) {
		return parseColor(STANDARD_COLORS[source]);
	}

	var hexMatch = source.match(/^#?((?:[0-9a-f]{3}){1,2})$/i);
	if (hexMatch) {
		hexMatch = hexMatch[1];

		if (hexMatch.length === 3) {
			hexMatch = [
				hexMatch.charAt(0) + hexMatch.charAt(0),
				hexMatch.charAt(1) + hexMatch.charAt(1),
				hexMatch.charAt(2) + hexMatch.charAt(2)
			];
		} else {
			hexMatch = [
				hexMatch.substring(0, 2),
				hexMatch.substring(2, 4),
				hexMatch.substring(4, 6)
			];
		}

		red = parseInt(hexMatch[0], 16);
		green = parseInt(hexMatch[1], 16);
		blue = parseInt(hexMatch[2], 16);

		return { r: red, g: green, b: blue };
	}

	var rgbMatch = source.match(
		/^rgb\(\s*(\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)\s*\)$/i
	);
	if (rgbMatch) {
		red = parseComponentValue(rgbMatch[1]);
		green = parseComponentValue(rgbMatch[2]);
		blue = parseComponentValue(rgbMatch[3]);

		return { r: red, g: green, b: blue };
	}

	throw Error('"' + source + '" is not a valid color');
};
