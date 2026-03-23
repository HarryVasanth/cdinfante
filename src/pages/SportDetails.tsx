import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import {
  ChevronLeft,
  Calendar,
  Image as ImageIcon,
  ArrowRight,
  X,
  ChevronRight,
  Share2,
  Check,
} from 'lucide-react';
import { getSportPosts, type Post } from '../lib/content';

/**
 * Displays news and updates for a specific sport.
 * Shows a main featured post with a gallery, and a list of historical updates.
 *
 * @author Harry Vasanth (harryvasanth.com)
 */
const SportDetails: React.FC = () => {
  const { sportId } = useParams<{ sportId: string }>();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [copied, setCopied] = useState(false);

  // Clear old state when switching sports to prevent "content flickering"
  const [prevSportId, setPrevSportId] = useState(sportId);
  if (sportId !== prevSportId) {
    setPrevSportId(sportId);
    setLoading(true);
    setPosts([]);
  }

  useEffect(() => {
    if (sportId) {
      getSportPosts(sportId).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    }
  }, [sportId]);

  // Select the featured post - either from the URL hash or the most recent one
  const featuredPost = useMemo(() => {
    if (posts.length === 0) return null;
    const slug = hash.replace('#', '');
    if (slug) {
      return posts.find((p) => p.slug === slug) || posts[0];
    }
    return posts[0];
  }, [posts, hash]);

  // Scroll to top when featured post changes
  useEffect(() => {
    if (featuredPost) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [featuredPost?.slug]);

  // Handle Escape key for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      }
    };

    if (selectedImageIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  // Combine hero image and gallery for the Lightbox, avoiding duplicates
  const allImages = useMemo(() => {
    if (!featuredPost) return [];
    const images: string[] = [];
    if (featuredPost.image) {
      images.push(featuredPost.image);
    }
    if (featuredPost.images) {
      featuredPost.images.forEach((img) => {
        if (img !== featuredPost.image && !images.includes(img)) {
          images.push(img);
        }
      });
    }
    return images;
  }, [featuredPost]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#020202]">
        <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % allImages.length);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + allImages.length) % allImages.length,
      );
    }
  };

  // Support native OS sharing or fallback to clipboard
  const handleShare = async (post: Post) => {
    const baseUrl = window.location.origin + window.location.pathname;
    const url = `${baseUrl}#${post.slug}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.title,
          url: url,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Error copying to clipboard:', err);
      }
    }
  };

  // Get sport display name
  const sportKey = sportId?.replace('-', '_') || '';
  const sportName = t(`sports.${sportKey}`, sportId || '');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020202] text-brand-navy dark:text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center text-brand-red font-semibold mb-8 hover:underline group"
        >
          <ChevronLeft
            size={20}
            className="mr-1 group-hover:-translate-x-1 transition-transform"
          />
          {t('common.back_home')}
        </Link>

        {/* Header */}
        <div className="mb-16 relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-navy dark:text-white mb-6 tracking-tighter"
          >
            {sportName}
          </motion.h1>
          <div className="h-2 w-32 bg-brand-red rounded-full" />
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-red/10 blur-[80px] rounded-full -z-10" />
        </div>

        {posts.length === 0 ? (
          <div className="bg-white dark:bg-white/5 rounded-[2.5rem] p-12 text-center shadow-sm border border-slate-200 dark:border-white/10">
            <h2 className="text-2xl font-semibold mb-4">
              {t('sports.no_posts')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {t('sports.check_back_soon')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Featured Post */}
            <div className="lg:col-span-2 space-y-12">
              <AnimatePresence mode="wait">
                {featuredPost && (
                  <motion.div
                    key={featuredPost.slug}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white/70 dark:bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] overflow-hidden border border-white dark:border-white/[0.08] shadow-2xl relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />
                    {featuredPost.image && (
                      <div
                        className="aspect-video w-full overflow-hidden cursor-zoom-in"
                        onClick={() => setSelectedImageIndex(0)}
                      >
                        <img
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}
                    <div className="p-8 md:p-12">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 font-medium">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar size={18} />
                            {new Date(featuredPost.date).toLocaleDateString()}
                          </span>
                        </div>
                        <button
                          onClick={() => handleShare(featuredPost)}
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-brand-red hover:text-white transition-all text-sm font-bold"
                        >
                          {copied ? (
                            <>
                              <Check size={16} />
                              {t('sports.link_copied')}
                            </>
                          ) : (
                            <>
                              <Share2 size={16} />
                              {t('sports.share')}
                            </>
                          )}
                        </button>
                      </div>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-8 leading-[1.1] tracking-tight text-brand-navy dark:text-white">
                        {featuredPost.title}
                      </h2>
                      <div className="prose prose-slate dark:prose-invert max-w-none mb-12 prose-headings:font-black prose-headings:tracking-tight prose-p:text-lg prose-p:leading-relaxed prose-p:text-brand-navy/80 dark:prose-p:text-slate-300">
                        <ReactMarkdown>{featuredPost.content}</ReactMarkdown>
                      </div>

                      {/* Post Gallery */}
                      {featuredPost.images &&
                        featuredPost.images.length > 0 && (
                          <div className="mt-12">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                              <ImageIcon size={20} className="text-brand-red" />
                              {t('sports.gallery')}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {featuredPost.images.map((img, i) => (
                                <div
                                  key={i}
                                  onClick={() => {
                                    const index = allImages.indexOf(img);
                                    if (index !== -1) {
                                      setSelectedImageIndex(index);
                                    }
                                  }}
                                  className="aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 cursor-zoom-in"
                                >
                                  <img
                                    src={img}
                                    alt=""
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                  />
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
                {t('sports.past_posts')}
              </h3>
              <div className="space-y-4">
                {posts.map((post) => (
                  <button
                    key={post.slug}
                    onClick={() => {
                      navigate(`#${post.slug}`, { replace: true });
                    }}
                    className={`w-full text-left p-6 rounded-[2rem] border transition-all duration-500 group relative overflow-hidden ${
                      featuredPost?.slug === post.slug
                        ? 'bg-brand-red text-white border-brand-red shadow-xl scale-[1.02]'
                        : 'bg-white/60 dark:bg-white/[0.02] backdrop-blur-md border-white/20 dark:border-white/10 hover:border-brand-red/50 hover:bg-white/80 dark:hover:bg-white/[0.05]'
                    }`}
                  >
                    <p
                      className={`text-xs font-bold uppercase tracking-widest mb-2 ${
                        featuredPost?.slug === post.slug
                          ? 'text-white/80'
                          : 'text-brand-red'
                      }`}
                    >
                      {new Date(post.date).toLocaleDateString()}
                    </p>
                    <h4 className="font-bold leading-tight line-clamp-2">
                      {post.title}
                    </h4>
                    <p
                      className={`mt-3 text-sm line-clamp-2 ${
                        featuredPost?.slug === post.slug
                          ? 'text-white/70'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {post.description}
                    </p>
                    {featuredPost?.slug !== post.slug && (
                      <div className="mt-4 flex items-center text-xs font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                        {t('sports.read_article')}{' '}
                        <ArrowRight size={14} className="ml-1" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImageIndex(null)}
          >
            <button
              className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors z-[110]"
              onClick={() => setSelectedImageIndex(null)}
            >
              <X size={32} />
            </button>

            {allImages.length > 1 && (
              <>
                <button
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-[110]"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-[110]"
                  onClick={handleNextImage}
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <motion.div
              key={selectedImageIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-5xl w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={allImages[selectedImageIndex]}
                alt=""
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium">
                {selectedImageIndex + 1} / {allImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SportDetails;
