import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const ImageContext = createContext();

export function useImageContext() {
	return useContext(ImageContext);
}

export function ImageProvider({ children }) {
	const [like, setLike] = useState({});
	const [save, setSave] = useState({});
	const [downloadedImages, setDownloadedImages] = useState({});
	const [userData, setUserData] = useState({});
	const [profileP, setProfileP] = useState("");
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [color, setColor] = useState("#960fe5");
	const [userId, setUserId] = useState(null);

	const imagesUpper = import.meta.glob(
		"../../ph-asset/*.(png|jpe?g|svg|JPG|JPEG)",
		{
			eager: true,
		}
	);

	const imagesLower = import.meta.glob(
		"../../new-img/*.(png|jpe?g|svg|jpg|jpeg)",
		{
			eager: true,
		}
	);

	const allImages = {
		...imagesUpper,
		...imagesLower,
	};

	const imageArray = Object.values(allImages).map((image) => image.default);

	useEffect(() => {
		const token = localStorage.getItem("token");
		const storedUserData = localStorage.getItem("userData");
		const storedUserId = localStorage.getItem("userId");

		if (token && storedUserData) {
			setIsAuthenticated(true);
			setUserData(JSON.parse(storedUserData));
			setUserId(storedUserId);

			axios
				.get("http://127.0.0.1:8000/api/user-interactions/", {
					headers: {
						Authorization: `Token ${token}`,
					},
				})
				.then((response) => {
					const likedImages = response.data
						.filter((item) => item.action_type === "like")
						.map((item) => item.image_id);
					const savedImages = response.data
						.filter((item) => item.action_type === "save")
						.map((item) => item.image_id);
					const downloadedImage = response.data
						.filter((item) => item.action_type === "download")
						.map((item) => item.image_id);

					setLike((prev) => ({
						...prev,
						[storedUserId]: likedImages,
					}));
					setSave((prev) => ({
						...prev,
						[storedUserId]: savedImages,
					}));
					setDownloadedImages((prev) => ({
						...prev,
						[storedUserId]: downloadedImage,
					}));
				})
				.catch((error) => {
					console.error("Error fetching user interactions:", error);
				});
		} else {
			setIsAuthenticated(false);
			setUserData({});
			setLike({});
			setSave({});
			setUserId(null);
			setDownloadedImages({});
		}
	}, []);

	const getUserInteractions = (userId) => {
		return {
			userLikes: like[userId] || [],
			userSaves: save[userId] || [],
			userDownloads: downloadedImages[userId] || [],
		};
	};

	const login = (token, userData) => {
		localStorage.setItem("token", token);
		localStorage.setItem("userData", JSON.stringify(userData));
		localStorage.setItem("userId", userData.user_id);
		setIsAuthenticated(true);
		setUserData(userData);
		setUserId(userData.user_id);
	};

	const logout = () => {
		["token", "userData", "userId"].forEach((key) =>
			localStorage.removeItem(key)
		);
		setIsAuthenticated(false);
		setUserData({});
		setUserId(null);
		setLike({});
		setSave({});
	};

	const value = {
		imageInteraction: {
			like,
			setLike,
			save,
			setSave,
			downloadedImages,
			setDownloadedImages,
		},
		userData,
		userId,
		images: imageArray,
		profileP,
		setProfileP,
		login,
		logout,
		isAuthenticated,
		getUserInteractions,
		color,
		setColor,
	};

	return (
		<ImageContext.Provider value={value}>{children}</ImageContext.Provider>
	);
}
