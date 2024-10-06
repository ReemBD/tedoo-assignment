import { AxiosResponse } from 'axios';
import { FeedPost } from '../models/feed-post.model';
import { httpService } from '../../core/services/http.service';
import { QueryFeedPostsParams } from '../models/post-api.model';

const BASE_PATH = 'hw/feed.json';

const queryPosts = (
  params: QueryFeedPostsParams
): Promise<AxiosResponse<FeedPost[]> & { hasMore: boolean }> => {
  const urlParams = new URLSearchParams(_buildQueryParams(params));
  return httpService.get(`${BASE_PATH}?${urlParams}`);
};

const _buildQueryParams = (
  params: QueryFeedPostsParams
): Record<string, string> => {
  const retval: Record<string, string> = {};

  if (params.skip) retval.skip = params.skip.toString();
  return retval;
};

export const feedService = {
  queryPosts,
};
