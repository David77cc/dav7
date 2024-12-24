import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./account css/signin.css";
import { BsEyeSlashFill, BsEyeFill, BsX } from "react-icons/bs";
import { FaExclamationTriangle } from "react-icons/fa";
import { useImageContext } from "../../gen/context";

function LogIn() {
	const { login, userData } = useImageContext();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const [modalError, setModalError] = useState("");
	const [success, setSuccess] = useState("");
	const [errors, setErrors] = useState({
		email: "",
		password: "",
	});

	const validationMessage = {
		emailValidationMessage: "Invalid email address format.",
		passwordValidationMessage: "Password is required",
		emptyEmailField: "Email is required.",
	};

	function handleError(key, message) {
		setErrors((prev) => ({ ...prev, [key]: message }));
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setErrors((prev) => ({ ...prev, [name]: "" }));
		if (name === "email") {
			setEmail(value);

			if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
				handleError("email", "");
			} else {
				handleError("email", validationMessage.emailValidationMessage);
			}
		}

		if (name === "password") {
			setPassword(value);
			if (!value) {
				handleError(
					"password",
					validationMessage.passwordValidationMessage
				);
			} else {
				handleError("password", "");
			}
		}
	}

	function resetForm() {
		setEmail("");
		setPassword("");
	}

	function passwordToggler() {
		setShowPassword((previous) => !previous);
	}

	function handleSuccess() {
		setSuccess("");
		navigate("/");
	}

	async function handleClick(e) {
		e.preventDefault();

		if (!email) {
			handleError("email", validationMessage.emptyEmailField);
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			handleError("email", validationMessage.emailValidationMessage);
		}

		if (!password) {
			handleError(
				"password",
				validationMessage.passwordValidationMessage
			);
		}

		if (!errors.email && !errors.password) {
			const userCredentials = {
				email: email,
				password: password,
			};

			try {
				const response = await axios.post(
					"http://127.0.0.1:8000/api/login/",
					userCredentials
				);
				const {
					user_id,
					token,
					first_name,
					last_name,
					username,
					email,
				} = response.data;

				const userDatas = {
					user_id: user_id || "Guest",
					username: username || "Guest",
					token,
					first_name: first_name || "N/A",
					last_name: last_name || "N/A",
					email: email || "N/A",
				};

				resetForm();

				setSuccess("Logged In Successfully!!!");
				login(token, userDatas);
			} catch (error) {
				const errorMessage =
					error.response?.data?.error?.non_field_errors?.[0] ||
					"An Unknown error occurred";
				setModalError(errorMessage);
			}
		}
	}

	const modal = {
		height: "200px",
		boxShadow: "0 0 6px 1px #215",
	};

	const button = {
		background: "blue",
		boxShadow: "0 0 6px 1px #215",
		transition: "0.6s",
	};
	const icona = {
		position: "absolute",
		bottom: ".8rem",
		right: "0",
	};

	const notvisible = {
		opacity: "0",
	};

	const transition = {
		transition: "0.5s",
		boxShadow: "0 0 4px 1px #222",
	};

	let labelt = `absolute font-roboto left-0 top-1/4 transform -translate-y-2 text-[#000] transition-all duration-300 font-bold
		peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-0
		peer-focus:top-0 peer-focus:translate-y-[-1.5rem]
		`;

	let inputs = "peer w-full h-avgr bg-transparent focus:outline-none";
	let inputdiv = "relative w-4/5 h-13 border-b border-b-[#000]";
	return (
		<div className="form-cont relative flex bg-white h-fvp w-full justify-center items-center  ">
			<form className="flex h-4/6 w-4/5 bg-[#eaf0f3] rounded-3rem overflow-hidden justify-center items-center flex-col gap-y-3 shadow-custom-dark">
				<h1 className="font-sans text-5xl font-bold text-[#a06]">
					Log In
				</h1>
				<div className="h-2/4 w-full flex justify-center items-center flex- gap-y-small flex-col">
					<div className={inputdiv}>
						<input
							type="email"
							name="email"
							id="email"
							className={inputs}
							onChange={handleChange}
							autoComplete="email"
						/>
						<label
							htmlFor="email"
							className={`${labelt} ${
								email ? "top-0 translate-y-[-1.5rem]" : ""
							} text-[#00f]`}>
							Email
						</label>
						{errors.email && (
							<p className="text-red-500 text-sm">
								{errors.email}
							</p>
						)}
					</div>
					<div className={`${inputdiv} h-12`}>
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							id="password"
							className={inputs}
							onChange={handleChange}
							autoComplete="none"
						/>
						<label
							htmlFor="password"
							className={`${labelt} ${
								password ? "top-0 translate-y-[-1.5rem]" : ""
							} text-[#de2986]`}>
							Password
						</label>
						{errors.password && (
							<p className="text-red-500 text-sm pt-3">
								{errors.password}
							</p>
						)}
						<BsEyeFill
							style={showPassword ? icona : notvisible}
							className={`text-[#2f2] text-2xl cursor-pointer`}
							onClick={passwordToggler}
						/>
						<BsEyeSlashFill
							className={`text-[#f00] text-2xl cursor-pointer`}
							style={showPassword ? notvisible : icona}
							onClick={passwordToggler}
						/>
					</div>
				</div>
				<button
					className="h-avgr w-2/5 shadow-custom-light rounded-3rem focus:outline-none bg-[#f6a]
				text-lg font-bold text-[#fff] hover:w-3/5 mb-3 hover:text-[#2f2]"
					style={button}
					onClick={handleClick}
					type="button">
					Login
				</button>
				<div>
					<span className="text-lg text-[#E09C9C] font-bold">
						Don't have an account?
					</span>
					<Link
						to="/profile/signin"
						className="font-bold text-[#1f2]">
						<span> Sign In</span>
					</Link>
				</div>
			</form>
			{modalError && (
				<div
					className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-400 flex justify-center items-center ${
						modalError
							? "opacity-100 pointer-events-auto"
							: "opacity-0 pointer-events-none"
					} `}>
					<div
						className="relative bg-white p-5 rounded-1rem w-1/2 mx-auto mt-[20%] transform -translate-y-1/2 text-center overflow-hidden flex flex-col items-center justify-center"
						style={modal}>
						<div className="absolute top-0 w-full h-6 left-0 bg-red-700 flex items-center px-2">
							<FaExclamationTriangle className="text-yellow-500 text-lg" />
						</div>
						<button
							onClick={() => setModalError("")}
							className="mb-4 mt-3 p-2 text-white bg-red-500 rounded hover:bg-red-700">
							<BsX />
						</button>
						<p>{modalError}</p>
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
							Welcome back,{" "}
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
		</div>
	);
}

export default LogIn;
