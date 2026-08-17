import React from 'react';
import { 
  Sparkles, 
  Wallet, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Lock, 
  Smartphone,
  Coins
} from 'lucide-react';

interface LandingViewProps {
  onStartExploring: () => void;
  onBecomeCreator: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onStartExploring,
  onBecomeCreator,
}) => {
  return (
    <div className="space-y-16 py-8">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-white p-8 sm:p-16 max-w-6xl mx-auto shadow-2xl border border-pink-900/30">
        <div className="relative z-10 max-w-2xl space-y-6">
          
          <div className="inline-flex items-center gap-2 rounded-full bg-pink-500/10 border border-pink-500/30 px-3.5 py-1 text-xs font-bold text-pink-400 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-pink-500 animate-ping" />
            <span>A 1ª Plataforma de Subscrição de Moçambique 🇲🇿</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Monetiza a tua criatividade com{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-pink-300">
              M-Pesa e e-Mola
            </span>
          </h1>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            O FanScale conecta os melhores criadores de conteúdo de Moçambique aos seus fãs mais apaixonados. Publica fotos, vídeos e bastidores exclusivos e recebe diretamente no teu telemóvel.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onBecomeCreator}
              className="rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 px-7 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-xl shadow-pink-500/30 hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Começar a Ganhar como Criador</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={onStartExploring}
              className="rounded-full bg-white/10 border border-white/20 px-6 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/20 transition-all"
            >
              Explorar Criadores VIP
            </button>
          </div>

          <div className="flex items-center gap-6 pt-4 text-xs text-stone-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>Sem cartão bancário obrigatório</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>Levantamento instantâneo M-Pesa</span>
            </div>
          </div>

        </div>

        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-pink-600/30 blur-3xl pointer-events-none" />
      </section>

      {/* 3 Pillars / Feature Highlights */}
      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="rounded-3xl border border-pink-100 bg-white p-6 sm:p-8 space-y-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
            <Smartphone className="h-6 w-6" />
          </div>
          <h3 className="font-display text-base font-bold text-stone-900">
            Pagamentos Nativos de Moçambique
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Aceita subscrições e gorjetas via <strong>Vodacom M-Pesa</strong>, <strong>Movitel e-Mola</strong>, <strong>Tmcel mKesh</strong> e cartões SIMO sem barreiras.
          </p>
        </div>

        <div className="rounded-3xl border border-pink-100 bg-white p-6 sm:p-8 space-y-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
            <Lock className="h-6 w-6" />
          </div>
          <h3 className="font-display text-base font-bold text-stone-900">
            Controlo Total do Teu Conteúdo
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Escolhe o que é público, exclusivo para subscritores mensais ou desbloqueável individualmente através de pagamento por visualização (PPV).
          </p>
        </div>

        <div className="rounded-3xl border border-pink-100 bg-white p-6 sm:p-8 space-y-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
            <TrendingUp className="h-6 w-6" />
          </div>
          <h3 className="font-display text-base font-bold text-stone-900">
            Comissões Transparentes (85%)
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Fica com 85% de todos os teus ganhos na plataforma. O FanScale apenas retém 15% para cobrir custos de infraestrutura e processamento de pagamentos móveis.
          </p>
        </div>

      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">Perguntas Frequentes</span>
          <h2 className="font-display text-2xl font-bold text-stone-900">
            Tudo o que precisas saber sobre o FanScale
          </h2>
        </div>

        <div className="rounded-3xl border border-pink-100 bg-white divide-y divide-stone-100 shadow-sm overflow-hidden text-xs">
          
          <div className="p-5 space-y-1">
            <h4 className="font-bold text-stone-900">
              Como é que os criadores recebem o dinheiro das subscrições?
            </h4>
            <p className="text-stone-600 leading-relaxed">
              O dinheiro cai na tua carteira digital FanScale em Meticais (MT). Podes pedir levantamento a qualquer momento diretamente para o teu número M-Pesa, e-Mola ou conta bancária BCI / BIM / Standard Bank.
            </p>
          </div>

          <div className="p-5 space-y-1">
            <h4 className="font-bold text-stone-900">
              Preciso de ter conta bancária para usar o FanScale?
            </h4>
            <p className="text-stone-600 leading-relaxed">
              Não! O FanScale foi desenhado especialmente para Moçambique. Tanto fãs como criadores podem operar 100% via M-Pesa ou e-Mola.
            </p>
          </div>

          <div className="p-5 space-y-1">
            <h4 className="font-bold text-stone-900">
              Como funciona a moderação e segurança?
            </h4>
            <p className="text-stone-600 leading-relaxed">
              Todos os criadores que monetizam passam por verificação de identidade (KYC com B.I. ou Passaporte). Não permitimos conteúdos que violem as leis moçambicanas nem menores de 18 anos na criação de conteúdo pago.
            </p>
          </div>

        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 p-8 sm:p-12 text-white text-center space-y-4 shadow-xl">
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold">
            Pronto para transformar a tua audiência em rendimento real?
          </h3>
          <p className="text-xs sm:text-sm text-pink-100 max-w-xl mx-auto">
            Cria a tua conta hoje, define o teu preço de subscrição e começa a receber pagamentos dos teus fãs em Moçambique.
          </p>
          <button
            onClick={onBecomeCreator}
            className="rounded-full bg-white px-8 py-3 text-xs sm:text-sm font-extrabold text-pink-600 hover:bg-stone-50 shadow-lg hover:scale-105 transition-all"
          >
            Tornar-se Criador FanScale Agora
          </button>
        </div>
      </section>

    </div>
  );
};
