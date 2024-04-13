"use client"

import { deleteUserAccount, getAllUsers, updatePassword } from '@/api';
import { SignUpAPI } from '@/api/authentication';
import React, { useEffect, useState } from 'react';

const UserHandler = () => {
  const [users, setUsers] = useState(null); // Replace with actual data
  const [selectedUser, setSelectedUser] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [deleteUserName, setDeleteUserName] = useState('');
  const [changePasswordUserName, setChangePasswordUserName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [newUserPassword, setNewUserPassword] = useState('')
  const [newUserEmail, setNewUserEmail] = useState('')



  useEffect(() => {
    updateUsers();
  }, [])

  const updateUsers = () => {
    setLoading(true)
    // getCommunities(username).then((res) => {
    getAllUsers().then((res) => {
      console.log(res)
      if ("users" in res) {
        setUsers(res.users)
      }
      else {
        setUsers(null)
      }
    })
      .catch(Error => console.error("Error changing password:", Error))
      .finally(() => setLoading(false))
  }
  const handleCreateUser = () => {
    // Logic to create a user
    SignUpAPI(newUserEmail, newUserPassword, newUserName).then((res) => {
      updateUsers();
    })
      .catch(Error => console.error("Error Creating user:", Error))
  };

  const handleDeleteUser = () => {
    // Logic to delete a user
    deleteUserAccount(deleteUserName).then((res) => {
      updateUsers()
    })
      .catch(Error => console.error("Error deleting user:", Error))
  };

  const handleChangePassword = () => {
    // Logic to change user's password
    if (!selectedUser || !newPassword) throw new Error('Please select a user and enter a new password');
    updatePassword(selectedUser, newPassword).then((res) => {
      console.log(res)
    })
      .catch(Error => console.error("Error changing password:", Error))

  }


  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.currentTarget.value);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center">User Management</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Create User</h2>
          <div className="space-y-3">

            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="New User Name"
              className="input"
            />
            <input
              type="text"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              placeholder="New User Eamil"
              className="input"
            />
            <input
              type="text"
              value={newUserPassword}
              onChange={(e) => setNewUserPassword(e.target.value)}
              placeholder="New User Password"
              className="input"
            />
          </div>
          <button onClick={handleCreateUser} className="btn-primary mt-4 w-full">Create new User</button>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Delete User</h2>
          <input
            type="text"
            value={deleteUserName}
            onChange={(e) => setDeleteUserName(e.target.value)}
            placeholder="User Eamil to Delete"
            className="input"
          />
          <button onClick={handleDeleteUser} className="btn-primary mt-4 w-full">Delete</button>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          {loading || users == null ?
            <div className="h-8 bg-gray-200 rounded-full overflow-hidden relative">
              <div className="h-full absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-200 animate-glass"></div>
            </div>
            :
            <>
              <h2 className="text-lg font-semibold mb-2">Change Password</h2>
              <select onChange={handleUserChange} className="select">
                <option value="">Select User...</option>

                {users?.map((user, index) => (
                  <option key={index} value={user.Email}>{user.Username}</option>
                ))}
              </select>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="input mt-4"
              />
              <button onClick={handleChangePassword} className="btn-primary mt-4 w-full">Change Password</button>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default UserHandler;





