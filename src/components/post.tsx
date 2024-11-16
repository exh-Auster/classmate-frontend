'use client'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ExternalLink, ThumbsUp, MessageSquare, Share2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card"
import Link from "next/link"
import { PostProps } from "@/app/page"

import { formatDistanceToNow } from "date-fns";
import { ptBR } from 'date-fns/locale'

import { fetchGroup } from "../lib/fetchData"

import { createCommentPostPostIdCommentPost } from '@/client/services.gen';
import { Comment } from '@/client/types.gen';
import { currentUser } from '@/lib/fetchData';

interface IPostProps {
    post: PostProps,
    onProfileClick: (param: number) => void,
}

function Post({ post, onProfileClick }: IPostProps) {
    const [newComment, setNewComment] = useState('')
    const [communityName, setCommunityName] = useState<string | undefined>('');

    useEffect(() => {
        fetchGroup(post.group_id ?? 0).then(group => {
            setCommunityName(group?.name);
        });
    }, [post.group_id]);
    
    return (
        <Card className="mb-4">
            <CardHeader>
                <div className="flex items-center">
                    <Avatar className="mr-2">
                        <AvatarImage src={post.authorAvatar} alt={post.author} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <Link href="#" onClick={() => onProfileClick(post.author_id ?? 0)} className="font-semibold hover:underline">
                            {post.author}
                        </Link>
                        <p className="text-sm text-gray-500">{ communityName } • {formatDistanceToNow(new Date(post.timestamp ?? ""), { locale: ptBR, addSuffix: true })}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p>{post.body}</p>
                {post.external_content_url && (
                    <a href={post.external_content_url} className="text-blue-500 flex items-center mt-2">
                        <ExternalLink className="h-4 w-4 mr-1" /> Link externo
                    </a>
                )}
            </CardContent>
            <CardFooter className="flex flex-col">
                <div className="flex justify-between w-full mb-4">
                    <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-1" /> {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" /> {post.comments.length}
                    </Button>
                    <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-1" /> Compartilhar
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
                    onClick={async () => {
                        if (!newComment.trim()) return;

                        const comment: Comment = {
                        body: newComment,
                        author_id: currentUser.id ?? 0,
                        post_id: post.id,
                        timestamp: new Date().toISOString(),
                        };

                        try {
                        await createCommentPostPostIdCommentPost({
                            body: comment,
                            path: { post_id: post.id ?? 0 },
                        });
                        setNewComment('');
                        } catch (error) {
                        console.error('Error creating comment:', error);
                        }
                    }}
                    >
                    Enviar
                    </Button>
                </div>
                {post.comments.length > 0 && (
                    <div className="w-full mt-4">
                        <h4 className="font-semibold mb-2">Comentários</h4>
                        {post.comments.map((comment, index) => (
                            <div key={index} className="mb-4 flex items-start">
                                <Avatar className="mr-2">
                                    <AvatarImage src={comment.authorAvatar} alt={comment.author} />
                                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <Link href="#" onClick={() => onProfileClick(comment.author)} className="font-semibold hover:underline">
                                        {comment.author}
                                    </Link>
                                    <p>{comment.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}

export default Post