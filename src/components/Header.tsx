import React from 'react';
import { 
  Flame, 
  Search, 
  PlusCircle, 
  MessageCircle, 
  Bell, 
  Wallet, 
  Sparkles, 
  Compass, 
  Home, 
  LayoutDashboard, 
  ShieldCheck, 
  Globe, 
  ChevronDown
} from 'lucide-react';
import { UserRole } from '../types';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  isLandingPage: boolean;
  onToggleLandingPage: (show: boolean) => void;
  walletBalanceMT: number;
  unreadNotificationsCount: number;
  unreadMessagesCount: number;
  onOpenCreateModal: () => void;
  onOpenWallet: () => void;
  onOpenKycModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  userRole,
  onRoleChange,
  isLandingPage,
  onToggleLandingPage,
  walletBalanceMT,
  unreadNotificationsCount,
  unreadMessagesCount,
  onOpenCreateModal,
  onOpenWallet,
  onOpenKycModal,
  searchQuery,
  onSearchChange,
}) => {
  const [showRoleMenu, setShowRoleMenu] = React.useState(false);
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-pink-100 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Brand Logo & Mode Badge */}
        <div className="flex items-center gap-3 sm:gap-6">
          <button 
            id="brand-logo-btn"
            onClick={() => {
              onToggleLandingPage(false);
              onTabChange('feed');
            }}
            className="group flex items-center gap-2 text-left focus:outline-none"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-pink-600 via-rose-500 to-pink-400 text-white shadow-md shadow-pink-500/25 transition-transform group-hover:scale-105">
              <Flame className="h-6 w-6 fill-white stroke-none" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-xl font-bold tracking-tight text-stone-900 group-hover:text-pink-600 transition-colors">
                  Fan<span className="text-pink-600">Scale</span>
                </span>
                <span className="rounded-full bg-pink-100 px-1.5 py-0.5 text-[10px] font-bold text-pink-700">
                  MZ 🇲🇿
                </span>
              </div>
              <p className="hidden text-[10px] font-medium text-stone-400 sm:block">
                Criadores & Conteúdo
              </p>
            </div>
          </button>

          {/* Role Switcher Pill */}
          <div className="relative">
            <button
              id="role-switcher-btn"
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="hidden lg:flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50/70 px-3 py-1.5 text-xs font-semibold text-pink-900 hover:bg-pink-100/80 transition-colors"
            >
              <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
              {isLandingPage ? (
                <span>🌐 Página Inicial</span>
              ) : userRole === 'fan' ? (
                <span>📱 Modo Fã</span>
              ) : userRole === 'creator' ? (
                <span>🎨 Creator Studio</span>
              ) : (
                <span>🛡️ Admin FanScale</span>
              )}
              <ChevronDown className="h-3.5 w-3.5 text-pink-600" />
            </button>

            {showRoleMenu && (
              <div 
                id="role-dropdown-menu"
                className="absolute left-0 mt-2 w-56 rounded-2xl border border-pink-100 bg-white p-2 shadow-xl shadow-pink-500/10 ring-1 ring-black/5 z-50"
              >
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                  Mudar Visualização
                </div>

                <button
                  onClick={() => {
                    onToggleLandingPage(true);
                    setShowRoleMenu(false);
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                    isLandingPage ? 'bg-pink-50 text-pink-700 font-semibold' : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Globe className="h-4 w-4 text-pink-600" />
                  <span>Landing Page Comercial</span>
                </button>

                <button
                  onClick={() => {
                    onToggleLandingPage(false);
                    onRoleChange('fan');
                    setShowRoleMenu(false);
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                    !isLandingPage && userRole === 'fan' ? 'bg-pink-50 text-pink-700 font-semibold' : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Sparkles className="h-4 w-4 text-pink-600" />
                  <span>Modo Fã (Feed & Subscrições)</span>
                </button>

                <button
                  onClick={() => {
                    onToggleLandingPage(false);
                    onRoleChange('creator');
                    setShowRoleMenu(false);
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                    !isLandingPage && userRole === 'creator' ? 'bg-pink-50 text-pink-700 font-semibold' : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4 text-pink-600" />
                  <span>Creator Studio (Monetização MT)</span>
                </button>

                <button
                  onClick={() => {
                    onToggleLandingPage(false);
                    onRoleChange('admin');
                    setShowRoleMenu(false);
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                    !isLandingPage && userRole === 'admin' ? 'bg-pink-50 text-pink-700 font-semibold' : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <ShieldCheck className="h-4 w-4 text-pink-600" />
                  <span>Painel Administrativo</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Center: Search Bar */}
        {!isLandingPage && (
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${
                isSearchFocused ? 'text-pink-600' : 'text-stone-400'
              }`} />
              <input
                id="header-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Pesquisar criadores moçambicanos, tags, marrabenta..."
                className="w-full rounded-full border border-stone-200 bg-stone-50/80 py-2 pl-10 pr-4 text-xs text-stone-900 placeholder:text-stone-400 focus:border-pink-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* Right: Actions & Navigation Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {isLandingPage ? (
            <div className="flex items-center gap-2">
              <button
                id="landing-explore-btn"
                onClick={() => {
                  onToggleLandingPage(false);
                  onTabChange('explore');
                }}
                className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors"
              >
                Explorar Criadores
              </button>
              <button
                id="landing-enter-app-btn"
                onClick={() => {
                  onToggleLandingPage(false);
                  onTabChange('feed');
                }}
                className="rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-pink-500/20 hover:from-pink-700 hover:to-rose-600 transition-all hover:scale-[1.02]"
              >
                Entrar na App
              </button>
            </div>
          ) : (
            <>
              {/* Desktop Nav Icons */}
              <nav className="hidden lg:flex items-center gap-1">
                <button
                  id="nav-feed-btn"
                  onClick={() => onTabChange('feed')}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    currentTab === 'feed'
                      ? 'bg-pink-100 text-pink-700'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  <Home className="h-4 w-4" />
                  <span>Início</span>
                </button>

                <button
                  id="nav-explore-btn"
                  onClick={() => onTabChange('explore')}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    currentTab === 'explore'
                      ? 'bg-pink-100 text-pink-700'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  <Compass className="h-4 w-4" />
                  <span>Explorar</span>
                </button>
              </nav>

              {/* + Criar Button */}
              <button
                id="header-create-post-btn"
                onClick={onOpenCreateModal}
                className="flex items-center gap-1.5 rounded-full bg-pink-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm shadow-pink-500/30 hover:bg-pink-600 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <PlusCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Criar</span>
              </button>

              {/* Messages with Badge */}
              <button
                id="header-messages-btn"
                onClick={() => onTabChange('messages')}
                className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                  currentTab === 'messages'
                    ? 'bg-pink-100 text-pink-700'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
                title="Mensagens"
              >
                <MessageCircle className="h-4 w-4" />
                {unreadMessagesCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[10px] font-bold text-white">
                    {unreadMessagesCount}
                  </span>
                )}
              </button>

              {/* Notifications with Badge */}
              <button
                id="header-notifications-btn"
                onClick={() => onTabChange('notifications')}
                className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                  currentTab === 'notifications'
                    ? 'bg-pink-100 text-pink-700'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
                title="Notificações"
              >
                <Bell className="h-4 w-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[10px] font-bold text-white">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Wallet Button with Balance in Meticais */}
              <button
                id="header-wallet-btn"
                onClick={onOpenWallet}
                className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-bold text-stone-800 hover:border-pink-300 hover:bg-pink-50/50 hover:text-pink-700 transition-colors"
                title="Carteira Digital FanScale"
              >
                <Wallet className="h-4 w-4 text-pink-600" />
                <span>{walletBalanceMT.toLocaleString('pt-MZ')} MT</span>
              </button>

              {/* "Tornar-me Criador" or Creator Studio Button */}
              {userRole === 'fan' ? (
                <button
                  id="become-creator-cta-btn"
                  onClick={onOpenKycModal}
                  className="hidden sm:flex items-center gap-1.5 rounded-full border border-pink-500 bg-white px-3.5 py-1.5 text-xs font-bold text-pink-600 hover:bg-pink-500 hover:text-white transition-all shadow-sm"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Tornar-me Criador</span>
                </button>
              ) : (
                <button
                  id="creator-studio-shortcut-btn"
                  onClick={() => onTabChange('creator_studio')}
                  className={`hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                    currentTab === 'creator_studio'
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <LayoutDashboard className="h-3.5 w-3.5 text-pink-500" />
                  <span>Studio</span>
                </button>
              )}

              {/* User Avatar with Profile Link */}
              <button
                id="header-profile-btn"
                onClick={() => onTabChange('profile')}
                className="group relative flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-pink-500/20 hover:ring-pink-500 transition-all overflow-hidden"
                title="Meu Perfil"
              >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                  alt="Meu Perfil"
                  className="h-full w-full object-cover"
                />
              </button>
            </>
          )}

        </div>
      </div>
    </header>
  );
};
