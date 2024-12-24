import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function Content() {
	const [search, setSearch] = useState(false);
	const [showSrc, setShowSrc] = useState(false);

	function flipSearch() {
		setSearch((prev) => !prev);
	}
	function flipSrc() {
		setShowSrc(true);
	}
	return (
		<>
			<div className="cathIcon">
				<img
					src="/ph-static/IMG_0407.JPG"
					alt="displayIcon"
					className="h-[130px] w-[100px] object-cover"
				/>
			</div>
			<section className="selection con-ten">
				<span className="conte">Import content</span>
				<span className="conte" onClick={flipSearch}>
					{search ? "Hide Search bar" : "Search for content"}
				</span>
				{search && (
					<div
						onClick={flipSrc}
						className={
							showSrc ? "src-cont-ent" : "src-cont-ent naur"
						}>
						<input
							type="text"
							name="search"
							className={
								showSrc ? "src-content" : "src-content naur"
							}
						/>
						<FaSearch
							className={!showSrc ? "fa-srch" : "fa-srch naur"}
						/>
					</div>
				)}
			</section>
		</>
	);
}

export default Content;
