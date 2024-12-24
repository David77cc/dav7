/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			height: {
				"75dvh": "75dvh",
				"100dvh": "100dvh",
				fvp: "100dvh",
				avgr: "2.3rem",
				figh: "47px",
				350: "400px",
			},
			width: {
				"75dvh": "75dvh",
				"100dvh": "100dvh",
				fvp: "100dvh",
				avgr: "2.3rem",
				figw: "766px",
				"40%": "40%",
				50: "50px",
			},
			borderRadius: {
				"1rem": "1rem",
				"2rem": "2rem",
				"3rem": "3rem",
				"4rem": "4rem",
				"25px": "25px",
			},
			backgroundImage: {
				"custom-gradient":
					"linear-gradient(180deg, #FEFE06 25.5%, #F2780C 100%)",
			},
			boxShadow: {
				"custom-light": "2px 4px 4px rgba(0, 0, 0, 0.25)",
				"custom-dark": "0 0 6px 1px #215",
			},
			spacing: {
				small: "2rem",
				medium: "5rem",
			},
			borderWidth: {
				3: "3px",
			},
			fontFamily: {
				kufam: ["Kufam", "sans-serif"],
				poppins: ["Poppins", "sans-serif"],
				roboto: ["Roboto", "sans-serif"],
			},
		},
	},
	plugins: [],
};
