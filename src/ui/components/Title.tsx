function Title() {
	return (
		<>
			<div className="flex justify-between">
				<div className="w-full flex justify-start">
					<img 
						src="src/ui/assets/floatsense_logo_mark.png" 
						className="w-80"
					/>
				</div>

				<div className="w-1/2 flex justify-end">
					<div className="text-xs mt-2 mr-2 text-neutral-600">
						Made with &#9825; by yangzhie
					</div>
				</div>
			</div>
		</>
	);
}

export default Title;
