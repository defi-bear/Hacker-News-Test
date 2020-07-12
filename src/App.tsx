import React, { lazy, useCallback, useState, Suspense } from 'react'

import { StoryType } from './types'
import Stories from './components/Stories'
import CommentType from './components/Comment'
import Modal from './components/Modal'
import Loading from './components/Loading'
import Wrapper from './components/Wrapper'
import './App.css'

const Comment = lazy<typeof CommentType>(() => import('./components/Comment'))

interface Props {
  timeOut: number
}

const App = (props: Props) => {
  const [commentIds, setCommentIds] = useState([] as number[])

  const onClickComment = useCallback((story: StoryType) => {
    setCommentIds(story.kids)
  }, [])

  return (
    <div className="main">
      <div className="container">
        <Suspense fallback={<Loading />}>
          <Stories timeOut={props.timeOut} onClickComment={onClickComment} />
        </Suspense>
        <Wrapper visible={commentIds.length > 0}>
          <Modal onClose={() => setCommentIds([])}>
            <Comment commentIds={commentIds} />
          </Modal>
        </Wrapper>
      </div>
    </div>
  )
}
export default App
