export function NoteCard() {
	return (
		<div className="rounded-md space-y-3 bg-slate-800 shadow-lg p-5 relative overflow-hidden">
			<span className="text-sm font-medium text-slate-300">Há 2 dias</span>
			<p className="text-sm leading-6 text-slate-400">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque vitae
				repudiandae rem non officia odio autem numquam culpa temporibus iusto
				inventore, quia voluptas id quo explicabo cum atque dicta voluptates
				iste eum labore dolore, nemo reprehenderit quis! Dolor illo repellendus
				voluptate ex quaerat cumque, pariatur alias, ipsa quam officia sapiente
				ratione ea fuga deserunt? Corrupti officia debitis iure aspernatur culpa
				dolore expedita consequatur accusamus veniam nesciunt! Accusamus quo
				odit eligendi.
			</p>
			<div className="absolute bottom-0 h-1/2 w-full rounded-b-md left-0 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
		</div>
	);
}
