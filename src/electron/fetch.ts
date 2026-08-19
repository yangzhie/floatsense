// @ts-nocheck
import "dotenv/config";
import { URLSearchParams } from "url";
import dayjs from "dayjs";
dayjs.extend(relativeTime);
import relativeTime from "dayjs/plugin/relativeTime.js";

const csfloatAPIKey = process.env.csfloatAPIKey;

export const reversedSideURL = (side, ID) => {
	// Custom CSFloat URL for playside/backside screenshots of item
	if (side === "playside") {
		return `https://csfloat.pics/m/${ID}/playside.png?v=3`;
	} else {
		return `https://csfloat.pics/m/${ID}/backside.png?v=3`;
	}
}

// Fetch placeholder data for case hardened skins
export const fetchCollections = async () => {
	// API link for skin collections	
	const skinsAPI: URL = "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json";

	try {
		// Fetching
		const res: Response = await fetch(skinsAPI);
		const data = await res.json();

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
	
		return { knives, rifles }
	} catch (err) {
		console.error(err);
		return null;
	}
};

// Fetch CSFloat data from CSFloat API
export const fetchFromCSFloat = async (
	defIndex: DefIndex,
	paintSeed: number | null = null,
	paintIndex: number = 44,
	limit: Limit = 5,
	type: BuyType = null,
	category: Category = 0
): Promise<CSFloatObj | null> => {
	// Base (un-modified) URL
	const csfloatURL: URL = new URL("https://csfloat.com/api/v1/listings");
	
	// Attach user-defined params to URL
	const params: URLSearchParams = new URLSearchParams();
	params.append("sort_by", "most_recent");
	params.append("def_index", defIndex);
	if (paintSeed !== null) {
		params.append("paint_seed", paintSeed.toString());
	} 
	params.append("paint_index", paintIndex.toString());
	params.append("limit", limit.toString());
	if (type !== null) {
		params.append("type", type);
	}
	params.append("category", category);
	csfloatURL.search = params.toString();

	// Try fetching item data
	try {
		// Fetch from user-defined modified URL
		const res: Response = await fetch(csfloatURL, {
			headers: {
				Authorization: process.env.csfloatAPIKey,
			},
		});

		// Case: no response
		if (!res.ok) {
			throw new Error(`Err: ${res.status}`);
		}

		// Convert response to JSON
		const data = await res.json();

		// Persistent arrays for data storage
		const itemArr = [];

		// Loop through the listings
		for (let i = 0; i < data["data"].length; i++) {
			// Temporary object to append to
			const itemObj = {};

			// Initial data to compare
			const name: string = data["data"][i]["item"]["item_name"];
			
			// Generic item data
			const buyType: string = data["data"][i]["type"];
			const price: number = data["data"][i]["price"] / 100;
			const float: string = data["data"][i]["item"]["float_value"];
			const stattrack: string = data["data"][i]["item"]["is_stattrak"];
			const wear: string = data["data"][i]["item"]["wear_name"];
			const watchers: string = data["data"][i]["watchers"];

			// Inspection data
			const inspectionData = {};
			const screenshotID = data["data"][i]["item"]["cs2_screenshot_id"];
			const playside = reversedSideURL("playside", screenshotID);
			const backside = reversedSideURL("backside", screenshotID);
			const inspectLink = data["data"][i]["item"]["serialized_inspect"];
			inspectionData["playsideLink"] = playside;
			inspectionData["backsideLink"] = backside;
			inspectionData["inspectLink"] = inspectLink;

			// Blue Gem data
			const blueGemData = {};
			const backsideBlue: number = data["data"][i]["item"]["blue_gem"]["backside_blue"];
			const backsidePurple: number = data["data"][i]["item"]["blue_gem"]["backside_purple"];
			const backsideGold: number = data["data"][i]["item"]["blue_gem"]["backside_gold"];
			const playsideBlue: number = data["data"][i]["item"]["blue_gem"]["playside_blue"];
			const playsidePurple: number = data["data"][i]["item"]["blue_gem"]["playside_purple"];
			const playsideGold: number = data["data"][i]["item"]["blue_gem"]["playside_gold"];
			blueGemData["backsideBlue"] = backsideBlue;
			blueGemData["backsidePurple"] = backsidePurple;
			blueGemData["backsideGold"] = backsideGold;
			blueGemData["playsideBlue"] = playsideBlue;
			blueGemData["playsidePurple"] = playsidePurple;
			blueGemData["playsideGold"] = playsideGold;

			// Time data
			const timestamp: string = data["data"][i]["created_at"];
			const postedTime = dayjs(timestamp);
			const timeMessage: string = postedTime.fromNow();
				
			// Seller data
			const sellerData = {};
			const sellerAvatar: string = data["data"][i]["seller"]["avatar"];
			const sellerStatus: boolean = data["data"][i]["seller"]["online"];
			const sellerName: string = data["data"][i]["seller"]["username"];
			const sellerSteamID: string = data["data"][i]["seller"]["steam_id"];
			sellerData["sellerAvatar"] = sellerAvatar;
			sellerData["sellerStatus"] = sellerStatus;
			sellerData["sellerName"] = sellerName;
			sellerData["sellerSteamID"] = sellerSteamID;

			// Append all data to temporary object
			itemObj["name"] = name;
			itemObj["buyType"] = buyType;
			itemObj["price"] = price;
			itemObj["float"] = float;
			itemObj["stattrack"] = stattrack;
			itemObj["wear"] = wear;
			itemObj["watchers"] = watchers;
			itemObj["inspectionData"] = inspectionData;
			itemObj["timeMessage"] = timeMessage;
			itemObj["blueGemData"] = blueGemData;
			itemObj["sellerData"] = sellerData;

			// Push temporary object into persistent array
			itemArr.push(itemObj);
		}	

		return itemArr;
	} catch (err) {
		console.error(err);
		return null;
	}
};

const a = await fetchFromCSFloat(500, null, 44, 5, null, 0);
console.dir(a, {depth : null});