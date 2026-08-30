// @ts-nocheck
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { eventBus } from "../../utils/eventBus";
import BackBtn from "../../utils/BackBtn";

const repeatingNumbers = [
	11111, 22222, 33333, 44444, 55555, 66666, 77777, 88888, 1111, 2222, 3333,
	4444, 5555, 6666, 7777, 8888, 9999, 10000, 20000, 30000, 40000, 50000,
	60000, 70000, 80000, 90000, 1337, 6969, 12345, 42069, 69420, 8008, 80085,
];

function Charm() {
	const { state } = useLocation();

	const [symbolOne, setSymbolOne] = useState("");
	const [numberOne, setNumberOne] = useState("");
	const [symbolTwo, setSymbolTwo] = useState("");
	const [numberTwo, setNumberTwo] = useState("");

	const [filterList, setFilterList] = useState([]);
	const [toggleAnd, setToggleAnd] = useState(false);

	// Poll charm data
	const addCharm = async () => {
		// Send charm name to notification center
		eventBus.emit("new-charm-added", state);

		// Start polling (fire and forget)
		window.api.startCharmPolling(state["name"]);

		// Listen for updates
		const handleUpdate = (data) => {
			eventBus.emit("new-charm-data", data);
		};
		window.api.onCharmDataUpdate(handleUpdate);
	};

	// Place user-input filter into filter list
	const handleSubmit = (e) => {
		e.preventDefault();

		// Sanitize numberOne
		if (numberOne.trim() === "") return;
		if (!Number(numberOne)) return;

		// Sanitize numberTwo
		if (toggleAnd) {
			if (numberTwo.trim() === "") return;
			if (!Number(numberTwo)) return;
		}

		// Define user-inputted filter
		const newFilter = {
			id: Date.now(),
			symbolOne,
			numberOne,
			symbolTwo: toggleAnd ? symbolTwo : null,
			numberTwo: toggleAnd ? numberTwo : null,
			displayOne: symbolOne + numberOne,
			displayTwo: toggleAnd ? symbolTwo + numberTwo : null,
		};

		// Push filter into filter list
		const updatedFilters = [...filterList, newFilter];
		setFilterList(updatedFilters);

		// Emit filter list to Notifications
		eventBus.emit("filter-list-updated", updatedFilters);

		// Reset inputs
		setNumberOne("");
		setNumberTwo("");
		setToggleAnd(false);
	};

	// Delete filter
	const deleteFilter = (id) => {
		const updatedFilters = filterList.filter((filter) => filter.id !== id);
		setFilterList(updatedFilters);

		eventBus.emit("filter-list-updated", updatedFilters);
	};

	const onToggle = () => {
		setToggleAnd(!toggleAnd);
	};

	// --- Preset tag functions ---
	const gt99000 = () => {
		const newFilter = {
			id: Date.now(),
			symbolOne: ">",
			numberOne: "99000",
			displayOne: ">99000",
		};

		const updatedFilters = [...filterList, newFilter];
		setFilterList(updatedFilters);

		eventBus.emit("filter-list-updated", updatedFilters);
	};

	const lt1000 = () => {
		const newFilter = {
			id: Date.now(),
			symbolOne: "<",
			numberOne: "1000",
			displayOne: "<1000",
		};

		const updatedFilters = [...filterList, newFilter];
		setFilterList(updatedFilters);

		eventBus.emit("filter-list-updated", updatedFilters);
	};

	const eq = () => {
		const newFilters = repeatingNumbers.map((number) => ({
			id: Date.now(),
			symbolOne: "=",
			numberOne: number.toString(),
			displayOne: "=" + number.toString(),
		}));

		const updatedFilters = [...filterList, ...newFilters];
		setFilterList(updatedFilters);

		eventBus.emit("filter-list-updated", updatedFilters);
	};
	return (
		<>
			<BackBtn />

			<div className="flex flex-col justify-center items-center">
				<div className="flex w-full h-screen">
					<div className="w-1/2 flex flex-col justify-start">
						<div>
							<img src={state["image"]} alt={state["name"]} />
							<div className="text-2xl">{state["name"]}</div>
							<button
								className="mt-2 cursor-pointer"
								onClick={addCharm}
							>
								Add Charm
							</button>
						</div>

						<div className="flex flex-col mt-6 h-50">
							<div>Preset Filter Tags</div>
							<div className="flex flex-wrap gap-4 justify-center overflow-scroll overflow-x-hidden">
								<button
									className="cursor-pointer"
									onClick={gt99000}
								>
									&gt;99000
								</button>
								<button
									className="cursor-pointer"
									onClick={lt1000}
								>
									&lt;1000
								</button>
								<button className="cursor-pointer" onClick={eq}>
									Unique Numbers
								</button>
							</div>
						</div>
					</div>

					<div className="w-1/2">
						<div className="mt-2">
							<form onSubmit={handleSubmit}>
								<div>
									<select
										className="mr-2"
										value={symbolOne}
										onChange={(e) =>
											setSymbolOne(e.target.value)
										}
									>
										<option value="" disabled>
											Select
										</option>
										<option value=">">&gt;</option>
										<option value="=">=</option>
										<option value="<">&lt;</option>
									</select>

									<input
										type="text"
										placeholder="Add Filter"
										value={numberOne}
										onChange={(e) =>
											setNumberOne(e.target.value)
										}
									/>
								</div>

								{toggleAnd && (
									<>
										<div>
											<select
												className="mr-2"
												value={symbolTwo}
												onChange={(e) =>
													setSymbolTwo(e.target.value)
												}
											>
												<option value="" disabled>
													Select
												</option>
												<option value=">">&gt;</option>
												<option value="=">=</option>
												<option value="<">&lt;</option>
											</select>

											<input
												type="text"
												placeholder="Add Filter"
												value={numberTwo}
												onChange={(e) =>
													setNumberTwo(e.target.value)
												}
											/>
										</div>
									</>
								)}

								<button className="cursor-pointer">
									Submit
								</button>
							</form>
							<div className="flex justify-evenly">
								<button
									className="cursor-pointer"
									onClick={onToggle}
								>
									{toggleAnd ? "-" : "+"}
								</button>
							</div>
						</div>

						<div className="mt-10 text-xl">Set Filters</div>
						<div className="mt-4 h-150 overflow-scroll overflow-x-hidden">
							{filterList.map((filter) => {
								return (
									<div
										className="flex justify-center gap-4"
										key={filter.id}
									>
										<button
											className="cursor-pointer"
											onClick={() =>
												deleteFilter(filter.id)
											}
										>
											x
										</button>
										<div>Color</div>
										<div>
											{filter.displayTwo
												? `${filter.displayOne} and ${filter.displayTwo}`
												: filter.displayOne}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Charm;
