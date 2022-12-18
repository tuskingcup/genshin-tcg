/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				transparent: "transparent",
				current: "currentColor",
				"theme-1": "#F9F7F7",
				"theme-2": "#DBE2EF",
				"theme-3": "#3F72AF",
				"theme-4": "#112D4E",
			},
		},
	},
	plugins: [],
}
