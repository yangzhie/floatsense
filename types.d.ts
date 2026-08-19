// --- Global types ---

// -------------------------
// Fetching from skins API 
// -------------------------
type SkinData = {
	name: string;
	image: string;
	rarity: {
		color: string;
	};
	collections: {
		name: string;
		image: string;
	}[];
};

// -------------------------
// Fetching from CSFloat API 
// -------------------------
type DefIndex = 7 | 500 | 503 | 505 | 506 | 507 | 508 | 509 | 512 | 514 | 515 | 516 | 517 | 518 | 519 | 520 | 521 | 522 | 523 | 525 | 526;
type Limit = 5 | 10 | 15;
type BuyType = "buy_now" | "auction" | null;
type Category = 0 | 1 | 2;

type CSFloatObj = {
	itemID: string;
	timeMessage: string;
	price: number;
	charmIndex: number;
	charmPattern: number;
	icon: string;
	name: string;
	inspectLink: string;
};

type CSFloatItemInfo = {
	keychain_index: number;
	keychain_pattern: number;
	icon_url: string;
	market_hash_name: string;
	inspect_link: string;
};

type CSFloatDataItem = {
	id: string;
	created_at: string;
	price: number;
	item: CSFloatItemInfo;
};

type CSFloatData = {
	data: CSFloatDataItem[];
};

// --------------------------

type ListingArray = ListingArrayItem[];

type ListingArrayItem = {
	price: number;
	inspectLink: string;
	charmPattern?: number;
};

type SteamResponse = {
	success: boolean;
	listinginfo: ListingInfo;
};

type Asset = {
	id: string;
	market_actions: MarketAction[];
};

type MarketAction = {
	link: string;
};

type ListingInfoItem = {
	listingid: string;
	converted_price: number;
	asset: Asset;
};

type ListingInfo = {
	[key: string]: ListingInfoItem;
};

type CSFloatItemObject = {
	iteminfo: {
		keychains: CSFloatItemValues[];
	};
};

type CSFloatItemValues = {
	pattern: number;
};

type Charms = {
	name: string;
	image: string;
	color: string;
};

type Collections = {
	name: string;
	image: string;
};

type FetchCollectionsResult = {
	missingLinkArr: CharmsArray[];
	smallArmsArr: CharmsArray[];
	drBoomArr: CharmsArray[];
	missingLinkCommunityArr: CharmsArray[];
	collectionArr: CollectionsArray[];
};



type CharmsObj = {
	name: string;
	image: string;
	color: string;
};

type CollectionsObj = {
	collectionName: string;
	collectionImage: string;
};
