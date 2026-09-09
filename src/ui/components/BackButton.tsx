import { useNavigate } from "react-router-dom";

function BackButton() {
	const navigate = useNavigate();
	return (
		<div className="flex justify-center bg-slate-700/20 rounded-sm border-1 border-slate-700 w-20 m-2 hover:border-neutral-400 transition-colors">
			<button className="p-2 cursor-pointer" onClick={() => navigate(-1)}>
				Back
			</button>
		</div>
	);
}

export default BackButton;
