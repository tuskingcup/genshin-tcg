<script setup>
import { ref, onMounted } from "vue"
import {
	collection,
	getDocs,
	onSnapshot,
	query,
	where,
	orderBy,
	limit,
} from "firebase/firestore"
import CharacterCard from "../components/CharacterCard.vue"
import db from "../firebase/init.js"
import FilterCharacter from "../components/FilterCharacter.vue"

const characters = ref([])

async function getcharacters() {
	characters.value = []
	const charactersRef = collection(db, "characters")
	const querySnap = await getDocs(charactersRef)

	querySnap.forEach((doc) => {
		let data = doc.data()
		data.id = doc.id
		characters.value.push(data)
	})
}

async function getcharactersFilterFaction(faction) {
	characters.value = []
	if (faction.length == 0) {
		getcharacters()
		return
	}
	const charactersRef = collection(db, "characters")
	const qry = query(
		charactersRef,
		where("faction", "array-contains-any", faction)
	)
	const querySnap = await getDocs(qry)

	querySnap.forEach((doc) => {
		let data = doc.data()
		data.id = doc.id
		characters.value.push(data)
	})
}

async function getcharactersOrderByHealth(desc) {
	characters.value = []
	const charactersRef = collection(db, "characters")
	let qry = ""
	if (desc) {
		qry = query(charactersRef, orderBy("health", "desc"), limit(5))
	} else {
		qry = query(charactersRef, orderBy("health"), limit(5))
	}
	const querySnap = await getDocs(qry)

	querySnap.forEach((doc) => {
		let data = doc.data()
		data.id = doc.id
		characters.value.push(data)
	})
}

async function getTopPick() {
	characters.value = []
	const charactersRef = collection(db, "characters")
	const qry = query(charactersRef, orderBy("pick", "desc"), limit(10))

	const querySnap = await getDocs(qry)

	querySnap.forEach((doc) => {
		let data = doc.data()
		data.id = doc.id
		characters.value.push(data)
	})
}

async function getObtainable(obtainable) {
	characters.value = []
	const charactersRef = collection(db, "characters")
	const qry = query(charactersRef, where("obtainable", "==", obtainable))

	const querySnap = await getDocs(qry)

	querySnap.forEach((doc) => {
		let data = doc.data()
		data.id = doc.id
		characters.value.push(data)
	})
}

onSnapshot(query(collection(db, "characters")), async () => {
	await getcharacters()
})
</script>

<template>
	<div class="pt-24">
		<div class="text-yellow-500 text-4xl text-center tracking-wide">
			CHARACTERS
		</div>
		<FilterCharacter
			@show-all="getcharacters"
			@select-faction="getcharactersFilterFaction"
			@order-health="getcharactersOrderByHealth"
			@top-pick="getTopPick"
			@showObtainable="getObtainable"
			class="mt-3"
		/>
		<div class="grid grid-cols-3 pt-5 gap-4 place-items-center">
			<CharacterCard
				v-for="character in characters"
				:character="character"
				:key="character.id"
			/>
		</div>
	</div>
</template>

<style scoped></style>
