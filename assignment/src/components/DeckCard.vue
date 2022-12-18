<script setup>
defineProps({
	deck: {
		type: Object,
		required: true,
	},
})


</script>

<template>
	<div
		class="bg-black text-theme-1 rounded-lg text-lg border border-theme-2 text-center w-2/4"
	>
		<div class="text-yellow-500 text-xl">{{ deck.name }}</div>
		<div class="text-theme-2 text-base">{{ deck.created_date.toDate()}}</div>
		<div class="text-center h-full grid grid-cols-3">
			<div
				v-for="char in deck.characters"
				class="border border-theme-2 rounded-lg bg-theme-4"
			>
				<div class="text-yellow-500">Character</div>
				<RouterLink :to="`/chardetail/${char.character}`" class="hover:text-theme-3 transition-all">{{
					char.charname==undefined ?"-":char.charname
				}}</RouterLink>
				<div class="text-yellow-500">Weapon</div>
				<RouterLink :to="`/weapondetail/${char.weapon}`" class="hover:text-theme-3 transition-all">{{ char.wpname==undefined ?"-":char.wpname}}</RouterLink>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
