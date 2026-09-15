import { BLUE_GEM_SEEDS, TIERS } from "./paintseeds";

export const convertBuyTypeToAcronym = (buyType: string): string => {
    if (buyType === "buy_now") {
        return "[B]";
    } else {
        return "[A]";
    }
}

export const convertWearToAcronym = (wear: string): string => {
    if (wear === "Factory-New") {
        return "[FN]";
    } else if (wear === "Minimal-Wear") {
        return "[MW]";
    } else if (wear === "Field-Tested") {
        return "[FT]";
    } else if (wear === "Well-Worn") {
        return "[WW]";
    } else {
        return "[BS]";
    }
}

export const idHelper = (id: number): string => {
    const idString: string = `https://csfloat.com/item/${id}`;
    return idString;
}

export const isSellerOnline = (status: boolean): string => {
    if (status) {
        return "Online";
    } else {
        return "Offline";
    }
}

export const steamBuilder = (steamID: number): string => {
    const steamLink: string = `https://steamcommunity.com/profiles/${steamID}`;
    return steamLink;
}

export const seedMatcher = (defIndex: number, paintSeed: number) => {
	// Loop through all obj values
	for (const weapon of Object.values(BLUE_GEM_SEEDS)) {
		// Exit if def indicies do not match
		if (weapon.defIndex !== defIndex) continue;

		// Search and match tiers
		for (const tier of Object.keys(TIERS)) {
            // @ts-ignore
			if (weapon.seeds[tier]?.includes(paintSeed)) {
                if (String(tier) === "max_1") {
                    return TIERS.max_1;
                } else if (String(tier) === "max_2") {
                    return TIERS.max_2;
                } else if (String(tier) === "rank_1") {
                    return TIERS.rank_1;
                } else if (String(tier) === "rank_2") {
                    return TIERS.rank_2;
                } else if (String(tier) === "rank_3") {
                    return TIERS.rank_3;
                } else if (String(tier) === "rank_4") {
                    return TIERS.rank_4;
                }
			}
		}
	}
    
	return "Unranked";
};

export const getSeeds = (defIndex: number, tier: string): number[] | null => {
    // Loop through the object's values
	for (const weapon of Object.values(BLUE_GEM_SEEDS)) {
        // Skip if weapon does not match
		if (weapon.defIndex !== defIndex) continue;

        // Seeds of the weapon
		const seeds = weapon.seeds;
        
        // Tier doesn't exist for the weapon
        // @ts-ignore
        if (!seeds[tier]) return null;

        // Tier keys
		const tierKeys = Object.keys(TIERS);
		const selectedIndex = tierKeys.indexOf(tier);

		// Everything ranked above the selected tier
		const higher = new Set<number>();
		for (let i = 0; i < selectedIndex; i++) {
            // @ts-ignore
			seeds[tierKeys[i]]?.forEach((s) => higher.add(s));
		}

        // @ts-ignore
		return [...(seeds[tier] ?? [])].filter((s) => !higher.has(s));
    }
	return null;
};