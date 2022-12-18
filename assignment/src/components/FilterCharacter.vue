<script setup>
import { ref, reactive, onMounted } from "vue"

const emit = defineEmits(["select-faction", "order-health", "top-pick","show-obtainable","show-all"])

const state = reactive({
	faction: {
		Mondstadt: false,
		Liyue: false,
		Inazuma: false,
		Sumeru: false,
		Fatui: false,
		Hilichurl: false,
		Monster: false,
	},
	orderDesc: true,
	obtainable: true,
})

function showObtainable() {
	state.obtainable = !state.obtainable
	emit("show-obtainable", state.obtainable)
}

function orderByHealth() {
	state.orderDesc = !state.orderDesc
	emit("order-health", state.orderDesc)
}

function selectFaction(select) {
	state.faction[select] = !state.faction[select]
	const selectedFaction = []
	for (const faction in state.faction) {
		if (state.faction[faction]) {
			selectedFaction.push(faction)
		}
	}
	console.log(selectedFaction)
	emit("select-faction", selectedFaction)
}
</script>

<template>
	<div class="grid gap-4 text-theme-1">
		<div class="flex gap-3 justify-center">
			<div>Filter Faction:</div>
			<button
				v-for="(faction, key) in state.faction"
				type="button"
				@click="selectFaction(key)"
				:class="[
					faction
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
				@click="showObtainable"
			>
				Show {{ state.obtainable ? "Obtainable" : "Unobtainable" }}
			</button>
			<button
				class="bg-theme-3 text-theme-1 rounded-full p-1 hover:bg-slate-700 transition-all"
				@click="orderByHealth"
			>
				Top 5 {{ state.orderDesc ? "The Most" : "Lowest" }} Health
			</button>
			<button
				class="bg-theme-3 text-theme-1 rounded-full p-1 hover:bg-slate-700 transition-all"
				@click="$emit('top-pick')"
			>
				Top 10 Pick Character
			</button>
		</div>
	</div>
</template>

<style scoped></style>
