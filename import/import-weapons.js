var admin = require("firebase-admin")
const { getFirestore } = require("firebase-admin/firestore")

var serviceAccount = require("./serviceAccountKey.json")

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
})

var db = getFirestore()

var weapons = [
	{
		id: "AF",
		name: "Aquila Favonia",
		group: "Sword",
		cost: 3,
		effect:
			"The character deals +1 DMG.\nAfter the opposing character uses a Skill: If the character with this attached is the active character, heal this character for 1 HP. (Max twice per Round)",
	},
	{
		id: "LS",
		name: "Lithic Spear",
		group: "Polearm",
		cost: 3,
		effect:
			"The character deals +1 DMG.\nWhen played: For each party member from Liyue, grant 1 Shield point to the character to which this is attached. (Max 3 points)",
	},
	{
		id: "MG",
		name: "Magic Guide",
		group: "Catalyst",
		cost: 2,
		effect: "The character deals +1 DMG.",
	},
	{
		id: "RB",
		name: "Raven Bow",
		group: "Bow",
		cost: 2,
		effect: "The character deals +1 DMG.",
	},
	{
		id: "SB",
		name: "Sacrificial Bow",
		group: "Bow",
		cost: 3,
		effect:
			"The character deals +1 DMG.\nAfter the character uses an Elemental Skill: Create 1 Elemental Die of the same Elemental Type as this character. (Once per Round)",
	},
	{
		id: "SF",
		name: "Sacrificial Fragments",
		group: "Catalyst",
		cost: 3,
		effect:
			"The character deals +1 DMG.\nAfter the character uses an Elemental Skill: Create 1 Elemental Die of the same Elemental Type as this character. (Once per Round)",
	},
	{
		id: "SG",
		name: "Sacrificial Greatsword",
		group: "Claymore",
		cost: 3,
		effect:
			"The character deals +1 DMG.\nAfter the character uses an Elemental Skill: Create 1 Elemental Die of the same Elemental Type as this character. (Once per Round)",
	},
	{
		id: "SS",
		name: "Sacrificial Sword",
		group: "Sword",
		cost: 3,
		effect:
			"The character deals +1 DMG.\nAfter the character uses an Elemental Skill: Create 1 Elemental Die of the same Elemental Type as this character. (Once per Round)",
	},
	{
		id: "SA",
		name: "Skyward Atlas",
		group: "Catalyst",
		cost: 3,
		effect:
			"The character deals +1 DMG.\nOnce per Round: This character's Normal Attack deal +1 additional DMG.",
	},
	{
		id: "SH",
		name: "Skyward Harp",
		group: "Bow",
		cost: 3,
		effect:
			"The character deals +1 DMG.\nOnce per Round: This character's Normal Attack deal +1 additional DMG.",
	},
	{
		id: "SSP",
		name: "Skyward Spine",
		group: "Polearm",
		cost: 3,
		effect:
			"The character deals +1 DMG.\nOnce per Round: This character's Normal Attack deal +1 additional DMG.",
	},
	{
		id: "TH",
		name: "Traveler's Handy Sword",
		group: "Sword",
		cost: 2,
		effect: "The character deals +1 DMG.",
	},
	{
		id: "WI",
		name: "White Iron Greatsword",
		group: "Claymore",
		cost: 2,
		effect: "The character deals +1 DMG.",
	},
	{
		id: "WT",
		name: "White Tassel",
		group: "Polearm",
		cost: 2,
		effect: "The character deals +1 DMG.",
	},
	{
		id: "WG",
		name: "Wolf's Gravestone",
		group: "Claymore",
		cost: 3,
		effect:
			"The character deals +1 DMG.\nDeal +2 additional DMG if the target's remaining HP is equal or less than 6.",
	},
]

weapons.forEach(function (obj) {
	db.collection("weapons")
		.doc(obj.id)
		.set({
			name: obj.name,
			group: obj.group,
			cost: obj.cost,
			effect: obj.effect,
		})
		.then((docRef) => {
			console.log("Document written with ID : " + docRef.id)
		})
})
