import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Favorite from "./favorite";
import Saved from "./saved";
import Downloaded from "./download";

function Category() {
	const { category } = useParams();
	const navigate = useNavigate();

	if (!category) {
		navigate("/library");
		return null;
	}

	let page;
	switch (category) {
		case "favorite":
			page = <Favorite />;
			break;
		case "save":
			page = <Saved />;
			break;
		case "downloads":
			page = <Downloaded />;
			break;
		default:
			page = <div>Category not found</div>;
	}
	return (
		<>
			{/* <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2> */}
			{page}
		</>
	);
}

export default Category;
