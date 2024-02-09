import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface NewNoteCardProps {
	onNoteCreated: (content: string) => void;
}

let speechRecognition: SpeechRecognition | null = null;

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
	const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true);
	const [isRecording, setIsRecording] = useState(false);
	const [content, setContent] = useState("");

	function handleStartEditor() {
		setShouldShowOnBoarding(false);
	}

	function handleContentChanged(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setContent(e.target.value);

		if (e.target.value === "") {
			setShouldShowOnBoarding(true);
		}
	}

	function handleSaveNote(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		if (content === "") {
			toast.error("A nota não pode estar vazia!", {});
			return;
		}

		onNoteCreated(content);
		setContent("");
		setShouldShowOnBoarding(true);

		toast.success("Nota salva com sucesso!", {});
	}

	function handleStartRecording() {
		const isSpeechRecognitionAPIAvailable =
			"webkitSpeechRecognition" in window || "SpeechRecognition" in window;

		if (!isSpeechRecognitionAPIAvailable) {
			toast.error(
				"Seu navegador não suporta a API de reconhecimento de voz!",
				{}
			);
			return;
		}

		setIsRecording(true);
		setShouldShowOnBoarding(false);

		const SpeechRecognitionAPI =
			window.SpeechRecognition || window.webkitSpeechRecognition;

		speechRecognition = new SpeechRecognitionAPI();

		speechRecognition.lang = "pt-BR";
		speechRecognition.continuous = true;
		speechRecognition.maxAlternatives = 1;
		speechRecognition.interimResults = true;

		speechRecognition.onresult = (event) => {
			const transcription = Array.from(event.results).reduce((text, result) => {
				return text.concat(result[0].transcript);
			}, "");

			setContent(transcription);
		};
		speechRecognition.onerror = (event) => {
			console.error(event);
		};

		speechRecognition.start();
	}

	function handleStopRecording() {
		setIsRecording(false);

		if (speechRecognition !== null) {
			speechRecognition.stop();
		}
	}

	return (
		<Dialog.Root>
			<Dialog.Trigger className="flex flex-col rounded-md bg-slate-700 p-5 gap-3 text-left hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
				<span className="text-sm font-medium text-slate-200">
					Adicionar nota
				</span>

				<p className="text-sm leading-6 text-slate-400">
					Grave uma nota em áudio que será convertida para texto
					automaticamente.
				</p>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className="inset-0 fixed bg-black/50">
					<Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
						<Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:bg-slate-800/80 transition-all hover:text-slate-300">
							<X className="size-5" />
						</Dialog.Close>

						<form className="flex flex-col flex-1">
							<div className="flex flex-1 flex-col gap-3 p-5">
								<span className="text-sm font-medium text-slate-300">
									Adicionar nova nota
								</span>
								{shouldShowOnBoarding ? (
									<p className="text-sm leading-6 text-slate-400">
										Comece{" "}
										<button
											type="button"
											onClick={handleStartRecording}
											className="font-medium text-lime-400 hover:underline"
										>
											gravando uma nota
										</button>{" "}
										em áudio ou, se preferir,{" "}
										<button
											type="button"
											onClick={handleStartEditor}
											className="font-medium text-lime-400 hover:underline"
										>
											utilize apenas texto
										</button>
										.
									</p>
								) : (
									<textarea
										onChange={handleContentChanged}
										value={content}
										autoFocus
										className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
									/>
								)}
							</div>

							{isRecording ? (
								<button
									onClick={handleStopRecording}
									type="button"
									className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center font-medium text-sm text-slate-300 outline-none hover:text-slate-100 transition-all"
								>
									<div className="size-3 rounded-full bg-red-500 animate-pulse" />
									Gravando... (clique para interromper)
								</button>
							) : (
								<button
									type="button"
									onClick={handleSaveNote}
									className="w-full bg-lime-400 py-4 text-center font-medium text-sm text-lime-950 outline-none hover:bg-lime-500 transition-all"
								>
									Salvar nota
								</button>
							)}
						</form>
					</Dialog.Content>
				</Dialog.Overlay>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
