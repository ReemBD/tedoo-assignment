import { useEffect, useRef, useState } from 'react';
import { FeedPost as IFeedPost } from '../../models/feed-post.model';
import { feedService } from '../../services/feed.service';
import { FeedPostList } from '../../components/feed-post-list/feed-post-list.component';
import { dec, inc } from 'ramda';
import './feed-index.component.scss';

export const FeedIndex = () => {
  const [posts, setPosts] = useState<IFeedPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string>('');

  const hasMoreRef = useRef(true);

  useEffect(() => {
    fetchFeedPosts();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isLoading, hasMoreRef.current]);

  const fetchFeedPosts = async () => {
    if (!hasMoreRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const { hasMore, data: nextPosts } = await feedService.queryPosts({ skip: posts.length + 6 });
      hasMoreRef.current = hasMore;
      setPosts((posts) => [...posts, ...nextPosts]);
    } catch (err) {
      setError('Error occured while trying to fetch posts');
    } finally {
      setIsLoading(false);
    }
  };

  const onScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    fetchFeedPosts();
  };

  const onLikeClicked = (postId: string) => {
    const getUpdatedPost = (p: IFeedPost) => ({
      ...p,
      likes: p.didLike ? dec(p.likes) : inc(p.likes),
      didLike: !p.didLike,
    });

    setPosts((prevPosts) =>
      prevPosts.map((p) => (p.id === postId ? getUpdatedPost(p) : p))
    );
  };

  return (
    <section className='feed'>
      {!error ? (
        <FeedPostList posts={posts} onLikeClicked={onLikeClicked} />
      ) : (
        <div>{error}</div>
      )}
    </section>
  );
};
