<script setup>
import { ref, reactive, onMounted } from "vue"
import {
	collection,
	getDocs,
	onSnapshot,
	query,
	where,
	addDoc,
	doc,
	serverTimestamp,
	updateDoc,increment
} from "firebase/firestore"
import db from "../firebase/init.js"

const characters = ref([])
const weapons = reactive({
	Sword: [],
	Bow: [],
	Catalyst: [],
	Claymore: [],
	Polearm: [],
})

const state = reactive({
	name: "",
	character1: "",
	weapon1: "",
	character2: "",
	weapon2: "",
	character3: "",
	weapon3: "",
})

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

async function getWeaponsSword() {
	weapons.Sword = []
	const weaponsRef = collection(db, "weapons")
	const qry = query(weaponsRef, where("group", "==", "Sword"))
	const querySnap = await getDocs(qry)

	querySnap.forEach((doc) => {
		let data = doc.data()
		data.id = doc.id
		weapons.Sword.push(data)
	})
}

async function getWeaponsBow() {
	weapons.Bow = []
	const weaponsRef = collection(db, "weapons")
	const qry = query(weaponsRef, where("group", "==", "Bow"))
	const querySnap = await getDocs(qry)

	querySnap.forEach((doc) => {
		let data = doc.data()
		data.id = doc.id
		weapons.Bow.push(data)
	})
}

async function getWeaponsCatalyst() {
	weapons.Catalyst = []
	const weaponsRef = collection(db, "weapons")
	const qry = query(weaponsRef, where("group", "==", "Catalyst"))
	const querySnap = await getDocs(qry)

	querySnap.forEach((doc) => {
		let data = doc.data()
		data.id = doc.id
		weapons.Catalyst.push(data)
	})
}

async function getWeaponsClaymore() {
	weapons.Claymore = []
	const weaponsRef = collection(db, "weapons")
	const qry = query(weaponsRef, where("group", "==", "Claymore"))
	const querySnap = await getDocs(qry)

	querySnap.forEach((doc) => {
		let data = doc.data()
		data.id = doc.id
		weapons.Claymore.push(data)
	})
}

async function getWeaponsPolearm() {
	weapons.Polearm = []
	const weaponsRef = collection(db, "weapons")
	const qry = query(weaponsRef, where("group", "==", "Polearm"))
	const querySnap = await getDocs(qry)

	querySnap.forEach((doc) => {
		let data = doc.data()
		data.id = doc.id
		weapons.Polearm.push(data)
	})
}

async function addDeck() {
	const decskRef = collection(db, "decks")
	if (state.name == "" || state.name == undefined) {
		alert("Please insert deck name")
		return
	}
	if (
		state.character1.id == undefined &&
		state.character2.id == undefined &&
		state.character3.id == undefined
	) {
		alert("Please select at least one character")
		return
	}
	const docRef = await addDoc(decskRef, {
		name: state.name,
		created_date: new Date(),
		characters: [
			{
				character:
					state.character1.id == undefined ? null : state.character1.id,
				charname:
					state.character1.name == undefined ? null : state.character1.name,
				weapon: state.weapon1.id == undefined ? null : state.weapon1.id,
				wpname:
					state.weapon1.name == undefined ? null : state.weapon1.name,
			},
			{
				character:
					state.character2.id == undefined ? null : state.character2.id,
				charname:
					state.character2.name == undefined ? null : state.character2.name,
				weapon: state.weapon2.id == undefined ? null : state.weapon2.id,
				wpname:
					state.weapon2.name == undefined ? null : state.weapon2.name,
			},
			{
				character:
					state.character3.id == undefined ? null : state.character3.id,
				charname:
					state.character3.name == undefined ? null : state.character3.name,
				weapon: state.weapon3.id == undefined ? null : state.weapon3.id,
				wpname:
					state.weapon3.name == undefined ? null : state.weapon3.name,
			},
		],
	})
	await updateCharacter()
	await updateWeapon()
	state.name = ""
	state.character1 = ""
	state.weapon1 = ""
	state.character2 = ""
	state.weapon2 = ""
	state.character3 = ""
	state.weapon3 = ""
	alert("add Success")
}

async function updateCharacter() {
	const chars = ["character1", "character2", "character3"]
	for (const char of chars) {
		const chr = state[char].id
		console.log(chr);
		if (chr != undefined) {
			const docRef = doc(db, "characters", chr)
			await updateDoc(docRef, {
				pick: increment(1),
			})
		}
	}
}

