<script setup>
import { RouterView,RouterLink  } from "vue-router"

</script>

<template>
	<div>
		<div class="text-3xl w-screen bg-theme-1 flex text-theme-4 justify-center gap-10 fixed">
			<RouterLink :to="`/`" class="hover:bg-theme-2 p-4">HOME</RouterLink>
			<RouterLink :to="`/character`" class="hover:bg-theme-2 p-4">CHARACTER</RouterLink>
			<RouterLink :to="`/weapon`" class="hover:bg-theme-2 p-4">WEAPON</RouterLink>
			<RouterLink :to="`/deck`" class="hover:bg-theme-2 p-4">DECK</RouterLink>
        </div>
		<RouterView></RouterView>
	</div>
</template>

<style scoped>


</style>
