import React, { useState } from "react";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { saveImageToS3, setProfilePictureUser } from "@/api";

interface UserProfileModalProps {
	isOpen: boolean;
	onOpen: () => void;
	onOpenChange: () => void;
}

const UserProfileModal = ({
	isOpen,
	onOpen,
	onOpenChange,
}: UserProfileModalProps) => {
	const { data: session }: any = useSession();

	const [newProfileImage, setNewProfileImage] = useState(
		session?.user?.ProfilePicture || null
	);

	const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			saveImageToS3(file, session.user.Username).then((res) => {
				setNewProfileImage(res.fileUrl);
				setProfilePictureUser(session.user.Email, res.fileUrl).then(
					(res) => {}
				);
			});
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			scrollBehavior="inside"
			className="bg-primary text-gray-300"
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1 m-auto">
							<h1 className="text-2xl text-center">Your Profile</h1>
						</ModalHeader>
						<ModalBody>
							<div>
								<div className="flex flex-col justify-center items-center my-5">
									<Avatar src={newProfileImage || undefined} size="lg" />
									<input
										type="file"
										accept="image/*"
										onChange={handleProfileImageChange}
										className="hidden"
										id="customFileInput"
									/>
									<label
										htmlFor="customFileInput"
										className="text-xs bg-secondary text-gray-300 text-black py-2 px-4 my-4 rounded cursor-pointer"
									>
										Edit Profile Image
									</label>
								</div>

								<div className="flex flex-col">
									<Button
										className="block w-2 mt-4 m-auto bg-secondary text-gray-300"
										onClick={() => signOut()}
									>
										Logout
									</Button>
								</div>
							</div>
						</ModalBody>
						<ModalFooter>
							<Button
								onClick={onClose}
								className="bg-gray-600 text-white hover:bg-gray-700"
							>
								Close
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default UserProfileModal;
