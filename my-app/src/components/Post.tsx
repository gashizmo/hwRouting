import type { PostType } from "../types"

const Post = ({id, title, content}: PostType) => {
  return (
    <li>
        <strong>{id}. {title}</strong>
        <p>{content}</p>
    </li>
  )
}

export default Post