<script setup>
import { ref, onBeforeMount, watch } from "vue"
import { doc, getDoc } from "firebase/firestore"
import db from "../firebase/init.js"
import { useRoute } from "vue-router"
import WeaponCard from "../components/WeaponCard.vue"

const route = useRoute()


const weapon = ref({})

async function getWeaponDetail() {
	const weaponRef = doc(db, "weapons", route.params.weapon)
	const querySnap = await getDoc(weaponRef)
	weapon.value = querySnap.data()
    console.log(weapon);
}
watch(() => route.params.weapon, getWeaponDetail)
onBeforeMount(getWeaponDetail)
</script>
 
<template>
    
<div class="pt-24 flex justify-center">
    
<WeaponCard :weapon="weapon"/>
</div>
</template>

<style scoped>

</style>