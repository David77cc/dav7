import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function Acct() {
	const [popUpModal, setPopUpModal] = useState(false);

	const navigate = useNavigate();

	function popUp() {
		setPopUpModal(true);
	}

	function disableModal() {
		setPopUpModal((prev) => !prev);
	}

	function deleteModal() {
		setPopUpModal((prev) => !prev);
		navigate("/");
	}

	return (
		<>
			<div className="cathIcon">
				<FaUser className="set-mid" />
			</div>
			<section className="selection acc-ount">
				<span className="ount" onClick={popUp}>
					Delete account
				</span>
				<Link to="/profile" className="ount">
					<span>Edit account</span>
				</Link>
				<div
					className={
						!popUpModal ? "acct-modal" : "acct-modal active"
					}>
					<p className="at">
						Are you sure you want to delete this account? and please
						note that this action cannot be undone.
					</p>
					<div className="btn-containers">
						<button className="dlt-acct-opt" onClick={deleteModal}>
							Yes
						</button>
						<button className="dlt-acct-opt" onClick={disableModal}>
							No
						</button>
					</div>
				</div>
			</section>
		</>
	);
}

export default Acct;
