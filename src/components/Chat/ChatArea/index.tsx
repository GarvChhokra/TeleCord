import { receiveMessage, sendMessage } from "@/api/socket-io";
import { Image, Input, Progress } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "@nextui-org/react";
import { ImAttachment } from "react-icons/im";
import { FaFile, FaFileAudio } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";
import {
	getChats,
	saveChatMessage,
	saveImageToS3,
	TextToAudio,
	TranslateChats,
} from "@/api";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import CommunityDetails from "@/components/Modals/CommunityDetails";
import { FiSearch } from "react-icons/fi";
import { PiTranslateFill } from "react-icons/pi";

const ChatArea = ({
	communityId,
	communityDetails,
}: {
	communityId: string;
	communityDetails: any;
}) => {
	const [currentMessage, setCurrentMessage] = useState("");
	const [chats, setChats] = useState([] as string[]);
	const [files, setFiles] = useState<File[] | null>(null);
	const { data: session }: any = useSession();
	const [search, setSearch] = useState("");
	const chatArea = useRef<HTMLDivElement>(null);
	const [isTranslating, setIsTranslating] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getChats(communityId).then((res) => {
			setChats(res);
			setIsLoading(false);
			chatArea.current?.scrollIntoView({ behavior: "smooth" });
		});
	}, []);

	useEffect(() => {
		receiveMessage((msg: any) => {
			setChats([...chats, msg]);
			chatArea.current?.scrollIntoView({ behavior: "smooth" });
		});
	}, [chats]);

	const handleMessageChange = (event: any) => {
		setCurrentMessage(event.target.value);
	};

	const handleSendMessage = () => {
		const msg: SendMessage = {
			Message: currentMessage,
			CommunityId: communityId,
			Username: session?.user?.["Username"],
			Time: new Date(),
			ProfilePicture: session?.user?.["ProfilePicture"],
		};

		try {
			if (currentMessage.length === 0) return;
			saveChatMessage(msg);
			sendMessage(msg);
			setCurrentMessage("");
		} catch (err) {
			console.error("Error sending message: ", err);
			Swal.fire({
				title: "Error!",
				text: "There was a problem sending your message",
				icon: "error",
				confirmButtonText: "Try again",
			});
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const newFiles = Array.from(event.target.files);
			setFiles(newFiles);
		}
	};

	const translateMessage = async () => {
		setIsTranslating(true);
		TranslateChats(chats).then((res) => {
			setChats(res);
			setIsTranslating(false);
		});
	};

	const handleAudio = async (currentMessage: String) => {
		await TextToAudio(currentMessage);
	};

	const handleSendFiles = async () => {
		if (files && files.length > 0) {
			try {
				const promises = files.map(async (file) => {
					// Send a request to your backend to save the file to S3
					const response = await saveImageToS3(file);

					// Parse the response to get the filename
					const fileUrl = response.fileUrl;

					// Create a message object including the filename
					const msg: SendMessage = {
						Message: `file:${fileUrl}`,
						CommunityId: communityId,
						Username: session?.user?.["Username"],
						Time: new Date(),
						ProfilePicture: session?.user?.["ProfilePicture"],
					};

					// Save the chat message with the filename included
					saveChatMessage(msg);

					// Send the message to other users
					sendMessage(msg);
					setCurrentMessage("");
				});

				// Wait for all file uploads to finish
				await Promise.all(promises);

				// Clear the files state after successful upload
				setFiles(null);
			} catch (err) {
				Swal.fire({
					title: "Error!",
					text: "There was a problem sending your files",
					icon: "error",
					confirmButtonText: "OK",
				});
			}
		}
	};

	const removeFile = (index: number) => {
		setFiles((prevFiles) => {
			if (prevFiles) {
				const newFiles = [...prevFiles];
				newFiles.splice(index, 1);
				return newFiles;
			}
			return null;
		});
	};

	const formatDate = (date: any) => {
		const now: any = new Date();
		const diff = now - date;
		const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));

		if (diffInDays === 0) {
			return "Today at " + formatTime(date);
		} else if (diffInDays === 1) {
			return "Yesterday at " + formatTime(date);
		} else {
			// Format date as you desire
			return date.toLocaleDateString() + " at " + formatTime(date);
		}
	};

	const formatTime = (date: any) => {
		let hours = date.getHours();
		const minutes = date.getMinutes().toString().padStart(2, "0");
		const ampm = hours >= 12 ? "PM" : "AM";
		hours = hours % 12;
		hours = hours ? hours : 12; // Convert midnight (0 hours) to 12
		return hours + ":" + minutes + " " + ampm;
	};

	useEffect(() => {
		if (search.length > 0) {
			const filteredChats = chats.filter((chat: any) =>
				chat.Message.toLowerCase().includes(search.toLowerCase())
			);
			setChats(filteredChats);
		} else {
			getChats(communityId).then((res) => {
				setChats(res);
			});
		}
	}, [search]);

	return isTranslating || isLoading ? (
		<div className="flex flex-col items-center justify-center w-full h-full p-4">
			<Progress
				size="sm"
				isIndeterminate
				color="secondary"
				aria-label={isTranslating ? "Translating..." : "Loading chats..."}
				className="max-w-md"
			/>
			<span className="text-gray-300">
				{isTranslating ? "Translating..." : "Loading chats..."}
			</span>
		</div>
	) : (
		<div className="w-full h-full flex flex-col bg-primary">
			<div className="py-[8px] px-3 items-baseline justify-between flex">
				{/*HUYEN ANH NHAP*/}
				<CommunityDetails communityDetails={communityDetails} />

				<Input
					value={search}
					radius="md"
					classNames={{
						label: ["!text-gray-300"],
						input: [
							"bg-transparent",
							"!text-gray-300",
							"placeholder:text-gray-300",
						],
						innerWrapper: ["bg-transparent"],
						inputWrapper: [
							"bg-accent",
							"group-data-[focus]:bg-accent/80",
							"group-data-[hover]:bg-accent/80",
							"!cursor-text",
						],
						base: ["bg-transparent", "text-gray-300", "p-2", "w-3/16"],
					}}
					placeholder="Search messages..."
					startContent={
						<FiSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
					}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>

			{/* Messaging area */}
			<div className="p-4 w-full h-full overflow-y-scroll no-scrollbar">
				{chats.length > 0 ? (
					<>
						{chats.map((chat: any, index: number) => {
							return (
								<div key={index} className="flex flex-row gap-2 my-4">
									<div className="text-black my-auto mx-2">
										{session?.user?.["ProfilePicture"] ? (
											<Avatar
												src={chat.ProfilePicture}
												className="w-12 h-12 text-tiny"
											/>
										) : (
											<Avatar
												name={chat.Username.split("")[0]}
												className="w-12 h-12 text-tiny"
											/>
										)}
									</div>
									<div className="flex flex-row justify-start items-end w-full">
										<div>
											<span className="text-gray-500">{chat.Username}</span>

											{chat.Message.startsWith("file:") ? (
												chat.Message.includes(".pdf") ||
												chat.Message.includes(".docx") ? (
													<div className="flex flex-row justify-start items-end">
														<div className="p-2 bg-accent rounded-lg text-gray-300">
															<a
																href={chat.Message.substring(5)}
																target="_blank"
																rel="noreferrer"
																className="text-gray-300"
															>
																<div key={index} className="flex gap-2">
																	<span className="text-gray-300 flex flex-row gap-2 items-center justify-start">
																		<FaFile />
																		{chat.Message.substring(46)}
																	</span>
																</div>
															</a>
														</div>

														<a
															href={chat.Message.substring(5)}
															target="_blank"
															rel="noreferrer"
															className="text-gray-300 py-1 ml-2"
														>
															<MdFileDownload />
														</a>
													</div>
												) : (
													<Image
														width={100}
														height={100}
														src={chat.Message.substring(5)}
														alt="File"
														className="w-full"
													/>
												)
											) : (
												<div className="flex flex-row justify-start items-end">
													<div className="p-2 bg-accent rounded-lg text-gray-300">
														<div className="flex items-center justify-center">
															<div className="p-2 bg-accent rounded-lg text-gray-300 flex-grow">
																{chat.Message}
															</div>
														</div>
													</div>
													<div className="ml-2 cursor-pointer text-gray-300 py-1">
														<FaFileAudio
															onClick={() => handleAudio(chat.Message)}
														/>
													</div>
												</div>
											)}
										</div>{" "}
										{/* end of bubble */}
										<div className="mx-4">
											<span className="text-gray-500 text-[11px] lg:text-xs">
												{formatDate(new Date(chat.Time))}
											</span>
										</div>
									</div>
									<div className="flex-grow"></div>
								</div>
							);
						})}
						<div ref={chatArea}></div>
					</>
				) : (
					<div className="text-white flex flex-col items-center justify-center w-full h-full p-4">
						<h1 className="text-2xl text-center font-light">
							Welcome to Telecord
						</h1>
						<h2 className="text-lg font-light">
							Start a chat with your friends and family
						</h2>
					</div>
				)}
			</div>
			<div className="flex p-2 pt-0 gap-2 w-full flex-col">
				{files && files.length > 0 && (
					<div className="flex gap-2 flex-wrap bg-accent p-2 rounded-lg">
						{files.map((file: File, index: number) => (
							<div key={index} className="flex gap-2">
								<span className="bg-transparent text-gray-300 flex flex-row gap-2 items-center justify-start">
									<FaFile />
									{file.name}
								</span>
								<span
									className="text-gray-500 cursor-pointer"
									onClick={() => removeFile(index)}
								>
									&#10005;
								</span>
							</div>
						))}
					</div>
				)}
				<Input
					type="url"
					label="Message"
					value={currentMessage}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleSendMessage();
							if (files) handleSendFiles();
						}
					}}
					onChange={handleMessageChange}
					radius="lg"
					classNames={{
						label: ["!text-gray-300"],
						input: [
							"bg-transparent",
							"!text-gray-300",
							"placeholder:text-gray-300",
						],
						innerWrapper: ["bg-transparent"],
						inputWrapper: [
							"bg-accent",
							"group-data-[focus]:bg-accent/80",
							"group-data-[hover]:bg-accent/80",
							"!cursor-text",
						],
						base: ["bg-transparent", "text-gray-300", "p-2"],
					}}
					placeholder="Type to message..."
					endContent={
						<div className="flex items-center m-auto justify-center gap-2">
							{/* translate */}
							<span
								className="text-gray-500 cursor-pointer"
								onClick={translateMessage}
							>
								<PiTranslateFill className="text-[30px] text-gray-500 cursor-pointer" />
							</span>
							<label htmlFor="file-upload">
								<ImAttachment className="text-[22px] text-gray-500 cursor-pointer" />
							</label>
							<input
								id="file-upload"
								type="file"
								className="hidden"
								onChange={handleFileChange}
							/>
						</div>
					}
				/>
			</div>
		</div>
	);
};

export default ChatArea;
