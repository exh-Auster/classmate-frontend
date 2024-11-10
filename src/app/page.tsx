'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/sidebar'
import MainContent from '@/components/mainContent'
// import { /*users,*/ currentUser/*, communities*/ } from '../lib/mock-data';
import { getGroupByIdGroupGroupIdGet, getMemberGroupsByUserIdUserUserIdGroupsGet, getPostsByUserIdUserUserIdPostsGet, getUserByIdUserUserIdGet, healthcheckGet } from '../client/services.gen'
// import { add_groups, add_users } from '../lib/data'
import { User, Post, Group } from '../client/types.gen'

// add_users()
// add_groups()

export let currentUser: UserProps

async function fetchCurrentUser() {
  try {
    const userResponse = await getUserByIdUserUserIdGet({
      path: {
        user_id: 1,
      },
    });

    console.log('User response:', userResponse);

    const userData = userResponse.data as User;

    const userPostsResponse = await getPostsByUserIdUserUserIdPostsGet({
      path: {
        user_id: 1,
      },
    });

    console.log('User posts response:', userPostsResponse);

    const userPostsData = userPostsResponse.data as Post[];

    const userGroupsResponse = await getMemberGroupsByUserIdUserUserIdGroupsGet({
      path: {
        user_id: 1,
      },
    });

    console.log('User groups response:', userGroupsResponse);

    const userGroupsData = userGroupsResponse.data as Group[];

    const userPosts: PostProps[] = userPostsData.map(post => ({
      id: post.author_id ?? 0,
      author: userData.name,
      authorAvatar: "",
      community: post.group_id ?? 0,
      time: post.timestamp ?? "",
      content: post.body,
      link: post.external_content_url,
      likes: 0,
      comments: []
    }));

    const user: UserProps = {
      id: userData.id ?? 0,
      name: userData.name,
      email: userData.email,
      bio: userData.bio,
      avatar: '',
      following: 0, // TODO
      followers: 0, // TODO
      groups: userGroupsData,
      posts: userPosts
    };

    currentUser = user;
    return user;

    console.log("User groups:", user.groups)

    console.log('User by ID:', currentUser);
    console.log('Posts by user:', userPostsData);
  } catch (error) {
    console.error('Fetch user by ID error:', error);
  }
}

export async function fetchGroup(group_id: number) {
  try {
    const groupResponse = await getGroupByIdGroupGroupIdGet({
      path: {
        group_id: group_id,
      },
    });

    const groupData = groupResponse.data as Group;

    const group: GroupProps = {
      id: groupData.id ?? 0,
      name: groupData.name,
      description: groupData.description ?? "",
      creation_date: groupData.creation_date ?? "",
      creator_id: groupData.creator_id ?? 0
    }

    console.log('Group by ID:', group);
    return group;
  } catch (error) {
    console.error('Fetch group by ID error:', error);
  }
}


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
      setCurrentUser(user)
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