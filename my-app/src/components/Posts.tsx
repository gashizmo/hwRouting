import { useState } from "react"
import Post from "./Post"
import { usePosts } from "../hooks/usePosts"

const Posts = () => {
    const [limit, setLimit] = useState<number>(3)
    const { posts, loading, error, createPost, updatePost, deletePost} = usePosts(limit)



    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>

  return (
    <div>
        <h2>List of posts: {limit}</h2>
        <button onClick={() => setLimit(limit +1)}>
            Load another post
        </button>
        <button onClick={() => createPost(
            {title: "New post", content: "content"}
        )}>
            Add fake post
        </button>
            <ul>
                {posts.map((p) => (
                    <div key={p.id}>
                        <Post
                            id={p.id}
                            title={p.title}
                            content={p.content}
                        />
                        <button onClick={() => updatePost(p.id,
                            {
                                title: "updated title",
                                content: "updated content"
                            }
                        )}>
                            обновить
                        </button>
                        <button onClick={() => deletePost(p.id)}>
                            Удалить
                        </button>
                    </div>
                ))}
            </ul>
    </div>
  )
}

export default Posts