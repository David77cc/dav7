import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Web from "./app/gen/web";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<StrictMode>
		<Web />
	</StrictMode>
);
