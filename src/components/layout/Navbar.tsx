import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutGrid, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../lib/auth';
import Logo from '../common/Logo';

const navItems = [
  { name: '首页', path: '/' },
  { name: '模型', path: '/models' },
  { name: '服务', path: '/services' },
  { name: '文档', path: '/docs' },
  { name: '问答', path: '/faq' },
  { name: '联系', path: '/contact' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, showAuthModal, setIntendedPath } = useAuth();

  const handleDashboardClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setIntendedPath('/dashboard');
      showAuthModal();
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-brand-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 group">
          <Logo className="h-10 w-10 group-hover:scale-110 transition-transform" />
          <span className="text-xl font-black tracking-tighter text-white group-hover:text-brand-gold transition-colors">
            LLMGATE.CO
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-base font-bold uppercase tracking-widest transition-all h-20 flex items-center border-b-2",
                location.pathname === item.path
                  ? "border-brand-gold text-brand-gold"
                  : "border-transparent text-zinc-500 hover:text-white"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          {user && (
            <div className="hidden lg:block text-right">
              <p className="text-xs text-zinc-500 font-black uppercase tracking-widest leading-none mb-1">点数余额</p>
              <p className="text-base font-black text-brand-gold">1,240 <span className="text-xs opacity-60 ml-0.5 font-bold">PTS</span></p>
            </div>
          )}
          <Link
            to="/dashboard"
            onClick={handleDashboardClick}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-all border",
              location.pathname.startsWith('/dashboard')
                ? "bg-brand-gold text-black border-transparent shadow-[0_0_15px_rgba(234,179,8,0.4)]"
                : "bg-white/5 border-white/10 text-brand-gold hover:bg-brand-gold hover:text-black"
            )}
           >
            <User className="h-5 w-5" />
          </Link>
          <button className="md:hidden p-2 text-zinc-400">
            <LayoutGrid className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
