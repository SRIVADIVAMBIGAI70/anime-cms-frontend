/* ===== Single Post Page — Full blog view ===== */

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { fetchPostById, type Post } from "@/lib/api";

const SinglePost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPostById(id).then((data) => {
        setPost(data || null);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen pt-24 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="h-8 w-48 bg-muted rounded animate-pulse mb-8" />
          <div className="h-72 bg-muted rounded-xl animate-pulse mb-8" />
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold mb-2">Post Not Found</h2>
          <p className="text-muted-foreground mb-4">The void consumed this page.</p>
          <Link to="/" className="text-primary hover:text-accent transition-colors">← Back to Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <article className="container mx-auto px-4 max-w-3xl animate-fade-in">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Hero image */}
        <div className="relative h-72 md:h-96 rounded-xl overflow-hidden mb-8 neon-glow">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
          <span className="gradient-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Tag size={12} />
            {post.genre}
          </span>
          <span className="flex items-center gap-1"><User size={14} />{post.author}</span>
          <span className="flex items-center gap-1"><Calendar size={14} />{post.date}</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2 text-foreground leading-tight">
          {post.title}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">{post.excerpt}</p>

        {/* Content */}
        <div className="prose-invert max-w-none">
          {post.content.split("\n\n").map((para, i) => (
            <p key={i} className="text-foreground/85 leading-relaxed mb-5 text-base">
              {para}
            </p>
          ))}
        </div>
      </article>
    </main>
  );
};

export default SinglePost;
