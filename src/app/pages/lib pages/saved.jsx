import React from "react";
import { useImageContext } from "../../gen/context";
import "./lib css/saved.css";

function Saved() {
	const { getUserInteractions, userId, images } = useImageContext();
	const { userSaves } = getUserInteractions(userId);

	const saveImageData = userSaves.map((id) => images[id]);
	return (
		<div className="save-cont">
			<h2 className="s-header">Saved Images</h2>
			<div className="sav-images">
				{userSaves.length === 0 ? (
					<p>No saved image</p>
				) : (
					saveImageData.map((image, id) => (
						<div className="save-card" key={id}>
							<img
								src={image}
								alt={`saved img${id}`}
								className="save-imgs"
							/>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default Saved;
