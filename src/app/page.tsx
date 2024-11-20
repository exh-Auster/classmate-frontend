'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/sidebar'
import MainContent from '@/components/mainContent'
// import { /*users,*/ currentUser/*, communities*/ } from '../lib/mock-data';
import { healthcheckGet } from '../client/services.gen'
// import { add_groups, add_users } from '../lib/data'
import { Group, Post, User } from '../client/types.gen'
import { fetchCurrentUser } from '../lib/data'
import { SpeedInsights } from '@vercel/speed-insights/next';

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

export interface PostProps extends Post {
  author: string,
  authorAvatar:string,
  likes:number,
  comments:{
    author:string,
    authorAvatar:string,
    content:string
  }[]
}

export interface UserProps extends User {
  avatar: string,
  following: number,
  followers: number,
  groups: Group[]
  posts?: PostProps[]; // TODO
}

export type ViewType = 'feed' | 'community' | 'profile' | 'bookmarks'

export default function Classmate() {
  const [view, setView] = useState<ViewType>('feed')
  const [selectedCommunity, setSelectedCommunity] = useState<number | null>(null)
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);

  useEffect(() => {
    async function fetchData() {
      const user = await fetchCurrentUser()
      setCurrentUser(user ?? null) // TODO 
    }
    fetchData();
  }, []);

  const handleCommunityClick = (community: number | null | undefined) => {
    setView('community')
    setSelectedCommunity(community ?? null)
  }

  const handleProfileClick = (profile: number) => {
    setView('profile')
    setSelectedProfile(profile)
  }

  const handleHomeClick = () => {
    setView('feed')
    setSelectedCommunity(null)
    setSelectedProfile(null)
  }

  const handleBookmarksClick = () => {
    setView('bookmarks');
    setSelectedCommunity(null);
    setSelectedProfile(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // TODO
  }

  if (!currentUser) {
    return // <div>Loading...</div>
  }

  return (
    <div className="flex h-screen bg-gray-100 px-[0%]">
      <Sidebar
        user={currentUser}
        onCommunityClick={handleCommunityClick}
        onProfileClick={handleProfileClick}
        onHomeClick={handleHomeClick}
        onBookmarksClick={handleBookmarksClick}
      />
      <MainContent
        view={view}
        community={selectedCommunity ?? null}
        profile={selectedProfile}
        currentUser={currentUser}
        onProfileClick={handleProfileClick}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />
      <SpeedInsights />
    </div>
  )
}