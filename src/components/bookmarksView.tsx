import { useEffect, useState } from "react"
import Post from "./post"
import { PostProps, UserProps } from "@/app/page"
import { fetchUserBookmarks, fetchPostById, fetchGroupById } from "@/lib/data"

interface BookmarksViewProps {
    currentUser: UserProps,
    onProfileClick: (param: number) => void
}

function BookmarksView({ currentUser, onProfileClick }: BookmarksViewProps) {
    const [bookmarkedPosts, setBookmarkedPosts] = useState<PostProps[]>([])
    const [groupedPosts, setGroupedPosts] = useState<{ [key: number]: PostProps[] }>({})

    useEffect(() => {
        const getBookmarkedPosts = async () => {
            try {
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
            {Object.entries(groupedPosts).map(([groupId, posts]) => (
                <GroupSection key={groupId} groupId={Number(groupId)} posts={posts} onProfileClick={onProfileClick} />
            ))}
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
                <h4 className="text-lg font-semibold">{groupName || 'Loading...'}</h4>
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