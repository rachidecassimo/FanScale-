import { CreatorProfile, Post, Story, NotificationItem, Conversation, WalletTransaction, AdminReport, KycRequest } from '../types';

export const INITIAL_CREATORS: CreatorProfile[] = [
  {
    id: 'c1',
    name: 'Ana Chissano',
    username: 'ana.moz',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
    bio: 'Criadora de Conteúdo & Lifestyle | Maputo 🇲🇿 ✨ Dicas de moda, bastidores das minhas sessões de fotos e rotina diária exclusiva!',
    category: 'Lifestyle',
    location: 'Maputo, Moçambique 🇲🇿',
    verified: true,
    followersCount: 28400,
    subscribersCount: 2450,
    postsCount: 142,
    likesTotal: 89400,
    subscriptionPriceMonthly: 499,
    subscriptionPriceQuarterly: 1290,
    socialLinks: {
      instagram: 'ana_chissano',
      tiktok: 'ana.moz',
      youtube: 'anachissanovlogs'
    },
    isSubscribed: false,
    isFollowing: true,
    badge: 'Top Criador Moçambique'
  },
  {
    id: 'c2',
    name: 'Dino Macuácua',
    username: 'dino_fitness_mz',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80',
    bio: 'Personal Trainer & Nutrição Esportiva | Treinos diários em casa e no ginásio. Transformação corporal com alimentação local! 💪🇲🇿',
    category: 'Fitness',
    location: 'Matola, Moçambique 🇲🇿',
    verified: true,
    followersCount: 19200,
    subscribersCount: 1180,
    postsCount: 96,
    likesTotal: 45200,
    subscriptionPriceMonthly: 350,
    subscriptionPriceQuarterly: 900,
    socialLinks: {
      instagram: 'dino_fitmz',
      tiktok: 'dino.treinos'
    },
    isSubscribed: true,
    isFollowing: true,
    badge: 'Fitness Pro'
  },
  {
    id: 'c3',
    name: 'Yara Cossa',
    username: 'yara.cossa.music',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80',
    bio: 'Cantora & Compositora de Marrabenta & Afro-Soul 🎵 Pré-estreias de músicas inéditas, ensaios e sessões acústicas ao vivo!',
    category: 'Música',
    location: 'Maputo / Beira 🇲🇿',
    verified: true,
    followersCount: 45800,
    subscribersCount: 3820,
    postsCount: 210,
    likesTotal: 142000,
    subscriptionPriceMonthly: 600,
    subscriptionPriceQuarterly: 1550,
    socialLinks: {
      instagram: 'yaracossa_music',
      youtube: 'yaracossaofficial'
    },
    isSubscribed: false,
    isFollowing: false,
    badge: 'Artista Destaque'
  },
  {
    id: 'c4',
    name: 'Edson Mabote',
    username: 'edson_humor',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80',
    bio: 'Comediante & Criador de Skits | O humor do dia a dia moçambicano sem censura 😂 Stand-up exclusivo e bastidores de gravações!',
    category: 'Humor',
    location: 'Nampula 🇲🇿',
    verified: true,
    followersCount: 38700,
    subscribersCount: 2900,
    postsCount: 165,
    likesTotal: 98000,
    subscriptionPriceMonthly: 250,
    subscriptionPriceQuarterly: 650,
    isSubscribed: false,
    isFollowing: true
  },
  {
    id: 'c5',
    name: 'Samira Langa',
    username: 'samira_fashionmz',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80',
    bio: 'Estilista de Capulanas e Alta Costura Africana 👗 Desfiles, tutoriais de corte e costura, consultoria de imagem personalizada.',
    category: 'Moda',
    location: 'Maputo 🇲🇿',
    verified: true,
    followersCount: 21500,
    subscribersCount: 1640,
    postsCount: 118,
    likesTotal: 62400,
    subscriptionPriceMonthly: 450,
    subscriptionPriceQuarterly: 1150,
    isSubscribed: false,
    isFollowing: false
  },
  {
    id: 'c6',
    name: 'Tânia Mondlane',
    username: 'tania_gastronomiamz',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80',
    bio: 'Chef & Exploradora de Sabores | Segredos da Matapa com Caranguejo, Frango à Zambeziana e receitas gourmet africanas 🍲✨',
    category: 'Gastronomia',
    location: 'Inhambane / Maputo 🇲🇿',
    verified: true,
    followersCount: 15400,
    subscribersCount: 940,
    postsCount: 88,
    likesTotal: 34100,
    subscriptionPriceMonthly: 300,
    subscriptionPriceQuarterly: 790,
    isSubscribed: false,
    isFollowing: false
  }
];

