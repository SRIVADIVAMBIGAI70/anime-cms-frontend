import axios from "axios";

/* ========================
   Types
======================== */

export interface Post {
  id: string;
  title: string;
  animeName: string;
  genre: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
}

/* ========================
   Constants
======================== */

export const GENRES = [
  "Action",
  "Romance",
  "Sci-Fi",
  "Fantasy",
  "Slice of Life",
  "Mecha",
] as const;

export type Genre = (typeof GENRES)[number];

/* ========================
   Backend URL
======================== */

const BASE_URL = "https://anime-cms-backend.onrender.com/api/posts";

/* ========================
   CRUD APIs
======================== */

/** Get All Posts */
export const fetchPosts = async (): Promise<Post[]> => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

/** Get Post By ID */
export const fetchPostById = async (
  id: string
): Promise<Post | undefined> => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

/** Create Post */
export const createPost = async (
  post: Omit<Post, "id" | "date">
): Promise<Post> => {
  const res = await axios.post(BASE_URL, {
    ...post,
    id: Date.now().toString(),
    date: new Date().toISOString().split("T")[0],
  });

  return res.data;
};

/** Update Post */
export const updatePost = async (
  id: string,
  data: Partial<Post>
): Promise<Post> => {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

/** Delete Post */
export const deletePost = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};