import { useEffect, useState } from "react"
import Post from "./post"
import SkeletonPost from "./SkeletonPost"
import { PostProps, UserProps } from "@/app/page"
import { fetchUserBookmarks, fetchPostById, fetchGroupById } from "@/lib/data"

interface BookmarksViewProps {
    currentUser: UserProps,
    onProfileClick: (param: number) => void
}

function BookmarksView({ currentUser, onProfileClick }: BookmarksViewProps) {
    const [bookmarkedPosts, setBookmarkedPosts] = useState<PostProps[]>([])
    const [groupedPosts, setGroupedPosts] = useState<{ [key: number]: PostProps[] }>({})
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const getBookmarkedPosts = async () => {
            try {
                setIsLoading(true)
                const bookmarks = await fetchUserBookmarks(currentUser.id ?? 0)
                if (bookmarks) {
                    const posts = await Promise.all(
                        bookmarks.map(async (bookmark) => {
                            const post = await fetchPostById(bookmark.post_id!)
                            return post
                        })
                    )
                    setBookmarkedPosts(posts.filter((post): post is PostProps => post !== undefined))
                }
            } catch (error) {
                console.error('Error fetching bookmarked posts:', error)
            } finally {
                setIsLoading(false)
            }
        }

        getBookmarkedPosts()
    }, [currentUser.id])

    useEffect(() => {
        const groupPostsByGroup = async () => {
            const groups: { [key: number]: PostProps[] } = {}
            for (const post of bookmarkedPosts) {
                if (post) {
                    const groupId = post.group_id ?? 0
                    if (!groups[groupId]) {
                        groups[groupId] = []
                    }
                    groups[groupId].push(post)
                }
            }
            setGroupedPosts(groups)
        }

        groupPostsByGroup()
    }, [bookmarkedPosts])

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Lista de Leitura</h3>
            {isLoading ? (
                <>
                    <SkeletonPost />
                    <SkeletonPost />
                    <SkeletonPost />
                </>
            ) : (
                Object.entries(groupedPosts).map(([groupId, posts]) => (
                    <GroupSection key={groupId} groupId={Number(groupId)} posts={posts} onProfileClick={onProfileClick} />
                ))
            )}
        </div>
    )
}

interface GroupSectionProps {
    groupId: number
    posts: PostProps[]
    onProfileClick: (param: number) => void
}

function GroupSection({ groupId, posts, onProfileClick }: GroupSectionProps) {
    const [groupName, setGroupName] = useState<string>('')
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

    useEffect(() => {
        const getGroupName = async () => {
            try {
                const group = await fetchGroupById(groupId)
                if (group) {
                    setGroupName(group.name)
                }
            } catch (error) {
                console.error('Error fetching group:', error)
            }
        }
        getGroupName()
    }, [groupId])

    return (
        <div className="mb-4">
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="flex items-center justify-between w-full p-2 bg-gray-200 rounded-md"
            >
                <div className="flex items-center">
                    <h4 className="text-lg font-semibold mr-2">{groupName || ''}</h4>
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
                        {posts.length}
                    </span>
                </div>
                <span>{isCollapsed ? '▶' : '▼'}</span>
            </button>
            {!isCollapsed && (
                <div className="mt-2">
                    {posts.map((post) => (
                        <Post key={post.id} post={post} onProfileClick={onProfileClick} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default BookmarksView