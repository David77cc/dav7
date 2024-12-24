import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "../gen css/general.css";
import "../gen css/header.css";
import { useImageContext } from "./context";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const { userData, profileP, isAuthenticated, color } = useImageContext();
	const [responsiveNavBar, setResponsiveNavBar] = useState(false);

	function toggleNavBar() {
		setResponsiveNavBar((prev) => !prev);
	}

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const isMobile = windowWidth <= 820;
	return (
		<header>
			<nav>
				{isMobile || (
					<ul>
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						<li>
							<NavLink to="about">About</NavLink>
						</li>
						<li>
							<NavLink to="library">Library</NavLink>
						</li>
						<li>
							<NavLink to="profile">Profile</NavLink>
						</li>
						<li>
							<NavLink to="settings">Settings</NavLink>
						</li>
					</ul>
				)}
				{isMobile && (
					<>
						{responsiveNavBar ? (
							<FaTimes
								className={`menu-bar absolute left-10 cursor-pointer hover:text-[#c92424] text-[#f00]`}
								aria-expanded={
									responsiveNavBar ? "true" : "false"
								}
								onClick={toggleNavBar}
							/>
						) : (
							<FaBars
								className={`menu-bar absolute left-10 cursor-pointer hover:text-[#33a833] text-[#0f0]`}
								aria-expanded={
									responsiveNavBar ? "true" : "false"
								}
								aria-label="open menu"
								onClick={toggleNavBar}
							/>
						)}

						<ul
							className={`res-nav fixed flex flex-col items-center ${
								responsiveNavBar ? "open" : ""
							}`}>
							<li>
								<NavLink to="/" onClick={toggleNavBar}>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink to="about" onClick={toggleNavBar}>
									About
								</NavLink>
							</li>
							<li>
								<NavLink to="library" onClick={toggleNavBar}>
									Library
								</NavLink>
							</li>
							<li>
								<NavLink to="profile" onClick={toggleNavBar}>
									Profile
								</NavLink>
							</li>
							<li>
								<NavLink to="settings" onClick={toggleNavBar}>
									Settings
								</NavLink>
							</li>
						</ul>
					</>
				)}
				{isAuthenticated && (
					<div className="flex h-60 w-20 overflow-hidden rounded-4rem justify-center items-center pt-1.5">
						<Link
							to="/profile"
							className="flex flex-col items-center">
							<div
								className="flex h-avgr w-avgr font-bold overflow-hidden justify-center cursor-pointer rounded-4rem items-center "
								style={{ backgroundColor: color }}>
								{profileP ? (
									<img
										src={profileP}
										className="object-fit-cover"
										alt="user profile"
										onError={(e) =>
											(e.target.style.display = "none")
										}
									/>
								) : (
									<span className="font-bold text-white">
										{userData?.first_name
											? userData.first_name[0]
											: ""}
									</span>
								)}
							</div>
							<span className="signed text-orange-400 text-sm font-bold">
								{userData?.first_name}
							</span>
						</Link>
					</div>
				)}
				{!isAuthenticated && (
					<Link to="/profile">
						<span className="text-[#2f2] font-bold cursor-pointer text-sm">
							Sign In
						</span>
					</Link>
				)}
			</nav>
		</header>
	);
}

export default Header;
