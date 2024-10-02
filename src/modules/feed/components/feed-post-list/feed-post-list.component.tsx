import { FeedPost as IFeedPost } from '../../models/feed-post.model';
import { FeedPost } from '../feed-post/feed-post.component';
import './feed-post-list.component.scss';

interface Props {
    posts: IFeedPost[];
    onLikeClicked: (postId: string) => void;
}

export const FeedPostList = ({ posts, onLikeClicked }: Props) => {
    return (
        <ul className='feed-post-list'>
            {posts.map((feedPost) => (
                <FeedPost
                    key={feedPost.id}
                    post={feedPost}
                    onLikeClicked={onLikeClicked}
                />
            ))}
        </ul>
    );
};
