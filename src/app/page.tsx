'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/sidebar'
import MainContent from '@/components/mainContent'
import { healthcheckGet } from '../client/services.gen'
import { Comment, Group, Post, User } from '../client/types.gen'
import { fetchCurrentUser } from '../lib/data'
import { SpeedInsights } from '@vercel/speed-insights/next';

async function checkHealth() {
  try {
    const response = await healthcheckGet();
    console.log('Healthcheck response:', response);
  } catch (error) {
    console.error('Healthcheck error:', error);
  }
}

checkHealth()

export interface PostProps extends Post {
  author: string,
  authorAvatar: string,
  likes: number,
  comments: CommentProps[]
}

export interface CommentProps extends Comment {
  author: string,
  authorAvatar: string
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
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div style={{
          width: '30px',
          height: '30px',
          border: '2px solid #f3f3f3',
          borderTop: '2px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
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