export interface QueryFeedParams {
    skip?: number
}

export type StringifiedQueryFeedParams = { [key in keyof QueryFeedParams]?: string };
