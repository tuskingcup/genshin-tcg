<script setup>
defineProps({
	character: {
		type: Object,
		required: true,
	},
})
</script>

<template>
	<div
		class="bg-theme-4 text-theme-1 rounded-lg max-w-sm text-lg text-center w-full  border  border-theme-2"
	>
		<div class="text-yellow-500">{{ character.name }}</div>
		<div><span class="text-yellow-500">Health: </span>{{ character.health }}</div>
		<div><span class="text-yellow-500">Element: </span>{{ character.element }}</div>
		<div><span class="text-yellow-500">Weapon: </span>{{ character.weapon }}</div>
		<div ><span class="text-yellow-500">Pick: </span>{{ character.pick==undefined ? 0: character.pick }}</div>
		<div><span class="text-yellow-500">Obtainable: </span>{{ character.obtainable }}</div>
		<div class="bg-zinc-800 text-theme-1 rounded-lg">
			<span class="text-yellow-500">Faction</span>
			<div v-for="faction in character.faction" :key="faction">- {{faction}}</div>
		</div>
	</div>
</template>

<style scoped></style>
