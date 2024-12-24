import React from "react";

function Display() {
	return (
		<>
			<div className="cathIcon">
				<img
					src="/ph-static/IMG_0423.JPG"
					alt="displayIcon"
					className="cathImage"
				/>
			</div>
			<section className="selection">
				<span className="disp">Wallpapers</span>
				<span className="disp">Display styles</span>
				<span className="disp">Background Colors</span>
				<span className="disp">Hide Header</span>
				<span className="disp">Hide Footer</span>
			</section>
		</>
	);
}

export default Display;
