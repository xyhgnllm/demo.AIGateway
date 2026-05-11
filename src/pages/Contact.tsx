import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  MessageSquare, 
  Send, 
  ChevronRight, 
  X,
  Phone,
  MessageCircle,
  Link as LinkIcon,
  Globe,
  Upload,
  User,
  MoreVertical,
  Minus
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Gmail 邮箱',
      value: 'support@llmgate.co',
      desc: '专业技术支持与商务洽谈',
      link: 'mailto:support@llmgate.co',
      color: 'bg-red-500/10 text-red-500'
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: 'Telegram',
      value: '@LLMGATE_OFFICIAL',
      desc: '24/7 在线社群与实时通知',
      link: 'https://t.me/llmgate',
      color: 'bg-blue-500/10 text-blue-500'
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: '微信客服',
      value: 'LLMGate_Support',
      desc: '扫码添加专属大客户经理',
      link: '#',
      color: 'bg-emerald-500/10 text-emerald-500'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: '在线支持',
      value: 'Live Chat',
      desc: '点击右下角图标立即发起对话',
      link: 'javascript:void(0)',
      action: () => {
        window.dispatchEvent(new CustomEvent('open-chat'));
      },
      color: 'bg-brand-gold/10 text-brand-gold'
    }
  ];

  return (
    <div className="min-h-screen bg-brand-bg pt-20 pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-black uppercase tracking-widest mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
              Contact Us
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
              联系 <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-gold to-brand-secondary">我们</span>
            </h1>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg leading-relaxed font-bold">
              无论您是开发者、企业客户还是合作伙伴，我们都期待听到您的声音。
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Quick Contact Cards */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">
            <div className="flex-1 flex flex-col gap-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-700 mb-2 px-2">快速导引 Quick Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1 gap-4 flex-1">
                {contactMethods.map((method, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={method.action}
                    className={cn(
                      "card-bento p-6 flex items-start gap-5 cursor-pointer group",
                      method.action && "hover:border-brand-gold/30 hover:bg-brand-gold/[0.02]"
                    )}
                  >
                    <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", method.color)}>
                      {method.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-bold mb-1">{method.title}</h4>
                      <p className="text-brand-gold font-mono text-xs mb-2 truncate">{method.value}</p>
                      <p className="text-zinc-500 text-xs leading-relaxed">{method.desc}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-zinc-800 group-hover:text-brand-gold transition-colors self-center" />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-auto p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
               <h4 className="text-brand-gold font-black uppercase text-[10px] tracking-widest">Office Hours</h4>
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-zinc-500 font-bold">周一至周五</span>
                     <span className="text-white font-black">09:00 - 22:00</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-zinc-500 font-bold">周六至周日</span>
                     <span className="text-white font-black">10:00 - 18:00</span>
                  </div>
                  <div className="pt-4 border-t border-white/5">
                     <p className="text-[10px] text-zinc-600 font-bold italic">* 以上时间均为北京时间 (GMT+8)</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-12 xl:col-span-7">
            <div className="card-bento p-8 md:p-12 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <span className="text-9xl font-black text-brand-gold/10">@</span>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-8 h-full flex flex-col">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-white">发送邮件信息</h2>
                    <p className="text-zinc-500 text-sm font-bold">我们将通过系统工单为您建立专属服务通道。</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-zinc-500 tracking-widest ml-1">您的姓名 / Name</label>
                      <input 
                        required 
                        type="text" 
                        className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-6 text-sm text-white focus:outline-none focus:border-brand-gold/30 transition-all font-bold" 
                        placeholder="请输入称呼" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-zinc-500 tracking-widest ml-1">联系邮箱 / Email</label>
                      <input 
                        required 
                        type="email" 
                        className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-6 text-sm text-white focus:outline-none focus:border-brand-gold/30 transition-all font-bold" 
                        placeholder="yourname@domain.com" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-zinc-500 tracking-widest ml-1">主题 / Subject</label>
                    <select className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-6 text-sm text-zinc-400 focus:outline-none focus:border-brand-gold/30 transition-all font-bold appearance-none">
                      <option>技术支持 / Technical Support</option>
                      <option>商务合作 / Business Partnership</option>
                      <option>充值异常 / Billing Issue</option>
                      <option>意见建议 / Feedback</option>
                      <option>其他 / Others</option>
                    </select>
                  </div>

                  <div className="space-y-2 flex-1 flex flex-col">
                    <label className="text-xs font-black uppercase text-zinc-500 tracking-widest ml-1">详细内容 / Message</label>
                    <textarea 
                      required 
                      className="w-full bg-white/5 border border-white/5 rounded-2xl p-6 text-sm text-white focus:outline-none focus:border-brand-gold/30 transition-all font-bold resize-none flex-1 min-h-[160px]" 
                      placeholder="请尽可能详细地描述您的问题 or 需求..." 
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                    <button 
                      type="submit" 
                      className="w-full sm:w-auto btn-primary py-4 px-12 text-xs"
                    >
                      发送信息 Send Message
                    </button>
                    <p className="text-[10px] text-zinc-600 font-bold max-w-xs text-center sm:text-left">
                       点击发送即代表您同意我们的《隐私政策》和《服务条款》。
                    </p>
                  </div>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative z-10 h-full flex flex-col items-center justify-center text-center space-y-8 py-20"
                >
                  <div className="h-24 w-24 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto border border-brand-gold/30">
                    <Send className="h-10 w-10 text-brand-gold" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-white">发送成功！</h2>
                    <p className="text-zinc-500 text-lg font-bold max-w-md mx-auto">
                      感谢您的沟通。我们的团队已收到您的信息，并将在 24 小时内回复至您的邮箱。
                    </p>
                  </div>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-brand-gold font-black uppercase tracking-widest text-xs hover:underline"
                  >
                    重新发送另一条信息
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
