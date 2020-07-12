import React, { memo } from 'react'
import { StoryType } from '../../types'
import './Story.css'

interface Props {
  story: StoryType
  onClickComment: (story: StoryType) => void
  start: number
}

const Story = memo((props: Props) => {
  const { rank, url, title, score, kids, by, time } = props.story
  const commentCount = kids ? kids.length : 0

  const formatDate = (time: any) => {
    const str = new Date(time * 1000).toISOString().split('T');
    return str[0] + ' ' + str[1].split('.')[0];
  }

  return (
    <div className="storybook">
      <div className="rank">{props.start + rank}.</div>
      <div className="item">
        <a className="title" href={url}>
          {title}
        </a>
        <div className="infobox">
          <span className="infoitem">{score} points by {by} in {formatDate(time)}</span>
          <span className="infoitem">
            {commentCount ? (
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault()
                  props.onClickComment(props.story)
                }}
              >
                {`${commentCount} comments`}
              </a>
            ) : (
              <span>{commentCount}&nbsp; comment</span>
            )}
          </span>
        </div>
      </div>
    </div>
  )
})
export default Story
