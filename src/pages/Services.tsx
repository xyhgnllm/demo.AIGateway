import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, 
  CreditCard, 
  ShieldCheck, 
  ChevronRight, 
  Check, 
  Loader2, 
  Info, 
  X, 
  CheckCircle2, 
  Copy,
  Cpu,
  Cloud,
  Mail,
  Phone,
  QrCode,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';

// --- Types ---
interface Account {
  id: string;
  name: string;
  logo: string;
  price: number;
  stock: number;
  description: string;
  features: string[];
}

interface RechargeOption {
  id: string;
  name: string;
  price: number;
  points: number;
}

interface BrandGroup {
  id: string;
  name: string;
  logo: string;
  options: RechargeOption[];
}

interface CustomService {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  icon: any;
}

// --- Data ---
const accounts: Account[] = [
  {
    id: 'gpt-4-plus',
    name: 'ChatGPT Plus 独享',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    price: 188,
    stock: 45,
    description: 'GPT-4 模型访问、DALL-E 3 生成、联网功能',
    features: ['美区独享账号', '售后质保 30天', '支持修改密码']
  },
  {
    id: 'claude-pro',
    name: 'Claude Pro 独享',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Anthropic_logo.svg',
    price: 168,
    stock: 12,
    description: 'Claude 3.5 Sonnet / Opus 无限制，超长上下文',
    features: ['官号独立注册', '纯净 IP 环境', '极速反馈']
  },
  {
    id: 'gemini-adv',
    name: 'Gemini Advanced',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg',
    price: 99,
    stock: 8,
    description: 'Google Ultra 1.0 模型，2TB 存储空间',
    features: ['Google One 订阅', '账号直通', '多终端同步']
  },
  {
    id: 'midjourney-std',
    name: 'Midjourney 标准版',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.svg',
    price: 245,
    stock: 3,
    description: '无限快速绘图，放松模式绘图可用',
    features: ['支持独立频道', '包含全部功能', '画卷管理']
  }
];

const brandGroups: BrandGroup[] = [
  {
    id: 'gpt',
    name: 'ChatGPT',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    options: [
      { id: 'gpt-plus-1', name: 'Plus 代付 (30天)', price: 145, points: 1450 },
      { id: 'gpt-plus-3', name: 'Plus 代付 (90天)', price: 420, points: 4200 },
      { id: 'gpt-api-c10', name: 'API $10 兑换码', price: 72, points: 720 }
    ]
  },
  {
    id: 'claude',
    name: 'Claude',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Anthropic_logo.svg',
    options: [
      { id: 'claude-pro-1', name: 'Pro 会员订阅', price: 138, points: 1380 },
      { id: 'claude-api-c50', name: 'API $50 充值额度', price: 345, points: 3450 }
    ]
  },
  {
    id: 'gemini',
    name: 'Gemini',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg',
    options: [
      { id: 'gemini-adv', name: 'Advanced 会员包月', price: 125, points: 1250 },
      { id: 'gemini-api', name: 'Flash API 资源包', price: 88, points: 880 }
    ]
  }
];

const customServices: CustomService[] = [
  {
    id: 'private-deploy',
    title: '企业大模型私有化部署',
    description: '针对政企客户，提供基于本地服务器的大模型私有化部署方案。确保数据物理隔离，绝不外泄。支持 Llama 3, Qwen, ChatGLM 等主流基座。',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=800&auto=format&fit=crop',
    icon: ShieldCheck,
    features: ['高机密数据安全', '全功能本地化 API', '定制化微调', '7x24 运维支持']
  },
  {
    id: 'gpu-cluster',
    title: '专属算力集群配比',
    description: '为 AI 初创团队及大模型研发企业提供专属 GPU 算力集群调度。H100/A100 环境分钟级交付，支持分布式训练与大规模推理。',
    image: 'https://images.unsplash.com/photo-1591453089816-0fbb971bac44?q=80&w=800&auto=format&fit=crop',
    icon: Cpu,
    features: ['全球顶级算力节点', '弹性扩容能力', '性能优化指导', '多源混合云方案']
  },
  {
    id: 'rag-solution',
    title: '行业专属 RAG 知识库系统',
    description: '基于企业内部文档构建垂直领域知识引擎。解决大模型幻觉问题，提供精准、可溯源的行业问答能力。适配金融、法律、医疗等专业领域。',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop',
    icon: Cloud,
    features: ['毫秒级检索响应', '自动分段索引', '精准源链接回溯', '支持海量数据']
  }
];

