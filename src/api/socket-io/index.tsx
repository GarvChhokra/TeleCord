import io from "socket.io-client";

const socket = io("http://127.0.0.1:5000");

export const connectToSocketIO = (userCommunities: any) => {
	userCommunities.forEach((CommunityId: any) => {
		socket.emit("join_community", CommunityId);
	});

	return socket;
};

export const sendMessage = (message: SendMessage) => {
	if (socket.connected) {
		socket.emit("message_send", message);
	} else {
		console.log("Socket is not connected");
	}
};

export const receiveMessage = (setMessageCallback: any) => {
	socket.on("new_msg", (data) => {
		console.log("Received message: ", data);
		setMessageCallback(data);
	});
};
