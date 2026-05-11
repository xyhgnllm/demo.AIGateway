import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth';
import Logo from '../common/Logo';

export default function Footer() {
  const { user, showAuthModal, setIntendedPath } = useAuth();
  const navigate = useNavigate();

  const handleDashboardLink = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setIntendedPath('/dashboard');
      showAuthModal();
    }
  };

  return (
    <footer className="w-full border-t border-white/5 bg-brand-bg py-20 overflow-hidden relative">
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-[100px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Logo className="h-8 w-8" />
              <h3 className="text-2xl font-black tracking-tighter text-white">LLMGATE.CO</h3>
            </div>
            <p className="text-zinc-500 max-w-md leading-relaxed text-sm">
              为全球开发者与企业提供稳定、极速、安全的 AI 基础设施服务。
              聚合顶级大模型 API，提供透明、实时、高效的分布式中转分发能力。
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-gold mb-8">服务支持</h4>
            <ul className="space-y-4">
              <li><Link to="/models" className="text-zinc-500 hover:text-white transition-colors text-sm">可用模型</Link></li>
              <li><Link to="/docs" className="text-zinc-500 hover:text-white transition-colors text-sm">API 文档</Link></li>
              <li><Link to="/faq" className="text-zinc-500 hover:text-white transition-colors text-sm">常见问题</Link></li>
              <li><Link to="/dashboard" onClick={handleDashboardLink} className="text-zinc-500 hover:text-white transition-colors text-sm">控制中心</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-gold mb-8">联系我们</h4>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-xl border border-white/10 hover:border-brand-gold/50 hover:bg-brand-gold/5 transition-all text-zinc-400 hover:text-brand-gold"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-xl border border-white/10 hover:border-brand-gold/50 hover:bg-brand-gold/5 transition-all text-zinc-400 hover:text-brand-gold"><Github className="h-5 w-5" /></a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-xl border border-white/10 hover:border-brand-gold/50 hover:bg-brand-gold/5 transition-all text-zinc-400 hover:text-brand-gold"><Mail className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">
            © 2026 LLMGATE.CO. All rights reserved. Professional AI Middleware.
          </p>
          <div className="flex gap-8 text-xs font-bold text-zinc-600 uppercase tracking-widest">
            <a href="#" className="hover:text-brand-gold transition-colors">隐私政策</a>
            <a href="#" className="hover:text-brand-gold transition-colors">服务条款</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
