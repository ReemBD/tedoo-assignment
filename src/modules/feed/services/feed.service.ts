import { AxiosResponse } from 'axios';
import { FeedPost } from '../models/feed-post.model';
import { httpService } from '../../core/services/http.service';

const BASE_PATH = 'feed.json';

const queryPosts = (
  params: URLSearchParams | string
): Promise<AxiosResponse<FeedPost[]> & { hasMore: boolean }> => {
  return httpService.get(`${BASE_PATH}?${params}`);
};

export const feedService = {
  queryPosts,
};
