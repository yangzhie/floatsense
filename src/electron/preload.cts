import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

// Preload script: bridges Main and Renderer 
// Selects APIs to be exposed
const API = {
	// Renderer asks for static skins data Main responds
	getSkinsData: () => ipcRenderer.invoke("static-skins-data"),

	// Start the polling 
	startPolling: (pollRate: number, defIndex: DefIndex, paintSeed: number | null, paintIndex: number = 44, limit: Limit, type: BuyType, category: Category) =>
		ipcRenderer.send("obtain-fetch-variables-and-poll", pollRate, defIndex, paintSeed, paintIndex, limit, type, category),

	// Updates the CSFloat data available to Main
	onCSFloatDataUpdate: (callback: (data: CSFloatItem[] | null) => void) => {
		const listener = (_event: IpcRendererEvent, data: CSFloatItem[] | null) => callback(data);
		ipcRenderer.on("csfloat-data-update", listener);
		return () => ipcRenderer.removeListener("csfloat-data-update", listener);
	},
	
	notify: (title: string, body: string) => ipcRenderer.send("notify", { title, body })
};

// Exposes the context bridge to Main's APIs
contextBridge.exposeInMainWorld("api", API);
