import React, { useState, useEffect } from 'react'
import { getComments } from '../../api'
import { CommentType} from '../../types';

interface Props {
  commentIds: number[]
}

const Comment = (props: Props) => {
  const [comments, setComments] = useState<CommentType[]>([])
  const [loading, setLoading] = useState<Boolean>(false)

  useEffect(() => {
    setLoading(true)
    getComments(props.commentIds)
      .then((res) => setComments(res))
      .finally(() => setLoading(false))
  }, [props.commentIds])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <ul>
      {comments &&
        comments.map((comment) => (
          <li key={comment.id}>
            <p
              dangerouslySetInnerHTML={{
                __html: `${comment.text} (by ${comment.by})`,
              }}
            />
            <hr />
          </li>
        ))}
    </ul>
  )
}

export default Comment
