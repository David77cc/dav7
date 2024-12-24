import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./account css/signin.css";
import { useImageContext } from "../../gen/context";
import { BsEyeSlashFill, BsEyeFill, BsX } from "react-icons/bs";
import { FaExclamationTriangle } from "react-icons/fa";

function SignIn() {
	const { login, userData } = useImageContext();

	const navigate = useNavigate();

	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [errorModal, setErrorModal] = useState("");
	const [success, setSuccess] = useState("");
	const [showPassword, setShowPassword] = useState({
		pw: false,
		cpw: false,
	});

	const [errors, setErrors] = useState({
		cpw: "",
		pw: "",
		name: "",
		email: "",
		validationError: "",
	});

	function handleError(key, message) {
		setErrors((prev) => ({ ...prev, [key]: message }));
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setErrors((prev) => ({ ...prev, [name]: "" }));
		if (name === "userName") {
			setUserName(value);

			if (/^[\w\s.@+-]+$/.test(value)) {
				handleError("name", "");
			}
		}
		if (name === "email") {
			setEmail(value);

			if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
				handleError("email", "");
			} else {
				handleError("email", validationMessages.emailErrorMessage);
			}
		}
		if (name === "password") {
			setPassword(value);
		}
		if (name === "confirm") {
			setConfirm(value);
		}

		if (
			(name === "password" || name === "confirm") &&
			password === confirm
		) {
			if (password !== confirm) {
				handleError("cpw", validationMessages.misMatch);
			} else {
				handleError("cpw", "");
			}
		}
	}

	function resetForm() {
		setUserName("");
		setEmail("");
		setPassword("");
		setConfirm("");
		setErrors({
			cpw: "",
			name: "",
			email: "",
			pw: "",
			validationError: "",
		});
	}

	const validationMessages = {
		invalidUsername: "Invalid username.",
		emailErrorMessage: "Invalid Email Address.",
		misMatch: "Password do not match.",
	};

	const emptyFieldValidation = {
		usernameField: "Username is required.",
		emailField: "Email is required.",
		passwordField: "Password is required.",
	};

	function passwordToggler(value) {
		setShowPassword((prev) => ({
			...prev,
			[value]: !prev[value],
		}));
	}

	function handleSuccess() {
		setSuccess("");
		navigate("/");
	}

	async function handleClick(e) {
		e.preventDefault();

		let validationErrors = {};

		if (!userName) {
			validationErrors.name = emptyFieldValidation.usernameField;
		} else {
			if (!/^[\w\s.@+-]+$/.test(userName)) {
				validationErrors.name = validationMessages.invalidUsername;
			}
		}

		if (!password) {
			validationErrors.pw = emptyFieldValidation.passwordField;
		} else {
			if (password !== confirm) {
				validationErrors.cpw = validationMessages.misMatch;
			}
		}

		if (!email) {
			validationErrors.email = emptyFieldValidation.emailField;
		} else {
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
				validationErrors.email = validationMessages.emailErrorMessage;
			}
		}

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		// const profileName = userName.split(" ")[0];

		const newUser = {
			username: userName,
			email: email,
			password: password,
			confirm: confirm,
		};

		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/signup/",
				newUser
			);
			const { user_id, token, username, first_name, last_name, email } =
				response.data;
			console.log(response.data);
			const userDatas = {
				user_id: user_id || "Guest",
				username: username || "Guest",
				token,
				first_name: first_name || "N/A",
				last_name: last_name || "N/A",
				email: email || "N/A",
			};

			setSuccess("Signed Up Successfully!!!");
			login(token, userDatas);

			resetForm();
		} catch (error) {
			if (error.response && error.response.data) {
				const errorData = error.response.data.error;

				errorMessage = Object.entries(errorData)
					.map(([key, messages]) => {
						return Array.isArray(messages)
							? messages.join(", ")
							: String(messages);
					})
					.join(", ");
				setErrorModal({ validationError: errorMessage });
			} else if (error.request) {
				setErrorModal({
					validationError: "Network error. Please try again.",
				});
			} else {
				setErrorModal({
					validationError:
						"An error occurred. Please try again later.",
				});
			}
		}
	}

	const modal = {
		height: "200px",
		boxShadow: "0 0 6px 1px #215",
	};

	const shadow = {
		boxShadow: "0 0 6px 1px #215",
	};

	const icona = {
		position: "absolute",
		bottom: ".8rem",
		right: "0",
	};

	const notvisible = {
		opacity: "0",
	};

	const button = {
		background: "blue",
		boxShadow: "0 0 6px 1px #215",
		transition: "0.6s",
	};

	const transition = {
		transition: "0.5s",
		boxShadow: "0 0 4px 1px #222",
	};

	let labelt = `absolute font-roboto left-0 top-1/4 transform -translate-y-2 text-[#000] transition-all duration-300 font-bold
		peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-0
		peer-focus:top-0 peer-focus:translate-y-[-1.5rem]
		`;

	let nameLabel = `${userName && "top-0 translate-y-[-1.6rem]"}`;
	let emailLabel = `${email && "top-0 translate-y-[-1.6rem]"}`;
	let passwordLabel = `${password && "top-0 translate-y-[-1.6rem]"}`;
	let confirmLabel = `${confirm && "top-0 translate-y-[-1.6rem]"}`;

	let inputs =
		"peer w-full h-8 bg-transparent focus:outline-none border rounded-3rem border-none";
	let inputdiv =
		"relative w-full h-14 border-b border-b-[#000] flex flex-col justify-center";
	let form =
		"h-2/3 w-5/6 border rounded-3rem overflow-hidden flex justify-center items-center flex-col gap-y-smaller -[#b3acac] bg-white";

	return (
		<section className="form-cont h-fvp w-full flex items-center justify-center bg-[#b3acac] bg-[#acd0de]">
			<form className={`${form} form`} style={shadow}>
				<div className="input-cont h-4/5 w-full px-10 flex items-center flex-col justify-center gap-y-small">
					<div className={inputdiv}>
						<input
							type="text"
							name="userName"
							value={userName}
							onChange={handleChange}
							autoComplete="userName"
							className={inputs}
						/>
						<label
							htmlFor="userName"
							className={`${labelt} ${nameLabel} text-[#00f]`}>
							Username
						</label>
						{errors.name && (
							<p className="text-red-600 text-sm pt-2">
								{errors.name}
							</p>
						)}
					</div>
					<div className={inputdiv}>
						<input
							type="text"
							name="email"
							value={email}
							onChange={handleChange}
							autoComplete="email"
							className={inputs}
						/>
						<label
							htmlFor="email"
							className={`${labelt} ${emailLabel} text-[#00f]`}>
							Email
						</label>
						{errors.email && (
							<p className="text-red-600 text-sm pt-2">
								{errors.email}
							</p>
						)}
					</div>
					<div className={inputdiv}>
						<input
							type={showPassword.pw ? "text" : "password"}
							name="password"
							value={password}
							onChange={handleChange}
							autoComplete="none"
							className={inputs}
						/>
						<label
							htmlFor="password"
							className={`${labelt} ${passwordLabel} text-[#00f]`}>
							Password
						</label>
						<BsEyeFill
							style={showPassword.pw ? icona : notvisible}
							className={`text-[#2f2] text-2xl cursor-pointer`}
							onClick={() => passwordToggler("pw")}
						/>
						<BsEyeSlashFill
							className={`text-[#f00] text-2xl cursor-pointer`}
							style={showPassword.pw ? notvisible : icona}
							onClick={() => passwordToggler("pw")}
						/>
						{errors.pw && (
							<p className="text-red-600 text-sm">{errors.pw}</p>
						)}
					</div>
					<div className={inputdiv}>
						<input
							type={showPassword.cpw ? "text" : "password"}
							name="confirm"
							value={confirm}
							onChange={handleChange}
							autoComplete="none"
							className={inputs}
						/>
						<label
							htmlFor="confimr"
							className={`${labelt} ${confirmLabel} text-[#00f]`}>
							Confirm Password
						</label>
						<BsEyeFill
							style={showPassword.cpw ? icona : notvisible}
							className={`text-[#2f2] text-2xl cursor-pointer`}
							onClick={() => passwordToggler("cpw")}
						/>
						<BsEyeSlashFill
							className={`text-[#f00] text-2xl cursor-pointer`}
							style={showPassword.cpw ? notvisible : icona}
							onClick={() => {
								passwordToggler("cpw");
							}}
						/>
						{errors.cpw && (
							<p className="text-red-600 text-sm">{errors.cpw}</p>
						)}
					</div>
				</div>

				<button
					className="h-avgr w-2/5 shadow-custom-light rounded-3rem focus:outline-none bg-[#f6a]
				text-lg font-bold text-[#fff] hover:w-3/5 hover:text-[#2f2] mb-3"
					style={button}
					onClick={handleClick}>
					Sign Up
				</button>
				<div className="h-8 w-full flex justify-center gap-x-3">
					<span className="text-lg text-[#E09C9C] font-bold">
						Have an account?
					</span>
					<Link to="/profile/login" className="font-bold text-[#1f2]">
						<span>Login</span>
					</Link>
				</div>
			</form>
			{errorModal && (
				<div
					className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-400 flex justify-center items-center ${
						errorModal
							? "opacity-100 pointer-events-auto"
							: "opacity-0 pointer-events-none"
					} `}>
					<div
						className="relative bg-white p-5 rounded-1rem w-1/2 mx-auto mt-[20%] transform -translate-y-1/2 text-center overflow-hidden flex flex-col justify-center items-center"
						style={modal}>
						<div className="absolute top-0 w-full h-6 left-0 bg-red-700 flex items-center px-2">
							<FaExclamationTriangle className="text-yellow-500 text-lg" />
						</div>
						<button
							onClick={() => setErrorModal("")}
							className="mb-4 mt-3 p-2 text-white bg-red-500 rounded hover:bg-red-700">
							<BsX />
						</button>
						<div>
							{Object.values(errorModal).map((error, index) => (
								<p key={index}>{error}</p>
							))}
						</div>
					</div>
				</div>
			)}
			{success && (
				<div
					className={`fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-400 flex justify-center ${
						success
							? "opacity-100 pointer-events-auto"
							: "opacity-0 pointer-events-none"
					}`}>
					<div className="relative bg-[#fff] p-5 rounded-1rem w-2/3 h-2/5 mt-[20rem] transform text-center overflow-hidden flex flex-col items-center justify-center shadow-custom-dark">
						<h2 className="text-4xl font-bold text-[#481] mb-5">
							{success}
						</h2>
						<h2 className="text-4xl font-bold mb-5 text-[#2f2]">
							Welcome,{" "}
							<span className="text-[#a06]">
								{userData?.first_name}
							</span>
						</h2>
						<button
							className="bg-[#3a1] text-white px-3 py-2 hover:bg-[#481] rounded-3rem"
							onClick={handleSuccess}
							style={transition}>
							OK
						</button>
					</div>
				</div>
			)}
		</section>
	);
}

export default SignIn;
