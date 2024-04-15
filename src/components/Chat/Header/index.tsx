import { FaRegUserCircle } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import CreateCommunityModal from "@/components/Modals/CreateCommunity";
import { useDisclosure } from "@nextui-org/react";
import UserProfileModal from "@/components/Modals/UserProfile";
import SettingModal from "@/components/Modals/OpenSetting";

const ChatHeader = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const {
		isOpen: userProfileOpen,
		onOpen: openUserProfile,
		onOpenChange: openUserProfileChange,
	} = useDisclosure();
	const {
		isOpen: settingOpen,
		onOpen: openSetting,
		onOpenChange: openSettingChange,
	} = useDisclosure();

	return (
		<div className="container m-auto p-4 bg-primary">
			<div className="flex items-center justify-between">
				<div className="p-2 text-xl">
					<FaRegUserCircle
						size={"1.1em"}
						onClick={openUserProfile}
						className="cursor-pointer text-white"
					/>
				</div>
				<UserProfileModal
					isOpen={userProfileOpen}
					onOpen={openUserProfile}
					onOpenChange={openUserProfileChange}
				/>
				<div className="p-2 text-xl">
					<CiCirclePlus
						size={"1.1em"}
						onClick={onOpen}
						className="cursor-pointer text-white"
					/>
				</div>
				<CreateCommunityModal
					isOpen={isOpen}
					onOpen={onOpen}
					onOpenChange={onOpenChange}
				/>
				<div className="p-2 text-lg">
					<IoIosSettings
						onClick={openSetting}
						size={"1.1em"}
						className="cursor-pointer text-white"
					/>
				</div>
				<SettingModal
					isOpen={settingOpen}
					onOpen={openSetting}
					onOpenChange={openSettingChange}
				/>
			</div>
		</div>
	);
};

export default ChatHeader;
