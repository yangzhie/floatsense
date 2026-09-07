import { useNavigate } from "react-router-dom";

function BackButton() {
	const navigate = useNavigate();
	return (
		<div className="flex justify-start">
			<button className="p-2 cursor-pointer" onClick={() => navigate(-1)}>
				Back
			</button>
		</div>
	);
}

export default BackButton;
