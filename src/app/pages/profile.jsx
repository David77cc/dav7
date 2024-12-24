import React, { useState, useRef, useEffect } from "react";
import { useImageContext } from "../gen/context";
import { SketchPicker } from "react-color";

function Profile() {
	const { logout, userData, color, setColor } = useImageContext();
	const [showPicker, setShowPicker] = useState(false);
	const pickerRef = useRef(null);

	useEffect(() => {
		const savedColor = localStorage.getItem("themeColor");
		if (savedColor) {
			setColor(savedColor);
		}
	}, [setColor]);

	useEffect(() => {
		if (color) {
			localStorage.setItem("themeColor", color);
		}
	}, [color]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				pickerRef.current &&
				!pickerRef.current.contains(event.target) &&
				!event.target.closest(".color-picker-trigger")
			) {
				setShowPicker(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleColorChange = (updatedColor) => {
		setColor(updatedColor.hex);
	};

	const shadow = {
		boxShadow: "0 0 6px 1px #fff",
	};

	return (
		<div className="flex fade-in h-screen w-full bg-violet-400 items-center justify-center flex-col text-violet-500">
			<div className="h-75dvh w-5/6 flex items-center flex-col justify-center rounded-4rem shadow-custom gap-y-5 bg-yellow-900  overflow-hidden">
				<div className="flex items-center flex-col justify-center gap-x-7 h-40 w-3/4 border-b">
					<span
						className="flex rounded-full h-16 w-16  left-10 overflow-hidden p justify-center items-center font-bold text-3xl text-white mb-1"
						style={{ backgroundColor: color }}>
						{userData?.first_name ? userData.first_name[0] : ""}
					</span>
					<div className="flex flex-col">
						<span className="text-2xl text-center text-white font-bold tracking-widest">
							{userData?.username}
						</span>
						<span className="text-lg text-white text-center">
							{userData?.email}
						</span>
					</div>
				</div>
				<div className="relative">
					<div
						className="color-picker-trigger cursor-pointer"
						onClick={() => setShowPicker((prev) => !prev)}>
						<span>Pick a theme color</span>
					</div>
					<span
						className="cursor-pointer text-[#caf]"
						onClick={() => setColor("#960fe5")}>
						Reset theme color
					</span>
					{showPicker && (
						<div
							ref={pickerRef}
							aria-label="Color picker for theme color"
							className="absolute w-16 h-16 z-10 mt-2">
							<SketchPicker
								color={color}
								onChange={handleColorChange}
							/>
						</div>
					)}
				</div>
				<button
					className={`bg-blue-200 w-1/4 h-9 rounded-4rem font-sans text-xl font-bold text-red-500 hover:bg-blue-400 transition-all duration-300`}
					onClick={() => logout()}
					style={shadow}>
					Log out
				</button>
			</div>
		</div>
	);
}

export default Profile;
