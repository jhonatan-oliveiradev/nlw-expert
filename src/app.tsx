/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from "react";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

import logo from "./assets/logo-nlw-expert.svg";
import { toast } from "sonner";

interface Note {
	id: string;
	date: Date;
	content: string;
}

export function App() {
	const [search, setSearch] = useState("");
	const [notes, setNotes] = useState<Note[]>(() => {
		const notesOnStorage = localStorage.getItem("notes");

		if (notesOnStorage) {
			return JSON.parse(notesOnStorage);
		}

		return [];
	});

	function onNoteCreated(content: string) {
		const newNote = {
			id: crypto.randomUUID(),
			date: new Date(),
			content
		};

		const notesArray = [newNote, ...notes];

		setNotes(notesArray);

		localStorage.setItem("notes", JSON.stringify(notesArray));
	}

	function onNoteDeleted(id: string) {
		const notesArray = notes.filter((note) => note.id !== id);

		setNotes(notesArray);

		localStorage.setItem("notes", JSON.stringify(notesArray));

		toast.success("Nota apagada com sucesso!", {});
	}

	function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
		const query = e.target.value;

		setSearch(query);
	}

	const filteredNotes =
		search !== ""
			? notes.filter((note) =>
					note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
			  )
			: notes;

	return (
		<div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
			<img src={logo} alt="NLW Expert" className="w-32" />
			<form className="w-full">
				<input
					onChange={handleSearch}
					type="text"
					placeholder="Busque em suas notas..."
					className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
				/>
			</form>

			<div className="h-px bg-slate-700" />

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
				<NewNoteCard onNoteCreated={onNoteCreated} />

				{filteredNotes.map((note) => {
					return (
						<NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
					);
				})}
			</div>
		</div>
	);
}
