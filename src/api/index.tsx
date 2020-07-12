import {StoryType, CommentType} from '../types';

const apiUrl = 'https://hacker-news.firebaseio.com';

export const getNews = async (count: number, page: number): Promise<StoryType[]> =>
  new Promise(async (resolve, reject) => {
    try {
      const ids = await fetch(`${apiUrl}/v0/topstories.json?print=pretty`)
        .then((res) => res.json())
      const stories: any = await Promise.all(
        ids.slice(page * count, (page + 1) * count).map(
          async (id: number, index: number): Promise<StoryType> => {
            const story: StoryType = await fetch(`${apiUrl}/v0/item/${id}.json?print=pretty`)
              .then((res) => res.json())
            story.rank = index + 1
            return story
          },
        ),
      )
      resolve(stories.sort((a: StoryType, b: StoryType) => a.rank - b.rank))
    } catch (e) {
      reject(e)
    }
  })

export const getComments = async (commentIds: number[]): Promise<CommentType[]> => {
  return new Promise((resolve, reject) => {
    try {
      const commentsArr = commentIds.map((commentId) => 
        fetch(`${apiUrl}/v0/item/${commentId}.json?print=pretty`)
        .then((res) => res.json()));
      Promise.all(commentsArr).then((comments) =>
        resolve(comments.filter(Boolean)),
      )
    } catch (e) {
      reject(e)
    }
  })
}