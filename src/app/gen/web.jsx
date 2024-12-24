import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import Home from "../pages/home";
import Library from "../pages/library";
import Category from "../pages/lib pages/parent";
import Account from "../pages/account";
import SignUp from "../pages/account page/signup";
import About from "../pages/about";
import Settings from "../pages/settings";

// functionality
import { ImageProvider } from "./context";

function Web() {
	return (
		<BrowserRouter>
			<ImageProvider>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="library" element={<Library />} />
					<Route path="library/:category" element={<Category />} />
					<Route path="profile" element={<Account />} />
					<Route path="profile/:method" element={<SignUp />} />
					<Route path="about" element={<About />} />
					<Route path="settings" element={<Settings />} />
				</Routes>
				<Footer />
			</ImageProvider>
		</BrowserRouter>
	);
}

export default Web;