const stepsList = [
  '正在建立安全链路...',
  '验证身份凭证 (Token)...',
  '同步云端订阅状态...',
  '下发会员权益并完成充值'
];

export default function Services() {
  const [activeTab, setActiveTab] = useState<'purchase' | 'recharge' | 'custom'>('purchase');
  
  // -- Purchase State --
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'info' | 'paying'>('info');

  // -- Recharge State --
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedRechargeOption, setSelectedRechargeOption] = useState<RechargeOption | null>(null);
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [token, setToken] = useState('');
  const [isRecharging, setIsRecharging] = useState(false);
  const [rechargeStep, setRechargeStep] = useState(-1);
  const [rechargeCompleted, setRechargeCompleted] = useState(false);

  // -- Custom State --
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [selectedCustomService, setSelectedCustomService] = useState<CustomService | null>(null);
  const [customSubmitted, setCustomSubmitted] = useState(false);

  // --- Handlers ---
  const handlePurchase = (acc: Account) => {
    setSelectedAccount(acc);
    setPaymentStep('info');
    setIsPurchaseModalOpen(true);
  };

  const handleRechargeOptionSelect = (opt: RechargeOption) => {
    setSelectedRechargeOption(opt);
    setIsRechargeModalOpen(true);
  };

  const startRecharge = () => {
    if (!token.trim()) return;
    setIsRecharging(true);
    setRechargeStep(0);
    
    const interval = setInterval(() => {
      setRechargeStep(prev => {
        if (prev >= stepsList.length - 1) {
          clearInterval(interval);
          setRechargeCompleted(true);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
  };

  const closeRechargeModal = () => {
    setIsRechargeModalOpen(false);
    setIsRecharging(false);
    setRechargeStep(-1);
    setRechargeCompleted(false);
    setToken('');
  };

  const handleContactCustom = (svc: CustomService) => {
    setSelectedCustomService(svc);
    setIsCustomModalOpen(true);
    setCustomSubmitted(false);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomSubmitted(true);
    setTimeout(() => setIsCustomModalOpen(false), 2000);
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-10 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
            增值 <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-gold to-brand-secondary">服务中心</span>
          </h1>
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
            从精选 AI 账号购买到自动化额度充值，再到企业级大模型私有部署，为您提供全方位的 AI 落地保障。
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 bg-white/5 border border-white/5 rounded-2xl">
            {[
              { id: 'purchase', label: '账号购买', icon: ShoppingCart },
              { id: 'recharge', label: '账号充值', icon: Zap },
              { id: 'custom', label: '定制服务', icon: Cpu },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all",
                  activeTab === tab.id 
                    ? "bg-brand-gold text-black shadow-lg shadow-brand-gold/20" 
                    : "text-zinc-500 hover:text-white"
                )}
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'purchase' && (
            <motion.div
              key="purchase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {accounts.map((acc) => (
                <div key={acc.id} className="card-bento flex flex-col group h-full">
                  <div className="p-8 flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-2xl bg-white p-2 shadow-sm border border-zinc-100 flex items-center justify-center">
                        <img src={acc.logo} alt={acc.name} className="h-full w-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded border border-white/5">
                        库存: {acc.stock}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-brand-gold transition-colors">{acc.name}</h3>
                      <p className="text-sm text-zinc-500 mt-2 leading-relaxed">{acc.description}</p>
                    </div>
                    <div className="space-y-3 pt-2">
                       {acc.features.map((f, i) => (
                         <div key={i} className="flex items-center gap-2 text-xs text-zinc-400 font-bold">
                           <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                           {f}
                         </div>
                       ))}
                    </div>
                  </div>
                  <div className="p-8 border-t border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-white tracking-tighter">¥{acc.price}</span>
                      <span className="text-xs text-zinc-600 font-black uppercase">起 / Starting</span>
                    </div>
                    <button 
                      onClick={() => handlePurchase(acc)}
                      className="btn-primary py-2.5 px-6 text-xs"
                    >
                      立即选购
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'recharge' && (
            <motion.div
              key="recharge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col lg:flex-row gap-12"
            >
              <div className="lg:w-1/3">
                <div className="card-bento p-8 bg-zinc-900 border-zinc-800">
                  <h3 className="text-lg font-bold text-brand-gold mb-8 flex items-center gap-2">
                    <Info className="h-5 w-5" /> 充值指引手册 Guide
                  </h3>
                  <div className="space-y-10">
                    {[
                      { step: '01', title: '官网登录获取 Session', desc: '在浏览器中登录您的 AI 账户。打开“开发者工具”面板。' },
                      { step: '02', title: '复制关键凭证 Token', desc: '在 Storage 选项卡中搜索 session 或 jwt 相关字段并复制。' },
                      { step: '03', title: '选择规格发起充值', desc: '在右侧选择规格，粘贴 Token 并点击充值即可完成。' }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="h-7 w-7 rounded-lg bg-brand-gold text-black flex items-center justify-center text-xs font-black shrink-0">{item.step}</div>
                        <div>
                          <p className="text-sm font-black text-white">{item.title}</p>
                          <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-12 p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs text-zinc-500 uppercase font-black tracking-widest mb-2">安全提醒 Security</p>
                    <p className="text-xs leading-relaxed text-zinc-400">
                      系统仅利用 Token 进行订阅操作，不保存聊天记录。完成后建议退出登录以使 Token 失效。
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:flex-1 space-y-6">
                {brandGroups.map((group) => (
                  <div key={group.id} className="card-bento overflow-hidden">
                    <div 
                      className="p-8 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                      onClick={() => setSelectedBrand(selectedBrand === group.id ? null : group.id)}
                    >
                      <div className="flex items-center gap-6">
                        <div className="h-14 w-14 rounded-2xl bg-white p-3 shadow-md border border-zinc-100">
                          <img src={group.logo} alt={group.name} className="h-full w-full object-contain" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{group.name} 全系列</h3>
                          <p className="text-xs text-zinc-500 mt-1 font-bold uppercase tracking-wider">{group.options.length} 款可用规格</p>
                        </div>
                      </div>
                      <ChevronRight className={cn("h-6 w-6 text-zinc-700 transition-transform", selectedBrand === group.id && "rotate-90")} />
                    </div>

                    <AnimatePresence>
                      {selectedBrand === group.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-white/[0.01] border-t border-white/5"
                        >
                          <div className="p-4 space-y-3">
                             {group.options.map(opt => (
                               <div 
                                key={opt.id} 
                                className="flex items-center justify-between p-6 bg-brand-card rounded-2xl border border-white/5 hover:border-brand-gold/30 hover:shadow-[0_0_20px_rgba(234,179,8,0.05)] transition-all group"
                               >
                                 <div>
                                   <p className="text-base font-bold text-white">{opt.name}</p>
                                   <p className="text-xs text-zinc-500 mt-1 font-bold">同步到账: <span className="text-brand-gold">{opt.points}</span> PTS</p>
                                 </div>
                                 <div className="flex items-center gap-8">
                                   <span className="text-2xl font-black text-brand-gold tracking-tighter">¥{opt.price}</span>
                                   <button 
                                     onClick={() => handleRechargeOptionSelect(opt)}
                                     className="px-6 py-2.5 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-brand-gold transition-colors"
                                   >
                                     开始充值
                                   </button>
                                 </div>
                               </div>
                             ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'custom' && (
            <motion.div
              key="custom"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {customServices.map((svc) => (
                <div key={svc.id} className="card-bento overflow-hidden flex flex-col md:flex-row group">
                  <div className="md:w-1/3 h-64 md:h-auto overflow-hidden relative">
                    <img src={svc.image} alt={svc.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                    <div className="absolute top-6 left-6 h-14 w-14 bg-brand-gold rounded-2xl flex items-center justify-center text-black shadow-xl">
                      <svc.icon className="h-7 w-7" />
                    </div>
                  </div>
                  <div className="p-10 md:p-12 flex-1 space-y-8 flex flex-col justify-center">
                    <div>
                      <h3 className="text-3xl font-black uppercase tracking-tighter text-white group-hover:text-brand-gold transition-colors">{svc.title}</h3>
                      <p className="text-zinc-500 mt-4 leading-relaxed max-w-2xl">{svc.description}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12">
                       {svc.features.map(f => (
                         <div key={f} className="flex items-center gap-3 text-sm text-zinc-400 font-bold">
                            <CheckCircle2 className="h-4 w-4 text-brand-gold shrink-0" />
                            {f}
                         </div>
                       ))}
                    </div>
                    <button 
                      onClick={() => handleContactCustom(svc)}
                      className="self-start btn-primary py-4 px-12 text-sm tracking-widest"
                    >
                      立即咨询定制方案 Resolve Now
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- MODALS --- */}

        {/* Purchase Modal */}
        <AnimatePresence>
          {isPurchaseModalOpen && selectedAccount && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-brand-bg/80 backdrop-blur-md" onClick={() => setIsPurchaseModalOpen(false)} />
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-3xl overflow-hidden rounded-[32px] bg-brand-card border border-white/5 shadow-2xl flex flex-col md:flex-row">
                <div className="md:w-5/12 bg-zinc-900 border-r border-white/5 p-10 flex flex-col justify-between">
                  <div>
                    <div className="h-16 w-16 rounded-2xl bg-white p-3 mb-8 shadow-xl">
                      <img src={selectedAccount.logo} alt={selectedAccount.name} className="h-full w-full object-contain" />
                    </div>
                    <h2 className="text-2xl font-black text-white leading-tight">{selectedAccount.name}</h2>
                    <p className="text-zinc-500 text-sm mt-4 leading-relaxed">{selectedAccount.description}</p>
                  </div>
                  <div className="space-y-6 pt-12">
                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                      <span className="text-xs uppercase font-black text-zinc-500 tracking-widest">支付金额</span>
                      <span className="text-2xl font-black text-brand-gold tracking-tighter">¥{selectedAccount.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-black text-emerald-500/60 uppercase tracking-widest">
                       <ShieldCheck className="h-4 w-4" /> Secure Payment Gate v2
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-10 flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-black uppercase tracking-tighter text-white">支付验证 Check-Out</h3>
                    <button onClick={() => setIsPurchaseModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                      <X className="h-5 w-5 text-zinc-500" />
                    </button>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                     <div className="p-4 bg-white rounded-3xl shadow-2xl shadow-brand-gold/10 relative group">
                        {/* Mock QR Code */}
                        <div className="w-48 h-48 bg-zinc-50 flex items-center justify-center border-2 border-zinc-100 rounded-2xl">
                           <QrCode className="h-24 w-24 text-zinc-200" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 bg-white/80 opacity-100 group-hover:opacity-0 transition-opacity rounded-3xl">
                           <div className="h-12 w-12 rounded-full bg-brand-gold text-black flex items-center justify-center animate-pulse">
                              <Zap className="h-6 w-6" />
                           </div>
                           <p className="text-xs font-black uppercase text-zinc-400 tracking-widest">扫码模拟支付</p>
                        </div>
                     </div>
                     
                     <div className="w-full space-y-4">
                        <div className="flex gap-4">
                          <button className="flex-1 h-14 bg-zinc-100 rounded-2xl flex items-center justify-center gap-3 hover:bg-white transition-all border border-transparent hover:border-emerald-500/20">
                             <div className="w-6 h-6 bg-emerald-500 rounded-md" />
                             <span className="text-xs font-black uppercase text-zinc-900">微信支付</span>
                          </button>
                          <button className="flex-1 h-14 bg-zinc-100 rounded-2xl flex items-center justify-center gap-3 hover:bg-white transition-all border border-transparent hover:border-blue-500/20">
                             <div className="w-6 h-6 bg-blue-500 rounded-md" />
                             <span className="text-xs font-black uppercase text-zinc-900">支付宝</span>
                          </button>
                        </div>
                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">支付完成后，账号信息将自动发送至您的工作台</p>
                     </div>
                  </div>
                  
                  <div className="mt-10 pt-8 border-t border-white/5 flex justify-center">
                     <button className="text-xs font-black text-brand-gold uppercase tracking-widest hover:tracking-[0.2em] transition-all">
                        联络客服手动处理 Done
                     </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Recharge Modal */}
        <AnimatePresence>
          {isRechargeModalOpen && selectedRechargeOption && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-brand-bg/80 backdrop-blur-md" onClick={!isRecharging ? closeRechargeModal : undefined} />
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-4xl overflow-hidden rounded-[40px] bg-brand-card border border-white/5 shadow-2xl flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-brand-gold p-10 text-black flex flex-col justify-between">
                  <div>
                    <CreditCard className="h-10 w-10 mb-8" />
                    <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">订单摘要 Summary</h2>
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold opacity-60">规格:</span>
                      <span className="font-black text-right">{selectedRechargeOption.name}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold opacity-60">点数:</span>
                      <span className="font-black text-lg">{selectedRechargeOption.points} PTS</span>
                    </div>
                  </div>
                  <div className="text-4xl font-black tracking-tighter border-t border-black/10 pt-8">
                    ¥{selectedRechargeOption.price}
                  </div>
                </div>

                <div className="flex-1 p-10 md:p-14 flex flex-col">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-white">
                      {rechargeCompleted ? '充值成功 SUCCESS' : '身份凭证 VERIFY'}
                    </h3>
                    {!isRecharging && (
                      <button onClick={closeRechargeModal} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <X className="h-6 w-6 text-zinc-500" />
                      </button>
                    )}
                  </div>

                  {!isRecharging && !rechargeCompleted ? (
                    <div className="space-y-8">
                      <div className="bg-brand-gold/10 border border-brand-gold/20 p-5 rounded-2xl flex gap-4">
                        <Info className="h-6 w-6 text-brand-gold shrink-0" />
                        <p className="text-sm text-zinc-300 font-bold leading-relaxed">
                          请粘贴您的 Session Token 代码。系统将模拟授权完成订阅，权益将自动下发。
                        </p>
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-zinc-500">密钥凭证 Token (JWT / Cookie)</label>
                        <textarea 
                          rows={6}
                          value={token}
                          onChange={(e) => setToken(e.target.value)}
                          className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-sm font-mono text-white focus:outline-none focus:border-brand-gold/30 resize-none transition-all placeholder:text-zinc-700" 
                          placeholder="粘贴数据..."
                        />
                      </div>
                      <button 
                        onClick={startRecharge}
                        disabled={!token.trim()}
                        className="w-full btn-primary py-5 text-sm font-black tracking-widest uppercase"
                      >
                        下一步：开始充值 Execute
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-10 py-4 flex-1 flex flex-col justify-center">
                       <div className="space-y-8">
                          {stepsList.map((step, idx) => (
                            <div key={idx} className="flex items-center gap-8">
                              <div className={cn(
                                "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-500",
                                idx < rechargeStep ? "border-emerald-500 bg-emerald-500 text-white" :
                                idx === rechargeStep ? "border-brand-gold bg-white text-black animate-pulse shadow-[0_0_30px_rgba(234,179,8,0.2)]" :
                                "border-white/5 bg-white/5 text-zinc-700"
                              )}>
                                {idx < rechargeStep ? <Check className="h-6 w-6" /> : idx === rechargeStep ? <Loader2 className="h-6 w-6 animate-spin" /> : <span className="font-black text-sm">{idx + 1}</span>}
                              </div>
                              <p className={cn("font-black uppercase tracking-widest text-sm transition-all duration-500", idx <= rechargeStep ? "text-white" : "text-zinc-700")}>{step}</p>
                            </div>
                          ))}
                       </div>

                       <AnimatePresence>
                         {rechargeCompleted && (
                           <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-12 p-8 bg-white/5 rounded-3xl flex flex-col items-center gap-4 text-center border border-brand-gold/20">
                              <div className="h-16 w-16 bg-brand-gold text-black rounded-2xl flex items-center justify-center shadow-2xl shadow-brand-gold/30">
                                <CheckCircle2 className="h-10 w-10" />
                              </div>
                              <div>
                                <h4 className="text-xl font-black uppercase text-white">权益分发成功</h4>
                                <p className="text-sm text-zinc-500 mt-2 font-bold">Token 授权已模拟完成，请刷新控制台查看。</p>
                              </div>
                              <button onClick={closeRechargeModal} className="mt-2 text-xs font-black text-brand-gold uppercase tracking-widest hover:bg-brand-gold hover:text-black px-6 py-2 rounded-lg transition-all">
                                完成 Done
                              </button>
                           </motion.div>
                         )}
                       </AnimatePresence>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Custom Service Modal */}
        <AnimatePresence>
          {isCustomModalOpen && selectedCustomService && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-brand-bg/80 backdrop-blur-md" onClick={() => setIsCustomModalOpen(false)} />
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-lg overflow-hidden rounded-[32px] bg-brand-card border border-white/5 shadow-2xl p-10">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-white">联系专家咨询</h3>
                  <button onClick={() => setIsCustomModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                    <X className="h-6 w-6 text-zinc-500" />
                  </button>
                </div>

                {!customSubmitted ? (
                  <form onSubmit={handleCustomSubmit} className="space-y-6">
                    <div>
                      <p className="text-xs font-black uppercase text-brand-gold tracking-widest mb-2">正在咨询项目</p>
                      <h4 className="text-lg font-bold text-white mb-6 p-4 bg-white/5 rounded-2xl border border-white/5">{selectedCustomService.title}</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-zinc-500 tracking-widest ml-1">联系电话</label>
                        <div className="relative">
                          <Phone className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                          <input required type="tel" className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl pl-14 pr-6 text-sm text-white focus:outline-none focus:border-brand-gold/30 transition-all font-bold" placeholder="请输入您的电话或手机号" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-zinc-500 tracking-widest ml-1">工作邮箱</label>
                        <div className="relative">
                          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                          <input required type="email" className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl pl-14 pr-6 text-sm text-white focus:outline-none focus:border-brand-gold/30 transition-all font-bold" placeholder="yourname@corp.com" />
                        </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-black uppercase text-zinc-500 tracking-widest ml-1">需求备注 (可选)</label>
                         <textarea className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-sm text-white focus:outline-none focus:border-brand-gold/30 transition-all font-bold resize-none h-32" placeholder="简单描述您的需求..." />
                      </div>
                    </div>

                    <button type="submit" className="w-full btn-primary py-5 text-sm font-black uppercase tracking-widest mt-4">
                      发送咨询请求 Send Request
                    </button>
                  </form>
                ) : (
                  <div className="py-16 flex flex-col items-center text-center gap-6">
                     <div className="h-20 w-20 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
                        <CheckCircle2 className="h-10 w-10" />
                     </div>
                     <div>
                        <h4 className="text-2xl font-black text-white uppercase tracking-tighter">提交成功 Success</h4>
                        <p className="text-zinc-500 text-sm mt-4 font-bold max-w-sm">我们的顾问将在 2 个小时内通过电话或邮件与您联系，请注意查收。</p>
                     </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
