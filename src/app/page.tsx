"use client"

import { useState } from 'react'
import Sidebar from '@/components/sidebar'
import MainContent from '@/components/mainContent'
import { /*users,*/ currentUser/*, communities*/ } from '../lib/mock-data';

export interface PostProps{
  id: number,
  author: string,
  authorAvatar:string,
  community:string,
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
  name: string,
  avatar:string,
  bio:string,
  following:number,
  followers:number,
  classes:string[]
}

export type ViewType = 'feed' | 'community' | 'profile'

export default function EduSocial() {
  const [view, setView] = useState<ViewType>('feed')
  const [selectedCommunity, setSelectedCommunity] = useState('')
  const [selectedProfile, setSelectedProfile] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

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
