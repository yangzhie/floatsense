// --- Global types ---

// -------------------------
// Fetching from skins API 
// -------------------------

// Raw response from ByMykel data
type RawWear = { 
	name: string 
};

type RawCrate = { 
	name: string,
	image: string 
};

type ByMykelData = {
  category: { name: string },
  pattern?: { name: string },
  weapon: { name: string },
  min_float: number,
  max_float: number,
  rarity: { color: string },
  wears: RawWear[],
  crates: RawCrate[]
};

// Flattened output
type LootBox = {
	lootBoxName: string,
	lootBoxImage: string
};

type CaseHardenedItem = {
  name: string;
  minFloat: number;
  maxFloat: number;
  rarityColor: string;
  wears: string[];
  lootBoxes: LootBox[];
};

// -------------------------
// Fetching from CSFloat API 
// -------------------------
type DefIndex = 7 | 500 | 503 | 505 | 506 | 507 | 508 | 509 | 512 | 514 | 515 | 516 | 517 | 518 | 519 | 520 | 521 | 522 | 523 | 525 | 526;
type Limit = 5 | 10 | 15;
type BuyType = "buy_now" | "auction" | null;
type Category = 0 | 1 | 2; // any, normal, stattrack

// Raw response
type CSFloatListing = {
  type: string,
  price: number,
  created_at: string,
  watchers: number,
  item: {
    item_name: string,
    float_value: number,
    is_stattrak: boolean,
    wear_name: string,
    cs2_screenshot_id: number,
    serialized_inspect: string,
    blue_gem: {
      backside_blue: number,
      backside_purple: number,
      backside_gold: number,
      playside_blue: number,
      playside_purple: number,
      playside_gold: number,
    },
  },
  seller: { avatar: string; online: boolean; username: string; steam_id: string }
};

// Response envelope
type CSFloatResponse = { 
	data: CSFloatListing[],
	cursor?: string 
};

// Output shape this function builds per listing
type CSFloatItem = {
  name: string,
  buyType: string,
  price: number,
  float: number,
  stattrack: boolean,
  wear: string,
  watchers: number,
  inspectionData: InspectionData,
  timeMessage: string,
  blueGemData: BlueGemData,
  sellerData: SellerData
};

// Inspection data (links)
type InspectionData = {
	playsideLink: string,
	backsideLink: string,
	inspectLink: string
};

// Blue gem data of item
type BlueGemData = {
	backsideBlue: number,
	backsidePurple: number,
	backsideGold: number,
	playsideBlue: number,
	playsidePurple: number,
	playsideGold: number,
};

// Seller of item data
type SellerData = {
	sellerAvatar: string,
	sellerStatus: boolean,
	sellerName: string,
	sellerSteamID: string
};

// -------------------------
// ?
// -------------------------
