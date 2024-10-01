"use client"

import { useState } from 'react'
import Sidebar from '@/components/sidebar'
import MainContent from '@/components/mainContent'

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

// Mock
const currentUser = {
  name: "Felipe Ribeiro",
  avatar: "/placeholder-user.jpg",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  following: 120,
  followers: 85,
  classes: [
    "Compiladores",
    "Computação Distribuída",
    "Interação Humano-Computador",
    "Engenharia de Software",
    "Metodologia de Pesquisa em Computação",
    "Projetos Empreendedores",
    "Teoria dos Grafos"
  ]
}

const users = ["Felipe Ribeiro", "Enzo Koji", "Yuri Nichimura"]

const communities = [
  "Compiladores",
  "Computação Distribuída",
  "Interação Humano-Computador",
  "Engenharia de Software",
  "Metodologia de Pesquisa em Computação",
  "Projetos Empreendedores",
  "Teoria dos Grafos"
]

const generatePosts = () => {
  let posts: PostProps[] = []
  let id = 1

  users.forEach(user => {
    for (let i = 0; i < 5; i++) {
      const community = communities[Math.floor(Math.random() * communities.length)]
      posts.push({
        id: id++,
        author: user,
        authorAvatar: "/placeholder-user.jpg",
        community: community,
        time: `${Math.floor(Math.random() * 24)}h atrás`,
        content: `Post ${i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        link: Math.random() > 0.5 ? `https://mackenzie.br/` : null,
        likes: Math.floor(Math.random() * 50),
        comments: [
          { 
            author: users[Math.floor(Math.random() * users.length)], 
            authorAvatar: "/placeholder-user.jpg", 
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.." 
          }
        ]
      })
    }
  })

  return posts
}

export const allPosts = generatePosts()

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