export const INITIAL_STORIES: Story[] = [
  {
    id: 's1',
    creatorId: 'c1',
    creator: {
      name: 'Ana Chissano',
      username: 'ana.moz',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      verified: true
    },
    mediaUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    mediaType: 'image',
    caption: 'Bom dia Maputo! Dia de gravação no Ponta do Ouro 🌊🇲🇿',
    createdAt: 'Há 15 min',
    hasUnseen: true,
    durationSeconds: 5
  },
  {
    id: 's2',
    creatorId: 'c2',
    creator: {
      name: 'Dino Macuácua',
      username: 'dino_fitness_mz',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      verified: true
    },
    mediaUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    mediaType: 'image',
    caption: 'Treino de pernas concluído com os subscritores VIP! 🔥',
    createdAt: 'Há 45 min',
    hasUnseen: true,
    durationSeconds: 5
  },
  {
    id: 's3',
    creatorId: 'c3',
    creator: {
      name: 'Yara Cossa',
      username: 'yara.cossa.music',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
      verified: true
    },
    mediaUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
    mediaType: 'image',
    caption: 'No estúdio gravando o novo single com ritmos de Tofo 🎶',
    createdAt: 'Há 2 horas',
    hasUnseen: true,
    durationSeconds: 5
  },
  {
    id: 's4',
    creatorId: 'c4',
    creator: {
      name: 'Edson Mabote',
      username: 'edson_humor',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
      verified: true
    },
    mediaUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
    mediaType: 'image',
    caption: 'Quando o Chapa 100 demora 2 horas na paragem 😂',
    createdAt: 'Há 3 horas',
    hasUnseen: false,
    durationSeconds: 5
  },
  {
    id: 's5',
    creatorId: 'c5',
    creator: {
      name: 'Samira Langa',
      username: 'samira_fashionmz',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
      verified: true
    },
    mediaUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80',
    mediaType: 'image',
    caption: 'Nova coleção de capulana moçambicana saindo do atelier!',
    createdAt: 'Há 5 horas',
    hasUnseen: true,
    durationSeconds: 5
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    creatorId: 'c1',
    creator: {
      name: 'Ana Chissano',
      username: 'ana.moz',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      verified: true,
      location: 'Maputo, Moçambique',
      subscriptionPriceMonthly: 499
    },
    visibility: 'subscriber',
    mediaType: 'image',
    mediaUrls: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1080&auto=format&fit=crop&q=85'
    ],
    caption: 'Sessão fotográfica de verão exclusiva na praia da Macaneta! 🌅 Apenas para os meus subscritores VIP que apoiam o meu trabalho todos os meses. Deixem nos comentários qual look gostaram mais!',
    hashtags: ['#Macaneta', '#VibesMoz', '#ExclusivoFanScale', '#MaputoModa'],
    likesCount: 542,
    commentsCount: 38,
    sharesCount: 14,
    tipsTotalMT: 1250,
    isUnlocked: false,
    isLiked: false,
    isSaved: false,
    createdAt: 'Há 2 horas',
    viewsCount: 3420,
    locationTag: 'Praia da Macaneta, Maputo',
    comments: [
      {
        id: 'cm1',
        userId: 'u2',
        userName: 'Mateus Cungara',
        userHandle: 'mateus.mz',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        text: 'Melhor criadora de Moçambique! Conteúdo de alto nível 🔥🇲🇿',
        createdAt: 'Há 1 hora',
        likesCount: 12
      },
      {
        id: 'cm2',
        userId: 'u3',
        userName: 'Ivone Sitoe',
        userHandle: 'ivone_sitoe',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        text: 'Amei esse conjunto de capulana! Lindíssima Ana!',
        createdAt: 'Há 45 min',
        likesCount: 8
      }
    ]
  },
  {
    id: 'p2',
    creatorId: 'c2',
    creator: {
      name: 'Dino Macuácua',
      username: 'dino_fitness_mz',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      verified: true,
      location: 'Matola, Moçambique',
      subscriptionPriceMonthly: 350
    },
    visibility: 'public',
    mediaType: 'image',
    mediaUrls: [
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1080&auto=format&fit=crop&q=85'
    ],
    caption: 'Treino de core e hipertrofia com peso corporal! Não precisas de ginásio caro para ter resultados reais. Faz 4 séries de 15 reps de cada exercício.',
    hashtags: ['#FitnessMoçambique', '#MatolaFit', '#TreinoEmCasa', '#SaudeMZ'],
    likesCount: 820,
    commentsCount: 64,
    sharesCount: 52,
    tipsTotalMT: 600,
    isUnlocked: true,
    isLiked: true,
    isSaved: true,
    createdAt: 'Há 4 horas',
    viewsCount: 5890,
    locationTag: 'Matola Rio, Maputo',
    comments: [
      {
        id: 'cm3',
        userId: 'u4',
        userName: 'Nelson Tembe',
        userHandle: 'nelson.t',
        userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
        text: 'Já fiz hoje de manhã Dino, senti rasgar tudo! 👏💪',
        createdAt: 'Há 3 horas',
        likesCount: 5
      }
    ]
  },
  {
    id: 'p3',
    creatorId: 'c3',
    creator: {
      name: 'Yara Cossa',
      username: 'yara.cossa.music',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
      verified: true,
      location: 'Maputo',
      subscriptionPriceMonthly: 600
    },
    visibility: 'ppv',
    priceMT: 150,
    mediaType: 'image',
    mediaUrls: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1080&auto=format&fit=crop&q=85'
    ],
    caption: '🔒 [CONTEÚDO PAGO AVULSO] Ensaio acústico inédito da minha nova música "Noites de Maputo" gravada com guitarras tradicionais antes do lançamento oficial na rádio.',
    hashtags: ['#MarrabentaViva', '#MúsicaMoçambicana', '#ExclusivoPPV', '#MaputoSom'],
    likesCount: 412,
    commentsCount: 22,
    sharesCount: 9,
    tipsTotalMT: 950,
    isUnlocked: false,
    isLiked: false,
    isSaved: false,
    createdAt: 'Há 6 horas',
    viewsCount: 2900,
    locationTag: 'Centro Cultural Franco-Moçambicano',
    comments: []
  },
  {
    id: 'p4',
    creatorId: 'c5',
    creator: {
      name: 'Samira Langa',
      username: 'samira_fashionmz',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
      verified: true,
      location: 'Maputo',
      subscriptionPriceMonthly: 450
    },
    visibility: 'public',
    mediaType: 'image',
    mediaUrls: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1080&auto=format&fit=crop&q=85'
    ],
    caption: 'O orgulho de vestir capulana com toques modernos e elegantes para qualquer ocasião formal ou gala em Moçambique! 🇲🇿✨ Qual a vossa cor favorita?',
    hashtags: ['#CapulanaLove', '#ModaAfricana', '#EstiloMaputo', '#FanScaleCreators'],
    likesCount: 950,
    commentsCount: 89,
    sharesCount: 77,
    tipsTotalMT: 450,
    isUnlocked: true,
    isLiked: false,
    isSaved: false,
    createdAt: 'Há 8 horas',
    viewsCount: 7100,
    locationTag: 'Polana Cimento, Maputo',
    comments: []
  },
  {
    id: 'p5',
    creatorId: 'c4',
    creator: {
      name: 'Edson Mabote',
      username: 'edson_humor',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
      verified: true,
      location: 'Nampula',
      subscriptionPriceMonthly: 250
    },
    visibility: 'subscriber',
    mediaType: 'image',
    mediaUrls: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1080&auto=format&fit=crop&q=85'
    ],
    caption: '🚨 EPISÓDIO SEM CORTES: "Entrevista de Emprego em Moçambique com o Tio que conhece o Chefe". Risadas garantidas para a família FanScale!',
    hashtags: ['#HumorMoçambique', '#NampulaComedy', '#RirParaNaoChorar', '#VipAccess'],
    likesCount: 1120,
    commentsCount: 145,
    sharesCount: 110,
    tipsTotalMT: 2300,
    isUnlocked: false,
    isLiked: false,
    isSaved: false,
    createdAt: 'Há 12 horas',
    viewsCount: 9400,
    locationTag: 'Nampula Cidade',
    comments: []
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv1',
    participantId: 'c1',
    participantName: 'Ana Chissano',
    participantHandle: 'ana.moz',
    participantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    participantVerified: true,
    lastMessage: 'Muito obrigada pelo apoio e pela gorjeta no último post! ❤️',
    lastMessageTime: '14:32',
    unreadCount: 1,
    online: true,
    messages: [
      {
        id: 'm1',
        senderId: 'user_current',
        senderName: 'Você',
        senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        text: 'Olá Ana! As fotos na Macaneta ficaram espetaculares. Parabéns pelo conteúdo!',
        timestamp: '14:15',
        isFromMe: true
      },
      {
        id: 'm2',
        senderId: 'c1',
        senderName: 'Ana Chissano',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        text: 'Muito obrigada pelo apoio e pela gorjeta no último post! ❤️ Na próxima semana vou ter um vídeo exclusivo com os bastidores completos.',
        timestamp: '14:32',
        isFromMe: false
      },
      {
        id: 'm3',
        senderId: 'c1',
        senderName: 'Ana Chissano',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        mediaUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
        mediaType: 'image',
        isPpv: true,
        ppvPriceMT: 100,
        isUnlocked: false,
        text: 'Foto polaroid exclusiva autografada digitalmente para os fãs de Maputo ✨',
        timestamp: '14:33',
        isFromMe: false
      }
    ]
  },
  {
    id: 'conv2',
    participantId: 'c2',
    participantName: 'Dino Macuácua',
    participantHandle: 'dino_fitness_mz',
    participantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    participantVerified: true,
    lastMessage: 'Aqui está o teu plano de nutrição semanal com alimentos de Moçambique!',
    lastMessageTime: 'Ontem',
    unreadCount: 0,
    online: false,
    messages: [
      {
        id: 'm4',
        senderId: 'c2',
        senderName: 'Dino Macuácua',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
        text: 'Boas! Como estão a correr os treinos esta semana? Segue a dieta!',
        timestamp: 'Ontem',
        isFromMe: false
      }
    ]
  },
  {
    id: 'conv3',
    participantId: 'c3',
    participantName: 'Yara Cossa',
    participantHandle: 'yara.cossa.music',
    participantAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
    participantVerified: true,
    lastMessage: 'Áudio prévia de Marrabenta acústica 🎤',
    lastMessageTime: '12 Ago',
    unreadCount: 0,
    online: true,
    messages: [
      {
        id: 'm5',
        senderId: 'c3',
        senderName: 'Yara Cossa',
        senderAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
        text: 'Obrigada por subscreveres! Deixa a tua opinião nesta estrofe nova:',
        timestamp: '12 Ago',
        isFromMe: false
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    type: 'subscription',
    actorName: 'Dino Macuácua',
    actorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    actorHandle: 'dino_fitness_mz',
    message: 'Subscreveste com sucesso o criador Dino Macuácua (350 MT/mês)',
    amountMT: 350,
    createdAt: 'Há 10 minutos',
    read: false
  },
  {
    id: 'n2',
    type: 'tip',
    actorName: 'FanScale Moçambique',
    actorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    actorHandle: 'fanscale.mz',
    message: 'Enviaste uma gorjeta de 100 MT via M-Pesa para @ana.moz',
    amountMT: 100,
    createdAt: 'Há 1 hora',
    read: false
  },
  {
    id: 'n3',
    type: 'like',
    actorName: 'Yara Cossa',
    actorAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
    actorHandle: 'yara.cossa.music',
    message: 'gostou do teu comentário em "Noites de Maputo"',
    createdAt: 'Há 3 horas',
    read: true
  },
  {
    id: 'n4',
    type: 'system',
    actorName: 'Segurança FanScale',
    actorAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
    actorHandle: 'fanscale.security',
    message: 'A tua conta foi verificada com sucesso para compras com M-Pesa e e-Mola.',
    createdAt: 'Ontem',
    read: true
  }
];

export const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx1',
    type: 'deposit',
    title: 'Recarga de Carteira via M-Pesa',
    description: 'Depósito instantâneo com Vodacom M-Pesa (+258 84 123 4567)',
    amountMT: 2500,
    date: '17 Ago 2026, 11:20',
    status: 'completed',
    provider: 'mpesa',
    referenceNumber: 'MP-894218902',
    isCredit: true
  },
  {
    id: 'tx2',
    type: 'subscription',
    title: 'Subscrição Mensal @dino_fitness_mz',
    description: 'Acesso total a treinos e nutrição exclusiva',
    amountMT: 350,
    date: '17 Ago 2026, 11:45',
    status: 'completed',
    provider: 'mpesa',
    referenceNumber: 'SUB-4820199',
    isCredit: false
  },
  {
    id: 'tx3',
    type: 'tip',
    title: 'Gorjeta enviada a @ana.moz',
    description: 'Apoio direto de fã via Carteira FanScale',
    amountMT: 100,
    date: '17 Ago 2026, 12:05',
    status: 'completed',
    provider: 'emola',
    referenceNumber: 'TIP-3920192',
    isCredit: false
  },
  {
    id: 'tx4',
    type: 'creator_revenue',
    title: 'Receita de Subscrição de Fã',
    description: 'Novo subscritor mensal VIP',
    amountMT: 499,
    date: '16 Ago 2026, 18:30',
    status: 'completed',
    provider: 'mpesa',
    referenceNumber: 'REV-9201823',
    isCredit: true
  },
  {
    id: 'tx5',
    type: 'payout',
    title: 'Levantamento para M-Pesa do Criador',
    description: 'Transferência para conta M-Pesa registada (+258 84 999 8888)',
    amountMT: 12000,
    date: '10 Ago 2026, 14:10',
    status: 'completed',
    provider: 'mpesa',
    referenceNumber: 'OUT-9912093',
    isCredit: false
  }
];

