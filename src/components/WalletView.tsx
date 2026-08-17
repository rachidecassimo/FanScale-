import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  PlusCircle, 
  Download, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  Smartphone, 
  Filter,
  Sparkles
} from 'lucide-react';
import { WalletTransaction, PaymentProvider, UserRole } from '../types';

interface WalletViewProps {
  userRole: UserRole;
  walletBalanceMT: number;
  transactions: WalletTransaction[];
  onDeposit: (amountMT: number, provider: PaymentProvider, phone: string) => void;
  onRequestPayout: (amountMT: number, method: string, phoneOrIban: string) => void;
}

export const WalletView: React.FC<WalletViewProps> = ({
  userRole,
  walletBalanceMT = 0,
  transactions = [],
  onDeposit,
  onRequestPayout,
}) => {
  const [activeWalletMode, setActiveWalletMode] = useState<'fan' | 'creator'>(userRole === 'creator' ? 'creator' : 'fan');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('1000');
  const [depositProvider, setDepositProvider] = useState<PaymentProvider>('mpesa');
  const [depositPhone, setDepositPhone] = useState('841234567');
  const [filterType, setFilterType] = useState<string>('all');

  const creatorAvailableBalance = 35400;

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(depositAmount) || 0;
    if (amt <= 0) return;
    onDeposit(amt, depositProvider, depositPhone);
    setShowDepositModal(false);
  };

  const filteredTransactions = (transactions || []).filter((tx) => {
    if (filterType === 'all') return true;
    if (filterType === 'credit') return tx.isCredit;
    if (filterType === 'debit') return !tx.isCredit;
    if (filterType === 'subscription') return tx.type === 'subscription';
    if (filterType === 'tip') return tx.type === 'tip';
    return true;
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 space-y-8">
      
      {/* Wallet Switcher & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
              <Wallet className="h-5 w-5" />
            </div>
            <h1 className="font-display text-2xl font-bold text-stone-900">
              Carteira Digital FanScale 🇲🇿
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Gere os teus pagamentos, carregamentos M-Pesa e receitas de subscrições em Meticais (MT).
          </p>
        </div>

        {/* Fan / Creator Wallet Tabs */}
        <div className="flex items-center rounded-full bg-stone-100 p-1 border border-stone-200">
          <button
            onClick={() => setActiveWalletMode('fan')}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
              activeWalletMode === 'fan'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Carteira de Fã
          </button>
          <button
            onClick={() => setActiveWalletMode('creator')}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
              activeWalletMode === 'creator'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Carteira de Criador
          </button>
        </div>
      </div>

      {/* Main Balance Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-stone-900 via-stone-800 to-stone-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-pink-500/20 px-2.5 py-0.5 text-[11px] font-bold text-pink-400 border border-pink-500/30">
                {activeWalletMode === 'fan' ? 'Saldo para Subscrições & PPV' : 'Saldo Disponível para Levantamento'}
              </span>
            </div>

            <div>
              <span className="text-xs text-stone-400">Saldo Atual</span>
              <div className="font-display text-3xl sm:text-4xl font-black text-white">
                {activeWalletMode === 'fan'
                  ? (walletBalanceMT ?? 0).toLocaleString('pt-MZ')
                  : (creatorAvailableBalance ?? 0).toLocaleString('pt-MZ')}{' '}
                <span className="text-pink-500 text-xl font-bold">MT</span>
              </div>
            </div>

            <p className="text-xs text-stone-400">
              {activeWalletMode === 'fan'
                ? 'Utilizável instantaneamente em gorjetas, PPVs e subscrições mensais.'
                : 'Podes transferir para o teu M-Pesa, e-Mola ou conta bancária em Moçambique.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {activeWalletMode === 'fan' ? (
              <>
                <button
                  onClick={() => setShowDepositModal(true)}
                  className="rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-pink-500/30 hover:from-pink-700 hover:to-rose-600 transition-all flex items-center gap-2"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Adicionar Fundos (M-Pesa)</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowWithdrawModal(true)}
                  className="rounded-full bg-emerald-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 transition-all flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Levantar para M-Pesa</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-pink-600/20 blur-2xl pointer-events-none" />
      </div>

      {/* Payment Methods Supported Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-pink-100 bg-white p-4 text-center space-y-1 shadow-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white font-black text-xs mx-auto">
            M
          </div>
          <span className="font-bold text-xs text-stone-900 block">Vodacom M-Pesa</span>
          <span className="text-[10px] text-stone-400">Depósito & Saque Instantâneo</span>
        </div>

        <div className="rounded-2xl border border-pink-100 bg-white p-4 text-center space-y-1 shadow-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white font-black text-xs mx-auto">
            eM
          </div>
          <span className="font-bold text-xs text-stone-900 block">Movitel e-Mola</span>
          <span className="text-[10px] text-stone-400">Suporte a todas as províncias</span>
        </div>

        <div className="rounded-2xl border border-pink-100 bg-white p-4 text-center space-y-1 shadow-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-black text-xs mx-auto">
            mK
          </div>
          <span className="font-bold text-xs text-stone-900 block">Tmcel mKesh</span>
          <span className="text-[10px] text-stone-400">Pagamentos móveis seguros</span>
        </div>

        <div className="rounded-2xl border border-pink-100 bg-white p-4 text-center space-y-1 shadow-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-900 text-white font-bold text-xs mx-auto">
            <CreditCard className="h-4 w-4" />
          </div>
          <span className="font-bold text-xs text-stone-900 block">Cartões Bancários</span>
          <span className="text-[10px] text-stone-400">Visa, Mastercard, SIMO MZ</span>
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-base font-bold text-stone-900">
              Histórico de Movimentações (Meticais)
            </h2>
            <p className="text-xs text-stone-400">
              Todas as transações e recibos registados na plataforma FanScale
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`rounded-full px-3 py-1 font-bold ${
                filterType === 'all' ? 'bg-pink-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilterType('credit')}
              className={`rounded-full px-3 py-1 font-bold ${
                filterType === 'credit' ? 'bg-pink-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Entradas (+)
            </button>
            <button
              onClick={() => setFilterType('debit')}
              className={`rounded-full px-3 py-1 font-bold ${
                filterType === 'debit' ? 'bg-pink-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Saídas (-)
            </button>
          </div>
        </div>

        {/* Transaction Table / List */}
        <div className="divide-y divide-stone-100">
          {filteredTransactions.map((tx) => (
            <div key={tx.id} className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                    tx.isCredit
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-stone-100 text-stone-700'
                  }`}
                >
                  {tx.isCredit ? (
                    <ArrowDownLeft className="h-5 w-5" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5" />
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    {tx.title}
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    {tx.description} · Ref: {tx.referenceNumber}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`font-display text-sm font-bold block ${
                    tx.isCredit ? 'text-emerald-600' : 'text-stone-900'
                  }`}
                >
                  {tx.isCredit ? '+' : '-'}
                  {(tx.amountMT ?? 0).toLocaleString('pt-MZ')} MT
                </span>
                <span className="text-[10px] text-stone-400">
                  {tx.date}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Deposit Modal (Adicionar Fundos) */}
      {showDepositModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div 
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-pink-100 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-display text-base font-bold text-stone-900">
                Recarregar Carteira FanScale 🇲🇿
              </h3>
              <button
                onClick={() => setShowDepositModal(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleDepositSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Valor a Recarregar (MT)
                </label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {['500', '1000', '2500'].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setDepositAmount(amt)}
                      className={`p-2 rounded-xl border text-xs font-bold ${
                        depositAmount === amt ? 'bg-pink-600 text-white' : 'bg-stone-50 text-stone-700'
                      }`}
                    >
                      {amt} MT
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="50"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 p-3 text-xs font-bold text-stone-900 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Método de Recarga Móvel
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setDepositProvider('mpesa')}
                    className={`p-2.5 rounded-xl border text-center ${
                      depositProvider === 'mpesa' ? 'border-pink-600 bg-pink-50 text-pink-700' : 'border-stone-200'
                    }`}
                  >
                    M-Pesa 🇲🇿
                  </button>
                  <button
                    type="button"
                    onClick={() => setDepositProvider('emola')}
                    className={`p-2.5 rounded-xl border text-center ${
                      depositProvider === 'emola' ? 'border-pink-600 bg-pink-50 text-pink-700' : 'border-stone-200'
                    }`}
                  >
                    e-Mola 🇲🇿
                  </button>
                  <button
                    type="button"
                    onClick={() => setDepositProvider('mkesh')}
                    className={`p-2.5 rounded-xl border text-center ${
                      depositProvider === 'mkesh' ? 'border-pink-600 bg-pink-50 text-pink-700' : 'border-stone-200'
                    }`}
                  >
                    mKesh 🇲🇿
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Número de Telemóvel (+258)
                </label>
                <input
                  type="text"
                  value={depositPhone}
                  onChange={(e) => setDepositPhone(e.target.value)}
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 p-3 text-xs text-stone-900 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-pink-600 to-rose-500 py-3 text-xs font-bold text-white shadow-md shadow-pink-500/30 hover:from-pink-700 hover:to-rose-600 transition-all"
              >
                Continuar para Confirmação no Telemóvel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Withdraw Modal for Creator */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div 
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-pink-100 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-display text-base font-bold text-stone-900">
                Levantar Rendimento de Criador 🇲🇿
              </h3>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-stone-700">
              <p>
                O teu saldo de criador de <strong>{creatorAvailableBalance.toLocaleString('pt-MZ')} MT</strong> será transferido diretamente para o teu M-Pesa ou conta bancária em Moçambique.
              </p>
              <button
                onClick={() => {
                  onRequestPayout(15000, 'mpesa', '849998888');
                  setShowWithdrawModal(false);
                }}
                className="w-full rounded-full bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-700 transition-colors"
              >
                Confirmar Levantamento de 15.000 MT via M-Pesa
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
