import React from "react";
import { useImageContext } from "../gen/context";
import { Link } from "react-router-dom";

import "./pages css/library.css";

import { AiOutlineDownload, AiFillHeart, AiFillSave } from "react-icons/ai";

function Library() {
	const { getUserInteractions, userId } = useImageContext();

	const { userLikes, userSaves, userDownloads } = getUserInteractions(userId);

	const ariaLabels = {
		downloads: "Go to Downloads section",
		favorite: "Go to Favorite section",
		save: "Go to Saved section",
	};

	return (
		<div className="lib fade-in bg-[#b18b10]">
			<h2 className="lib-header">Library</h2>
			<div className="content">
				<Link to="downloads" aria-label={ariaLabels.downloads}>
					<div className="downloads category-item">
						<span className="icon">
							<AiOutlineDownload className="fa" />
						</span>
						downloads ({userDownloads.length})
					</div>
				</Link>
				<Link to="favorite" aria-label={ariaLabels.favorite}>
					<div className="favorite category-item">
						<span className="icon">
							<AiFillHeart className="fa" />
						</span>
						favorite ({userLikes.length})
					</div>
				</Link>
				<Link to="save" aria-label={ariaLabels.save}>
					<div className="save category-item">
						<span className="icon">
							<AiFillSave className="fa" />
						</span>
						saved ({userSaves.length})
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Library;
