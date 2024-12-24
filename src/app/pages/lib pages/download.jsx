import React from "react";
import { useImageContext } from "../../gen/context";
import "./lib css/saved.css";

function Downloaded() {
	const { getUserInteractions, images, userId } = useImageContext();
	const { userDownloads, ...rest } = getUserInteractions(userId);

	const downloadedImageData = userDownloads.map((id) => images[id]);
	return (
		<div className="save-cont bg-[#d3e9e9]">
			<h2 className="s-header">Downloaded Images</h2>
			<div className="sav-images">
				{userDownloads.length === 0 ? (
					<p>No downloaded image</p>
				) : (
					downloadedImageData.map((image, index) => (
						<div className="save-card" key={image.id || index}>
							<img
								src={image}
								alt={`downloaded img${index + 1}`}
								className="save-imgs"
							/>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default Downloaded;
