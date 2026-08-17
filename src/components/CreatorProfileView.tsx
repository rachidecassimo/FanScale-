import React, { useState } from 'react';
import { 
  CheckCircle, 
  MapPin, 
  Lock, 
  Heart, 
  MessageCircle, 
  Share2, 
  Coins, 
  Grid, 
  List, 
  Sparkles, 
  ShieldCheck,
  Instagram,
  Youtube,
  Send,
  ArrowLeft
} from 'lucide-react';
import { CreatorProfile, Post } from '../types';
import { PostCard } from './PostCard';

interface CreatorProfileViewProps {
  creator: CreatorProfile;
  posts: Post[];
  onBack: () => void;
  onFollowToggle: (creatorId: string) => void;
  onOpenSubscribeModal: (creatorId: string) => void;
  onOpenTipModal: (creatorId: string, creatorName: string) => void;
  onOpenMessageWithCreator: (creatorId: string) => void;
  onLikePost: (postId: string) => void;
  onSavePost: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onOpenPpvUnlockModal: (post: Post) => void;
  onReportPost: (post: Post) => void;
}

export const CreatorProfileView: React.FC<CreatorProfileViewProps> = ({
  creator,
  posts,
  onBack,
  onFollowToggle,
  onOpenSubscribeModal,
  onOpenTipModal,
  onOpenMessageWithCreator,
  onLikePost,
  onSavePost,
  onAddComment,
  onOpenPpvUnlockModal,
  onReportPost,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'photos' | 'exclusive' | 'ppv'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'feed'>('feed');

  // Filter posts belonging to this creator
  const creatorPosts = posts.filter((p) => p.creatorId === creator.id || p.creator.username === creator.username);

  const filteredPosts = creatorPosts.filter((p) => {
    if (activeTab === 'exclusive') return p.visibility === 'subscriber';
    if (activeTab === 'ppv') return p.visibility === 'ppv';
    return true;
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-pink-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Voltar ao Feed</span>
      </button>

      {/* Header Profile Card */}
      <div className="overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm">
        
        {/* Cover Photo */}
        <div className="relative h-44 sm:h-64 w-full bg-stone-200">
          <img
            src={creator.coverImage}
            alt={creator.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          
          {creator.badge && (
            <div className="absolute top-4 right-4 rounded-full bg-black/40 px-3 py-1 text-xs font-bold text-white backdrop-blur-md border border-white/20">
              ⭐ {creator.badge}
            </div>
          )}
        </div>

        {/* Profile Details Bar */}
        <div className="p-6 pt-0 space-y-6">
          
          {/* Top row: Avatar & Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20">
            
            {/* Avatar */}
            <div className="relative inline-block">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="h-28 w-28 sm:h-36 sm:w-36 rounded-full border-4 border-white object-cover ring-4 ring-pink-500/20 shadow-xl bg-white"
              />
              {creator.verified && (
                <CheckCircle className="absolute bottom-2 right-2 h-7 w-7 fill-pink-600 text-white shadow-md rounded-full" />
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* Seguir Button */}
              <button
                onClick={() => onFollowToggle(creator.id)}
                className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all ${
                  creator.isFollowing
                    ? 'border border-stone-300 bg-stone-100 text-stone-700 hover:bg-stone-200'
                    : 'border border-pink-500 bg-pink-50 text-pink-700 hover:bg-pink-100'
                }`}
              >
                {creator.isFollowing ? 'A Seguir' : '+ Seguir'}
              </button>

              {/* Mensagem Button */}
              <button
                onClick={() => onOpenMessageWithCreator(creator.id)}
                className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-xs font-bold text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Mensagem</span>
              </button>

              {/* Gorjeta Button */}
              <button
                onClick={() => onOpenTipModal(creator.id, creator.name)}
                className="flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50 px-4 py-2.5 text-xs font-bold text-pink-700 hover:bg-pink-100 transition-colors"
              >
                <Coins className="h-3.5 w-3.5 text-pink-600" />
                <span>Dar Gorjeta</span>
              </button>

              {/* Subscrever Button (Vibrant Pink Gradient) */}
              <button
                onClick={() => onOpenSubscribeModal(creator.id)}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-pink-500/30 hover:from-pink-700 hover:to-rose-600 transition-all hover:scale-105 active:scale-95"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>
                  {creator.isSubscribed
                    ? 'Subscrito VIP ✓'
                    : `Subscrever — ${creator.subscriptionPriceMonthly} MT/mês`}
                </span>
              </button>
            </div>
          </div>

          {/* Name, Handle, Bio & Location */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-extrabold text-stone-900">
                  {creator.name}
                </h1>
                <span className="rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-bold text-pink-800">
                  {creator.category}
                </span>
              </div>
              <p className="text-xs font-semibold text-stone-400">
                @{creator.username}
              </p>
            </div>

            <p className="text-sm text-stone-700 max-w-2xl leading-relaxed">
              {creator.bio}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500">
              <span className="flex items-center gap-1 text-stone-700 font-medium">
                <MapPin className="h-3.5 w-3.5 text-pink-500" />
                {creator.location}
              </span>
              <span>·</span>
              <span className="text-pink-700 font-semibold">
                Pagamentos aceites: M-Pesa 🇲🇿, e-Mola, mKesh
              </span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 border-y border-stone-100 py-4 text-center sm:text-left">
            <div>
              <span className="block font-display text-lg font-black text-stone-900">
                {creator.postsCount}
              </span>
              <span className="text-xs text-stone-400">Publicações</span>
            </div>

            <div>
              <span className="block font-display text-lg font-black text-stone-900">
                {(creator.followersCount / 1000).toFixed(1)}k
              </span>
              <span className="text-xs text-stone-400">Seguidores</span>
            </div>

            <div>
              <span className="block font-display text-lg font-black text-pink-600">
                {(creator.subscribersCount / 1000).toFixed(1)}k
              </span>
              <span className="text-xs text-stone-400">Subscritores VIP</span>
            </div>

            <div className="hidden sm:block">
              <span className="block font-display text-lg font-black text-stone-900">
                {(creator.likesTotal / 1000).toFixed(1)}k
              </span>
              <span className="text-xs text-stone-400">Gostos Totais</span>
            </div>
          </div>

          {/* VIP Subscription Promo Box */}
          {!creator.isSubscribed && (
            <div className="rounded-2xl bg-gradient-to-r from-pink-500/10 via-rose-500/5 to-white border border-pink-200/80 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-pink-800">
                  <Sparkles className="h-4 w-4 text-pink-600" />
                  <span>Benefícios da Subscrição VIP a @{creator.username}</span>
                </div>
                <ul className="text-xs text-stone-600 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1">
                  <li className="flex items-center gap-1.5">✓ Acesso a todas as publicações privadas</li>
                  <li className="flex items-center gap-1.5">✓ Mensagens diretas prioritárias</li>
                  <li className="flex items-center gap-1.5">✓ Vídeos em primeira mão</li>
                  <li className="flex items-center gap-1.5">✓ Descontos em conteúdos pagos avulsos</li>
                </ul>
              </div>

              <button
                onClick={() => onOpenSubscribeModal(creator.id)}
                className="whitespace-nowrap rounded-full bg-pink-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-pink-500/20 hover:bg-pink-700 transition-all"
              >
                Subscrever — {creator.subscriptionPriceMonthly} MT/mês
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Tabs & View Switcher */}
      <div className="flex items-center justify-between border-b border-pink-100 pb-2">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-stone-600 hover:bg-pink-50 hover:text-pink-700'
            }`}
          >
            Todas ({creatorPosts.length})
          </button>

          <button
            onClick={() => setActiveTab('exclusive')}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'exclusive'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-stone-600 hover:bg-pink-50 hover:text-pink-700'
            }`}
          >
            🔒 Exclusivos VIP
          </button>

          <button
            onClick={() => setActiveTab('ppv')}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'ppv'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-stone-600 hover:bg-pink-50 hover:text-pink-700'
            }`}
          >
            💰 Loja / PPV
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-1 border border-stone-200 rounded-full p-0.5 bg-white">
          <button
            onClick={() => setViewMode('feed')}
            className={`p-1.5 rounded-full ${viewMode === 'feed' ? 'bg-pink-50 text-pink-600' : 'text-stone-400'}`}
            title="Vista de Feed"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-full ${viewMode === 'grid' ? 'bg-pink-50 text-pink-600' : 'text-stone-400'}`}
            title="Vista de Grelha"
          >
            <Grid className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Posts Section */}
      {filteredPosts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-stone-200 bg-white p-12 text-center space-y-2">
          <p className="font-display text-sm font-bold text-stone-700">
            Nenhuma publicação encontrada nesta categoria
          </p>
          <p className="text-xs text-stone-400">
            @{creator.username} ainda não adicionou publicações com este filtro.
          </p>
        </div>
      ) : viewMode === 'feed' ? (
        <div className="space-y-6 max-w-2xl mx-auto">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={onLikePost}
              onSave={onSavePost}
              onAddComment={onAddComment}
              onOpenSubscribeModal={onOpenSubscribeModal}
              onOpenPpvUnlockModal={onOpenPpvUnlockModal}
              onOpenTipModal={onOpenTipModal}
              onSelectCreatorProfile={() => {}}
              onReportPost={onReportPost}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setViewMode('feed')}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-stone-100 cursor-pointer shadow-sm"
            >
              <img
                src={post.mediaUrls[0]}
                alt={post.caption}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform"
              />
              {post.visibility === 'subscriber' && (
                <div className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 text-white backdrop-blur-md">
                  <Lock className="h-3.5 w-3.5 text-pink-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
