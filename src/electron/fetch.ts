// @ts-nocheck
import "dotenv/config";
import { URLSearchParams } from "url";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";

// const csfloatAPIKey = process.env.csfloatAPIKey;

// // Fetch CSFloat data from CSFloat API
// export const fetchFromCSFloat = async (
// 	limit: Limit = 10,
// 	sort: Sort = "lowest_price",
// 	minFloat: number | null = null,
// 	maxFloat: number | null = null,
// 	paintSeed: number | null = null,
// 	type: RERE = "buy_now",
// 	marketHashName: string
// ): Promise<CSFloatObj | null> => {
// 	const csfloatURL: URL = new URL("https://csfloat.com/api/v1/listings");
// 	const params: URLSearchParams = new URLSearchParams();

// 	if (limit !== undefined) {
// 		params.append("limit", limit.toString());
// 	}
// 	if (sort) {
// 		params.append("sort_by", sort);
// 	}

// 	if (minFloat !== null) {
// 		params.append("min_float", minFloat.toString());
// 	}

// 	if (maxFloat !== null) {
// 		params.append("max_float", maxFloat.toString());
// 	}

// 	if (paintSeed != null) {
// 		params.append("paint_seed", paintSeed.toString());
// 	}
// 	if (type !== undefined) {
// 		params.append("type", type);
// 	}
// 	if (marketHashName !== undefined) {
// 		params.append("market_hash_name", marketHashName);
// 	}

// 	csfloatURL.search = params.toString();

// 	try {
// 		const res: Response = await fetch(csfloatURL, {
// 			headers: {
// 				// Non-null assertion with "!"
// 				Authorization: process.env.csfloatAPIKey!,
// 			},
// 		});

// 		if (!res.ok) {
// 			throw new Error(`Err: ${res.status}`);
// 		}

// 		let data: CSFloatData = await res.json();

// 		// Extract data
// 		const itemID: string = data["data"][0]["id"];

// 		const timestamp: string = data["data"][0]["created_at"];
// 		const postedTime = dayjs(timestamp);
// 		dayjs.extend(relativeTime);
// 		const timeMessage: string = postedTime.fromNow();

// 		const price: number = data["data"][0]["price"] / 100;

// 		const charmIndex: number = data["data"][0]["item"]["keychain_index"];
// 		const charmPattern: number = data["data"][0]["item"]["keychain_pattern"];
// 		const icon: string = data["data"][0]["item"]["icon_url"];
// 		const name: string = data["data"][0]["item"]["market_hash_name"];
// 		const inspectLink: string = data["data"][0]["item"]["inspect_link"];

// 		const obj: CSFloatObj = {
// 			itemID,
// 			timeMessage,
// 			price,
// 			charmIndex,
// 			charmPattern,
// 			icon,
// 			name,
// 			inspectLink,
// 		};

// 		return obj;
// 	} catch (err) {
// 		console.error(err);
// 		return null;
// 	}
// };

// Fetch placeholder data for case hardened skins
export const fetchCollections = async (): Promise<FetchCollectionsResult | null> => {
	// API link for skin collections	
	const skinsAPI: string = "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json";

	try {
		// Fetching
		const res: Response = await fetch(skinsAPI);
		const data: CollectionsFetch[] = await res.json();

		// Arrays for all knives and rifles
		const knives = [];
		const rifles = [];
			
		// Loop through the entire array of data
		for(let i = 0; i < data.length; i++) {
			// Fetch category and pattern to only get data for specific items
			const category = data[i]["category"]["name"];
			const pattern = data[i]["pattern"]?.["name"];
			
			// Conditional to check if item is a knife or rifle
			if ((category === "Knives") && (pattern === "Case Hardened") || (category === "Rifles") && (pattern === "Case Hardened")) {
				// Temporary item obj
				const item = {};

				// Item data
				const name = data[i]["weapon"]["name"];
				const minFloat = data[i]["min_float"];
				const maxFloat = data[i]["max_float"];
				const rarityColor = data[i]["rarity"]["color"];

				// All possible wears of the item
				const wears = [];
				for (let j = 0; j < data[i]["wears"].length; j++) {
					const w = data[i]["wears"][j]["name"];
					wears.push(w);
				}

				// Item's possible lootboxes/crates
				const lootBoxes = [];
				for (let k = 0; k < data[i]["crates"].length; k++) {
					const lootBox = {};

					const lootBoxName = data[i]["crates"][k]["name"];
					const lootBoxImage = data[i]["crates"][k]["image"];

					lootBox["lootBoxName"] = lootBoxName;
					lootBox["lootBoxImage"] = lootBoxImage;
					lootBoxes.push(lootBox);
				}

				// Push item data into temporary item obj
				item["name"] = name;
				item["minFloat"] = minFloat;
				item["maxFloat"] = maxFloat;
				item["rarityColor"] = rarityColor;
				item["wears"] = wears;
				item["lootBoxes"] = lootBoxes;

				// Push temporary item obj into persistent parent array
				if (category === "Knives") {
					knives.push(item);
				} else {
					rifles.push(item);
				}
			}
		}
	} catch (err) {
		console.error(err);
		return null;
	}
};
