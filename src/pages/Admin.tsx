/* ===== Admin Dashboard — CRUD functionality ===== */

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { fetchPosts, deletePost, type Post } from "@/lib/api";
import { checkAuth } from "@/lib/auth";
import { toast } from "sonner";

const Admin = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!checkAuth()) {
      navigate("/login");
      return;
    }
    loadPosts();
  }, [navigate]);

  const loadPosts = async () => {
    setLoading(true);
    const data = await fetchPosts();
    setPosts(data);
    setLoading(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    await deletePost(id);
    toast.success("Post deleted");
    loadPosts();
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">
              <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your anime blog posts</p>
          </div>
          <Link
            to="/admin/new"
            className="gradient-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity neon-glow"
          >
            <Plus size={16} />
            New Post
          </Link>
        </div>

        {/* Posts Table */}
        <div className="glass-card overflow-hidden">
          {loading ? (
            <div className="p-8 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-muted/50 rounded animate-pulse" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-muted-foreground">No posts yet. Create your first!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Title</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Genre</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3 hidden md:table-cell">Date</th>
                    <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, i) => (
                    <tr
                      key={post.id}
                      className="border-b border-border/20 hover:bg-secondary/30 transition-colors opacity-0 animate-fade-in"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img src={post.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{post.title}</p>
                            <p className="text-xs text-muted-foreground">{post.animeName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {post.genre}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-muted-foreground hidden md:table-cell">
                        {post.date}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/post/${post.id}`}
                            className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                          >
                            <Eye size={16} />
                          </Link>
                          <Link
                            to={`/admin/edit/${post.id}`}
                            className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary"
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Admin;
