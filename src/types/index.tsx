export interface StoryType {
  id: number
  rank: number
  title: string
  by: string
  url: string
  score: number
  time: bigint
  kids: []
}

export interface CommentType {
  id: number
  by: string
  text: string
}