import ChatLayout from "@/components/Chat/ChatLayout";

const ChatCommunity = ({ params }: { params: { id: string } }) => {
	const { id } = params;
	return <ChatLayout communityId={id} />;
};

export default ChatCommunity;
