import React from "react";
import { Card, CardHeader, Button, Avatar } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { joinCommunity, leaveCommunity } from "@/api";
import Swal from "sweetalert2";

const CommunityItem: React.FC<Community> = ({
	image,
	communityName,
	communityId,
	time,
	isJoinable,
	username,
	isActive,
}) => {
	const onPressJoin = (e: React.MouseEvent<HTMLButtonElement>) => {
		joinCommunity(communityId, username).then((res) => {
			if (res.ok) {
				Swal.fire({
					title: "Success!",
					text: "Community joined successfully!",
					icon: "success",
					confirmButtonText: "OK",
				}).then(() => {
					window.location.reload();
				});
			} else {
				Swal.fire({
					title: "Error!",
					text: "Community join failed!",
					icon: "error",
					confirmButtonText: "OK",
				});
			}
		});
	};

	const onPressLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
		leaveCommunity(communityId, username).then((res) => {
			if (res.ok) {
				Swal.fire({
					title: "Success!",
					text: "Community left successfully!",
					icon: "success",
					confirmButtonText: "OK",
				}).then(() => {
					window.location.reload();
				});
			} else {
				Swal.fire({
					title: "Error!",
					text: "Community leave failed!",
					icon: "error",
					confirmButtonText: "OK",
				});
			}
		});
	};

	const router = useRouter();

	return (
		<Card
			className={`${
				isActive ? "bg-secondary" : "bg-primary"
			} w-full hover:bg-secondary text-gray-300 hover:text-white my-2 ${
				isJoinable ? "cursor-default" : "cursor-pointer"
			}`}
			isPressable={!isJoinable}
			onPress={() => !isJoinable && router.push(`/chat/${communityId}`)}
		>
			<CardHeader className="flex-col lg:flex-row lg:justify-between">
				<div className="flex gap-5 xl:gap-5">
					<Avatar src={image} alt={communityName} size="lg" />

					<div className="flex flex-col gap-1 items-start justify-center">
						<h4 className="text-xs font-semibold leading-none xl:text-small">
							{communityName}
						</h4>
					</div>
				</div>
				<h6 className="text-small text-default-400">{time}</h6>
				{isJoinable ? (
					<Button
						className="mt-2 text-xs xl:mt-0"
						color="primary"
						onClick={onPressJoin}
					>
						Join
					</Button>
				) : (
					<Button
						className="mt-2 text-xs xl:mt-0"
						color={`${isActive ? "primary" : "secondary"}`}
						onClick={onPressLeave}
					>
						Leave
					</Button>
				)}
			</CardHeader>
		</Card>
	);
};

export default CommunityItem;
