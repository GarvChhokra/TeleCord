"use client";
import React, { useEffect, useState } from "react";
import ChatHeader from "../Header";
import Search from "../Search";
import CommunityArea from "../CommunityArea";
import { Card, CardBody } from "@nextui-org/react";
import ChatArea from "../ChatArea";
import { useSession } from "next-auth/react";
import { getCommunities } from "@/api";
import Loader from "@/components/Loader/page";

const ChatLayout = ({ communityId }: { communityId?: string }) => {
	const { data: session }: any = useSession();
	const [searchResults, setSearchResults] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [loading, setLoading] = useState(true);

	const setResults = (results: any, isSearching: boolean) => {
		setSearchResults(results);
		setIsSearching(isSearching);
	};

	const [communitiesData, setCommunitiesData] = useState<Community[]>([]);

	useEffect(() => {
		getCommunities(session?.user?.["Username"]).then((res) => {
			setCommunitiesData(res);
			setLoading(false);
		});
	}, [session]);

	return loading ? (
		<Loader />
	) : (
		<Card className="m-4 h-[90vh] bg-primary">
			<CardBody className=" flex flex-row w-full h-full p-0">
				<div className="flex items-start flex-col w-[35%] border-r-[1px] border-gray-700">
					<ChatHeader />
					<Search onChange={setResults} />
					{isSearching ? (
						searchResults.length ? (
							<CommunityArea
								communityId={communityId}
								communities={searchResults}
								user={session?.user}
							/>
						) : (
							<div className="flex-1 w-full h-full p-2 bg-primary">
								<h1 className="text-center text-lg font-light text-white">
									No results found
								</h1>
							</div>
						)
					) : (
						<CommunityArea
							communityId={communityId}
							communities={communitiesData}
							user={session?.user}
						/>
					)}
				</div>
				{communityId ? (
					<ChatArea
						communityId={communityId}
						communityDetails={
							communitiesData.filter(
								(community: any) =>
									community.CommunityId.toString() === communityId
							)[0]
						}
					/>
				) : (
					<div className="bg-primary text-gray-300 flex-1 bg-gray-100 flex flex-col items-center justify-center">
						<div className="mt-auto flex flex-col items-center justify-center w-full h-full p-4">
							<h1 className="text-2xl text-center font-light">
								Welcome to Telecord
							</h1>
							<h2 className="text-lg font-light">
								Start a chat with your friends and family
							</h2>
						</div>
						<div className="mt-auto mb-2">
							<h3 className="text-md font-light">
								Your chats are end-to-end encrypted, so you can chat with your
								loved ones without worrying about privacy.
							</h3>
						</div>
					</div>
				)}
			</CardBody>
		</Card>
	);
};

export default ChatLayout;
