/* ===== Home Page — Display all anime blog posts ===== */

import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { fetchPosts, GENRES, type Post } from "@/lib/api";
import PostCard from "@/components/PostCard";
import heroBanner from "@/assets/hero-banner.png";

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const filtered = posts.filter((p) => {
    const matchesSearch =
      !search ||
      p.animeName.toLowerCase().includes(search.toLowerCase()) ||
      p.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = !genre || p.genre === genre;
    return matchesSearch && matchesGenre;
  });

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src={heroBanner}
          alt="Infinity Void"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">
            <span className="gradient-text">Infinity</span>{" "}
            <span className="text-foreground">Void</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            Dive into the void. Explore anime reviews, analyses, and stories from the otaku universe.
          </p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="glass-card p-4 flex flex-col sm:flex-row gap-3 neon-glow">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by anime name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div className="relative">
            <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="bg-secondary/50 border border-border rounded-lg pl-10 pr-8 py-2.5 text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            >
              <option value="">All Genres</option>
              {GENRES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-card h-80 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 <span className="gradient-text font-display font-semibold">Infinity Void</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
