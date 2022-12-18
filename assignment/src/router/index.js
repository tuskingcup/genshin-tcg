import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Character from "../views/Character.vue"
import Weapon from "../views/Weapon.vue"
import Deck from "../views/Deck.vue"
import WeaponDetail from "../views/WeaponDetail.vue"
import CharDetail from "../views/CharDetail.vue"

const history = createWebHistory()
const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
	},
	{
		path: "/character",
		name: "character",
		component: Character,
	},
	{
		path: "/weapon",
		name: "weapon",
		component: Weapon,
	},
	{
		path: "/deck",
		name: "deck",
		component: Deck,
	},
	{
		path: "/weapondetail/:weapon",
		name: "weapondetail",
		component: WeaponDetail,
	},
	{
		path: "/chardetail/:char",
		name: "chardetail",
		component: CharDetail,
	},
]

const router = createRouter({ history, routes })
export default router