export const INITIAL_ADMIN_REPORTS: AdminReport[] = [
  {
    id: 'rep1',
    reportedPostId: 'p99',
    reportedCreator: '@skits_test_mz',
    postCaption: 'Promoção externa de apostas não autorizadas',
    reporterName: 'Carlos Macamo',
    reason: 'inappropriate',
    status: 'pending',
    date: '17 Ago 2026'
  },
  {
    id: 'rep2',
    reportedPostId: 'p88',
    reportedCreator: '@video_maker_beira',
    postCaption: 'Uso indevido de direitos musicais sem autorização',
    reporterName: 'Sociedade de Autores Moz',
    reason: 'copyright',
    status: 'reviewed',
    date: '16 Ago 2026'
  }
];

export const INITIAL_KYC_REQUESTS: KycRequest[] = [
  {
    id: 'kyc1',
    creatorId: 'c1',
    creatorName: 'Ana Chissano',
    creatorHandle: 'ana.moz',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    idDocumentType: 'BI',
    documentNumber: '110293849102A',
    nuitNumber: '149201923',
    status: 'approved',
    submittedAt: '12 Ago 2026',
    phone: '+258 84 765 4321',
    payoutMethod: 'Vodacom M-Pesa'
  },
  {
    id: 'kyc2',
    creatorId: 'c3',
    creatorName: 'Yara Cossa',
    creatorHandle: 'yara.cossa.music',
    creatorAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
    idDocumentType: 'Passaporte',
    documentNumber: '12MZ98471',
    nuitNumber: '192837461',
    status: 'approved',
    submittedAt: '14 Ago 2026',
    phone: '+258 86 543 2109',
    payoutMethod: 'Movitel e-Mola'
  },
  {
    id: 'kyc3',
    creatorId: 'c6',
    creatorName: 'Tânia Mondlane',
    creatorHandle: 'tania_gastronomiamz',
    creatorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    idDocumentType: 'BI',
    documentNumber: '109283746281B',
    nuitNumber: '102938475',
    status: 'pending',
    submittedAt: '17 Ago 2026',
    phone: '+258 84 333 2211',
    payoutMethod: 'Vodacom M-Pesa'
  }
];

