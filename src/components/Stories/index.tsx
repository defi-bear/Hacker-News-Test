import React, { memo, useState, useEffect } from 'react'
import { getNews } from '../../api'
import {StoryType} from '../../types';
import Story from '../Story'

interface Props {
  className?: string
  stories: StoryType[]
  page: number
  start: number
  onClickComment: (story: StoryType) => void
  onPrev: () => void
  onNext: () => void
}

const StoriesWithResource = (
  props: { 
    timeOut: number;
    onClickComment: (
      story: StoryType
    ) => void
  }) => {
  const [stories, setStories] = useState<StoryType[]>([])
  const [loading, setLoading] = useState<Boolean>(false)
  const [page, setPage] = useState<number>(0)

  useEffect(() => {
    setLoading(true)
    getNews(props.timeOut, page)
      .then((res) => setStories(res))
      .finally(() => setLoading(false))
  }, [props.timeOut, page])

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <Stories
      stories={stories}
      onClickComment={props.onClickComment}
      page={page}
      start={page * props.timeOut}
      onPrev={() => setPage(page - 1)}
      onNext={() => setPage(page + 1)} />
  )
}

const Stories = memo((props: Props) => {
  return (
    <section className={props.className}>
      {props.stories.map((story) => (
        <Story
          key={story.id}
          story={story}
          onClickComment={props.onClickComment}
          start={props.start}
        />
      ))}

      <footer className="more">
        {props.page > 0 && (
          <button onClick={props.onPrev}>&lt; Prev Page</button>
        )}
        &nbsp;Current Page: {props.page + 1} &nbsp;
        <button onClick={props.onNext}>Next Page &gt;</button>
      </footer>
    </section>
  )
})

export default StoriesWithResource
