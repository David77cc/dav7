import React from "react";
import { Link } from "react-router-dom";
import "./pages css/account.css";
import { useImageContext } from "../gen/context";
import Profile from "./profile";

function Account() {
	const { isAuthenticated } = useImageContext();
	return (
		<section className="account fade-in">
			{isAuthenticated ? (
				<Profile />
			) : (
				<div className="offline">
					<h3 className="brand">Oopsy you're not signed in</h3>
					<div className="data">
						<div className="sign-in acc">
							<span>Don't have an account no worries?</span>
							<Link to="signin">
								<button className="sign-btn act">
									Sign In
								</button>
							</Link>
						</div>
						<div className="login acc">
							<span>Have an account?</span>
							<Link to="login">
								<button className="log-btn act">Log In</button>
							</Link>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}

export default Account;
