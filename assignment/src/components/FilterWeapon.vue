<script setup>
import { ref, reactive, onMounted } from "vue"

const emit = defineEmits(["top-pick", "select-group", "show-all"])
const state = reactive({
	groups: {
		Sword: false,
		Polearm: false,
		Catalyst: false,
		Bow: false,
		Claymore: false,
	},
})

function selectGroups(select) {
	state.groups[select] = !state.groups[select]
	const selectedGroups = []
	for (const group in state.groups) {
		if (state.groups[group]) {
			selectedGroups.push(group)
		}
	}
	console.log(selectedGroups)
	emit("select-group", selectedGroups)
}
</script>

<template>
	<div class="grid gap-4 text-theme-1">
		<div class="flex gap-3 justify-center">
			<div>Filter Group:</div>
			<button
				v-for="(group, key) in state.groups"
				type="button"
				@click="selectGroups(key)"
				:class="[
					group
						? ['bg-theme-3', 'text-theme-1']
						: ['bg-theme-2', 'text-theme-4'],
					'rounded-full',
					'p-1',
					'hover:bg-slate-700 transition-all',
				]"
			>
				{{ key }}
			</button>
		</div>
		<div class="flex justify-center gap-2">
			<button
				class="bg-theme-3 text-theme-1 rounded-full p-1 hover:bg-slate-700 transition-all"
				@click="$emit('show-all')"
			>
				Show All
			</button>
			<button
				class="bg-theme-3 text-theme-1 rounded-full p-1 hover:bg-slate-700 transition-all"
				@click="$emit('top-pick')"
			>
				Top 10 Pick Weapon
			</button>
		</div>
	</div>
</template>

<style scoped></style>
