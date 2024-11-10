'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/sidebar'
import MainContent from '@/components/mainContent'
// import { /*users,*/ currentUser/*, communities*/ } from '../lib/mock-data';
import { healthcheckGet } from '../client/services.gen'
// import { add_groups, add_users } from '../lib/data'
import { Group } from '../client/types.gen'
import { fetchCurrentUser } from '../lib/fetchData'

// add_users()
// add_groups()

async function checkHealth() {
  try {
      const response = await healthcheckGet();
      console.log('Healthcheck response:', response);
  } catch (error) {
      console.error('Healthcheck error:', error);
  }
}

// async function sendNewUser() {
//   const newUser = {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     password_hash: "hashed_password",
//     bio: "This is a bio",
//   };

//   try {
//     const response = await createUserUserPost({ body: newUser });
//     console.log('New user created:', response.data);
//   } catch (error) {
//     console.error('Error creating new user:', error);
//   }
// }

checkHealth()
// sendNewUser()

export interface PostProps{
  id: number,
  author: string,
  authorAvatar:string,
  community:number,
  time:string,
  content:string,
  link:string | null,
  likes:number,
  comments:{
    author:string,
    authorAvatar:string,
    content:string
  }[]
}

export interface UserProps {
  id: number,
  name: string,
  email: string,
  // password_hash: string
  avatar:string,
  bio:string,
  following:number,
  followers:number,
  // registered_at:string //?
  groups:Group[]
  posts?: PostProps[]; // TODO
}

export interface GroupProps {
  id: number
  name: string
  description?: string
  creation_date?: string
  creator_id?: number
}

export type ViewType = 'feed' | 'community' | 'profile'

export default function EduSocial() {
  const [view, setView] = useState<ViewType>('feed')
  const [selectedCommunity, setSelectedCommunity] = useState('')
  const [selectedProfile, setSelectedProfile] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);

  useEffect(() => {
    async function fetchData() {
      const user = await fetchCurrentUser()
      setCurrentUser(user ?? null) // TODO 
    }
    fetchData();
  }, []);

  const handleCommunityClick = (community: string) => {
    setView('community')
    setSelectedCommunity(community)
  }

  const handleProfileClick = (profile: string) => {
    setView('profile')
    setSelectedProfile(profile)
  }

  const handleHomeClick = () => {
    setView('feed')
    setSelectedCommunity('')
    setSelectedProfile('')
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // TODO
  }

  if (!currentUser) {
    return // <div>Loading...</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        user={currentUser}
        onCommunityClick={handleCommunityClick}
        onProfileClick={handleProfileClick}
        onHomeClick={handleHomeClick}
      />
      <MainContent
        view={view}
        community={selectedCommunity}
        profile={selectedProfile}
        currentUser={currentUser}
        onProfileClick={handleProfileClick}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />
    </div>
  )
}