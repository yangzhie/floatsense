// @ts-nocheck
import { convertBuyTypeToAcronym, convertWearToAcronym, idHelper, isSellerOnline, steamBuilder } from "../utils/helpers";

import steamQuestion from "../assets/steam-question.png";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoLogoGameControllerB } from "react-icons/io";
import { FaEye } from "react-icons/fa";

function SkinCard({ skin }) {

    return (
        <>
            <div className="flex justify-center px-2 gap-2 mb-4">
                <div className="w-[391px] border-1 border-slate-700 bg-slate-700/20 p-2 rounded-sm">
                    <div className="flex justify-between">
                        <div>
                            <div className="text-md">${ skin["price"] } { convertBuyTypeToAcronym(skin["buyType"]) }</div>
                            <div className="text-[10px]">{ skin["float"]?.toFixed(6) } { convertWearToAcronym(skin["wear"]) }</div>
                        </div>
                        <div className="text-[10px] flex items-end"> Listed: { skin["timeMessage"] } </div>
                    </div>

                    <div className="flex flex-col gap-1 mt-2">
                        {/* Logo/link over image = relative*/}
                        <div className="relative flex gap-2">
                            <img src={`${ skin["inspectionData"]["playsideLink"] }`} alt="" />
                            <span className="absolute top-1 right-1 text-black text-sm">
                                <a href={ idHelper(skin["id"]) } target="_blank" rel="noopener noreferrer">
                                    <FaExternalLinkAlt size={18} color="white" />
                                </a>
                            </span>

                            <span className="absolute top-8 right-1 text-black text-sm">
                                <a href={ skin["inspectionData"]["inspectLink"] } target="_blank" rel="noopener noreferrer">
                                    <IoLogoGameControllerB size={20} color="white" />
                                </a>
                            </span>
                        </div>
                        <div className="relative">
                            <img src={`${ skin["inspectionData"]["backsideLink"] }`} alt="" />
                            <span className="absolute bottom-1 right-1 text-black text-sm flex gap-1 items-center">
                                <FaEye size={16} color="white" />
                                <span className="text-[10px] text-white">{ skin["watchers"] }</span>
                            </span>
                        </div>
                    </div>

                    <div className="flex mt-2">
                        <div className="w-1/2 flex justify-evenly text-sm">
                            <div>
                                <div className="text-md">Playside</div>
                                <div className="text-blue-400">{ skin["blueGemData"]["playsideBlue"] }%</div>
                                <div className="text-purple-400">{ skin["blueGemData"]["playsidePurple"] }%</div>
                                <div className="text-yellow-400">{ skin["blueGemData"]["playsideGold"] }%</div>
                            </div>

                            <div>
                                <div className="text-md">Backside</div>
                                <div className="text-blue-400">{ skin["blueGemData"]["backsideBlue"] }%</div>
                                <div className="text-purple-400">{ skin["blueGemData"]["backsidePurple"] }%</div>
                                <div className="text-yellow-400">{ skin["blueGemData"]["backsideGold"] }%</div>
                            </div>  
                        </div>

                        <div className="w-1/2 flex p-2">
                            <div className={`w-1/2 border-1 ${ skin["sellerData"]["sellerStatus"] ? "border-green-500" : "text-red-500" }`}>
                                <a href={`${ steamBuilder(skin["sellerData"]["sellerSteamID"]) }`} target="_blank" rel="noopener noreferrer">
                                    <img src={ skin["sellerData"]["sellerAvatar"] || steamQuestion } alt="" />
                                </a>
                            </div>

                            <div className="text-sm w-5/6">
                                { skin["sellerData"]["sellerName"] || "Private Profile" }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SkinCard