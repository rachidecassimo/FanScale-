import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  MOCK_CREATORS, 
  MOCK_POSTS, 
  MOCK_STORIES, 
  MOCK_CONVERSATIONS, 
  MOCK_NOTIFICATIONS, 
  MOCK_WALLET_TRANSACTIONS,
  MOCK_ADMIN_REPORTS,
  MOCK_KYC_REQUESTS
} from './data/mockData';
import { 
  UserRole, 
  AuthUser,
  Post, 
  Story, 
  CreatorProfile, 
  Conversation, 
  NotificationItem, 
  WalletTransaction,
  AdminReport,
  KycRequest,
  PaymentProvider,
  PostVisibility
} from './types';

import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Feed } from './components/Feed';
import { ExplorePage } from './components/ExplorePage';
import { CreatorProfileView } from './components/CreatorProfileView';
import { CreatorStudio } from './components/CreatorStudio';
import { WalletView } from './components/WalletView';
import { MessagesView } from './components/MessagesView';
import { NotificationsView } from './components/NotificationsView';
import { AdminDashboard } from './components/AdminDashboard';
import { LandingView } from './components/LandingView';
import { LoginView } from './components/LoginView';
import { StoryViewerModal } from './components/StoryViewerModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { PaymentPromptModal } from './components/PaymentPromptModal';
import { TipModal } from './components/TipModal';
import { CreatePostModal } from './components/CreatePostModal';
import { KycModal } from './components/KycModal';

