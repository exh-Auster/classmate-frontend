'use client'
import { useState, useEffect } from "react";
import { Group, Post as PostType } from '@/client';
import { fetchGroupPosts } from "@/lib/data";
import NewPostForm from "./newPostForm";
import Post from "./post";
import { PostProps } from "@/app/page";

interface FeedProps {
    communities: Group[],
    onProfileClick: (param: number) => void
}

function Feed({ communities, onProfileClick }: FeedProps) {
    const [posts, setPosts] = useState<PostProps[]>([]);

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const allPosts: PostProps[] = [];
                for (const community of communities) {
                    const groupPosts = await fetchGroupPosts(community.id ?? 0);
                    allPosts.push(...groupPosts ?? []);
                }
                const sortedPosts = allPosts.sort((a, b) => new Date(b.timestamp!).getTime() - new Date(a.timestamp!).getTime());
                setPosts(sortedPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchAllPosts();
    }, [communities]);

    return (
        <div>
            <NewPostForm communities={communities} />
            <div className="mt-6">
                {posts.map((post) => (
                    <Post key={post.id} post={post} onProfileClick={onProfileClick} />
                ))}
            </div>
        </div>
    )
}

export default Feed;