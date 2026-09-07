// @ts-nocheck
import { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import Title from "./components/Title";
import SkinsScreen from "./screens/SkinsScreen";
import SkinScreen from "./screens/SkinScreen";

function App() {
	// State to hold skin placeholders
	const [skins, setSkins] = useState({});

	// Runs only after first render, never again
	useEffect(() => {
		// Get skin placeholders from static Electron API
		window.api.getSkinsData().then((data) => {
			setSkins({ "knives": data["knives"], "rifles": data["rifles"] });
		});
	}, []);
	return (
		<>
			<Router>
				<div className="h-screen box-border">
					<Title />

					<div className="flex h-full">
						<div className="w-full text-center">
							<Routes>
								{/* Route to set root to skins */}
								<Route
									path="/"
									element={
										<Navigate to="/screens" replace />
									}
								/>

								{/* <Route
									path="/screens"
									element={
										<SkinsScreen
											skins={skins}
										/>
									}
								/> */}

								<Route
									path="/screens"
									element={
										<SkinScreen />
									}
								/>
							</Routes>
						</div>
					</div>
				</div>
			</Router>
		</>
	);
}

export default App;
