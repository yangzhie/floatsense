import {
	app,
	BrowserWindow,
	ipcMain,
	Notification,
} from "electron";
import path from "path";
import { isDev, getPreloadPath } from "./utils.js";
import { fetchSkins, fetchFromCSFloat } from "./fetch.js";

let pollInterval: ReturnType<typeof setInterval> | null = null;

app.on("ready", () => {
	// Main window's initial settings
	const mainWindow: BrowserWindow = new BrowserWindow({
		title: "floatsense",
		width: 1100,
		height: 700,
		autoHideMenuBar: true,
		webPreferences: {
			preload: getPreloadPath(),
			// Renderer cannot touch Node directly
			contextIsolation: true,
			nodeIntegration: false,
		},
	});

	// Get dev or prod path
	if (isDev()) {
		mainWindow.loadURL("http://localhost:9999/");
	} else {
		// Load initial file inside mainWindow
		// path helps configure Windows' \
		mainWindow.loadFile(
			path.join(app.getAppPath() + "/dist-react/index.html")
		);
	}

	// Handle for gathering skins data (static)
	// Renderer asks for this handle - one req-res
	ipcMain.handle("static-skins-data", async (): Promise<{ knives: CaseHardenedItem[], rifles: CaseHardenedItem[] } | null> => {
		const data: { knives: CaseHardenedItem[], rifles: CaseHardenedItem[] } | null = await fetchSkins();
		return data;
	});

	// Obtain user variables and poll skin data
	// Renderer fires data to Main and forgets
	ipcMain.on("obtain-fetch-variables-and-poll", (_event, pollRate: number, defIndex, paintSeed, paintIndex, limit, type, category) => {
		// Clear any existing fetches to different skins
		if (pollInterval) {
			clearInterval(pollInterval);
		}

		// Start polling for a specific user-defined skin
		pollInterval = setInterval(() => {
			fetchAndSendCSFloatData(mainWindow, defIndex, paintSeed, paintIndex, limit, type, category);
		}, pollRate);
	});

	// Listen for notifications from Renderer 
	// Renderer fires data to Main and forgets
	ipcMain.on("notify", (_event, { title, body }) => {
		const notification: Notification = new Notification({
			title: title,
			body: body,
			silent: false,
		});

		notification.show();
	});
});

/**
 * Main sends fetched data to the Renderer via .send.
 * 
 * @param mainWindow Main browser Electron window.
 * @param defIndex Type of weapon - relative to CSFloat.
 * @param paintSeed Weapon paint seed (0 - 1000).
 * @param paintIndex Weapon paint index (case hardened).
 * @param limit Limit of fetching weapons per request.
 * @param type Buying type of listing (auc/now).
 * @param category Weapon separation normal, stattrack or souvenir.
 * 
 * @returns Single fetch-and-send, and then starts polling.
 */
async function fetchAndSendCSFloatData(
	mainWindow: BrowserWindow,
	defIndex: DefIndex,
	paintSeed: number | null = null,
	paintIndex: number = 44,
	limit: Limit = 5,
	type: BuyType = null,
	category: Category = 0
): Promise<void> {
	try {
		// Fetch data
		const data: CSFloatItem[] | null = await fetchFromCSFloat(defIndex, paintSeed, paintIndex, limit, type, category);

		// Send data to the Renderer
		mainWindow.webContents.send("csfloat-data-update", data);
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.error("Polling error:", error);
		mainWindow.webContents.send("error", { message });
	}
};
