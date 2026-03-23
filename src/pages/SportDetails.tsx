import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import {
  ChevronLeft,
  Calendar,
  Image as ImageIcon,
  ArrowRight
} from 'lucide-react';
import { getSportPosts, type Post } from '../lib/content';

/**
 * Page component to display the list of posts and a featured post for a specific sport.
 */
const SportDetails: React.FC = () => {
  const { sportId } = useParams<{ sportId: string }>();
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null);

  useEffect(() => {
    if (sportId) {
      setLoading(true);
      getSportPosts(sportId).then(data => {
        setPosts(data);
        if (data.length > 0) {
          setFeaturedPost(data[0]);
        }
        setLoading(false);
      });
    }
  }, [sportId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#020202]">
        <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Get sport display name
  const sportKey = sportId?.replace('-', '_') || '';
  const sportName = t(`sports.${sportKey}`, sportId);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020202] text-brand-navy dark:text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center text-brand-red font-semibold mb-8 hover:underline group"
        >
          <ChevronLeft size={20} className="mr-1 group-hover:-translate-x-1 transition-transform" />
          {t('common.back_home', 'Voltar ao Início')}
        </Link>

        {/* Header */}
        <div className="mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
          >
            {sportName}
          </motion.h1>
          <div className="h-1.5 w-24 bg-brand-red rounded-full" />
        </div>

        {posts.length === 0 ? (
          <div className="bg-white dark:bg-white/5 rounded-[2.5rem] p-12 text-center shadow-sm border border-slate-200 dark:border-white/10">
            <h2 className="text-2xl font-semibold mb-4">{t('sports.no_posts', 'Nenhuma atualização disponível no momento.')}</h2>
            <p className="text-slate-600 dark:text-slate-400">{t('sports.check_back_soon', 'Verifique brevemente para novas notícias e eventos.')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Featured Post */}
            <div className="lg:col-span-2 space-y-12">
              <AnimatePresence mode="wait">
                {featuredPost && (
                  <motion.div
                    key={featuredPost.slug}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white dark:bg-white/5 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm"
                  >
                    {featuredPost.image && (
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-8 md:p-12">
                      <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 mb-6 font-medium">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar size={18} />
                          {new Date(featuredPost.date).toLocaleDateString()}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                        {featuredPost.title}
                      </h2>
                      <div className="prose prose-slate dark:prose-invert max-w-none mb-10">
                        <ReactMarkdown>{featuredPost.content}</ReactMarkdown>
                      </div>

                      {/* Post Gallery */}
                      {featuredPost.images && featuredPost.images.length > 0 && (
                        <div className="mt-12">
                          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <ImageIcon size={20} className="text-brand-red" />
                            {t('sports.gallery', 'Galeria')}
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {featuredPost.images.map((img, i) => (
                              <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                                <img src={img} alt="" className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Past Posts List */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                {t('sports.past_posts', 'Últimas Novidades')}
              </h3>
              <div className="space-y-4">
                {posts.map(post => (
                  <button
                    key={post.slug}
                    onClick={() => setFeaturedPost(post)}
                    className={`w-full text-left p-6 rounded-3xl border transition-all group ${
                      featuredPost?.slug === post.slug
                        ? 'bg-brand-red text-white border-brand-red shadow-lg'
                        : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-brand-red/50'
                    }`}
                  >
                    <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${
                      featuredPost?.slug === post.slug ? 'text-white/80' : 'text-brand-red'
                    }`}>
                      {new Date(post.date).toLocaleDateString()}
                    </p>
                    <h4 className="font-bold leading-tight line-clamp-2">
                      {post.title}
                    </h4>
                    <p className={`mt-3 text-sm line-clamp-2 ${
                      featuredPost?.slug === post.slug ? 'text-white/70' : 'text-slate-600 dark:text-slate-400'
                    }`}>
                      {post.description}
                    </p>
                    {featuredPost?.slug !== post.slug && (
                      <div className="mt-4 flex items-center text-xs font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                        Ler Artigo <ArrowRight size={14} className="ml-1" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SportDetails;
