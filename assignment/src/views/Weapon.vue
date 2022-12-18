<script setup>
import { ref, onMounted } from "vue"
import {
	collection,
	getDocs,
	onSnapshot,
	query,
	orderBy,
	limit,
	where,
} from "firebase/firestore"
import WeaponCard from "../components/WeaponCard.vue"
import FilterWeapon from "../components/FilterWeapon.vue"
import db from "../firebase/init.js"

const weapons = ref([])

async function getWeapons() {
	weapons.value = []
	const weaponsRef = collection(db, "weapons")
	const querySnap = await getDocs(weaponsRef)

	querySnap.forEach((doc) => {
		let data = doc.data()
		data.id = doc.id
		weapons.value.push(data)
	})
}

async function getweaponsFilterGroup(group) {
	weapons.value = []
	if (group.length == 0) {
		getWeapons()
		return
	}
	const weaponsRef = collection(db, "weapons")
	const qry = query(weaponsRef, where("group", "in", group))
	const querySnap = await getDocs(qry)

	querySnap.forEach((doc) => {
		let data = doc.data()
		data.id = doc.id
		weapons.value.push(data)
	})
}

async function getTopPick() {
	weapons.value = []
	const weaponsRef = collection(db, "weapons")
	const qry = query(weaponsRef, orderBy("pick", "desc"), limit(10))
	const querySnap = await getDocs(qry)

	querySnap.forEach((doc) => {
		let data = doc.data()
		data.id = doc.id
		weapons.value.push(data)
	})
}

onSnapshot(query(collection(db, "weapons")), async () => {
	await getWeapons()
})
</script>

<template>
	<div class="pt-24">
		<div class="text-yellow-500 text-4xl text-center tracking-wide">
			WEAPONS
		</div>
		<FilterWeapon
			class="pt-3"
			@top-pick="getTopPick"
			@select-group="getweaponsFilterGroup"
			@show-all="getWeapons"
		/>
		<div class="grid grid-cols-3 pt-5 gap-4 place-items-center">
			<WeaponCard v-for="weapon in weapons" :weapon="weapon" :key="weapon.id" />
		</div>
	</div>
</template>

<style scoped></style>
