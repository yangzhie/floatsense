import { useParams, Link } from "react-router-dom";
import BackBtn from "../../utils/BackBtn";

// @ts-ignore
function Charms({ charmsData }) {
	const { collectionCharm } = useParams();

	// Map slug to the corresponding key
	const collectionCharmMap = {
		missingLink: "missingLink",
		smallArms: "smallArms",
		missingLinkCommunity: "missingLinkCommunity",
		drBoom: "drBoom",
	};

	// @ts-ignore
	// Using object lookup, not array lookup
	const selectedKey = collectionCharmMap[collectionCharm];
	const charms = charmsData[selectedKey];
	return (
		<>
			<BackBtn />

			<div className="h-full">
				<div className="flex flex-wrap justify-center gap-6 p-1 mt-6">
					{
						// @ts-ignore
						charms.map((charm, idx) => (
							<Link
								to={`/collections/${collectionCharm}/${charm["name"]}`}
								key={idx}
								state={charm}
							>
								<div key={idx} className="flex flex-col w-24">
									<div>
										<img
											src={charm["image"]}
											alt={charm["name"]}
										/>
									</div>
									<div className="text-lg">
										{charm["name"]}
									</div>
								</div>
							</Link>
						))
					}
				</div>
			</div>
		</>
	);
}

export default Charms;