export const CATEGORIES = [
  'Todos',
  'Lifestyle',
  'Fitness',
  'Música',
  'Dança',
  'Moda',
  'Humor',
  'Fotografia',
  'Gaming',
  'Beleza',
  'Gastronomia',
  'Educação',
  'Entretenimento'
];

export const CREATOR_ANALYTICS_DATA = [
  { name: 'Seg', receita: 1850, subscritores: 12, ppv: 600, gorjetas: 350 },
  { name: 'Ter', receita: 2400, subscritores: 18, ppv: 850, gorjetas: 400 },
  { name: 'Qua', receita: 3100, subscritores: 25, ppv: 1100, gorjetas: 650 },
  { name: 'Qui', receita: 2900, subscritores: 20, ppv: 950, gorjetas: 500 },
  { name: 'Sex', receita: 4800, subscritores: 38, ppv: 1800, gorjetas: 1100 },
  { name: 'Sáb', receita: 6200, subscritores: 45, ppv: 2400, gorjetas: 1400 },
  { name: 'Dom', receita: 5400, subscritores: 40, ppv: 2100, gorjetas: 1250 },
];

export const MOCK_CREATORS = INITIAL_CREATORS;
export const MOCK_POSTS = INITIAL_POSTS;
export const MOCK_STORIES = INITIAL_STORIES;
export const MOCK_CONVERSATIONS = INITIAL_CONVERSATIONS;
export const MOCK_NOTIFICATIONS = INITIAL_NOTIFICATIONS;
export const MOCK_WALLET_TRANSACTIONS = INITIAL_TRANSACTIONS;
export const MOCK_ADMIN_REPORTS = INITIAL_ADMIN_REPORTS;
export const MOCK_KYC_REQUESTS = INITIAL_KYC_REQUESTS;

