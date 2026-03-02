/* ===== Add/Edit Post Page ===== */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { fetchPostById, createPost, updatePost, GENRES } from "@/lib/api";
import { checkAuth } from "@/lib/auth";
import { toast } from "sonner";

const AddEditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    animeName: "",
    genre: "Action",
    excerpt: "",
    content: "",
    image: "",
    author: "Admin",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!checkAuth()) {
      navigate("/login");
      return;
    }
    if (id) {
      fetchPostById(id).then((post) => {
        if (post) {
          setForm({
            title: post.title,
            animeName: post.animeName,
            genre: post.genre,
            excerpt: post.excerpt,
            content: post.content,
            image: post.image,
            author: post.author,
          });
        }
      });
    }
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit && id) {
        await updatePost(id, form);
        toast.success("Post updated!");
      } else {
        await createPost(form);
        toast.success("Post created!");
      }
      navigate("/admin");
    } catch {
      toast.error("Something went wrong");
    }
    setSaving(false);
  };

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-2xl animate-fade-in">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h1 className="font-display text-3xl font-bold mb-8">
          <span className="gradient-text">{isEdit ? "Edit Post" : "New Post"}</span>
        </h1>

        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5 neon-glow">
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Post title"
              required
            />
          </div>

          {/* Anime Name & Genre */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Anime Name</label>
              <input
                type="text"
                value={form.animeName}
                onChange={(e) => update("animeName", e.target.value)}
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="e.g. Naruto"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Genre</label>
              <select
                value={form.genre}
                onChange={(e) => update("genre", e.target.value)}
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                {GENRES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Image URL</label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => update("image", e.target.value)}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="https://..."
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Excerpt</label>
            <input
              type="text"
              value={form.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Short description"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Content</label>
            <textarea
              value={form.content}
              onChange={(e) => update("content", e.target.value)}
              rows={8}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-y"
              placeholder="Write your blog post content..."
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Author</label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => update("author", e.target.value)}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Author name"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={saving}
            className="w-full gradient-primary text-primary-foreground font-medium py-2.5 rounded-lg hover:opacity-90 transition-opacity neon-glow flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? "Saving..." : isEdit ? "Update Post" : "Create Post"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddEditPost;
