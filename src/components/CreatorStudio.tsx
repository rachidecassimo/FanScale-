import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Wallet, 
  Coins, 
  PlusCircle, 
  Sparkles, 
  ArrowUpRight, 
  Download, 
  CheckCircle, 
  Settings, 
  Lock, 
  MessageCircle, 
  Eye, 
  Heart,
  BarChart3,
  Bot
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { CREATOR_ANALYTICS_DATA } from '../data/mockData';
import { CreatorProfile, Post } from '../types';

interface CreatorStudioProps {
  creator: CreatorProfile;
  posts: Post[];
  onOpenCreateModal: () => void;
  onRequestPayout: (amountMT: number, method: string, phoneOrIban: string) => void;
  onUpdatePricing: (monthlyMT: number, quarterlyMT: number) => void;
}

export const CreatorStudio: React.FC<CreatorStudioProps> = ({
  creator,
  posts,
  onOpenCreateModal,
  onRequestPayout,
  onUpdatePricing,
}) => {
  const [activeStudioTab, setActiveStudioTab] = useState<'overview' | 'content' | 'pricing' | 'ai_assistant'>('overview');
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('15000');
  const [payoutMethod, setPayoutMethod] = useState<'mpesa' | 'emola' | 'bank'>('mpesa');
  const [payoutPhone, setPayoutPhone] = useState('849998888');
  
  // Pricing states
  const [monthlyPrice, setMonthlyPrice] = useState(creator.subscriptionPriceMonthly.toString());
  const [quarterlyPrice, setQuarterlyPrice] = useState(creator.subscriptionPriceQuarterly.toString());
  const [savedPricingFeedback, setSavedPricingFeedback] = useState(false);

  // AI Assistant states
  const [aiPrompt, setAiPrompt] = useState('Ideias de post de moda com capulana para o fim de semana em Maputo');
  const [aiGeneratedResult, setAiGeneratedResult] = useState<string | null>(
    '🇲🇿 Sugestão FanScale AI:\n\n📸 Visual: Foto elegante em luz dourada na Marginal de Maputo ou Jardim Tunduru vestindo um blazer moderno com detalhes em capulana Samakaka.\n\n✍️ Legenda: "A sofisticação do nosso Moçambique numa peça só ✨ Detalhes que contam a nossa história com o charme de Maputo. Subscritores VIP têm acesso ao guia de lojas locais onde fiz este corte sob medida! 👗🇲🇿"\n\n🏷️ Hashtags: #ModaMaputo #CapulanaVibes #EstiloMoz #FanScaleCreators #MaputoElegante'
  );
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const availableBalanceMT = 35400;
  const earningsThisMonthMT = 18750;
  const totalEarningsMT = 142600;
  const subscribersCount = creator?.subscribersCount ?? 2450;
  const newSubscribersThisMonth = 184;

  const handlePayoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(payoutAmount) || 0;
    if (amt <= 0 || amt > availableBalanceMT) return;
    onRequestPayout(amt, payoutMethod, payoutPhone);
    setShowPayoutModal(false);
  };

  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePricing(parseFloat(monthlyPrice) || 499, parseFloat(quarterlyPrice) || 1290);
    setSavedPricingFeedback(true);
    setTimeout(() => setSavedPricingFeedback(false), 2500);
  };

  const handleGenerateAiIdea = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      setIsGeneratingAi(false);
      setAiGeneratedResult(
        `🇲🇿 Ideia Gerada para ${creator.category} (${creator.name}):\n\n📌 Título do Post: "Bastidores Exclusivos: Como planeio a minha semana de ${creator.category.toLowerCase()}"\n\n🎯 Formato: Carrossel com 3 fotos em alta definição + vídeo curto mostrando a rotina.\n\n💰 Dica de Monetização: Define como "Apenas Subscritores VIP" e envia uma mensagem privada aos teus 50 fãs mais ativos oferecendo 10% de desconto no plano trimestral de ${quarterlyPrice} MT!\n\n✨ Frase de Engajamento: "Qual é a tua maior meta esta semana? Respondo a todos os subscritores no chat direto!"`
      );
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-8">
      
      {/* Studio Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl bg-stone-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-pink-600 text-white text-xs font-black">
              FS
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
              FanScale Creator Studio 🇲🇿
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Painel de Monetização de {creator.name}
          </h1>
          <p className="text-xs text-stone-400">
            Gere as tuas subscrições, pagamentos M-Pesa, receitas de conteúdos pagos e cresce a tua comunidade.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowPayoutModal(true)}
            className="rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/30 hover:bg-emerald-700 transition-all flex items-center gap-1.5"
          >
            <Download className="h-4 w-4" />
            <span>Levantar Dinheiro</span>
          </button>

          <button
            onClick={onOpenCreateModal}
            className="rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-pink-500/30 hover:from-pink-700 hover:to-rose-600 transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Novo Conteúdo</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Saldo Disponível */}
        <div className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Saldo Disponível</span>
            <Wallet className="h-4 w-4 text-pink-600" />
          </div>
          <div className="font-display text-2xl font-black text-stone-900">
            {availableBalanceMT.toLocaleString('pt-MZ')} <span className="text-pink-600 text-sm">MT</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Pronto para levantamento M-Pesa
          </p>
        </div>

        {/* Ganhos Este Mês */}
        <div className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Ganhos Este Mês</span>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="font-display text-2xl font-black text-stone-900">
            {earningsThisMonthMT.toLocaleString('pt-MZ')} <span className="text-emerald-600 text-sm">MT</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5">
            <ArrowUpRight className="h-3 w-3" />
            +24.8% em relação ao mês anterior
          </p>
        </div>

        {/* Subscritores Ativos */}
        <div className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Subscritores Ativos</span>
            <Users className="h-4 w-4 text-pink-600" />
          </div>
          <div className="font-display text-2xl font-black text-stone-900">
            {subscribersCount.toLocaleString('pt-MZ')}
          </div>
          <p className="text-[11px] text-pink-600 font-semibold">
            +{newSubscribersThisMonth} novos subscritores este mês
          </p>
        </div>

        {/* Ganhos Totais Acumulados */}
        <div className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Ganhos Totais FanScale</span>
            <Coins className="h-4 w-4 text-amber-500" />
          </div>
          <div className="font-display text-2xl font-black text-stone-900">
            {totalEarningsMT.toLocaleString('pt-MZ')} <span className="text-stone-400 text-sm">MT</span>
          </div>
          <p className="text-[11px] text-stone-500 font-medium">
            Desde a adesão à plataforma
          </p>
        </div>

      </div>

      {/* Studio Nav Tabs */}
      <div className="flex items-center gap-2 border-b border-pink-100 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveStudioTab('overview')}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
            activeStudioTab === 'overview'
              ? 'bg-pink-600 text-white shadow-md shadow-pink-500/20'
              : 'text-stone-600 hover:bg-pink-50 hover:text-pink-700'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          <span>Gráficos de Receita</span>
        </button>

        <button
          onClick={() => setActiveStudioTab('pricing')}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
            activeStudioTab === 'pricing'
              ? 'bg-pink-600 text-white shadow-md shadow-pink-500/20'
              : 'text-stone-600 hover:bg-pink-50 hover:text-pink-700'
          }`}
        >
          <Settings className="h-4 w-4" />
          <span>Preços de Subscrição</span>
        </button>

        <button
          onClick={() => setActiveStudioTab('content')}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
            activeStudioTab === 'content'
              ? 'bg-pink-600 text-white shadow-md shadow-pink-500/20'
              : 'text-stone-600 hover:bg-pink-50 hover:text-pink-700'
          }`}
        >
          <Lock className="h-4 w-4" />
          <span>Gestão de Conteúdos</span>
        </button>

        <button
          onClick={() => setActiveStudioTab('ai_assistant')}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
            activeStudioTab === 'ai_assistant'
              ? 'bg-stone-900 text-white shadow-md'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <Bot className="h-4 w-4 text-pink-500" />
          <span>FanScale AI Assistant</span>
        </button>
      </div>

      {/* Tab: Overview / Revenue Analytics */}
      {activeStudioTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Revenue Chart (8 cols) */}
          <div className="lg:col-span-8 rounded-3xl border border-pink-100 bg-white p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-display text-base font-bold text-stone-900">
                  Evolução de Receitas Diárias (Meticais)
                </h3>
                <p className="text-xs text-stone-400">
                  Acompanha as entradas de subscrições, PPV e gorjetas
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 font-semibold text-pink-600">
                  <span className="h-2.5 w-2.5 rounded-full bg-pink-600" />
                  Receita Total
                </span>
              </div>
            </div>

            <div className="h-64 sm:h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CREATOR_ANALYTICS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EC4899" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#EC4899" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(val) => `${val} MT`} />
                  <Tooltip 
                    formatter={(val: any) => [`${(Number(val) || 0).toLocaleString('pt-MZ')} MT`, 'Receita']}
                    contentStyle={{ backgroundColor: '#1E293B', borderRadius: '1rem', border: 'none', color: '#fff', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="receita" stroke="#EC4899" strokeWidth={3} fillOpacity={1} fill="url(#colorReceita)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Distribution Breakdown (4 cols) */}
          <div className="lg:col-span-4 rounded-3xl border border-pink-100 bg-white p-6 shadow-sm space-y-5">
            <h3 className="font-display text-base font-bold text-stone-900">
              Fontes de Rendimento
            </h3>

            <div className="space-y-3.5 text-xs">
              
              {/* Subscrições Mensais */}
              <div className="space-y-1">
                <div className="flex justify-between font-bold text-stone-800">
                  <span>Subscrições Mensais VIP</span>
                  <span className="text-pink-600">65% (12.180 MT)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                  <div className="h-full bg-pink-600 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>

              {/* Conteúdos Pagos PPV */}
              <div className="space-y-1">
                <div className="flex justify-between font-bold text-stone-800">
                  <span>Conteúdos Pagos (PPV)</span>
                  <span className="text-rose-500">20% (3.750 MT)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: '20%' }} />
                </div>
              </div>

              {/* Gorjetas */}
              <div className="space-y-1">
                <div className="flex justify-between font-bold text-stone-800">
                  <span>Gorjetas Diretas de Fãs</span>
                  <span className="text-amber-500">10% (1.875 MT)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '10%' }} />
                </div>
              </div>

              {/* Mensagens Pagas */}
              <div className="space-y-1">
                <div className="flex justify-between font-bold text-stone-800">
                  <span>Mensagens Pagas no Chat</span>
                  <span className="text-emerald-500">5% (945 MT)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '5%' }} />
                </div>
              </div>

            </div>

            <div className="rounded-2xl bg-pink-50 p-4 border border-pink-100 text-xs text-pink-900 space-y-1">
              <span className="font-bold flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-pink-600" />
                Dica FanScale para Criadores
              </span>
              <p className="text-[11px] text-stone-600">
                Criadores que publicam pelo menos 3 conteúdos exclusivos por semana aumentam a renovação de subscrições em 42%!
              </p>
            </div>

          </div>

        </div>
      )}

      {/* Tab: Pricing Settings */}
      {activeStudioTab === 'pricing' && (
        <div className="max-w-2xl mx-auto rounded-3xl border border-pink-100 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h3 className="font-display text-lg font-bold text-stone-900">
              Definição de Preços de Subscrição
            </h3>
            <p className="text-xs text-stone-500">
              Define quanto os teus fãs em Moçambique pagam mensalmente e trimestralmente em Meticais (MT).
            </p>
          </div>

          <form onSubmit={handleSavePricing} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Monthly price */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Preço Mensal (MT / mês)
                </label>
                <div className="flex items-center rounded-2xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 focus-within:border-pink-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-pink-500/20">
                  <input
                    type="number"
                    min="50"
                    step="10"
                    value={monthlyPrice}
                    onChange={(e) => setMonthlyPrice(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-stone-900 focus:outline-none"
                  />
                  <span className="text-xs font-bold text-stone-500 ml-2">MT</span>
                </div>
                <p className="text-[10px] text-stone-400">Recomendado: 250 MT - 600 MT</p>
              </div>

              {/* Quarterly price */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Preço Trimestral (3 meses)
                </label>
                <div className="flex items-center rounded-2xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 focus-within:border-pink-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-pink-500/20">
                  <input
                    type="number"
                    min="150"
                    step="10"
                    value={quarterlyPrice}
                    onChange={(e) => setQuarterlyPrice(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-stone-900 focus:outline-none"
                  />
                  <span className="text-xs font-bold text-stone-500 ml-2">MT</span>
                </div>
                <p className="text-[10px] text-stone-400">Desconto incentivador para fãs fiéis</p>
              </div>

            </div>

            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-pink-500/20 hover:from-pink-700 hover:to-rose-600 transition-all flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Guardar Preços</span>
            </button>

            {savedPricingFeedback && (
              <p className="text-xs text-emerald-600 font-bold animate-fade-in">
                ✓ Preços atualizados com sucesso no teu perfil!
              </p>
            )}
          </form>
        </div>
      )}

      {/* Tab: AI Assistant */}
      {activeStudioTab === 'ai_assistant' && (
        <div className="max-w-3xl mx-auto rounded-3xl border border-stone-800 bg-stone-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-500 text-white shadow-md">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">
                FanScale AI Creator Assistant 🇲🇿
              </h3>
              <p className="text-xs text-stone-400">
                Gera ideias virais, sugestões de fotos e legendas otimizadas para a audiência moçambicana.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-stone-300">
              O que gostarias de criar ou planear hoje?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ex: Ideias de vídeo de humor sobre o calor de Maputo..."
                className="flex-1 rounded-2xl border border-stone-700 bg-stone-800 px-4 py-3 text-xs text-white placeholder:text-stone-500 focus:border-pink-500 focus:outline-none"
              />
              <button
                onClick={handleGenerateAiIdea}
                disabled={isGeneratingAi || !aiPrompt.trim()}
                className="rounded-2xl bg-gradient-to-r from-pink-600 to-rose-500 px-5 py-3 text-xs font-bold text-white hover:from-pink-700 hover:to-rose-600 transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" />
                <span>{isGeneratingAi ? 'A Gerar...' : 'Gerar Ideia'}</span>
              </button>
            </div>
          </div>

          {aiGeneratedResult && (
            <div className="rounded-2xl bg-stone-800/80 border border-stone-700 p-5 space-y-3">
              <div className="flex items-center justify-between text-xs text-pink-400 font-bold">
                <span>Resultado Sugerido:</span>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(aiGeneratedResult);
                  }}
                  className="hover:underline text-stone-300"
                >
                  Copiar Texto
                </button>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-xs text-stone-200 leading-relaxed">
                {aiGeneratedResult}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Tab: Content Manager */}
      {activeStudioTab === 'content' && (
        <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-stone-900">
              Todas as Tuas Publicações ({posts.length})
            </h3>
            <button
              onClick={onOpenCreateModal}
              className="rounded-full bg-pink-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-pink-700"
            >
              + Adicionar
            </button>
          </div>

          <div className="divide-y divide-stone-100">
            {posts.map((post) => (
              <div key={post.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={post.mediaUrls[0]}
                    alt={post.caption}
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-900 line-clamp-1">
                        {post.caption}
                      </span>
                      {post.visibility === 'subscriber' && (
                        <span className="rounded-full bg-pink-50 px-2 py-0.5 text-[9px] font-bold text-pink-700 border border-pink-200">
                          🔒 Subscritores
                        </span>
                      )}
                      {post.visibility === 'ppv' && (
                        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-bold text-amber-800 border border-amber-200">
                          💰 PPV {post.priceMT} MT
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-stone-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3 text-pink-600" />
                        {post.likesCount} gostos
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {post.commentsCount} comentários
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {post.viewsCount} visualizações
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-stone-900 block">
                    {post.tipsTotalMT} MT
                  </span>
                  <span className="text-[10px] text-stone-400">em gorjetas</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payout Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div 
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-pink-100 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-display text-base font-bold text-stone-900">
                Pedir Levantamento de Saldo 🇲🇿
              </h3>
              <button
                onClick={() => setShowPayoutModal(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePayoutSubmit} className="space-y-4">
              <div className="rounded-2xl bg-pink-50 p-3.5 text-xs text-pink-900">
                <span className="font-bold block">Saldo Disponível: {availableBalanceMT.toLocaleString('pt-MZ')} MT</span>
                <span className="text-[11px] text-stone-600">Sem taxas de levantamento para M-Pesa e e-Mola. Transferência processada em até 2 horas.</span>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Valor a Levantar (MT)
                </label>
                <input
                  type="number"
                  min="500"
                  max={availableBalanceMT}
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 p-3 text-xs font-bold text-stone-900 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Método de Recebimento
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setPayoutMethod('mpesa')}
                    className={`p-2.5 rounded-xl border text-center ${
                      payoutMethod === 'mpesa' ? 'border-pink-600 bg-pink-50 text-pink-700' : 'border-stone-200'
                    }`}
                  >
                    M-Pesa 🇲🇿
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayoutMethod('emola')}
                    className={`p-2.5 rounded-xl border text-center ${
                      payoutMethod === 'emola' ? 'border-pink-600 bg-pink-50 text-pink-700' : 'border-stone-200'
                    }`}
                  >
                    e-Mola 🇲🇿
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayoutMethod('bank')}
                    className={`p-2.5 rounded-xl border text-center ${
                      payoutMethod === 'bank' ? 'border-pink-600 bg-pink-50 text-pink-700' : 'border-stone-200'
                    }`}
                  >
                    Banco BCI / BIM
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  {payoutMethod === 'bank' ? 'IBAN ou NIB Moçambicano' : 'Número de Telemóvel (+258)'}
                </label>
                <input
                  type="text"
                  value={payoutPhone}
                  onChange={(e) => setPayoutPhone(e.target.value)}
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 p-3 text-xs text-stone-900 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-emerald-600 py-3 text-xs font-bold text-white shadow-md shadow-emerald-600/30 hover:bg-emerald-700 transition-all"
              >
                Confirmar Pedido de Levantamento ({payoutAmount} MT)
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
