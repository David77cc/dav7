import React from "react";
import { useImageContext } from "../../gen/context";
import "./lib css/saved.css";

function Favorite() {
	const { getUserInteractions, images, userId } = useImageContext();
	const { userLikes } = getUserInteractions(userId);

	const likedImageData = userLikes
		.map((id) => images[id])
		.filter((image) => image !== undefined);
	return (
		<div className="save-cont bg-[#cd1c63]">
			<h2 className="s-header">Favorite Images</h2>
			<div className="sav-images">
				{userLikes.length === 0 ? (
					<p>No Favorite image</p>
				) : (
					likedImageData.map((image, index) => (
						<div className="save-card" key={image.id || index}>
							<img
								src={image}
								alt={`favorite img${index}`}
								className="save-imgs"
							/>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default Favorite;
