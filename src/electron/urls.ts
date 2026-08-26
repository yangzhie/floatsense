/**
 * Fetches screenshots of an item in the CSFloat DB,
 * either playside or backside depending on request.
 * 
 * @param side playside of skin, or backside of skin.
 * @param ID UUID of the skin in CSFloat DB.
 * 
 * @returns playside or backside PNG CSFloat link.
 */
export const reversedSideURL = (side: "playside" | "backside", ID: number): string => {
	// Custom CSFloat URL for playside/backside screenshots of item
	if (side === "playside") {
		return `https://csfloat.pics/m/${ID}/playside.png?v=3`;
	} else {
		return `https://csfloat.pics/m/${ID}/backside.png?v=3`;
	}
};