import React from "react";
import Link from "next/link";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
const MainContent = () => {
	return (
		<div className="bg-purple-100 min-h-screen flex flex-col justify-center items-center">
			<section className="max-w-3xl mx-auto py-8">
				<h2 className="text-3xl font-bold mb-4 text-center">
					Welcome to Telecord
				</h2>
				<p className="text-lg mb-8 text-center">
					Connect, Share, and Engage with your college community like never
					before.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card className="bg-white shadow-lg border border-gray-300 rounded-lg p-6">
						<CardHeader className="text-xl font-bold mb-2">
							Real-Time Messaging 📨
						</CardHeader>
						<CardBody>
							Send and receive messages instantly. Our real-time sockets ensure
							you’re always in the loop.
						</CardBody>
					</Card>

					<Card className="bg-white shadow-lg border border-gray-300 rounded-lg p-6">
						<CardHeader className="text-xl font-bold mb-2">
							Media Sharing 📸🎥
						</CardHeader>
						<CardBody>
							Upload images and videos directly in the chat. Share your moments
							and work seamlessly.
						</CardBody>
					</Card>

					<Card className="bg-white shadow-lg border border-gray-300 rounded-lg p-6">
						<CardHeader className="text-xl font-bold mb-2">
							Community Search 🔍
						</CardHeader>
						<CardBody>
							Find and join communities that matter to you. Our search makes it
							easy to connect with like-minded individuals.
						</CardBody>
					</Card>

					<Card className="bg-white shadow-lg border border-gray-300 rounded-lg p-6">
						<CardHeader className="text-xl font-bold mb-2">
							Instant Translation 🌐
						</CardHeader>
						<CardBody>
							Communicate without barriers. Select a language and have your
							messages translated on-the-fly.
						</CardBody>
					</Card>

					<Card className="bg-white shadow-lg border border-gray-300 rounded-lg p-6">
						<CardHeader className="text-xl font-bold mb-2">
							Group Details 👥
						</CardHeader>
						<CardBody>
							Stay informed with group details at a glance. See who’s in the
							chat and join the conversation.
						</CardBody>
					</Card>

					<Card className="bg-white shadow-lg border border-gray-300 rounded-lg p-6">
						<CardHeader className="text-xl font-bold mb-2">
							Secure Login 🔒
						</CardHeader>
						<CardBody>
							Sign up and log in with ease. Our integration with next-auth keeps
							your data safe and secure.
						</CardBody>
					</Card>
				</div>

				<div className="text-center mt-8">
					<h2 className="text-3xl font-bold mb-4">
						Get Started with Telecord Today!
					</h2>
					<p className="text-lg">
						Join the platform that’s redefining campus communication.
					</p>
					<Link href="/auth">
						<Button className="bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full mt-6 transition duration-300 ease-in-out transform hover:scale-105">
							Sign Up Now
						</Button>
					</Link>
				</div>
			</section>
		</div>
	);
};

export default MainContent;
