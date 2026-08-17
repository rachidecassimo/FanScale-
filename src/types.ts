export type UserRole = 'fan' | 'creator' | 'admin';

export type PaymentProvider = 'mpesa' | 'emola' | 'mkesh' | 'card' | 'bank_transfer';

export interface CreatorProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverImage: string;
  bio: string;
  category: string;
  location: string;
  verified: boolean;
  followersCount: number;
  subscribersCount: number;
  postsCount: number;
  likesTotal: number;
  subscriptionPriceMonthly: number; // in MT (Meticais)
  subscriptionPriceQuarterly: number; // in MT
  socialLinks?: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    twitter?: string;
  };
  isSubscribed?: boolean;
  isFollowing?: boolean;
  badge?: string;
}

export type PostVisibility = 'public' | 'subscriber' | 'ppv' | 'promo';

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userHandle: string;
  text: string;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface Post {
  id: string;
  creatorId: string;
  creator: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
    location?: string;
    subscriptionPriceMonthly: number;
  };
  visibility: PostVisibility;
  mediaType: 'image' | 'video' | 'gallery';
  mediaUrls: string[];
  thumbnailUrl?: string;
  caption: string;
  hashtags: string[];
  likesCount: number;
  commentsCount: number;
  comments: Comment[];
  sharesCount: number;
  tipsTotalMT: number;
  priceMT?: number; // for PPV (Pay-per-view)
  isUnlocked?: boolean; // if user paid PPV or is subscribed
  isLiked?: boolean;
  isSaved?: boolean;
  createdAt: string;
  viewsCount: number;
  locationTag?: string;
}

export interface Story {
  id: string;
  creatorId: string;
  creator: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption?: string;
  createdAt: string;
  hasUnseen: boolean;
  durationSeconds?: number;
}

export interface NotificationItem {
  id: string;
  type: 'subscription' | 'like' | 'comment' | 'follow' | 'tip' | 'payout' | 'ppv_purchase' | 'system';
  actorName: string;
  actorAvatar: string;
  actorHandle: string;
  message: string;
  amountMT?: number;
  targetPostId?: string;
  createdAt: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'audio';
  audioDuration?: string;
  isPpv?: boolean;
  ppvPriceMT?: number;
  isUnlocked?: boolean;
  timestamp: string;
  isFromMe: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantHandle: string;
  participantAvatar: string;
  participantVerified: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
  messages: ChatMessage[];
}

export interface WalletTransaction {
  id: string;
  type: 'deposit' | 'subscription' | 'ppv_unlock' | 'tip' | 'payout' | 'creator_revenue';
  title: string;
  description: string;
  amountMT: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  provider: PaymentProvider;
  referenceNumber: string;
  isCredit: boolean;
}

export interface AdminReport {
  id: string;
  reportedPostId: string;
  reportedCreator: string;
  postCaption: string;
  postImage?: string;
  reporterName: string;
  reason: 'spam' | 'copyright' | 'inappropriate' | 'underage_risk' | 'fraud';
  status: 'pending' | 'reviewed' | 'removed';
  date: string;
}

export interface KycRequest {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  idDocumentType: 'BI' | 'Passaporte' | 'DIRE';
  documentNumber: string;
  nuitNumber: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  phone: string;
  payoutMethod: string;
}
