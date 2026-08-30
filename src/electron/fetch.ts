import "dotenv/config";
const csfloatAPIKey = process.env.csfloatAPIKey;

import { URLSearchParams } from "url";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
dayjs.extend(relativeTime);

import { reversedSideURL } from "./urls.ts";

/**
 * Fetches CSGO-API skin DB and filters every case hardened knife and rifle,
 * returning generic data for it.
 * 
 * @returns Object of knives or rifles arrays, or null if fetch fails.
 */
export const fetchSkins = async (): Promise<{ knives: CaseHardenedItem[], rifles: CaseHardenedItem[] } | null> => {
	// API link for skins	
	const skinsAPI: string = "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json";

	try {
		// Fetching
		const res: Response = await fetch(skinsAPI);
		const data: ByMykelData[] = await res.json();

		// Arrays for all knives and rifles
		const knives: CaseHardenedItem[] = [];
		const rifles: CaseHardenedItem[] = [];
			
		// Loop through the entire array of data
		for(let i = 0; i < data.length; i++) {
			// Fetch category and pattern to only get data for specific items
			const category: string = data[i]["category"]["name"];
			const pattern: string | undefined = data[i]["pattern"]?.["name"];
			
			// Conditional to check if item is a knife or rifle
			if ((category === "Knives") && (pattern === "Case Hardened") || (category === "Rifles") && (pattern === "Case Hardened")) {
				// Item data
				const name: string = data[i]["weapon"]["name"];
				const image: string = data[i]["image"];
				const minFloat: number = data[i]["min_float"];
				const maxFloat: number = data[i]["max_float"];
				const rarityColor: string = data[i]["rarity"]["color"];

				// All possible wears of the item
				const wears: string[] = [];
				for (let j = 0; j < data[i]["wears"].length; j++) {
					const w = data[i]["wears"][j]["name"];
					wears.push(w);
				}

				// Item's possible lootboxes/crates
				const lootBoxes: LootBox[] = [];
				for (let k = 0; k < data[i]["crates"].length; k++) {
					const lootBoxName: string = data[i]["crates"][k]["name"];
					const lootBoxImage: string = data[i]["crates"][k]["image"];

					const lootBox: LootBox = { lootBoxName, lootBoxImage };
					lootBoxes.push(lootBox);
				}

				// Temporary item obj and push item data
				const item: CaseHardenedItem = { name, image, minFloat, maxFloat, rarityColor, wears, lootBoxes };

				// Push temporary item obj into persistent parent array
				if (category === "Knives") {
					knives.push(item);
				} else {
					rifles.push(item);
				}
			}
		}
	
		return { knives, rifles }
	} catch (err) {
		console.error(err);
		return null;
	}
};

/**
 * Fetches a relative number of listings of listed items on CSFloat
 * according to user input. 
 * 
 * @param defIndex Type of weapon - relative to CSFloat.
 * @param paintSeed Weapon paint seed (0 - 1000).
 * @param paintIndex Weapon paint index (case hardened).
 * @param limit Limit of fetching weapons per request.
 * @param type Buying type of listing (auc/now).
 * @param category Weapon separation normal, stattrack or souvenir.
 * 
 * @returns Array of objects, where each object is a CSFloat listing.
 */
export const fetchFromCSFloat = async (
	defIndex: DefIndex,
	paintSeed: number | null = null,
	paintIndex: number = 44,
	limit: Limit = 5,
	type: BuyType = null,
	category: Category = 0
): Promise<CSFloatItem[] | null> => {
	// Base (un-modified) URL
	const csfloatURL: URL = new URL("https://csfloat.com/api/v1/listings");
	
	// Attach user-defined params to URL
	const params: URLSearchParams = new URLSearchParams();
	params.append("sort_by", "most_recent");
	params.append("def_index", defIndex.toString());
	if (paintSeed !== null) {
		params.append("paint_seed", paintSeed.toString());
	} 
	params.append("paint_index", paintIndex.toString());
	params.append("limit", limit.toString());
	if (type !== null) {
		params.append("type", type);
	}
	params.append("category", category.toString());
	csfloatURL.search = params.toString();

	// Try fetching item data
	try {
		// Fetch from user-defined modified URL
		const res: Response = await fetch(csfloatURL, {
			headers: {
				Authorization: process.env.csfloatAPIKey!,
			},
		});

		// Case: no response
		if (!res.ok) {
			throw new Error(`Err: ${res.status}`);
		}

		// Convert response to JSON
		const data: CSFloatResponse = await res.json();

		// Persistent arrays for data storage
		const itemArr: CSFloatItem[] = [];

		// Loop through the listings
		for (let i = 0; i < data["data"].length; i++) {
			// Generic item data
			const name: string = data["data"][i]["item"]["item_name"];
			const buyType: string = data["data"][i]["type"];
			const price: number = data["data"][i]["price"] / 100;
			const float: number = data["data"][i]["item"]["float_value"];
			const stattrack: boolean = data["data"][i]["item"]["is_stattrak"];
			const wear: string = data["data"][i]["item"]["wear_name"];
			const watchers: number = data["data"][i]["watchers"];

			// Inspection data
			const screenshotID: number = data["data"][i]["item"]["cs2_screenshot_id"];
			const playsideLink: string = reversedSideURL("playside", screenshotID);
			const backsideLink: string = reversedSideURL("backside", screenshotID);
			const inspectLink: string = data["data"][i]["item"]["serialized_inspect"];
			const inspectionData: InspectionData = { playsideLink, backsideLink, inspectLink };

			// Blue Gem data
			const backsideBlue: number = data["data"][i]["item"]["blue_gem"]["backside_blue"];
			const backsidePurple: number = data["data"][i]["item"]["blue_gem"]["backside_purple"];
			const backsideGold: number = data["data"][i]["item"]["blue_gem"]["backside_gold"];
			const playsideBlue: number = data["data"][i]["item"]["blue_gem"]["playside_blue"];
			const playsidePurple: number = data["data"][i]["item"]["blue_gem"]["playside_purple"];
			const playsideGold: number = data["data"][i]["item"]["blue_gem"]["playside_gold"];
			const blueGemData: BlueGemData = { backsideBlue, backsidePurple, backsideGold, playsideBlue, playsidePurple, playsideGold };

			// Time data
			const timestamp: string = data["data"][i]["created_at"];
			const postedTime = dayjs(timestamp);
			const timeMessage: string = postedTime.fromNow();
				
			// Seller data
			const sellerAvatar: string = data["data"][i]["seller"]["avatar"];
			const sellerStatus: boolean = data["data"][i]["seller"]["online"];
			const sellerName: string = data["data"][i]["seller"]["username"];
			const sellerSteamID: string = data["data"][i]["seller"]["steam_id"];
			const sellerData: SellerData = { sellerAvatar, sellerStatus, sellerName, sellerSteamID };

			// Create temporary object and append
			const itemObj = { name, buyType, price, float, stattrack, wear, watchers, inspectionData, timeMessage, blueGemData, sellerData };

			// Push temporary object into persistent array
			itemArr.push(itemObj);
		}	

		return itemArr;
	} catch (err) {
		console.error(err);
		return null;
	}
};