export default function App() {
  // Authentication & Current User State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>({
    id: 'u_fan_1',
    name: 'Carlos Tembe',
    username: 'carlos.vip',
    email: 'carlos@gmail.com',
    phone: '+258 86 555 1234',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    role: 'fan',
    verified: false,
    walletBalanceMT: 2500,
    bio: 'Amante de música marrabenta e lifestyle moçambicano 🇲🇿',
    location: 'Maputo'
  });
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [loginModalMode, setLoginModalMode] = useState<'login' | 'register'>('login');
  const [loginModalRole, setLoginModalRole] = useState<UserRole>('fan');

  const handleOpenAuth = (mode: 'login' | 'register' = 'login', role: UserRole = 'fan') => {
    setLoginModalMode(mode);
    setLoginModalRole(role);
    setShowLoginModal(true);
  };

  // Navigation & Role State
  const [userRole, setUserRole] = useState<UserRole>('fan');
  const [currentTab, setCurrentTab] = useState<string>('feed');
  const [isLandingPage, setIsLandingPage] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCreatorId, setSelectedCreatorId] = useState<string>('c1');

  // Core Data State
  const [creators, setCreators] = useState<CreatorProfile[]>(MOCK_CREATORS);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [stories, setStories] = useState<Story[]>(MOCK_STORIES);
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string>('conv-1');
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(MOCK_WALLET_TRANSACTIONS);
  const [walletBalanceMT, setWalletBalanceMT] = useState<number>(2500);
  const [reports, setReports] = useState<AdminReport[]>(MOCK_ADMIN_REPORTS);
  const [kycRequests, setKycRequests] = useState<KycRequest[]>(MOCK_KYC_REQUESTS);

  // Modal States
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [subscribingCreator, setSubscribingCreator] = useState<CreatorProfile | null>(null);
  const [tippingCreator, setTippingCreator] = useState<{ id: string; name: string } | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showKycModal, setShowKycModal] = useState<boolean>(false);

  // Mobile Payment Prompt (USSD Simulation)
  const [paymentPrompt, setPaymentPrompt] = useState<{
    isOpen: boolean;
    provider: PaymentProvider;
    amountMT: number;
    phone: string;
    description: string;
    onSuccessCallback: () => void;
  } | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Helper count badges
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;
  const unreadMessagesCount = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  // Authentication Handlers
  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setUserRole(user.role);
    setWalletBalanceMT(user.walletBalanceMT);
    setShowLoginModal(false);
    if (user.role === 'creator') {
      setSelectedCreatorId(user.id.startsWith('c') ? user.id : 'c1');
      setCurrentTab('studio');
    } else if (user.role === 'admin') {
      setCurrentTab('admin');
    } else {
      setCurrentTab('feed');
    }
    setIsLandingPage(false);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    showToast(`Bem-vindo, ${user.name}! Sessão iniciada com sucesso.`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Sessão terminada. Até breve!');
    setIsLandingPage(true);
  };

  // Current logged in creator view (for studio/profile when role is creator)
  const currentCreatorProfile = creators.find((c) => c.id === selectedCreatorId) || creators[0];

  // ----------------------------------------------------
  // Interactions: Like, Save, Comment, Tip
  // ----------------------------------------------------
  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const wasLiked = p.isLiked;
          return {
            ...p,
            isLiked: !wasLiked,
            likesCount: wasLiked ? p.likesCount - 1 : p.likesCount + 1,
          };
        }
        return p;
      })
    );
  };

  const handleToggleSave = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            isSaved: !p.isSaved,
          };
        }
        return p;
      })
    );
    showToast('Publicação guardada nos teus favoritos!');
  };

  const handleAddComment = (postId: string, text: string) => {
    const newComment = {
      id: `comment-${Date.now()}`,
      userId: 'user-me',
      userName: userRole === 'creator' ? currentCreatorProfile.name : 'Eu (Fã FanScale)',
      userAvatar: userRole === 'creator' ? currentCreatorProfile.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      userHandle: userRole === 'creator' ? currentCreatorProfile.username : 'fan_moz',
      text,
      createdAt: 'Agora',
      likesCount: 0,
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [...p.comments, newComment],
          };
        }
        return p;
      })
    );
    showToast('Comentário publicado com sucesso!');
  };

  // ----------------------------------------------------
  // Interactions: PPV Unlock & Subscriptions via M-Pesa / e-Mola / Wallet
  // ----------------------------------------------------
  const handleUnlockPpv = (postId: string, priceMT: number) => {
    const targetPost = posts.find((p) => p.id === postId);
    if (!targetPost) return;

    setPaymentPrompt({
      isOpen: true,
      provider: 'mpesa',
      amountMT: priceMT,
      phone: '841234567',
      description: `Desbloquear publicação de ${targetPost.creator.name}`,
      onSuccessCallback: () => {
        // Unlock post
        setPosts((prev) =>
          prev.map((p) => (p.id === postId ? { ...p, isUnlocked: true } : p))
        );

        // Record transaction
        const newTx: WalletTransaction = {
          id: `tx-${Date.now()}`,
          type: 'ppv_unlock',
          title: `Desbloqueio PPV (${targetPost.creator.name})`,
          description: `Pagamento de conteúdo exclusivo`,
          amountMT: priceMT,
          date: 'Hoje',
          status: 'completed',
          provider: 'mpesa',
          referenceNumber: `MZ-${Math.floor(100000 + Math.random() * 900000)}`,
          isCredit: false,
        };
        setTransactions((prev) => [newTx, ...prev]);

        showToast(`✓ Conteúdo exclusivo de ${targetPost.creator.name} desbloqueado!`);
      },
    });
  };

  const handleOpenSubscribeModal = (creatorId: string) => {
    const cr = creators.find((c) => c.id === creatorId);
    if (cr) {
      setSubscribingCreator(cr);
    }
  };

  const handleConfirmSubscription = (
    creatorId: string,
    plan: 'monthly' | 'quarterly',
    provider: PaymentProvider,
    phoneOrCard: string,
    amountMT: number
  ) => {
    const cr = creators.find((c) => c.id === creatorId);
    if (!cr) return;

    setSubscribingCreator(null);

    // If using wallet balance directly
    if (provider === 'bank_transfer') {
      setWalletBalanceMT((prev) => prev - amountMT);
      finalizeSubscription(cr, amountMT, provider, 'Carteira FanScale');
    } else {
      // Prompt mobile USSD
      setPaymentPrompt({
        isOpen: true,
        provider,
        amountMT,
        phone: phoneOrCard,
        description: `Subscrição VIP a ${cr.name}`,
        onSuccessCallback: () => {
          finalizeSubscription(cr, amountMT, provider, phoneOrCard);
        },
      });
    }
  };

  const finalizeSubscription = (
    cr: CreatorProfile,
    amountMT: number,
    provider: PaymentProvider,
    refDetail: string
  ) => {
    // Mark creator as subscribed
    setCreators((prev) =>
      prev.map((c) =>
        c.id === cr.id
          ? { ...c, isSubscribed: true, subscribersCount: c.subscribersCount + 1 }
          : c
      )
    );

    // Unlock all subscriber posts by this creator
    setPosts((prev) =>
      prev.map((p) =>
        p.creatorId === cr.id && p.visibility === 'subscriber'
          ? { ...p, isUnlocked: true }
          : p
      )
    );

    // Record transaction
    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      type: 'subscription',
      title: `Subscrição VIP: ${cr.name}`,
      description: `Acesso mensal exclusivo`,
      amountMT,
      date: 'Hoje',
      status: 'completed',
      provider,
      referenceNumber: `SUB-${Math.floor(100000 + Math.random() * 900000)}`,
      isCredit: false,
    };
    setTransactions((prev) => [newTx, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'subscription',
      actorName: cr.name,
      actorAvatar: cr.avatar,
      actorHandle: cr.username,
      message: `Tornaste-te membro VIP oficial! Acesso a todo o conteúdo desbloqueado.`,
      createdAt: 'Agora',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
    });

    showToast(`🎉 Parabéns! Agora és subscritor VIP de ${cr.name}`);
  };

  // ----------------------------------------------------
  // Interactions: Tipping Creators
  // ----------------------------------------------------
  const handleOpenTipModal = (creatorId: string, creatorName: string) => {
    setTippingCreator({ id: creatorId, name: creatorName });
  };

  const handleConfirmTip = (
    creatorId: string,
    amountMT: number,
    provider: PaymentProvider,
    message: string
  ) => {
    const cr = creators.find((c) => c.id === creatorId);
    setTippingCreator(null);

    setPaymentPrompt({
      isOpen: true,
      provider,
      amountMT,
      phone: '841234567',
      description: `Gorjeta para ${cr ? cr.name : 'Criador FanScale'}`,
      onSuccessCallback: () => {
        // Record transaction
        const newTx: WalletTransaction = {
          id: `tx-${Date.now()}`,
          type: 'tip',
          title: `Gorjeta a ${cr ? cr.name : 'Criador'}`,
          description: message || 'Apoio em Meticais',
          amountMT,
          date: 'Hoje',
          status: 'completed',
          provider,
          referenceNumber: `TIP-${Math.floor(100000 + Math.random() * 900000)}`,
          isCredit: false,
        };
        setTransactions((prev) => [newTx, ...prev]);

        // Update creator tips
        setPosts((prev) =>
          prev.map((p) =>
            p.creatorId === creatorId
              ? { ...p, tipsTotalMT: p.tipsTotalMT + amountMT }
              : p
          )
        );

        showToast(`💖 Gorjeta de ${amountMT} MT enviada com sucesso!`);
      },
    });
  };

  // ----------------------------------------------------
  // Interactions: Messages & Chat
  // ----------------------------------------------------
  const handleSendMessage = (conversationId: string, text: string) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'user-me',
      senderName: userRole === 'creator' ? currentCreatorProfile.name : 'Eu',
      senderAvatar: userRole === 'creator' ? currentCreatorProfile.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      text,
      timestamp: 'Agora',
      isFromMe: true,
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            lastMessage: text,
            lastMessageTime: 'Agora',
            messages: [...conv.messages, newMessage],
          };
        }
        return conv;
      })
    );
  };

  const handleUnlockPpvMessage = (
    conversationId: string,
    messageId: string,
    priceMT: number
  ) => {
    setPaymentPrompt({
      isOpen: true,
      provider: 'mpesa',
      amountMT: priceMT,
      phone: '841234567',
      description: 'Desbloquear foto exclusiva no chat',
      onSuccessCallback: () => {
        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.id === conversationId) {
              return {
                ...conv,
                messages: conv.messages.map((m) =>
                  m.id === messageId ? { ...m, isUnlocked: true } : m
                ),
              };
            }
            return conv;
          })
        );
        showToast(`✓ Mídia privada desbloqueada no chat!`);
      },
    });
  };

  // ----------------------------------------------------
  // Interactions: Create New Post
  // ----------------------------------------------------
  const handlePublishPost = (postData: {
    caption: string;
    mediaUrl: string;
    visibility: PostVisibility;
    priceMT?: number;
    locationTag: string;
    hashtags: string[];
  }) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      creatorId: currentCreatorProfile.id,
      creator: {
        name: currentCreatorProfile.name,
        username: currentCreatorProfile.username,
        avatar: currentCreatorProfile.avatar,
        verified: currentCreatorProfile.verified,
        location: currentCreatorProfile.location,
        subscriptionPriceMonthly: currentCreatorProfile.subscriptionPriceMonthly,
      },
      visibility: postData.visibility,
      mediaType: 'image',
      mediaUrls: [postData.mediaUrl],
      caption: postData.caption,
      hashtags: postData.hashtags,
      likesCount: 1,
      commentsCount: 0,
      comments: [],
      sharesCount: 0,
      tipsTotalMT: 0,
      priceMT: postData.priceMT,
      isUnlocked: true,
      isLiked: true,
      createdAt: 'Agora',
      viewsCount: 1,
      locationTag: postData.locationTag,
    };

    setPosts((prev) => [newPost, ...prev]);
    setCurrentTab('feed');
    setIsLandingPage(false);
    showToast('🚀 O teu novo conteúdo foi publicado com sucesso no FanScale Moçambique!');
  };

  // ----------------------------------------------------
  // Interactions: Wallet Deposit & Withdraw
  // ----------------------------------------------------
  const handleDepositToWallet = (
    amountMT: number,
    provider: PaymentProvider,
    phone: string
  ) => {
    setPaymentPrompt({
      isOpen: true,
      provider,
      amountMT,
      phone,
      description: 'Recarga de Carteira FanScale',
      onSuccessCallback: () => {
        setWalletBalanceMT((prev) => prev + amountMT);
        const newTx: WalletTransaction = {
          id: `tx-${Date.now()}`,
          type: 'deposit',
          title: `Recarga via ${provider.toUpperCase()}`,
          description: `Depósito em conta FanScale`,
          amountMT,
          date: 'Hoje',
          status: 'completed',
          provider,
          referenceNumber: `DEP-${Math.floor(100000 + Math.random() * 900000)}`,
          isCredit: true,
        };
        setTransactions((prev) => [newTx, ...prev]);
        showToast(`✓ Carteira recarregada com ${amountMT} MT!`);
      },
    });
  };

  const handleRequestPayout = (
    amountMT: number,
    method: string,
    phoneOrIban: string
  ) => {
    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      type: 'payout',
      title: `Levantamento para ${method.toUpperCase()} (${phoneOrIban})`,
      description: `Transferência de rendimentos`,
      amountMT,
      date: 'Hoje',
      status: 'pending',
      provider: method === 'emola' ? 'emola' : 'mpesa',
      referenceNumber: `SAQ-${Math.floor(100000 + Math.random() * 900000)}`,
      isCredit: false,
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`✓ Pedido de levantamento de ${amountMT} MT registado! Processamento em até 2 horas.`);
  };

  // ----------------------------------------------------
  // Admin & KYC Actions
  // ----------------------------------------------------
  const handleResolveReport = (reportId: string, action: 'keep' | 'remove') => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? { ...r, status: action === 'remove' ? 'removed' : 'reviewed' }
          : r
      )
    );
    showToast(action === 'remove' ? 'Conteúdo removido da plataforma.' : 'Denúncia arquivada.');
  };

  const handleResolveKyc = (kycId: string, action: 'approve' | 'reject') => {
    setKycRequests((prev) =>
      prev.map((k) =>
        k.id === kycId
          ? { ...k, status: action === 'approve' ? 'approved' : 'rejected' }
          : k
      )
    );
    showToast(action === 'approve' ? 'Criador verificado com sucesso!' : 'Solicitação rejeitada.');
  };

  const handleSubmitKyc = (data: any) => {
    const newKyc: KycRequest = {
      id: `kyc-${Date.now()}`,
      creatorId: 'user-me',
      creatorName: data.publicName || data.fullName,
      legalFullName: data.fullName,
      dateOfBirth: data.dateOfBirth || '2001-01-01',
      age: 23,
      isOver18Confirmed: true,
      participantConsentConfirmed: true,
      creatorHandle: 'eu_criador',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      idDocumentType: data.docType,
      documentNumber: data.docNumber,
      nuitNumber: data.nuit,
      status: 'pending',
      submittedAt: 'Agora',
      phone: data.phone,
      payoutMethod: data.payoutMethod,
    };
    setKycRequests((prev) => [newKyc, ...prev]);
    showToast('Documentos 18+ e KYC enviados para conformidade FanScale.');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col antialiased selection:bg-pink-500 selection:text-white">
      
      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 rounded-full bg-stone-900/95 text-white px-5 py-2.5 text-xs font-bold shadow-2xl backdrop-blur-md border border-stone-800 animate-fade-in flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          setIsLandingPage(false);
        }}
        userRole={userRole}
        onRoleChange={(role) => {
          setUserRole(role);
          if (role === 'creator') setCurrentTab('studio');
          else if (role === 'admin') setCurrentTab('admin');
          else setCurrentTab('feed');
          showToast(`Modo alterado para: ${role.toUpperCase()}`);
        }}
        isLandingPage={isLandingPage}
        onToggleLandingPage={(show) => setIsLandingPage(show)}
        walletBalanceMT={walletBalanceMT}
        unreadNotificationsCount={unreadNotificationsCount}
        unreadMessagesCount={unreadMessagesCount}
        onOpenCreateModal={() => setShowCreateModal(true)}
        onOpenWallet={() => {
          setCurrentTab('wallet');
          setIsLandingPage(false);
        }}
        onOpenKycModal={() => setShowKycModal(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim()) {
            setCurrentTab('explore');
            setIsLandingPage(false);
          }
        }}
        currentUser={currentUser}
        onOpenLogin={() => handleOpenAuth('login')}
        onOpenRegister={() => handleOpenAuth('register')}
        onLogout={handleLogout}
      />

      {/* Main App Content Viewport */}
      <main className="flex-1 pb-20 lg:pb-10">
        
        {/* If Landing Page mode is active */}
        {isLandingPage ? (
          <LandingView
            onStartExploring={() => {
              setIsLandingPage(false);
              setCurrentTab('explore');
            }}
            onBecomeCreator={() => {
              handleOpenAuth('register', 'creator');
            }}
            onOpenLogin={() => handleOpenAuth('login')}
            onOpenRegister={() => handleOpenAuth('register')}
          />
        ) : (
          <>
            {/* 0. Dedicated Login Tab */}
            {currentTab === 'login' && (
              <LoginView
                initialMode={loginModalMode}
                initialRole={loginModalRole}
                onLoginSuccess={handleLoginSuccess}
                onClose={() => setCurrentTab('feed')}
              />
            )}

            {/* 1. Feed Tab */}
            {currentTab === 'feed' && (
              <Feed
                posts={posts}
                stories={stories}
                creators={creators}
                walletBalanceMT={walletBalanceMT}
                onLikePost={handleToggleLike}
                onSavePost={handleToggleSave}
                onAddComment={handleAddComment}
                onSelectStory={(index) => setActiveStoryIndex(index)}
                onOpenCreateStory={() => setShowCreateModal(true)}
                onOpenCreateModal={() => setShowCreateModal(true)}
                onOpenSubscribeModal={handleOpenSubscribeModal}
                onOpenPpvUnlockModal={(post) => handleUnlockPpv(post.id, post.priceMT || 100)}
                onOpenTipModal={handleOpenTipModal}
                onSelectCreatorProfile={(id) => {
                  setSelectedCreatorId(id);
                  setCurrentTab('profile');
                }}
                onReportPost={(post) => {
                  handleResolveReport(post.id, 'keep');
                  showToast('Denúncia enviada para a equipa de moderação.');
                }}
                onOpenKycModal={() => setShowKycModal(true)}
                onOpenWallet={() => {
                  setCurrentTab('wallet');
                  setIsLandingPage(false);
                }}
              />
            )}

            {/* 2. Explore Tab */}
            {currentTab === 'explore' && (
              <ExplorePage
                creators={creators}
                posts={posts}
                onSelectCreator={(id) => {
                  setSelectedCreatorId(id);
                  setCurrentTab('profile');
                }}
                onOpenSubscribeModal={handleOpenSubscribeModal}
                onOpenPpvUnlockModal={(post) => handleUnlockPpv(post.id, post.priceMT || 100)}
                onLikePost={handleToggleLike}
              />
            )}

            {/* 3. Creator Profile Tab */}
            {currentTab === 'profile' && (
              <CreatorProfileView
                creator={currentCreatorProfile}
                posts={posts.filter((p) => p.creatorId === currentCreatorProfile?.id)}
                onBack={() => setCurrentTab('feed')}
                onFollowToggle={(id) => {
                  setCreators((prev) =>
                    prev.map((c) => (c.id === id ? { ...c, isFollowing: !c.isFollowing } : c))
                  );
                  showToast('Preferência de criador atualizada!');
                }}
                onOpenSubscribeModal={handleOpenSubscribeModal}
                onOpenTipModal={handleOpenTipModal}
                onOpenMessageWithCreator={(id) => {
                  setSelectedCreatorId(id);
                  setCurrentTab('messages');
                }}
                onLikePost={handleToggleLike}
                onSavePost={handleToggleSave}
                onAddComment={handleAddComment}
                onOpenPpvUnlockModal={(post) => handleUnlockPpv(post.id, post.priceMT || 100)}
                onReportPost={(post) => {
                  handleResolveReport(post.id, 'keep');
                  showToast('Denúncia enviada para a equipa de moderação.');
                }}
              />
            )}

            {/* 4. Creator Studio Tab (Painel de Monetização) */}
            {currentTab === 'studio' && (
              <CreatorStudio
                creator={currentCreatorProfile}
                posts={posts.filter((p) => p.creatorId === currentCreatorProfile.id)}
                onOpenCreateModal={() => setShowCreateModal(true)}
                onRequestPayout={handleRequestPayout}
                onUpdatePricing={(monthlyMT, quarterlyMT) => {
                  setCreators((prev) =>
                    prev.map((c) =>
                      c.id === currentCreatorProfile.id
                        ? { ...c, subscriptionPriceMonthly: monthlyMT, subscriptionPriceQuarterly: quarterlyMT }
                        : c
                    )
                  );
                  showToast('Preços de subscrição atualizados com sucesso!');
                }}
              />
            )}

            {/* 5. Wallet Tab (Carteira Digital M-Pesa / e-Mola) */}
            {currentTab === 'wallet' && (
              <WalletView
                userRole={userRole}
                walletBalanceMT={walletBalanceMT}
                transactions={transactions}
                onDeposit={handleDepositToWallet}
                onRequestPayout={handleRequestPayout}
              />
            )}

            {/* 6. Messages Tab */}
            {currentTab === 'messages' && (
              <MessagesView
                conversations={conversations}
                activeConversationId={activeConversationId}
                onSelectConversation={setActiveConversationId}
                onSendMessage={handleSendMessage}
                onUnlockPpvMessage={handleUnlockPpvMessage}
                onOpenTipModal={handleOpenTipModal}
              />
            )}

            {/* 7. Notifications Tab */}
            {currentTab === 'notifications' && (
              <NotificationsView
                notifications={notifications}
                onMarkAllAsRead={() => {
                  setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
                  showToast('Todas as notificações foram marcadas como lidas.');
                }}
                onSelectNotification={(item) => {
                  if (item.targetPostId) {
                    setCurrentTab('feed');
                  }
                }}
              />
            )}

            {/* 8. Admin Dashboard Tab */}
            {currentTab === 'admin' && (
              <AdminDashboard
                reports={reports}
                kycRequests={kycRequests}
                onResolveReport={handleResolveReport}
                onResolveKyc={handleResolveKyc}
              />
            )}
          </>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          setIsLandingPage(false);
        }}
        onOpenCreateModal={() => setShowCreateModal(true)}
        unreadMessagesCount={unreadMessagesCount}
      />

      {/* ------------------------------------------- */}
      {/* Interactive Global Modals */}
      {/* ------------------------------------------- */}

      {/* Story Viewer */}
      {activeStoryIndex !== null && (
        <StoryViewerModal
          stories={stories}
          initialIndex={activeStoryIndex}
          onClose={() => setActiveStoryIndex(null)}
          onSendStoryReply={(creatorUsername, text) => {
            handleSendMessage('conv-1', `Respondeu ao Story de @${creatorUsername}: ${text}`);
            showToast('Resposta enviada ao criador!');
          }}
        />
      )}

      {/* Subscription Modal */}
      {subscribingCreator && (
        <SubscriptionModal
          creator={subscribingCreator}
          walletBalanceMT={walletBalanceMT}
          onClose={() => setSubscribingCreator(null)}
          onConfirmSubscription={handleConfirmSubscription}
        />
      )}

      {/* Tip Modal */}
      {tippingCreator && (
        <TipModal
          creatorId={tippingCreator.id}
          creatorName={tippingCreator.name}
          walletBalanceMT={walletBalanceMT}
          onClose={() => setTippingCreator(null)}
          onConfirmTip={handleConfirmTip}
        />
      )}

      {/* Create New Post Modal */}
      {showCreateModal && (
        <CreatePostModal
          onClose={() => setShowCreateModal(false)}
          onPublishPost={handlePublishPost}
        />
      )}

      {/* KYC Creator Verification Modal */}
      {showKycModal && (
        <KycModal
          onClose={() => setShowKycModal(false)}
          onSubmitKyc={handleSubmitKyc}
        />
      )}

      {/* Mobile USSD Payment Prompt (M-Pesa / e-Mola / mKesh Simulation) */}
      {paymentPrompt && paymentPrompt.isOpen && (
        <PaymentPromptModal
          provider={paymentPrompt.provider}
          amountMT={paymentPrompt.amountMT}
          phone={paymentPrompt.phone}
          itemDescription={paymentPrompt.description}
          onSuccess={() => {
            paymentPrompt.onSuccessCallback();
            setPaymentPrompt(null);
          }}
          onCancel={() => setPaymentPrompt(null)}
        />
      )}

      {/* Login & Register Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <LoginView
            isModal={true}
            initialMode={loginModalMode}
            initialRole={loginModalRole}
            onLoginSuccess={handleLoginSuccess}
            onClose={() => setShowLoginModal(false)}
          />
        </div>
      )}

    </div>
  );
}
