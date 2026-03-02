/* ===== PostCard Component — Anime blog card ===== */

import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import type { Post } from "@/lib/api";

interface PostCardProps {
  post: Post;
  index?: number;
}

const PostCard = ({ post, index = 0 }: PostCardProps) => {
  return (
    <Link
      to={`/post/${post.id}`}
      className="group glass-card overflow-hidden hover:neon-glow transition-all duration-500 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <span className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full gradient-primary text-primary-foreground">
          {post.genre}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg leading-tight mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <User size={12} />
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {post.date}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
