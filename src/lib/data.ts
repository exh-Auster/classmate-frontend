import { PostProps, UserProps } from "@/app/page";
import { Bookmark, Group, Like, Post, User } from "@/client";
import { bookmarkPostPostPostIdBookmarkPost, getBookmarksByUserIdUserUserIdBookmarksGet, getGroupByIdGroupGroupIdGet, getLikesByPostIdPostPostIdLikeGet, getMemberGroupsByUserIdUserUserIdGroupsGet, getPostsByGroupIdGroupGroupIdPostsGet, getPostsByUserIdUserUserIdPostsGet, getUserByIdUserUserIdGet, likePostPostPostIdLikePost, removeBookmarksPostsPostIdBookmarkDelete, removeLikesPostsPostIdLikeDelete } from "@/client/services.gen";

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
        timestamp: post.timestamp ?? "",
        body: post.body,
        external_content_url: post.external_content_url,
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

  export async function fetchUserById(user_id: number) {
    try {
      const userResponse = await getUserByIdUserUserIdGet({
        path: {
          user_id: user_id,
        },
      });
  
      console.log('User response:', userResponse);
  
      const userData = userResponse.data as User;
  
      const userPostsResponse = await getPostsByUserIdUserUserIdPostsGet({
        path: {
          user_id: user_id,
        },
      });
  
      console.log('User posts response:', userPostsResponse);
  
      const userPostsData = userPostsResponse.data as Post[];
  
      const userGroupsResponse = await getMemberGroupsByUserIdUserUserIdGroupsGet({
        path: {
          user_id: user_id,
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
        body: post.body,
        external_content_url: post.external_content_url,
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

  export async function fetchGroupPosts(group_id: number) {
    try {
      const groupPostsResponse = await getPostsByGroupIdGroupGroupIdPostsGet({
        path: {
          group_id: group_id,
        },
      });
      
  
      const groupPostsData = groupPostsResponse.data as Post[];
      
      const groupPosts: PostProps[] = await Promise.all(groupPostsData.map(async post => {        
        const user = await fetchUserById(post.author_id ?? 0);
        return {      
            id: post.id ?? 0,
            group_id: post.group_id,
            author: user?.name ?? "",
            author_id: post.author_id,
            authorAvatar: "",
            community: post.group_id ?? 0,
            timestamp: post.timestamp ?? "",
            body: post.body,
            external_content_url: post.external_content_url,
            likes: 0,
            comments: []
        };
    }));
  
      return groupPosts;
    } catch (error) {
      console.error('Fetch group by ID error:', error);
    }
  }

  export async function fetchUserPosts(user_id: number) {
    try {
      const userPostsResponse = await getPostsByUserIdUserUserIdPostsGet({
        path: {
          user_id: user_id,
        },
      });
      
      const userPostsData = userPostsResponse.data as Post[];
      
      const userPosts: PostProps[] = await Promise.all(userPostsData.map(async post => {        
        const user = await fetchUserById(post.author_id ?? 0);

        return {      
            id: post.id ?? 0,
            group_id: post.group_id,
            author: user?.name ?? "",
            author_id: post.author_id,
            authorAvatar: "",
            community: post.group_id ?? 0,
            timestamp: post.timestamp ?? "",
            body: post.body,
            external_content_url: post.external_content_url,
            likes: 0,
            comments: []
        };
    }));
  
      return userPosts;
    } catch (error) {
      console.error('Fetch group by ID error:', error);
    }
  }

  export async function fetchPostLikes(post_id: number) {
  try {
    const likesResponse = await getLikesByPostIdPostPostIdLikeGet({
      path: {
        post_id: post_id,
      },
    });

    const likesData = likesResponse.data as Like[];

    const likes = likesData.map(like => ({
      author_id: like.author_id ?? 0,
      post_id: like.post_id ?? 0,
      timestamp: like.timestamp ?? "",
    }));

    return likes;
  } catch (error) {
    console.error('Fetch likes by post ID error:', error);
  }
}

export async function likePost(post_id: number) {
  try {
    const likeData: Like = {
      author_id: currentUser.id ?? 0,
      post_id: post_id,
      timestamp: new Date().toISOString(),
    };

    const response = await likePostPostPostIdLikePost({
      path: {
        post_id: post_id,
      },
      body: likeData,
    });

    console.log('Post liked:', response);
    return response;
  } catch (error) {
    console.error('Error liking post:', error);
  }
}

export async function dislikePost(post_id: number) {
  try {
    const likeData: Like = {
      author_id: currentUser.id ?? 0,
      post_id: post_id,
      timestamp: new Date().toISOString(),
    };

    const response = await removeLikesPostsPostIdLikeDelete({
      path: {
        post_id: post_id,
      },
      body: likeData
    });

    console.log('Like removed:', response);
    return response;
  } catch (error) {
    console.error('Error disliking post:', error);
  }
}

export async function fetchUserBookmarks(user_id: number) {
  try {
    const userBookmarksResponse = await getBookmarksByUserIdUserUserIdBookmarksGet({
      path: {
        user_id: user_id,
      },
    });
    
    const userBookmarksData = userBookmarksResponse.data as Bookmark[];
    
    const userBookmarks = await Promise.all(userBookmarksData.map(async bookmark => {        

      return {      
          author_id: bookmark.author_id,
          post_id: bookmark.post_id,
          timestamp: bookmark.timestamp ?? "",
      };
  }));

    return userBookmarks;
  } catch (error) {
    console.error('Fetch bookmarks error:', error);
  }
}

export async function bookmarkPost(post_id: number) {
  try {
    const bookmarkData: Bookmark = {
      author_id: currentUser.id ?? 0,
      post_id: post_id,
      timestamp: new Date().toISOString(),
    };

    const response = await bookmarkPostPostPostIdBookmarkPost({
      path: {
        post_id: post_id,
      },
      body: bookmarkData,
    });

    console.log('Post bookmarked:', response);
    return response;
  } catch (error) {
    console.error('Error bookmarking post:', error);
  }
}

export async function removeBookmark(post_id: number) {
  try {
    const bookmarkData: Bookmark = {
      author_id: currentUser.id ?? 0,
      post_id: post_id,
      timestamp: new Date().toISOString(),
    };

    const response = await removeBookmarksPostsPostIdBookmarkDelete({
      path: {
        post_id: post_id,
      },
      body: bookmarkData
    });

    console.log('Bookmark removed:', response);
    return response;
  } catch (error) {
    console.error('Error removing bookmark:', error);
  }
}