import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";

interface NoteCardProps {
	note: {
		date: Date;
		content: string;
	};
}

export function NoteCard({ note }: NoteCardProps) {
	return (
		<Dialog.Root>
			<Dialog.Trigger className="text-left rounded-md flex flex-col gap-3 bg-slate-800 p-5 relative overflow-hidden hover:ring-2 hover:ring-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-lime-400">
				<span className="text-sm font-medium text-slate-300">
					{formatDistanceToNow(note.date, {
						locale: ptBR,
						addSuffix: true
					})}
				</span>
				<p className="text-sm leading-6 text-slate-400">{note.content}</p>
				<div className="absolute bottom-0 h-1/2 w-full rounded-b-md left-0 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className="inset-0 fixed bg-black/50">
					<Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
						<Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:bg-slate-800/80 transition-all hover:text-slate-300">
							<X className="size-5" />
						</Dialog.Close>
						<div className="flex flex-1 flex-col gap-3 p-5">
							<span className="text-sm font-medium text-slate-300">
								{formatDistanceToNow(note.date, {
									locale: ptBR,
									addSuffix: true
								})}
							</span>
							<p className="text-sm leading-6 text-slate-400">{note.content}</p>
						</div>

						<button
							type="button"
							className="w-full bg-slate-800 py-4 text-center font-medium text-sm text-slate-300 outline-none hover:bg-slate-800/80 transition-all group"
						>
							Deseja{" "}
							<span className="text-red-400 group-hover:underline">
								apagar esta nota
							</span>
							?
						</button>
					</Dialog.Content>
				</Dialog.Overlay>
			</Dialog.Portal>
		</Dialog.Root>
	);
}