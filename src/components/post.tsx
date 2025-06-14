import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ExternalLink, ThumbsUp, MessageSquare, Share2, MoreHorizontal, Bookmark } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card"
import Link from "next/link"
import { PostProps } from "@/app/page"

import { formatDistanceToNow, subHours } from "date-fns";
import { ptBR } from 'date-fns/locale'

import { bookmarkPost, dislikePost, fetchGroup, fetchPostComments, fetchPostLikes, fetchUserBookmarks, likePost, removeBookmark } from "@/lib/data";

import { createCommentPostPostIdCommentPost, deletePostByIdPostPostIdDelete, fetchTitleFetchTitleGet } from '@/client/services.gen';
import { Comment } from '@/client/types.gen';
import { currentUser } from '@/lib/data';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BookmarkFilledIcon } from "@radix-ui/react-icons"

interface ExtendedComment extends Comment {
    author: string
    authorAvatar: string
}

interface IPostProps {
    post: PostProps,
    onProfileClick: (param: number) => void,
    onDeletePost: (postId: number) => void
}

function Post({ post, onProfileClick, onDeletePost }: IPostProps) {
    const [newComment, setNewComment] = useState('')
    const [communityName, setCommunityName] = useState<string | undefined>('')
    const [likesCount, setLikesCount] = useState<number>(post.likes)
    const [hasLiked, setHasLiked] = useState(false);
    const [hasBookmarked, setHasBookmarked] = useState(false);
    const [pageTitle, setPageTitle] = useState('');
    const [comments, setComments] = useState<ExtendedComment[]>([])

    useEffect(() => {
        async function fetchPageTitle() {
            try {
                if (post.external_content_url) {
                    const data = {
                        query: { url: post.external_content_url },
                    };
                    const response = await fetchTitleFetchTitleGet(data);
                    if (response && 'data' in response) {
                        if (typeof response.data === 'object' && response.data !== null && 'title' in response.data) {
                            setPageTitle((response.data as { title: string }).title);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching title:', error);
            }
        }

        fetchPageTitle();
    }, [post.external_content_url]);

    const handleLike = async () => {
        if (hasLiked) {
            await dislikePost(post.id ?? 0);
            setLikesCount(likesCount - 1);
        } else {
            await likePost(post.id ?? 0);
            setLikesCount(likesCount + 1);
        }
        setHasLiked(!hasLiked);
    };

    const handleBookmark = async () => {
        if (hasBookmarked) {
            await removeBookmark(post.id ?? 0);
        } else {
            await bookmarkPost(post.id ?? 0);
        }
        setHasBookmarked(!hasBookmarked);
    };

    const handleDelete = async () => {
        try {
            const confirmed = window.confirm('Tem certeza que deseja excluir esta publicação?');
            if (confirmed) {
                if (post.id !== undefined && post.id !== null) {
                    await deletePostByIdPostPostIdDelete({ path: { post_id: post.id } });
                    onDeletePost(post.id);
                }
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    useEffect(() => {
        fetchGroup(post.group_id ?? 0).then((group) => {
            setCommunityName(group?.name);
        });
    }, [post.group_id]);

    useEffect(() => {
        async function getLikes() {
            const likes = await fetchPostLikes(post.id ?? 0);
            setLikesCount(likes?.length ?? 0);
            const userLiked = likes?.some((like) => like.author_id === currentUser.id);
            setHasLiked(userLiked ?? false);
        }
        getLikes();
    }, [post.id]);

    useEffect(() => {
        async function getBookmarks() {
            const bookmarks = await fetchUserBookmarks(currentUser.id ?? 0);
            const userBookmarked = bookmarks?.some((bookmark) => bookmark.post_id === post.id);
            setHasBookmarked(userBookmarked ?? false);
        }
        getBookmarks();
    }, [post.id]);

    useEffect(() => {
        async function getComments() {
            const fetchedComments = (await fetchPostComments(post.id ?? 0)) ?? []
            const formattedComments: ExtendedComment[] = fetchedComments.map((comment) => ({
                ...comment,
                author: comment.author ?? 'Unknown',
                authorAvatar: comment.authorAvatar ?? '/default-avatar.png',
            }))
            setComments(formattedComments)
        }
        getComments()
    }, [post.id])

    const handleAddComment = async () => {
        if (!newComment.trim()) return

        const comment: Comment = {
            body: newComment,
            author_id: currentUser.id ?? 0,
            post_id: post.id,
            timestamp: new Date().toISOString(),
        }

        try {
            await createCommentPostPostIdCommentPost({
                body: comment,
                path: { post_id: post.id ?? 0 },
            })
            setNewComment("")
            const updatedComments = (await fetchPostComments(post.id ?? 0)) ?? []
            const formattedUpdatedComments: ExtendedComment[] = updatedComments.map((c) => ({
                ...c,
                author: c.author ?? "Unknown",
                authorAvatar: c.authorAvatar ?? "/default-avatar.png",
            }))
            setComments(formattedUpdatedComments)
        } catch (error) {
            console.error("Error creating comment:", error)
        }
    }

    return (
        <Card className="mb-4">
            <CardHeader>
                <div className="flex items-center justify-between" data-testid="post-item">
                    <div className="flex items-center">
                        <Avatar className="mr-2">
                            <AvatarImage src={post.authorAvatar} alt={post.author} />
                            <AvatarFallback>{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <Link
                                href="#"
                                onClick={() => onProfileClick(post.author_id ?? 0)}
                                className="font-semibold hover:underline"
                            >
                                {post.author}
                            </Link>
                            <p className="text-sm text-gray-500">
                                {communityName ? (
                                    <>
                                        {communityName} •{" "}
                                        {formatDistanceToNow(subHours(new Date(post.timestamp ?? ""), 3), {
                                            locale: ptBR,
                                            addSuffix: true,
                                        })}
                                    </>
                                ) : (
                                    <span className="inline-block w-30 h-4 bg-gray-200 rounded animate-pulse" />
                                )}
                            </p>
                        </div>
                    </div>
                    {post.author_id === currentUser.id && (<DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" disabled={post.author_id !== currentUser.id}>
                                <MoreHorizontal className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={handleDelete}>Excluir publicação</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <p>{post.body}</p>
                {post.external_content_url && (
                    <>
                        <br />
                        <div className={`inline-block p-2 bg-gray-100 rounded-md ${!pageTitle ? 'animate-pulse' : ''}`}>
                            {pageTitle ? (
                                <a
                                    href={post.external_content_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-blue-500 hover:underline"
                                >
                                    <ExternalLink className="h-4 w-4 mr-1" /> {pageTitle}
                                </a>
                            ) : (
                                <div className="flex items-center">
                                    <ExternalLink className="h-4 w-4 mr-1" /> <span className="w-24 h-4 bg-gray-300 rounded"></span>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </CardContent>
            <CardFooter className="flex flex-col">
                <div className="flex justify-between w-full mb-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLike}
                        className={hasLiked ? 'bg-blue-100' : ''}
                    >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {likesCount}
                    </Button>
                    <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" /> {comments.length}
                    </Button>
                    <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-1" /> Compartilhar
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBookmark}
                    >
                        {hasBookmarked ? (
                            <BookmarkFilledIcon className="h-4 w-4 mr-1" />
                        ) : (
                            <Bookmark className="h-4 w-4 mr-1" />
                        )}
                    </Button>
                </div>
                <div className="w-full flex items-center space-x-2">
                    <Input
                        type="text"
                        placeholder="Escrever um comentário..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-grow"
                    />
                    <Button
                        size="sm"
                        disabled={!newComment.trim()}
                        className={`${!newComment.trim() ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                        onClick={handleAddComment}
                    >
                        Enviar
                    </Button>
                </div>
                {comments.length > 0 && (
                    <div className="w-full mt-4">
                        <h4 className="font-semibold mb-5">Comentários</h4>
                        {comments.map((comment, index) => (
                            <div key={index} className="mb-3 flex items-start">
                                <Avatar className="mr-2">
                                    <AvatarImage src={comment.authorAvatar} alt={comment.author} />
                                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <Link
                                        href="#"
                                        onClick={() => onProfileClick(comment.author_id ?? 0)}
                                        className="font-semibold hover:underline"
                                    >
                                        {comment.author}
                                    </Link>
                                    <p className="text-sm text-gray-500">
                                        {formatDistanceToNow(subHours(new Date(comment.timestamp ?? ""), 3), {
                                            locale: ptBR,
                                            addSuffix: true,
                                        })}
                                    </p>
                                    <p>{comment.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}

export default Post;