import React, { useEffect, useState } from "react";
import CommunityItem from "../CommunityItem";
import { connectToSocketIO } from "@/api/socket-io";

const CommunityArea = ({
	communities,
	user,
	communityId,
}: {
	communities: any;
	user: any;
	communityId: string | undefined;
}) => {
	const [joinableCommunities, setJoinableCommunities] = useState<any>([]);
	useEffect(() => {
		const joinableCommunities = communities.map((community: any) => {
			if (community.GroupMembers.includes(user["Username"])) {
				return community.CommunityId;
			}
		});
		setJoinableCommunities(joinableCommunities);
		connectToSocketIO(joinableCommunities);
	}, [communities]);

	return (
		<div className="flex-1 w-full h-full p-2 bg-primary">
			{communities.map((community: any) => (
				<CommunityItem
					key={community.CommunityId}
					communityId={community.CommunityId}
					image={community.CommunityImage}
					communityName={community.CommunityName}
					time={community.Time}
					isJoinable={!joinableCommunities.includes(community.CommunityId)}
					username={user["Username"]}
					isActive={communityId === community.CommunityId.toString()}
				/>
			))}
		</div>
	);
};

export default CommunityArea;
