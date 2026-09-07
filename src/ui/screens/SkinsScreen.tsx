// @ts-nocheck
import { Link } from "react-router-dom";

function Skins({ skins }) {
	return (
		<>
			<div>
				{/* Loop through the skin placeholders */}
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-8">
					{
						// Skins is an object passed through, need to map it regardless
						Object.entries(skins).map(([category, items]) => (
							items.map((item) => {
								return (
									<Link
										key={ item["name"] }
										to={`/skins/${encodeURIComponent(item["name"])}`}
										className="group flex flex-col rounded-lg bg-neutral-800/90 p-4 items-center"
									>
										<div className="transition-transform duration-300 hover:scale-110">
											<img
												src={ item["image"] }
												width={ 200 }
											/>
										</div>

										<div className="w-50 text-md mt-2">
											{ item["name"] }
										</div>

										<div 
											style={{ backgroundImage: `linear-gradient(to right, transparent, ${item.rarityColor}, transparent)` }}
											className="w-full h-[4px] mt-2"
										/>
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
