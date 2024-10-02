import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Avatar } from '../../../common/components/avatar/avatar.component';
import { Icon } from '../../../common/components/icon/icon.component';
import { AppIcon, AppIconSize } from '../../../common/models/app-icon.model';
import { AvatarSize } from '../../../common/models/avatar.model';
import { impressionService } from '../../../common/services/imperssion.service';
import { formatPostTime } from '../../helpers/format-post-time.helper';
import { FeedPost as IFeedPost } from '../../models/feed-post.model';
import './feed-post.component.scss';

interface Props {
    post: IFeedPost;
    imagesNum?: number;
    onLikeClicked: (postId: string) => void;
}

export const FeedPost = memo(({ post, imagesNum, onLikeClicked }: Props) => {
    const { avatar, username, shopName, date, images, text, likes, comments, didLike, } = post;
    const elementRef = useRef<HTMLElement>();

    useEffect(() => {
        if (!elementRef.current) return;
        const el = elementRef.current;
        impressionService.impressionObserver.observe(el);
        return () => impressionService.impressionObserver.unobserve(el);
    }, []);

    return (
        <article
            id={post.id}
            ref={elementRef}
            className='feed-post feed-post-layout'>
            <_PostHeader
                avatar={avatar}
                username={username}
                shopName={shopName}
                date={date}
            />

            <section className='post-text'>
                <p>{text}</p>
            </section>

            <_ImageGrid images={images} maxNumToDisplay={imagesNum} />

            <section className='engagement-info'>
                <div className='likes flex align-center'>
                    <Icon
                        className='like-icon'
                        name={AppIcon.LikeSolid}
                        size={AppIconSize.Small}
                    />
                    <button>
                        <span>{likes} Likes</span>
                    </button>
                </div>
                <div className='comments'>
                    <button>
                        <span>{comments} Comments</span>
                    </button>
                </div>
            </section>

            <section className='actions'>
                <button
                    className={`like-action-btn action-btn flex align-center ${didLike ? 'liked' : ''}`}
                    onClick={() => onLikeClicked(post.id)}>
                    <Icon name={AppIcon.Like} size={AppIconSize.Small} />
                    <span>Like</span>
                </button>
                <button className='comment-action-btn action-btn flex align-center'>
                    <Icon name={AppIcon.Comment} size={AppIconSize.Small} />
                    <span>Comment</span>
                </button>
            </section>
        </article>
    );
});

type HeaderProps = Pick<IFeedPost, 'avatar' | 'username' | 'shopName' | 'date'>;

export const _PostHeader = ({
    avatar,
    username,
    shopName,
    date,
}: HeaderProps) => {
    return (
        <header className='header flex align-center'>
            <Avatar src={avatar} size={AvatarSize.Medium} />
            <div className='post-details flex-column'>
                <div className='username'>{username}</div>
                <div className='extra-details'>
                    <span className='shop-name'>{shopName}</span>
                    <span className='seperator'></span>
                    <span className='time-posted'>{formatPostTime(date)}</span>
                </div>
            </div>
        </header>
    );
};

type ImageGridProps = { images: string[]; maxNumToDisplay?: number };

const _ImageGrid = ({
    images,
    maxNumToDisplay: maxNumToDisplay,
}: ImageGridProps) => {
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const defaultImagesN = 2;

    useLayoutEffect(() => {
        setContainerWidth(() => containerRef.current?.clientWidth || 0);
    }, [containerRef.current?.clientWidth]);

    const getImagesForDisplay = (images: string[]) =>
        images.slice(0, maxNumToDisplay || defaultImagesN).filter(Boolean);

    const getImageWidth = (imagesN: number, containerWidth: number): number => {
        const paddingInline = 111;
        const max = containerWidth - paddingInline * 2;
        return Math.min(max, containerWidth / imagesN);
    };

    return (
        <section ref={containerRef} className='image-grid full'>
            {' '}
            {getImagesForDisplay(images).map((image) => (
                <div
                    style={{
                        width: getImageWidth(getImagesForDisplay.length, containerWidth),
                    }}
                    className='post-image'>
                    <img src={image} />
                </div>
            ))}
        </section>
    );
};
