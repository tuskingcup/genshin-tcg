<script setup>
import { useRouter } from "vue-router"
const router = useRouter()
</script>

<template>
	<div class="grid grid-cols-11 place-items-center h-screen">
		<img src="../assets/allcard.png" class="col-span-5" />
		<div class="col-span-6 flex flex-col p-20 gap-4">
			<div
				class="text-theme-1 text-8xl text-center tracking-wide leading-relaxed"
			>
				Genius Invokation TCG
			</div>
			<button
				class="transition-all text-theme-1 hover:bg-theme-2 hover:text-theme-4 text-3xl bg-theme-3 p-3 rounded-full"
                @click="router.push('/deck')"
			>
				ADD DECK
			</button>
		</div>
	</div>
</template>

<style></style>
