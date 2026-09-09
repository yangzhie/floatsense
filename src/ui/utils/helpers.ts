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