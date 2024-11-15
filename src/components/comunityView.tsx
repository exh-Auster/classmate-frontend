import { useState, useEffect } from 'react'
import { currentUser, fetchGroup, fetchGroupPosts } from '@/lib/fetchData'
import { Group } from "@/client"
import NewPostForm from "./newPostForm"
import Post from "./post"
import { PostProps } from '@/app/page'
// import { currentUser } from '@/lib/mock-data'

interface ComunityViewProps {
    community: number,
    onProfileClick: (param: string) => void
}

function CommunityView({ community, onProfileClick }: ComunityViewProps) {
    const [communityPosts, setCommunityPosts] = useState<PostProps[]>([])
    const [group, setGroupInfo] = useState<Group | null>(null)

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await fetchGroupPosts(community ?? 0)
                if (response) {
                    setCommunityPosts(response)
                }
            } catch (error) {
                console.error('Error fetching group posts:', error)
            }
        }

        const getGroupInfo = async () => {
            try {
                const response = await fetchGroup(community ?? 0)
                if (response) {
                    setGroupInfo(response)
                }
            } catch (error) {
                console.error('Error fetching community info:', error)
            }
        }

        getPosts()
        getGroupInfo()
    }, [community])

    const sortedPosts = communityPosts.sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    )

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">{group?.name}</h2>
            <p className="mb-6">{group?.description}</p>
            <NewPostForm communities={currentUser.groups} fixedCommunity={group?.id} />
            <div className="mt-6">
                {sortedPosts.map((post) => (
                    <Post key={post.id} post={post} onProfileClick={onProfileClick} />
                ))}
            </div>
        </div>
    )
}

export default CommunityView