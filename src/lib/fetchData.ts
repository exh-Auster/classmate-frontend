import { PostProps, UserProps } from "@/app/page";
import { Group, Post, User } from "@/client";
import { getGroupByIdGroupGroupIdGet, getMemberGroupsByUserIdUserUserIdGroupsGet, getPostsByUserIdUserUserIdPostsGet, getUserByIdUserUserIdGet } from "@/client/services.gen";

export let currentUser: UserProps

export async function fetchCurrentUser() {
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
        posts: userPosts,
        password_hash: "" // TODO
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
  
      const group: Group = {
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