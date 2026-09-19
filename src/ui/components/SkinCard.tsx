// @ts-nocheck
import { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import ZoomControls from "./ZoomControls";
import { convertBuyTypeToAcronym, convertWearToAcronym, csBlueGemClashGG, idHelper, isSellerOnline, seedMatcher, steamBuilder } from "../utils/helpers";

import steamQuestion from "../assets/steam-question.png";
import { FaExternalLinkAlt, FaEye, FaGem } from "react-icons/fa";
import { IoLogoGameControllerB } from "react-icons/io";

function SkinCard({ skin }) {
    // Zooming into play/backside images
    const [zoomed, setZoomed] = useState();

    // Generate tier color and label
    const tier = seedMatcher(skin["defIndex"], skin["paintSeed"]);

    return (
        <>
            <div className="flex justify-center px-2 gap-2 mb-4">
                <div className="w-[391px] border-1 border-slate-700 bg-slate-700/20 p-2 rounded-sm">
                    <div className="flex justify-between">
                        <div>
                            <div className="text-md">${ skin["price"] } { convertBuyTypeToAcronym(skin["buyType"]) }</div>
                            <div className="text-[10px]">{ skin["float"]?.toFixed(6) } { convertWearToAcronym(skin["wear"]) }</div>
                        </div>
                        
                        <div>
                            <div className="text-sm text-end" style={{ color: tier.color }}>{ skin["paintSeed"] }</div>
                            <div className="text-[10px] flex items-end"> Listed: { skin["timeMessage"] } </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 mt-2">
                        {/* Logo/link over image = relative*/}
                        <div className="relative flex gap-2">
                            <img 
                                src={`${ skin["inspectionData"]["playsideLink"] }`}
                                onClick={() => setZoomed(skin["inspectionData"]["playsideLink"])}
                                className="cursor-pointer"
                            />

                            { zoomed && (
                                <div
                                    onClick={() => setZoomed(null)}
                                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/85"
                                >
                                    <div onClick={(event) => event.stopPropagation()} className="relative">
                                        <TransformWrapper initialScale={1}>
                                            <ZoomControls />
                                            <TransformComponent>
                                                <img src={zoomed} className="max-w-[90vw] max-h-[90vh] object-contain" />
                                            </TransformComponent>
                                        </TransformWrapper>
                                    </div>
                                </div>
                            )}

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

                            <span className="absolute top-15 right-1 text-black text-sm">
                                <a href={ csBlueGemClashGG(skin["name"], skin["paintSeed"], skin["stattrack"]) } target="_blank" rel="noopener noreferrer">
                                    <FaGem size={18} color="white" />
                                </a>
                            </span>
                        </div>
                        <div className="relative">
                            <img 
                                src={`${ skin["inspectionData"]["backsideLink"] }`}
                                onClick={() => setZoomed(skin["inspectionData"]["backsideLink"])}
                                className="cursor-pointer"
                            />

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