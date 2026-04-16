import { useEffect, useState } from "react"
import type { PostType } from "../types"
import axios from "axios"

const API_URL = "http://localhost:8000/api/posts"
const auth = {username: "admin", password: "123"}

export function usePosts(limit: number = 3) {



    const [posts, setPosts] = useState<PostType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        axios.get<PostType[]>(`${API_URL}?_limit=${limit}`, {auth})
        .then((res) => setPosts(res.data))
        .catch(() => setError("Loading error"))
        .finally(() => setLoading(false))
    }, [limit])

    const createPost = async (newPost: Omit<PostType, "id">) => {
        try {
            const res = await axios.post<PostType>(API_URL, newPost, {auth})
            setPosts((prev) => [...prev, res.data])
        } catch (err) {
            setError(`Creation error ${err}`)
        }
    }

    const updatePost = async (id: number, data: Partial<PostType>) => {
        try {
            const res = await axios.put<PostType>(`${API_URL}/${id}`, data, {auth})
            setPosts((prev) => prev.map((p) => (p.id === id ? res.data : p)))
        } catch (err) {
            setError(`Ошибка обновления ${err}`)
        }
    }

    const deletePost = async (id: number) => {
        try {
            await axios.delete<PostType>(`${API_URL}/${id}`, {auth})
            setPosts((prev) => prev.filter((p) => p.id !== id ))
        } catch (err) {
            setError(`Creation error ${err}`)
        }
    }
    
    return { posts, loading, error, createPost, updatePost, deletePost}
}
