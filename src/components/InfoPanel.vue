<template>
	<div class="info-panel" :class="{ 'info-panel--active': state.active }">
		<button class="info-panel__toggle" @click="state.active = !state.active">
			<span>i</span>
		</button>
		<div class="info-panel__container">
			<div class="info-panel__content">
				<h3>This is names</h3>
				<p>Names can help you;</p>
				<ul>
					<li>Show color names</li>
					<li>Easily show you the color corresponding to the code</li>
					<li>Convert colors to other color types</li>
				</ul>
				<p>Names does support Hex, Rgb(a) en HSL(a) color inputs.</p>
				<p>
					Names does Not support hex colors with 3 characters. Just because I
					don't like it.
				</p>
				<p>Want to know more? Check <a href="https://www.sil.mt">sil.mt</a>.</p>
			</div>
		</div>
	</div>
</template>
<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			active: false
		});
		return {
			state
		};
	}
});
</script>

<style lang="scss">
@function block($color: $currentColor, $direction: 'to bottom') {
	@return unquote('linear-gradient(to bottom, #{$color}, #{$color})');
}
@function blocks($count: 1, $color: currentColor, $direction: 'to bottom') {
	$blocks: ();
	@for $i from 1 through $count {
		$blocks: append($blocks, block($color, $direction), comma);
	}
	@debug $blocks;
	@return $blocks;
}
$block: '.info-panel';
#{$block} {
	position: fixed;
	top: 0;
	right: 0;
	z-index: 100;
	color: var(--color, white);
	&__toggle {
		opacity: 0.25;
		background-color: transparent;
		border-radius: 50%;
		font-weight: bold;
		font-family: serif;
		font-size: 1.25em;
		position: absolute;
		top: 2em;
		right: 2em;
		width: 2em;
		height: 2em;
		color: currentColor;
		border: none;
		box-shadow: 0 0 0 2px currentColor;
		padding: 0;
		z-index: 20;
		&:focus {
			outline: none;
		}
		span {
			width: 100%;
			height: 100%;
			display: block;
			line-height: 2em;
			width: inherit;
			height: inherit;

			background-image: blocks(2, white);
			background-size: 0% 2px, 2px 0%;
			background-repeat: no-repeat;
			background-position: center center;
			transition: background 0.3s, transform 0.3s;
			transform: rotate(0deg);
		}
	}
	&--active {
		#{$block}__toggle span {
			font-size: 0;
			background-size: 50% 2px, 2px 50%;
			transform: rotate(135deg);
		}
		#{$block}__container {
			clip-path: inset(0 0 0 0%);
		}
	}
	&__container {
		clip-path: inset(0 0 0 100%);
		transition: clip-path 0.3s;
		position: absolute;
		top: 1em;
		right: 1em;
		width: 50%;
		min-width: 320px;
	}
	&__content {
		background-color: rgba(0, 0, 0, 0.5);
		padding: 2em;
		border-radius: 3em;
	}
}
</style>
