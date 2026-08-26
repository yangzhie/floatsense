import { contextBridge, ipcRenderer } from "electron";

// Preload script: bridges Main and Renderer 
// Selects APIs to be exposed
const API = {
	// Renderer asks for static skins data, Main gives it
	getSkinsData: () => ipcRenderer.invoke("static-skins-data"),

	// Updates Renderer to lastest CSFloat listings per user request
	onCSFloatDataUpdate: (callback) =>
		ipcRenderer.on("csfloat-data-update", (_event, data) => callback(data)),
	
	// Polls data from Main to Renderer 
	CSFloatListingPolling: (charmName) =>
		ipcRenderer.send("csfloat-listing-polling", charmName),

	//
	invokeCSFloatData: (charmName) =>
		ipcRenderer.invoke("csfloat-data", charmName),
		
	notify: (title, body) => ipcRenderer.send("notify", { title, body }),
	
	onCSFloatDataUpdate: (callback) =>
		ipcRenderer.on("csfloat-data-update", (_event, data) => callback(data)),
	
	removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
};

// Exposes the context bridge to Main's APIs
contextBridge.exposeInMainWorld("api", API);
