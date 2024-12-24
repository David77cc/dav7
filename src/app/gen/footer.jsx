import React from "react";
import { NavLink } from "react-router-dom";
import "../gen css/footer.css";

function Footer() {
	return (
		<footer>
			<div className="links">
				<span>
					<NavLink to="/">Home</NavLink>
				</span>
				<span>
					<NavLink to="about">About</NavLink>
				</span>
				<span>
					<NavLink to="library">Library</NavLink>
				</span>
				<span>
					<NavLink to="profile">Profile</NavLink>
				</span>
				<span>
					<NavLink to="settings">Settings</NavLink>
				</span>
				<span>
					<NavLink to="/">Slide Show</NavLink>
				</span>
			</div>
			<div className="info">
				<p>2024 Copyright &copy; David_eX_77 all right reserved</p>
			</div>
		</footer>
	);
}

export default Footer;
