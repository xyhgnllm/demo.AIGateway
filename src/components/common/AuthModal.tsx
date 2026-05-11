import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, intendedPath, setIntendedPath } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const success = login(email, password);
    if (success) {
      closeAuthModal();
      if (intendedPath) {
        navigate(intendedPath);
        setIntendedPath(null);
      } else {
        navigate('/dashboard');
      }
    } else {
      setError('邮箱或密码错误 (Email or Password incorrect)');
    }
    setIsLoading(false);
  };

  if (!isAuthModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-brand-bg/80 backdrop-blur-md"
          onClick={closeAuthModal}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md overflow-hidden rounded-[40px] bg-zinc-900 shadow-[0_32px_80px_rgba(0,0,0,0.5)] border border-white/10 p-10"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                {mode === 'login' ? '登 录 Login' : '注 册 Sign Up'}
              </h2>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">
                {mode === 'login' ? '欢迎回来 Welcome back' : '加入我们 Join the gateway'}
              </p>
            </div>
            <button onClick={closeAuthModal} className="h-10 w-10 flex items-center justify-center hover:bg-white/5 rounded-2xl transition-all">
              <X className="h-6 w-6 text-zinc-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest ml-1">电子邮件 Email</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl pl-14 pr-6 text-sm text-white focus:outline-none focus:border-brand-gold/30 transition-all font-bold"
                  placeholder="xyhgnllm@gmail.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest ml-1">访问密码 Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl pl-14 pr-6 text-sm text-white focus:outline-none focus:border-brand-gold/30 transition-all font-bold"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex justify-between pt-1">
                <p className="text-[9px] text-zinc-700 uppercase font-black tracking-widest">Mock: Aa.123456</p>
                <button type="button" className="text-[9px] text-brand-gold uppercase font-black tracking-widest hover:underline">Forgot?</button>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-widest">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-5 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                <>
                  {mode === 'login' ? '继续 Continue' : '创建账户 Create Account'} <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="mt-8 w-full text-center text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] hover:text-white transition-colors"
          >
            {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
