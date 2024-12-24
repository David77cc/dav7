import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import "./pages css/settings.css";

import Display from "./settings/display";
import Content from "./settings/content";
import Acct from "./settings/acct";
import { useImageContext } from "../gen/context";

function Settings() {
	const [activeComponent, setActiveComponent] = useState("display");

	const { isAuthenticated } = useImageContext();

	function handleComponent(component) {
		setActiveComponent(component);
	}

	const display = "display";
	const content = "content";
	const account = "account";
	const data = "data";

	let page;
	switch (activeComponent) {
		case "display":
			page = <Display />;
			break;
		case "content":
			page = <Content />;
			break;
		case "account":
			page = <Acct />;
			break;
		case "data":
			page = (
				<div className="selection">
					<span className="disp">Erase all your data</span>
				</div>
			);
			break;
		default:
			page = <h1>Page not found</h1>;
	}

	return (
		<section className="settings-cont fade-in">
			<nav className="navlink">
				<NavLink
					className="seth"
					onClick={() => handleComponent(display)}
					to="">
					Display <FaCog className="seth-rolling" />
				</NavLink>

				<NavLink
					className="seth"
					onClick={() => handleComponent(content)}
					to="">
					Content
					<FaCog className="seth-rolling" />
				</NavLink>

				{isAuthenticated && (
					<NavLink
						className="seth"
						onClick={() => handleComponent(account)}
						to="">
						Account
						<FaCog className="seth-rolling" />
					</NavLink>
				)}

				{isAuthenticated && (
					<NavLink
						className="seth"
						onClick={() => handleComponent(data)}
						to="">
						Data
						<FaCog className="seth-rolling" />
					</NavLink>
				)}
			</nav>
			<article className="spanned">{page}</article>
		</section>
	);
}

export default Settings;
