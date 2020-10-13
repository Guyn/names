<template>
	<div class="names" :class="[color.valid ? 'names--valid' : 'names--invalid']">
		<div
			class="names__single input"
			v-if="!state.isMultiple"
			:class="{ 'input--large': color.output.length > 1 }"
		>
			<input type="text" v-model="color.input" />
		</div>
		<div class="names__multiple input" v-else>
			<textarea
				resize="false"
				@input="autoResize"
				v-model="color.input"
			></textarea>
		</div>
		<div class="names__output" v-if="color.valid">
			<ColorCard
				v-for="(color, idx) in color.output"
				:color="color"
				:key="idx"
			/>
		</div>
		<!-- <div class="names__settings">
			<div class="input">
				<input type="checkbox" id="check-multiple" v-model="state.isMultiple" />
				<label for="check-multiple">Multiple colors</label>
			</div>
		</div> -->
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { autoResize } from '../service/ui';
import ColorCard from './ColorCard.vue';
import store from '../store';

export default defineComponent({
	components: {
		ColorCard
	},
	setup() {
		const state: any = reactive({
			isMultiple: true
		});
		const color: any = reactive({
			valid: computed(() => store.getters['Colors/valid']),
			output: computed(() => store.getters['Colors/output']),
			input: computed({
				get: () => store.getters['Colors/input'],
				set: (val: string) => {
					if (!state.isMultiple) store.dispatch('Colors/SET_COLOR', val);
					else store.dispatch('Colors/SET_COLORS', val);
				}
			})
		});

		return { state, color, autoResize };
	}
});
</script>

<style lang="scss">
.names {
	// border: 1px solid rgba(0, 0, 0, 0.25);
	background-color: white;
	padding: 2em;
	border-radius: 1em;
	box-shadow: 0.125em 0.125em 6em 1em rgba(0, 0, 0, 0.125);
	animation: popIn 0.5s forwards;
	width: 320px;
}
@keyframes popIn {
	from {
		transform: scale(0);
	}
	80% {
		transform: scale(1.1);
	}
	to {
		transform: scale(1);
	}
}
</style>
