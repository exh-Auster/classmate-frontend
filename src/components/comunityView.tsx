'use client'
import { posts } from '../lib/mock-data';
import NewPostForm from "./newPostForm"
import Post from "./post"
interface ComunityViewProps{
    community:string,
    onProfileClick: (param:string)=> void
}

function CommunityView({ community, onProfileClick }:ComunityViewProps) {
    const communityPosts = posts.filter(post => post.community === 0) // TODO
    const sortedPosts = communityPosts.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
  
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">{community}</h2>
        <p className="mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <NewPostForm communities={[]} fixedCommunity={community} />
        <div className="mt-6">
          {sortedPosts.map((post) => (
            <Post key={post.id} post={post} onProfileClick={onProfileClick} />
          ))}
        </div>
      </div>
    )
  }

  export default CommunityView