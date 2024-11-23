import { useState, useEffect } from 'react'
import { currentUser, fetchGroup, fetchGroupPosts } from '@/lib/data'
import { Group } from "@/client"
import NewPostForm from "./newPostForm"
import Post from "./post"
import { PostProps } from '@/app/page'
import SkeletonPost from './SkeletonPost'
import SkeletonGroupInfo from './SkeletonGroupInfo'
// import { currentUser } from '@/lib/mock-data'

interface CommunityViewProps {
    community: number,
    onProfileClick: (param: number) => void
}

function CommunityView({ community, onProfileClick }: CommunityViewProps) {
    const [communityPosts, setCommunityPosts] = useState<PostProps[]>([])
    const [group, setGroupInfo] = useState<Group | null>(null)
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [postsResponse, groupResponse] = await Promise.all([
                fetchGroupPosts(community ?? 0),
                fetchGroup(community ?? 0),
            ]);
            if (postsResponse) {
                setCommunityPosts(postsResponse);
            }
            if (groupResponse) {
                setGroupInfo(groupResponse);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [community]);

    const sortedPosts = communityPosts.sort(
        (a, b) => new Date(b.timestamp ?? "").getTime() - new Date(a.timestamp ?? "").getTime()
    )

    const handleNewPost = () => {
        fetchData();
    }

    const handleDeletePost = (postId: number) => {
        setCommunityPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    }

    return (
        <div>
            {loading ? (
                <>
                    <SkeletonGroupInfo />
                    <div className="space-y-4">
                        <SkeletonPost />
                        <SkeletonPost />
                        <SkeletonPost />
                        <SkeletonPost />
                        <SkeletonPost />
                    </div>
                </>
            ) : (
                <>
                    <h2 className="text-2xl font-semibold mb-4" data-testid="group-title">{group?.name}</h2>
                    <p className="mb-6" data-testid="group-description">{group?.description}</p>
                    <NewPostForm
                        communities={currentUser.groups}
                        fixedCommunity={group?.id}
                        onNewPost={handleNewPost}
                    />
                    <div className="mt-6">
                        {sortedPosts.map((post) => (
                            <Post
                                key={post.id}
                                post={post}
                                onProfileClick={onProfileClick}
                                onDeletePost={handleDeletePost}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default CommunityView