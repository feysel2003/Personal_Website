import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github-dark.css"; 
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    API.get(`/posts/${id}`).then(res => setPost(res.data));
  }, [id]);

  // FIX: Updated Loading state colors
  if (!post) return <div className="min-h-screen pt-32 text-center text-gray-500 dark:text-gray-400">Loading...</div>;

  return (
    // FIX: Removed hardcoded bg/text colors to allow global theme
    <article className="min-h-screen pt-24 px-6 pb-20">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white mb-8 transition"
        >
          <ArrowLeft size={20} /> Back to Blog
        </Link>

        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
          {post.title}
        </h1>
        
        {/* Metadata */}
        <div className="flex gap-6 text-gray-500 dark:text-gray-400 mb-8 border-b border-gray-200 dark:border-slate-800 pb-8">
          <span className="flex items-center gap-2"><Clock size={18} /> {post.readTime}</span>
          <span className="flex items-center gap-2"><Calendar size={18} /> {new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Main Image */}
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-[400px] object-cover rounded-2xl mb-12 shadow-2xl border border-gray-200 dark:border-slate-800"
        />

        {/* Markdown Content 
            - 'prose': Tailwind Typography defaults (good for light mode)
            - 'dark:prose-invert': Inverts colors for dark mode (white text)
        */}
        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white">
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </Markdown>
        </div>

      </div>
    </article>
  );
};

export default BlogPost;