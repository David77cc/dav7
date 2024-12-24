import React, { useState, useRef, useEffect, useCallback } from "react";
import "../pages/pages css/home.css";
import { useImageContext } from "../gen/context";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsX } from "react-icons/bs";

import { FaEllipsisV, FaHeart, FaBookmark } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

function Home() {
	const [open, setOpen] = useState([]);
	const { imageInteraction, images, userId, getUserInteractions } =
		useImageContext();
	const [fullScreenImage, setFullScreenImage] = useState(null);
	const [wallPaper, setWallPaper] = useState(null);
	const [loadedImages, setLoadedImages] = useState([]);
	const [signInModal, setSignInModal] = useState(true);
	const {
		save,
		like,
		downloadedImages,
		setSave,
		setLike,
		setDownloadedImages,
	} = imageInteraction;

	const { userLikes, userSaves, userDownloads } = getUserInteractions(userId);

	useEffect(() => {
		const modalDismissed = localStorage.getItem("signInModalDismissed");
		if (modalDismissed) {
			setSignInModal(false);
		}
	}, []);

	function closeSignInModal() {
		setSignInModal(false);
		localStorage.setItem("signInModalDismissed", "true");
	}

	const modalRefs = useRef([]);
	const observer = useRef(null);
	const imagerefs = useRef([]);

	useEffect(() => {
		observer.current = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const id = entry.target.getAttribute("data-id");
						if (!loadedImages.includes(id)) {
							setLoadedImages((prev) => [...prev, id]);
							observer.current.unobserve(entry.target);
						}
					}
				});
			},
			{ rootMargin: "0px 0px 100px 0px" }
		);

		imagerefs.current.forEach((imageElement, index) => {
			if (imageElement && !loadedImages.includes(index)) {
				observer.current.observe(imageElement);
			}
		});

		return () => {
			if (observer.current) {
				imagerefs.current.forEach((imageElement) => {
					if (imageElement) {
						observer.current.unobserve(imageElement);
					}
				});
				observer.current.disconnect();
			}
		};
	}, [images, loadedImages]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				modalRefs.current.every(
					(ref) => ref && !ref.contains(event.target)
				)
			) {
				setOpen([]);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	function handleImageLoad(id) {
		setLoadedImages((prev) => [...prev, id]);
	}

	function openOption(index, event) {
		if (event) event.stopPropagation();
		setOpen((previous) =>
			previous.includes(index)
				? previous.filter((i) => i !== index)
				: [...previous, index]
		);
	}

	function downloadImage(imageUrl, filename) {
		if (navigator?.msSaveBlob) {
			const blob = new Blob([imageUrl], { type: "image/jpeg" });
			navigator.msSaveBlob(blob, filename);
		} else {
			const link = document.createElement("a");
			link.href = imageUrl;
			link.download = filename;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}

	async function handleDownloadImages(id) {
		// if (!userId || (downloadedImages[userId] || []).includes(id)) return;

		const imageUrl = images[id];

		downloadImage(imageUrl, `downloaded-image-${id + 1}.jpg`);

		if (userId) {
			setDownloadedImages((prev) => ({
				...prev,
				[userId]: [...(prev[userId] || []), id],
			}));

			try {
				await axios.post(
					`http://127.0.0.1:8000/api/user-interactions/${id}/download/`,
					{
						user_id: userId,
						image_id: id,
						action_type: "download",
						image_url: imageUrl,
					},
					{
						headers: {
							Authorization: `Token ${localStorage.getItem(
								"token"
							)}`,
							"Content-Type": "application/json",
						},
					}
				);
			} catch (error) {
				console.error("Error logging download", error);
			}
		}
	}

	async function handleInteraction(id, actionType, state, setState) {
		if (!userId) return;
		const userState = state[userId] || [];
		const action = userState.includes(id) ? `un${actionType}` : actionType;

		try {
			const response = await axios.post(
				`http://127.0.0.1:8000/api/user-interactions/${id}/${actionType}/`,
				{
					image_id: id,
					action_type: action,
					image_url: images[id],
				},
				{
					headers: {
						Authorization: `Token ${localStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
				}
			);
			console.log(`${actionType} action response:`, response.data);

			setState((prevState) => {
				const updatedState = { ...prevState };
				updatedState[userId] = userState.includes(id)
					? userState.filter((i) => i !== id)
					: [...userState, id];
				return updatedState;
			});
		} catch (error) {
			console.error(`Error handling ${actionType}:`, error);
		}
	}

	const triggerLike = useCallback(
		(id) => {
			handleInteraction(id, "like", like, setLike);
		},
		[like]
	);

	const triggerSave = useCallback(
		(id) => {
			handleInteraction(id, "save", save, setSave);
		},
		[save]
	);

	function openFullScreenImage(img) {
		setFullScreenImage(img);
	}

	function applyWallPaper(id) {
		setWallPaper(images[id]);
	}
	const transition = {
		transition: "0.5s",
		boxShadow: "0 0 4px 1px #222",
	};

	return (
		<div
			className="home fade-in"
			style={{
				background: wallPaper
					? `url(${wallPaper}) center / cover no-repeat `
					: "",
			}}>
			{images.length === 0 ? (
				<p>No Images Found</p>
			) : (
				images.map((image, id) => (
					<div className="card" key={id}>
						<span className="cover" onClick={() => openOption(id)}>
							<FaEllipsisV className="menu" />
						</span>
						<div
							ref={(el) => (modalRefs.current[id] = el)}
							className={
								open.includes(id) ? "options active" : "options"
							}>
							<button
								className="close"
								onClick={(e) => openOption(id, e)}>
								&times;
							</button>
							<button
								className="optb"
								onClick={(e) => openFullScreenImage(id, e)}>
								full screen
							</button>
							<button
								className="optb"
								onClick={() => handleDownloadImages(id)}>
								download
							</button>
							<button
								className="optb"
								onClick={(e) => applyWallPaper(id, e)}>
								set as wallpaper
							</button>
							<button
								className="optb"
								onClick={(e) => triggerSave(id, e)}>
								save
							</button>
							<button
								className="optb"
								onClick={(e) => triggerLike(id, e)}>
								favorite
							</button>
						</div>
						<div
							className={`image-loading-cont ${
								loadedImages.includes(id) ? "loaded" : ""
							}`}>
							<img
								ref={(el) => (imagerefs.current[id] = el)}
								key={id}
								src={image}
								alt={`img-${id + 1}`}
								className={`picx ${
									loadedImages.includes(id) ? "loaded" : ""
								}`}
								loading="lazy"
								data-id={id}
								onLoad={() => handleImageLoad(id)}
							/>
						</div>
						<div className="action">
							<FaHeart
								className={
									userLikes.includes(id)
										? "fa heart active"
										: "fa heart"
								}
								onClick={() => triggerLike(id)}
							/>
							<FiDownload
								className={`fa download ${
									userDownloads.filter(
										(downloadId) => downloadId === id
									).length > 0
										? "download active"
										: "download"
								}`}
								onClick={() => handleDownloadImages(id)}
							/>

							<FaBookmark
								className={
									userSaves.includes(id)
										? "fa save active"
										: "fa save"
								}
								onClick={() => triggerSave(id)}
							/>
						</div>
						<div
							className={
								open.includes(id) ? "overlay active" : "overlay"
							}
							onClick={() => openOption(id)}></div>
					</div>
				))
			)}
			{fullScreenImage !== null && (
				<div
					className="full-screen-cont"
					onClick={() => setFullScreenImage(null)}>
					<img
						src={images[fullScreenImage]}
						alt={`full-screen-${fullScreenImage}`}
						className="full-screen-image"
					/>
				</div>
			)}
			{signInModal && (
				<div
					className={`fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-400 flex justify-center
						opacity-100 pointer-events-auto"
					`}>
					<div className="relative bg-[#fff] p-5 rounded-1rem w-2/3 h-2/5 mt-[20rem] transform text-center overflow-hidden flex flex-col items-center justify-center shadow-custom-dark">
						<h2 className="text-3xl font-bold mb-5 text-[#a05]">
							Sign-In to save your activity
						</h2>
						<button
							className="w-10 h-10 absolute top-1 right-2 bg-[#bd1414] text-white hover:bg-[#872914] rounded-4rem flex justify-center items-center"
							onClick={closeSignInModal}
							style={transition}>
							<BsX />
						</button>
						<Link
							to="/profile/signin"
							className="bg-[#a05] text-white px-3 py-2 hover:bg-[#481] rounded-3rem"
							onClick={closeSignInModal}
							style={transition}>
							OK
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}

export default Home;
