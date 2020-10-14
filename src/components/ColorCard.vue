<template>
	<div
		class="color-card"
		:class="`color-card--${props.view}`"
		v-if="color"
		:style="state.currentStyle"
	>
		<span class="color-card__dot"></span>

		<div class="color-card__details">
			<span class="color-card__title">{{ color.name }}</span>
			<div class="color-card__values">
				<dl>
					<dt>rgb</dt>
					<dd>{{ color.rgb.r }}, {{ color.rgb.g }}, {{ color.rgb.b }}</dd>
				</dl>
				<dl>
					<dt>hsl</dt>
					<dd>{{ color.hsl.h }}deg, {{ color.hsl.s }}%, {{ color.hsl.l }}%</dd>
				</dl>
				<dl>
					<dt>hex</dt>
					<dd>{{ color.hex }}</dd>
				</dl>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { getClosestColor } from '../service/color';

import { Color } from '../types';
import { defineComponent, reactive, computed } from 'vue';

interface ColorCardProps {
	color: Color;
}
type ViewTypes = 'large' | 'small' | 'medium';

export default defineComponent({
	props: {
		color: {
			type: Object as () => Color
		},
		view: {
			type: String as () => ViewTypes,
			default: 'small'
		}
	},
	setup(props: any) {
		const state = reactive({
			currentStyle: computed(() => {
				return `--current-color: ${props.color.hex}`;
			})
		});
		return {
			props,
			state
		};
	}
});
</script>

<style lang="scss">
$block: '.color-card';
#{$block} {
	display: flex;

	&--small {
		#{$block}__dot {
			width: 2em;
			height: 2em;
		}
		#{$block}__values {
			position: absolute;
			background-color: black;
			color: white;
			padding: 1em;
			top: 50%;
			transform: translateY(-50%);
			right: 0;
		}
	}

	& + & {
		margin-top: 1em;
	}
	&__dot {
		background-color: var(--current-color);
		width: 4em;
		height: 4em;
		flex-shrink: 0;
		border-radius: var(--border-radius, 1em);
	}
	&__title {
		& + #{$block}__values {
			margin-top: 0.5em !important;
		}
	}
	&__details {
		flex-grow: 1;
		padding: 0.5em;
		position: relative;
	}
	&__values {
		dl {
			display: flex;
			margin: 0;
			dt {
				margin: 0;
				flex-shrink: 1;
				width: 3em;
				font-weight: bold;
				text-transform: uppercase;
				font-size: 0.66em;
				line-height: 1.5;
				opacity: 0.25;
			}
			dd {
				margin: 0;
				flex-grow: 1;
				font-family: monospace;
				white-space: nowrap;
			}
		}
	}
}
</style>
