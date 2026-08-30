// @ts-nocheck
import { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import Skins from "./components/skins/Skins";

function App() {
	// State to hold skin placeholders
	const [skins, setSkins] = useState({});

	// Runs only after first render, never again
	useEffect(() => {
		// Get skin placeholders from static Electron API
		window.api.getSkinsData().then((data) => {
			setSkins({ "knives": data["knives"], "rifles": data["rifles"]});
		});
	}, []);
	return (
		<>
			<Router>
				<div className="h-screen box-border overflow-hidden">
					{/* <Title /> */}

					<div className="flex h-full">
						<div className="w-2/3 text-center">
							<Routes>
								{/* Route to set root to skins */}
								<Route
									path="/"
									element={
										<Navigate to="/skins" replace />
									}
								/>

								<Route
									path="/skins"
									element={
										<Skins
											skins={skins}
										/>
									}
								/>
							</Routes>
						</div>

						{/* <div className="w-1/3 border-l-1">
							<Notifications />
						</div> */}
					</div>
				</div>
			</Router>
		</>
	);
}

export default App;
