<template>
	<div
		class="container"
		:style="
			`background-color: ${state.currentColor?.hex}; background-image: ${state.backgroundImage}`
		"
	>
		<ColorInput />
		<InfoPanel />
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import ColorInput from '@/components/ColorInput.vue';
import InfoPanel from '@/components/InfoPanel.vue';
import store from './store';
import { Color } from './types';

export default defineComponent({
	setup() {
		const state = reactive({
			currentColor: computed(() => {
				const currentColor = store.getters['Colors/currentColor'];
				return currentColor;
			}),
			backgroundImage: computed(() => {
				const currentColors = store.getters['Colors/currentColors'];

				const backgroundImage: string[] = [];
				let percentage = 0;
				currentColors.forEach((c: Color) => {
					backgroundImage.push(`${c.hex} ${percentage}%`);
					percentage = percentage + 100 / currentColors.length;
					backgroundImage.push(`${c.hex} ${percentage}%`);
				});

				return `linear-gradient(to right, ${backgroundImage.join(',')})`;
			})
		});
		return { state };
	},
	components: {
		ColorInput,
		InfoPanel
	}
});
</script>

<style lang="scss" src="@/assets/style/app.scss" />
