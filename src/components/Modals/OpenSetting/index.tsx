import React from "react";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/react";
import UserProfileModal from "@/components/Modals/UserProfile";
import { signOut, useSession } from "next-auth/react";
import { deleteUserAccount } from "@/api";
import Swal from "sweetalert2";

interface SettingModalProps {
	isOpen: boolean;
	onOpen: () => void;
	onOpenChange: () => void;
}

const SettingModal = ({ isOpen, onOpen, onOpenChange }: SettingModalProps) => {
	const [profileModalOpen, setProfileModalOpen] = React.useState(false);

	const { data: session }: any = useSession();

	const deleteAccount = () => {
		deleteUserAccount(session.user.Email).then((res) => {
			Swal.fire({
				icon: "success",
				title: `Delete Account Successful!`,
			}).then(() => signOut);
		});
	};

	return (
		<>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				scrollBehavior="inside"
				className="bg-primary text-gray-300"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 m-auto my-4">
								<h1 className="text-2xl text-center">Settings</h1>
							</ModalHeader>
							<ModalBody>
								<div className="flex flex-col justify-center item-center gap-4">
									<>
										<Button
											onClick={deleteAccount}
											className="m-auto w-fit bg-rose-600 text-white hover:bg-red-700"
										>
											Delete Account
										</Button>
										<Button
											onClick={() => setProfileModalOpen(true)}
											className="m-auto w-fit bg-blue-600 text-white hover:bg-blue-700"
										>
											Profile Setting
										</Button>
									</>
								</div>
							</ModalBody>
							<ModalFooter className="mt-4">
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
			<UserProfileModal
				isOpen={profileModalOpen}
				onOpen={() => setProfileModalOpen(true)}
				onOpenChange={() => setProfileModalOpen(false)}
			/>
		</>
	);
};

export default SettingModal;
