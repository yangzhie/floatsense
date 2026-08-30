// @ts-nocheck
import { Link } from "react-router-dom";

function Skins({ skins }) {
	return (
		<>
			<div>
				<p className="text-[50px] mt-15">Skins</p>

				{/* Loop through the skin placeholders */}
				<div className="flex flex-wrap justify-center h-full mt-10">
					{
						// Skins is an object passed through, need to map it regardless
						Object.entries(skins).map(([category, items]) => (
							items.map((item) => {
								return (
									<Link
										key={ item["name"] }
										to={`/skins/${encodeURIComponent(item["name"])}`}
										className="flex flex-col items-center justify-center px-10 m-0"
									>
										<div className="w-50 text-2xl">
											{ item["name"] }
										</div>

										<div className="flex justify-center">
											<img
												src={ item["image"] }
												width={ 175 }
											/>
										</div>
									</Link>
								)
							})
						))
					}
				</div>
			</div>
		</>
	);
}

export default Skins;
