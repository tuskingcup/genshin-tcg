<script setup>
import { ref, onBeforeMount, watch } from "vue"
import { doc, getDoc } from "firebase/firestore"
import db from "../firebase/init.js"
import { useRoute } from "vue-router"
import CharacterCard from "../components/CharacterCard.vue"

const route = useRoute()


const char = ref({})

async function getCharDetail() {
	const charRef = doc(db, "characters", route.params.char)
	const querySnap = await getDoc(charRef)
	char.value = querySnap.data()
    console.log(char);
}
watch(() => route.params.char, getCharDetail)
onBeforeMount(getCharDetail)

</script>

<template>
    <div class="pt-24 flex justify-center">
    <CharacterCard :character="char"/>
    </div>
</template>

<style scoped></style>
