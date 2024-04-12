"use client"

import React, { useState, useEffect, ChangeEvent } from 'react';
import { createCommunity, getCommunities } from '@/api';

const CommunityHandler: React.FC = () => {
  const [communities, setCommunities] = useState<string[]>([]); 
  const [newCommunityName, setNewCommunityName] = useState<string>('');
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const [usersInSelectedCommunity, setUsersInSelectedCommunity] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [newUserName, setNewUserName] = useState<string>('');
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [totalCommunities, setTotalCommunities] = useState<number>(0);





  const handleCreateCommunity = () => {
    createCommunity(newCommunityName).then((res) => {
      if (res.ok) {
        // logic to refresh the communities list
      }
    });
  };

  const handleDeleteCommunity = (event: React.MouseEvent<HTMLButtonElement>) => {
    
    // logic to delete a community
  };

  const handleSelectCommunity = (event: ChangeEvent<HTMLSelectElement>) => {
    const communityId = event.currentTarget.value;
    setSelectedCommunity(communityId);
    // logic to fetch users in the selected community
  };

  const handleRemoveUserFromCommunity = () => {
    if (selectedUser && selectedCommunity) {
      // logic to remove a user from a community
    }
  };

  const handleAddUserToCommunity = () => {
    if (newUserName && selectedCommunity) {
      // logic to add a user to a community
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-center">Community Manager</h2>
      <div className="container flex mx-auto mt-auto h-[45vh]">
        <div className="flex-1 p-7 mx-3 bg-primary rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-white">Total Communities</h2>
          <p className="text-3xl font-bold text-white">{totalCommunities}</p>
        </div>
        <div className="flex-1 p-7 mx-3 bg-primary rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-white">Create Community</h2>
          <input
            type="text"
            value={newCommunityName}
            onChange={(e) => setNewCommunityName(e.target.value)}
            placeholder="New Community Name"
            aria-label="Enter community Name"
            className="px-4 py-2 rounded-md focus:outline-none focus:border-purple-500 mb-5 w-full"
          />
          <button onClick={handleCreateCommunity} className="flex w-full bg-secondary hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 justify-center">
            Create
          </button>
        </div>
        <div className="flex-1 p-7 mx-3 bg-primary rounded-lg shadow-md" >
          <h2 className="text-lg font-semibold mb-4 text-white">Delete Community</h2>
          <select onChange={handleSelectCommunity} className="select px-4 py-2 rounded-md focus:outline-none focus:border-purple-500 mb-5 flex w-full" >
            <option value="" disabled selected className="opacity-20" >Select Community </option>    
            {communities.map((community, index) => (
              <option key={index} value={community} className="text-black">{community}</option>
            ))}
          </select>
          <button onClick={handleDeleteCommunity} className="flex w-full bg-secondary hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 justify-center" >
            Delete
          </button>
        </div>
        <div className="flex-1 p-7 mx-3 bg-primary rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-white">Add User</h2>
          <select onChange={handleSelectCommunity} className="select mb-5 p-2 flex w-full">
            <option value="" disabled selected>Select Community</option>
            {communities.map((community, index) => (
              <option key={index} value={community} className="text-black">{community}</option>
            ))}
          </select>
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="New User Name"
            className="px-4 py-2 rounded-md focus:outline-none focus:border-purple-500 mb-5 w-full"
          />
          <button onClick={handleAddUserToCommunity} className="flex w-full bg-secondary hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 justify-center">
            Add
          </button>
        </div>
        <div className="flex-1 p-7 mx-3 bg-primary rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-white">Manage Users</h2>
          <select onChange={handleSelectCommunity} className="select mb-5 p-2 flex w-full">
            <option value="" disabled selected>Select Community</option>
            {communities.map((community, index) => (
              <option key={index} value={community} className="text-black">{community}</option>
            ))}
          </select>
          <select onChange={(e) => setSelectedUser(e.currentTarget.value)} className="select mb-5 p-2 flex w-full">
            <option value="" disabled selected>Select User</option>
            {allUsers.map((user, index) => (
              <option key={index} value={user} className="text-black">{user}</option>
            ))}
          </select>
          <button onClick={handleRemoveUserFromCommunity} className="flex w-full bg-secondary hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 justify-center">
            Remove User
          </button>
        </div>
      </div>
    </div>
  );
  
  
  
  
  
  
  
};

export default CommunityHandler;






