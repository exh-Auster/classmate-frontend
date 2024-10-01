'use client'
import { allPosts } from "@/app/page"
import NewPostForm from "./newPostForm"
import Post from "./post"
interface ComunityViewProps{
    community:string,
    onProfileClick: (param:string)=> void
}

function CommunityView({ community, onProfileClick }:ComunityViewProps) {
    const communityPosts = allPosts.filter(post => post.community === community)
    const sortedPosts = communityPosts.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
  
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">{community}</h2>
        <p className="mb-6">Community information and description goes here.</p>
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