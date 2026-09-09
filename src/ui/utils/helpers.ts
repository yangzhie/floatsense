export const convertBuyTypeToAcronym = (buyType: string): string => {
    if (buyType === "buy_now") {
        return "[B]"
    } else {
        return "[A]"
    }
}

export const convertWearToAcronym = (wear: string): string => {
    if (wear === "Factory-New") {
        return "[FN]"
    } else if (wear === "Minimal-Wear") {
        return "[MW]"
    } else if (wear === "Field-Tested") {
        return "[FT]"
    } else if (wear === "Well-Worn") {
        return "[WW]"
    } else {
        return "[BS]"
    }
}