async function updateWeapon() {
	const weapons = ["weapon1", "weapon2", "weapon3"]
	for (const weapon of weapons) {
		const wp = state[weapon].id
		console.log(wp);
		if (wp != undefined) {
			const docRef = doc(db, "weapons", wp)
			await updateDoc(docRef, {
				pick: increment(1),
			})
		}
	}
}



onSnapshot(query(collection(db, "weapons")), async () => {
	await getWeaponsSword()
	await getWeaponsBow()
	await getWeaponsCatalyst()
	await getWeaponsClaymore()
	await getWeaponsPolearm()
})

onSnapshot(query(collection(db, "characters")), async () => {
	await getcharacters()
})
</script>

<template>
	<div class="text-theme-1 grid grid-cols-7 gap-4">
		<div class="col-start-3 place-self-end">Deck name :</div>
		<input
			v-model="state.name"
			type="text"
			class="rounded-lg text-theme-4"
			placeholder="insert deck name"
			required
		/>

		<!-- char1 -->
		<div class="col-start-4 text-center">Character 1</div>
		<div class="col-start-3 place-self-end">Character :</div>
		<select
			v-model="state.character1"
			class="rounded-lg text-theme-4"
			@change="state.weapon1 = ''"
		>
			<option value="">-</option>
			<option
				v-for="character in characters"
				:key="character.id"
				:value="character"
			>
				{{ character.name }}
			</option>
		</select>
		<div
			v-for="(value, key) in weapons"
			:key="key"
			v-show="state.character1.weapon == key"
			class="col-start-3 col-span-2 grid grid-cols-2 gap-4"
		>
			<div v-show="state.character1 !== ''" class="place-self-end">
				Weapon :
			</div>
			<!-- Weapon1 -->
			<select v-model="state.weapon1" class="rounded-lg text-theme-4">
				<option value="">-</option>
				<option v-for="weapon in value" :key="weapon.id" :value="weapon">
					{{ weapon.name }}
				</option>
			</select>
		</div>

		<!-- char2 -->
		<div class="col-start-4 text-center">Character 2</div>
		<div class="col-start-3 place-self-end">Character :</div>
		<select
			v-model="state.character2"
			class="rounded-lg text-theme-4"
			@change="state.weapon2 = ''"
		>
			<option value="">-</option>
			<option
				v-for="character in characters"
				:key="character.id"
				:value="character"
			>
				{{ character.name }}
			</option>
		</select>
		<div
			v-for="(value, key) in weapons"
			:key="key"
			v-show="state.character2.weapon == key"
			class="col-start-3 col-span-2 grid grid-cols-2 gap-4"
		>
			<div v-show="state.character2 !== ''" class="place-self-end">
				Weapon :
			</div>
			<!-- Weapon2 -->
			<select v-model="state.weapon2" class="rounded-lg text-theme-4">
				<option value="">-</option>
				<option v-for="weapon in value" :key="weapon.id" :value="weapon">
					{{ weapon.name }}
				</option>
			</select>
		</div>

		<!-- char3 -->
		<div class="col-start-4 text-center">Character 3</div>
		<div class="col-start-3 place-self-end">Character :</div>
		<select
			v-model="state.character3"
			class="rounded-lg text-theme-4"
			@change="state.weapon3 = ''"
		>
			<option value="">-</option>
			<option
				v-for="character in characters"
				:key="character.id"
				:value="character"
			>
				{{ character.name }}
			</option>
		</select>
		<div
			v-for="(value, key) in weapons"
			:key="key"
			v-show="state.character3.weapon == key"
			class="col-start-3 col-span-2 grid grid-cols-2 gap-4"
		>
			<div v-show="state.character3 !== ''" class="place-self-end">
				Weapon :
			</div>
			<!-- Weapon3 -->
			<select v-model="state.weapon3" class="rounded-lg text-theme-4">
				<option value="">-</option>
				<option v-for="weapon in value" :key="weapon.id" :value="weapon">
					{{ weapon.name }}
				</option>
			</select>
		</div>
		<button
			class="col-start-4 text-theme-1 bg-theme-3 rounded-full p-1"
			@click="addDeck"
		>
			Add Deck
		</button>
	</div>
</template>

<style scoped></style>
