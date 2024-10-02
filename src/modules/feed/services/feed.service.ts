import { AxiosResponse } from 'axios';
import { FeedPost } from '../models/feed-post.model';
import { httpService } from '../../core/services/http.service';
import { QueryFeedPostsParams } from '../models/post-api.model';

const BASE_PATH = 'feed.json';

const queryPosts = (
  params: QueryFeedPostsParams | string
): Promise<AxiosResponse<FeedPost[]> & { hasMore: boolean }> => {
  const stringified = JSON.stringify(params);
  const urlParams = new URLSearchParams(stringified);
  return httpService.get(`${BASE_PATH}?${urlParams}`);
};

export const feedService = {
  queryPosts,
};
