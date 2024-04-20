"use client";
import { ChangePassword, deleteUserAccount, GetAllUsers } from "@/api";
import { GetUserAPI, SignUpAPI } from "@/api/authentication";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UserHandler = () => {
	const [newUserName, setNewUserName] = useState("");
	const [newUserEmail, setNewUserEmail] = useState("");
	const [newUserPassword, setNewUserPassword] = useState("");
	const [deleteUserName, setDeleteUserName] = useState("");
	const [selectedUser, setSelectedUser] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [users, setUsers] = useState([]);

    useEffect(() => {
        GetAllUsers().then((response) => {
            setUsers(response);
        }).catch((error) => {
            console.error("Error fetching users:", error);
        });
    }, []);

	const handleCreateUser = () => {
		GetUserAPI(newUserEmail).then((response) => {
			if (response) {
				Swal.fire({
					title: "Error!",
					text: "User already exists",
					icon: "error",
					confirmButtonText: "Try again",
				});
				throw new Error("User already exists");
			}
			else{
				SignUpAPI(newUserEmail, newUserPassword, newUserName)
				.then((res) => {
					if (res.ok) {
						Swal.fire({
							title: "Success!",
							text: "Account created successfully",
							icon: "success",
							confirmButtonText: "Login",
						}).then((result) => {
							if (result.isConfirmed) {
								setNewUserEmail("");
								setNewUserName("");
								setNewUserPassword("");
							}
						});
					}
				})
				.catch((err) => {
					console.error("There was a problem with the sign up:", err);
					Swal.fire({
						title: "Error!",
						text: "There was a problem creating your account",
						icon: "error",
						confirmButtonText: "Try again",
					});
				});
			}
		})
	};

	const handleDeleteUser = () => {
		deleteUserAccount(deleteUserName).then((response) => {
			if (!response.ok) {
				Swal.fire({
					title: 'Error!',
					text: 'Failed to delete user'
				});
				throw new Error("Failed to delete user");
			}
			console.log("User deleted");
			Swal.fire({
				title: 'Success!',
				text: 'User deleted successfully'
			});
		});
	};

	const handleChangePassword = () => {
		ChangePassword(selectedUser, newPassword).then((response) => {
			if (!response.ok) {
				Swal.fire({
					title: 'Error!',
					text: 'Failed to change password'
				});
				throw new Error("Failed to change password");
			}
			console.log("Password changed");
			Swal.fire({
				title: 'Success!',
				text: 'Password changed successfully'
			});
			setNewPassword("");
		});
	};


	const handleUserChange = (event: any) => {
		setSelectedUser(event.currentTarget.value);
	};

	return (
		<div className="container mt-10 w-full">
			<div className="flex flex-row m-auto items-center justify-center gap-4">
				<div className="p-6 bg-primary rounded-lg shadow-md w-1/3 h-[300px]">
					<h2 className="text-lg font-semibold mb-2 text-white">Create User</h2>
					<input
						type="text"
						value={newUserName}
						onChange={(e) => setNewUserName(e.target.value)}
						placeholder="New User Name"
						className="px-4 py-2 rounded-md focus:outline-none focus:border-purple-500 mb-3 w-full input"
					/>
					<input
						type="email"
						value={newUserEmail}
						onChange={(e) => setNewUserEmail(e.target.value)}
						placeholder="New User Email"
						className="px-4 py-2 rounded-md focus:outline-none focus:border-purple-500 mb-3 w-full input"
					/>
					<input
						type="password"
						value={newUserPassword}
						onChange={(e) => setNewUserPassword(e.target.value)}
						placeholder="New User Password"
						className="px-4 py-2 rounded-md focus:outline-none focus:border-purple-500 mb-5 w-full input"
					/>
					<button
						onClick={handleCreateUser}
						className="flex w-full bg-secondary hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 justify-center btn-primary"
					>
						Create
					</button>
				</div>
				<div className="p-6 bg-primary rounded-lg shadow-md w-1/3 h-[300px]">
					<h2 className="text-lg font-semibold mb-2 text-white">Delete User</h2>
					<input
						type="text"
						value={deleteUserName}
						onChange={(e) => setDeleteUserName(e.target.value)}
						placeholder="User Name to Delete"
						className="px-4 py-2 rounded-md focus:outline-none focus:border-purple-500 mb-5 w-full input"
					/>
					<button
						onClick={handleDeleteUser}
						className="flex w-full bg-secondary hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 justify-center btn-primary"
					>
						Delete
					</button>
				</div>
				<div className="p-6 bg-primary rounded-lg shadow-md w-1/3 h-[300px]">
					<h2 className="text-lg font-semibold mb-2 text-white">
						Change Password
					</h2>
					<select
						onChange={handleUserChange}
						className="select mb-5 p-2 flex w-full"
					>
						<option value="" disabled selected className="opacity-20">
							Select USER
						</option>
						{users.map((user, index) => (
							<option key={index} value={user}>
								{user}
							</option>
						))}
					</select>
					<input
						type="password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						placeholder="New Password"
						className="px-4 py-2 rounded-md focus:outline-none focus:border-purple-500 mb-5 w-full input"
					/>
					<button
						onClick={handleChangePassword}
						className="flex w-full bg-secondary hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 justify-center btn-primary"
					>
						Change Password
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserHandler;
