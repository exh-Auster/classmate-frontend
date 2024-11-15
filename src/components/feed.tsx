'use client'
import { Group } from '@/client';
// import { posts } from '../lib/mock-data';
import NewPostForm from "./newPostForm";
import Post from "./post";
// import { MouseEventHandler } from "react";

interface FeedProps {
    communities: Group[],
    onProfileClick: (param:string)=>void
}

function Feed({ communities, onProfileClick }:FeedProps) {
    // const feedPosts = posts.filter(post => communities.some(community => community.id === post.community)) // TODO
    // const sortedPosts = feedPosts.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
  
    return (
      <div>
        <NewPostForm communities={communities} />
        {/* <div className="mt-6">
          {sortedPosts.map((post) => (
            <Post key={post.id} post={post} onProfileClick={onProfileClick} />
          ))}
        </div> */}
      </div>
    )
  }

export default Feed;