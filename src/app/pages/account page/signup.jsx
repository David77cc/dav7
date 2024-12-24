import React from "react";
import { useParams } from "react-router-dom";
import SignIn from "./signin";
import LogIn from "./login";

function SignUp() {
	const { method } = useParams();

	let sign;

	switch (method) {
		case "signin":
			sign = <SignIn />;
			break;
		case "login":
			sign = <LogIn />;
			break;
		default:
			sign = <h1>Not Found</h1>;
	}

	return <>{sign}</>;
}

export default SignUp;
