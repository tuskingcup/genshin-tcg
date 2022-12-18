var admin = require("firebase-admin")
const { getFirestore,increment } = require("firebase-admin/firestore")

var serviceAccount = require("./serviceAccountKey.json")

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
})

var db = getFirestore()

var decks = [
	{
		name: "Starter Team",
		created_date: new Date(),
		characters: [
			{
				character: "DL",
				charname: "Diluc",
				weapon: "WI",
				wpname: "White Iron Greatsword",
			},
			{
				character: "KY",
				charname: "Kaeya",
				weapon: "TH",
				wpname: "Traveler's Handy Sword",
			},
			{
				character: "SC",
				charname: "Sucrose",
				weapon: "MG",
				wpname: "Magic Guide",
			},
		],
	},
	{
		name: "Ayakamiya",
		created_date: new Date(),
		characters: [
			{
				character: "KA",
				charname: "Kamisato Ayaka",
				weapon: "SS",
				wpname: "Sacrificial Sword",
			},
			{
				character: "YM",
				charname: "Yoimiya",
				weapon: "SB",
				wpname: "Sacrificial Bow",
			},
			{
				character: "GY",
				charname: "Ganyu",
				weapon: "SH",
				wpname: "Skyward Harp",
			},
		],
	},
	{
		name: "Ayaka Permafreeze",
		created_date: new Date(),
		characters: [
			{
				character: "KA",
				charname: "Kamisato Ayaka",
				weapon: "SS",
				wpname: "Sacrificial Sword",
			},
			{
				character: "GY",
				charname: "Ganyu",
				weapon: "SH",
				wpname: "Skyward Harp",
			},
			{
				character: "MN",
				charname: "Mona",
				weapon: "SF",
				wpname: "Sacrificial Fragments",
			},
		],
	},
	{
		name: "Keqing Overload",
		created_date: new Date(),
		characters: [
			{
				character: "KQ",
				charname: "Keqing",
				weapon: "TH",
				wpname: "Traveler's Handy Sword",
			},
			{
				character: "YM",
				charname: "Yoimiya",
				weapon: "SB",
				wpname: "Sacrificial Bow",
			},
			{
				character: "FC",
				charname: "Fischl",
				weapon: "SB",
				wpname: "Sacrificial Bow",
			},
		],
	},
	{
		name: "Summoner Oceanid",
		created_date: new Date(),
		characters: [
			{
				character: "RL",
				charname: "Rhodeia of Loch",
				weapon: null,
				wpname: null,
			},
			{
				character: "GY",
				charname: "Ganyu",
				weapon: "SH",
				wpname: "Skyward Harp",
			},
			{
				character: "FC",
				charname: "Fischl",
				weapon: "SB",
				wpname: "Sacrificial Bow",
			},
		],
	},
	{
		name: "Noelle Hypercarry",
		created_date: new Date(),
		characters: [
			{
				character: "NE",
				charname: "Noelle",
				weapon: "WG",
				wpname: "Wolf's Gravestone",
			},
			{
				character: "CY",
				charname: "Chongyun",
				weapon: "SG",
				wpname: "Sacrificial Greatsword",
			},
			{
				character: "SL",
				charname: "Stonehide Lawachurl",
				weapon: null,
				wpname: null,
			},
		],
	},
	{
		name: "Diluc Overload",
		created_date: new Date(),
		characters: [
			{
				character: "DL",
				charname: "Diluc",
				weapon: "WG",
				wpname: "Wolf's Gravestone",
			},
			{
				character: "FC",
				charname: "Fischl",
				weapon: "SH",
				wpname: "Skyward Harp",
			},
			{
				character: "BN",
				charname: "Bennett",
				weapon: "SS",
				wpname: "Sacrificial Sword",
			},
		],
	},
	{
		name: "Yoimiya Vaporize",
		created_date: new Date(),
		characters: [
			{
				character: "YM",
				charname: "Yoimiya",
				weapon: "SH",
				wpname: "Skyward Harp",
			},
			{
				character: "XQ",
				charname: "Xingqiu",
				weapon: "SS",
				wpname: "Sacrificial Sword",
			},
			{
				character: "BN",
				charname: "Bennett",
				weapon: "SS",
				wpname: "Sacrificial Sword",
			},
		],
	},
	{
		name: "Monster",
		created_date: new Date(),
		characters: [
			{
				character: "RL",
				charname: "Rhodeia of Loch",
				weapon: null,
				wpname: null,
			},
			{
				character: "SL",
				charname: "Stonehide Lawachurl",
				weapon: null,
				wpname: null,
			},
			{
				character: "JT",
				charname: "Jadeplume Terrorshroom",
				weapon: null,
				wpname: null,
			},
		],
	},
	{
		name: "Liyue Team",
		created_date: new Date(),
		characters: [
			{
				character: "XL",
				charname: "Xiangling",
				weapon: "LS",
				wpname: "Lithic Spear",
			},
			{
				character: "KQ",
				charname: "Keqing",
				weapon: "AF",
				wpname: "Aquila Favonia",
			},
			{
				character: "GY",
				charname: "Ganyu",
				weapon: "RB",
				wpname: "Raven Bow",
			},
		],
	},
]

decks.forEach(function (obj) {
	db.collection("decks")
		.add({
			name: obj.name,
			created_date: obj.created_date,
			characters: obj.characters,
		})
		.then((docRef) => {
			console.log("Document written with ID : " + docRef.id)
		})
	obj.characters.forEach(async (char) => {
		if (char.character != null) {
			db.collection("characters").doc(char.character).update({
				pick:admin.firestore.FieldValue.increment(1)
			})
		}
	})
	obj.characters.forEach(async (char) => {
		if (char.weapon != null) {
			db.collection("weapons").doc(char.weapon).update({
				pick:admin.firestore.FieldValue.increment(1)
			})
		}
	})
})
