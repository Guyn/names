<template>
	<div class="color-card" v-if="color" :style="state.currentStyle">
		<span class="color-card__dot"></span>

		<div class="color-card__details">
			<span class="color-card__title">ColorName</span>
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
</template>

<script lang="ts">
import { Color } from '../types';
import { defineComponent, reactive, computed } from 'vue';

interface ColorCardProps {
	color: Color;
}

export default defineComponent({
	props: {
		color: {
			type: Object as () => Color
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
.color-card {
	display: flex;
	& + & {
		margin-top: 1em;
	}
	&__dot {
		background-color: var(--current-color);
		width: 100px;
		height: 100px;
		flex-shrink: 0;
		border-radius: var(--border-radius, 1em);
	}
	&__title {
		& + dl {
			margin-top: 0.5em !important;
		}
	}
	&__details {
		flex-grow: 1;
		padding: 0.5em;

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
