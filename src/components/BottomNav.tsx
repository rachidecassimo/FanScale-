import React from 'react';
import { Home, Compass, PlusCircle, MessageCircle, User } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenCreateModal: () => void;
  unreadMessagesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  onOpenCreateModal,
  unreadMessagesCount,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-pink-100 bg-white/95 backdrop-blur-md px-2 lg:hidden">
      
      {/* Início */}
      <button
        id="mobile-nav-feed"
        onClick={() => onTabChange('feed')}
        className={`flex flex-col items-center justify-center gap-1 py-1 px-3 transition-colors ${
          currentTab === 'feed' ? 'text-pink-600 font-bold' : 'text-stone-500 hover:text-stone-800'
        }`}
      >
        <Home className={`h-5 w-5 ${currentTab === 'feed' ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[10px]">Início</span>
      </button>

      {/* Explorar */}
      <button
        id="mobile-nav-explore"
        onClick={() => onTabChange('explore')}
        className={`flex flex-col items-center justify-center gap-1 py-1 px-3 transition-colors ${
          currentTab === 'explore' ? 'text-pink-600 font-bold' : 'text-stone-500 hover:text-stone-800'
        }`}
      >
        <Compass className={`h-5 w-5 ${currentTab === 'explore' ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[10px]">Explorar</span>
      </button>

      {/* + Criar (Center Pink Glow Button) */}
      <button
        id="mobile-nav-create"
        onClick={onOpenCreateModal}
        className="group relative -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-pink-600 to-rose-500 text-white shadow-lg shadow-pink-500/40 transition-transform active:scale-95"
      >
        <PlusCircle className="h-6 w-6 stroke-[2.5]" />
      </button>

      {/* Mensagens */}
      <button
        id="mobile-nav-messages"
        onClick={() => onTabChange('messages')}
        className={`relative flex flex-col items-center justify-center gap-1 py-1 px-3 transition-colors ${
          currentTab === 'messages' ? 'text-pink-600 font-bold' : 'text-stone-500 hover:text-stone-800'
        }`}
      >
        <MessageCircle className={`h-5 w-5 ${currentTab === 'messages' ? 'stroke-[2.5]' : 'stroke-2'}`} />
        {unreadMessagesCount > 0 && (
          <span className="absolute right-3 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[9px] font-bold text-white">
            {unreadMessagesCount}
          </span>
        )}
        <span className="text-[10px]">Mensagens</span>
      </button>

      {/* Perfil */}
      <button
        id="mobile-nav-profile"
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center justify-center gap-1 py-1 px-3 transition-colors ${
          currentTab === 'profile' ? 'text-pink-600 font-bold' : 'text-stone-500 hover:text-stone-800'
        }`}
      >
        <User className={`h-5 w-5 ${currentTab === 'profile' ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[10px]">Perfil</span>
      </button>
    </nav>
  );
};
