import path from "path";
import { app } from "electron";

export const isDev = (): boolean => {
	return process.env.NODE_ENV === "development";
};

export const getPreloadPath = (): string => {
	const preloadPath = path.join(
		app.getAppPath(), // Path of app
		isDev() ? "." : "..", // If Dev, go to path
		"/dist-electron/preload.cjs" // If Prod, leave app.asar (pseudo-dir) and go to path
	);

	return preloadPath;
};
