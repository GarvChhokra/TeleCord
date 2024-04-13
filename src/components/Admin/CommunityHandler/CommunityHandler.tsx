"use client"

import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { createCommunity, getCommunities, getAllCommunities, deleteCommunity, joinCommunity, leaveCommunity, getAllUsers } from '@/api';
import { useSession } from 'next-auth/react';

const CommunityHandler: React.FC = () => {
  const [communities, setCommunities] = useState<string[]>([]);
  const [newCommunityName, setNewCommunityName] = useState<string>('');
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const [usersInSelectedCommunity, setUsersInSelectedCommunity] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [newUserName, setNewUserName] = useState<string>('');
  const [communityUser, setCommunityUser] = useState<string[]>([]);
  const [totalCommunities, setTotalCommunities] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const { data: session }: any = useSession();
  const username = session?.user?.["Username"];
  useEffect(() => {
    updateCommunity();
    
  }, [])

  const updateCommunity = () => {
    setLoading(true)
    // getCommunities(username).then((res) => {
    getAllCommunities().then((res) => {
      setCommunities(res)
      setTotalCommunities(res.length)
      setCommunityUser([])
    })
      .finally(() => setLoading(false))
  }
 

  let communityIdToDelete = "";

  const handleDeleteCommunityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    communityIdToDelete = event.currentTarget.value;
    console.log(communityIdToDelete)
  }
  const handleDeleteCommunity = () => {
    setLoading(true)
    deleteCommunity(communityIdToDelete)
      .then(() => {
        // Refresh communities data after deletion
        updateCommunity()
      })
      .catch((error) => {
        // Handle error if deletion fails
        console.error("Error deleting community:", error);
      })
      .finally(() => setLoading(false))
  };


  const handleCreateCommunity = () => {
    setLoading(true)
    createCommunity(newCommunityName, username).then((res) => {
      if (res.ok) {
        // logic to refresh the communities list
        updateCommunity()
      }
    })
      .finally(() => setLoading(false))
  };


  const handleSelectCommunity = (event: ChangeEvent<HTMLSelectElement>) => {
    const communityId = event.currentTarget.value;

    if (communityId == "") {
      setSelectedCommunity(null)
      setCommunityUser([]);
      return
    }

    setSelectedCommunity(communityId);
    const selectedCommunityUsers = communities.filter(community => community.CommunityId === Number(communityId))[0]?.GroupMembers
    setCommunityUser(selectedCommunityUsers.length === 0 ? [] : selectedCommunityUsers || [])


    // logic to fetch users in the selected community
  };

  const handleRemoveUserFromCommunity = () => {
    if (selectedUser && selectedCommunity) {
      setLoading(true)
      leaveCommunity(selectedCommunity, selectedUser)
        .then((res) => {
          updateCommunity()
        })
        .catch((error) => {
          console.error("Error leaving community:", error);
        })
        .finally(() => setLoading(false))
    }
  };

  const handleAddUserToCommunity = () => {
    if (newUserName && selectedCommunity) {
      setLoading(true)
      joinCommunity(selectedCommunity, newUserName)
        .then((res) => {
          updateCommunity()
        })
        .catch((error) => {
          console.error("Error joining community:", error);
        })
        .finally(() => setLoading(false))
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-md">
          {loading || totalCommunities == null ?
            <div className="h-8 bg-gray-200 rounded-full overflow-hidden relative">
              <div className="h-full absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-200 animate-glass"></div>
            </div>

            :
            <>
              <h2 className="text-lg font-semibold mb-4">Total Communities</h2>
              <p className="text-3xl font-bold">{totalCommunities} </p>
            </>
          }
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          {loading || totalCommunities == null ?
            <div className="h-8 bg-gray-200 rounded-full overflow-hidden relative">
              <div className="h-full absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-200 animate-glass"></div>
            </div>

            :
            <>
              <h2 className="text-lg font-semibold mb-4">Create Community</h2>
              <input
                type="text"
                value={newCommunityName}
                onChange={(e) => setNewCommunityName(e.target.value)}
                placeholder="New Community Name"
                className="input"
              />
              <button onClick={handleCreateCommunity} className="btn-primary mt-4">
                Create
              </button>
            </>
          }
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          {loading || totalCommunities == null ?
            <div className="h-8 bg-gray-200 rounded-full overflow-hidden relative">
              <div className="h-full absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-200 animate-glass"></div>
            </div>

            :
            <>
              <h2 className="text-lg font-semibold mb-4">Delete Community</h2>
              <select onChange={handleDeleteCommunityChange} className="select">
                <option value={''}>
                  Select community...
                </option>
                {communities.map((community, index) => (
                  <option key={index} value={community.CommunityId}>
                    {community.CommunityName}
                  </option>
                ))}
              </select>
              <button onClick={handleDeleteCommunity} className="btn-primary mt-4">
                Delete
              </button>
            </>
          }
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-8">

        <div className="p-6 bg-white rounded-lg shadow-md">
          {loading || totalCommunities == null ?
            <div className="h-8 bg-gray-200 rounded-full overflow-hidden relative">
              <div className="h-full absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-200 animate-glass"></div>
            </div>
            :
            <>
              <h2 className="text-lg font-semibold mb-4">Add User</h2>
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="New User Name"
                className="input"
              />
              <select onChange={handleSelectCommunity} className="select mt-4">
                <option value={''}>
                  Select community...
                </option>
                {communities.map((community, index) => (
                  <option key={index} value={community.CommunityId}>
                    {community.CommunityName}
                  </option>
                ))}
              </select>
              <button onClick={handleAddUserToCommunity} className="btn-primary mt-4">
                Add
              </button>
            </>
          }
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          {loading || totalCommunities == null ?
            <div className="h-8 bg-gray-200 rounded-full overflow-hidden relative">
              <div className="h-full absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-200 animate-glass"></div>
            </div>

            :
            <>
              <h2 className="text-lg font-semibold mb-4">Manage Users</h2>
              <select onChange={handleSelectCommunity} className="select">
                <option value={''}>
                  Select community...
                </option>
                {communities.map((community, index) => (
                  <option key={index} value={community.CommunityId}>
                    {community.CommunityName}
                  </option>
                ))}
              </select>
              <select onChange={(e) => setSelectedUser(e.currentTarget.value)} className="select mt-4">
                <option value={''}>
                  Select User...
                </option>
                {communityUser.map((user, index) => (
                  <option key={index} value={user}>
                    {user}
                  </option>
                ))}
              </select>
              <button onClick={handleRemoveUserFromCommunity} className="btn-primary mt-4">
                Remove User
              </button>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default CommunityHandler;






