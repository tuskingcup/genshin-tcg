<script setup>
import { ref, onMounted } from "vue"
import { collection, getDocs, onSnapshot, query, getCountFromServer } from "firebase/firestore"
import DeckCard from "../components/DeckCard.vue"
import NewDeck from "../components/NewDeck.vue"
import db from "../firebase/init.js"

const decks = ref([])
const count = ref()

async function getDecks() {
    decks.value=[]
	const decksRef = collection(db, "decks")
	const querySnap = await getDocs(decksRef)

	querySnap.forEach((doc) => {
		let data = doc.data()
		data.id = doc.id
		decks.value.push(data)
	})
}

async function getCount() {
	const decksRef = collection(db, "decks")
	const snapshot = await getCountFromServer(decksRef);
	count.value = snapshot.data().count
}

onSnapshot(query(collection(db, "decks")), async () => {
	await getDecks()
	await getCount()
})
</script>

<template>
	<div class="pt-24">
        <div class="text-yellow-500 text-4xl text-center tracking-wide">DECKS</div>
		<NewDeck class="pt-4"/>
		<div class="flex flex-col gap-5 place-items-center pt-5">
			<div class="text-theme-1">Count({{count}})</div>
			<DeckCard v-for="deck in decks" :deck="deck" :key="deck.id" />
		</div>
	</div>
</template>

<style scoped></style>
