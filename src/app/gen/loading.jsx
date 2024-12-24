import React from "react";
import "./../gen css/loading.css";

function Loading() {
	return (
		<>
			<div className="overlay-home"></div>
			<div className="loading-cont">
				<div className="circle"></div>
				<div className="circle"></div>
				<div className="circle"></div>
			</div>
		</>
	);
}

export default Loading;
