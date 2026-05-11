import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  LayoutDashboard, Activity, Receipt, LifeBuoy, Share2, 
  Wallet, ArrowRight, CreditCard, X, Check, Package,
  UserPlus, Info, Loader2, ShieldCheck, Search, Filter,
  FileText, Download, CheckCircle2, Copy, LogOut, Plus,
  Database, Key, Scan
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../lib/auth';
import Logo from '../components/common/Logo';

const menuGroups = [
  {
    title: 'Workspace 工作区',
    items: [
      { id: 'overview', name: '数据概览', icon: LayoutDashboard },
      { id: 'models', name: '模型管理', icon: Database },
    ]
  },
  {
    title: 'Account 账户',
    items: [
      { id: 'monitoring', name: '流量监控', icon: Activity },
      { id: 'api_keys', name: 'API Key', icon: Key },
      { id: 'orders', name: '订单发票', icon: Receipt },
    ]
  },
  {
    title: 'Partner 合作伙伴',
    items: [
      { id: 'referral', name: '邀请推广', icon: UserPlus },
      { id: 'support', name: '工单反馈', icon: LifeBuoy },
    ]
  }
];

export default function Dashboard() {
  const { user, logout, showAuthModal, setIntendedPath } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setIntendedPath(window.location.pathname + window.location.search);
      showAuthModal();
      navigate('/');
    }
  }, [user, navigate, showAuthModal, setIntendedPath]);

  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState('100');
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isAddingHeader, setIsAddingHeader] = useState(false);
  const [newHeader, setNewHeader] = useState({ name: '', taxId: '', type: '企业' });

  // API Key State
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Prod-Main', key: 'sk-llm-7d8k...2h9k', group: 'Production', status: 'active', createdAt: '2026-05-10' },
    { id: 2, name: 'Dev-Test', key: 'sk-llm-1a2b...4c5d', group: 'Development', status: 'inactive', createdAt: '2026-05-11' },
  ]);
  const [isCreateKeyOpen, setIsCreateKeyOpen] = useState(false);
  const [apiKeyGroups, setApiKeyGroups] = useState(['默认', '生成', '测试']);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newKeyForm, setNewKeyForm] = useState({ name: '', group: '默认' });

  const invoiceHeaders = [
    { id: 1, type: '企业', name: '上海极客人工智能科技有限公司', taxId: '91310115MA1KXXXXXX' },
    { id: 2, type: '个人', name: '张三', taxId: '-' },
  ];

  const modelsData = [
    { name: 'qwen3.5-plus', provider: 'Alibaba', input: '8.05', output: '48.16', cacheRead: '0.805', cacheWrite: '10.0625' },
    { name: 'qwen3.5-flash', provider: 'Alibaba', input: '2.03', output: '20.09', cacheRead: '0.203', cacheWrite: '2.5375' },
    { name: 'qwen3.6-plus', provider: 'Alibaba', input: '19.32', output: '115.57', cacheRead: '1.932', cacheWrite: '24.15' },
    { name: 'qwen3-coder-plus', provider: 'Alibaba', input: '40.18', output: '160.58', cacheRead: '4.018', cacheWrite: '50.225' },
    { name: 'kimi-k2.6', provider: 'Moonshot', input: '66.5', output: '280', cacheRead: '11.2', cacheWrite: '66.5' },
    { name: 'kimi-k2.5', provider: 'Moonshot', input: '42', output: '210', cacheRead: '7', cacheWrite: '42' },
    { name: 'MiniMax-M2.7', provider: 'MiniMax', input: '21', output: '84', cacheRead: '4.2', cacheWrite: '26.25' },
    { name: 'MiniMax-M2.5', provider: 'MiniMax', input: '21', output: '84', cacheRead: '4.2', cacheWrite: '26.25' },
    { name: 'glm-5.1', provider: 'Zhipu', input: '112', output: '352', cacheRead: '20.8', cacheWrite: '112' },
    { name: 'glm-5', provider: 'Zhipu', input: '70', output: '224', cacheRead: '14', cacheWrite: '70' },
    { name: 'deepseek-v4-pro', provider: 'DeepSeek', input: '121.8', output: '243.6', cacheRead: '10.15', cacheWrite: '121.8' },
    { name: 'deepseek-v4-flash', provider: 'DeepSeek', input: '9.8', output: '19.6', cacheRead: '1.96', cacheWrite: '9.8' },
    { name: 'deepseek-v3.2', provider: 'DeepSeek', input: '19.6', output: '29.4', cacheRead: '1.96', cacheWrite: '19.6' },
    { name: 'gpt-5.5', provider: 'OpenAI', input: '350', output: '2,100', cacheRead: '35', cacheWrite: '350' },
    { name: 'gpt-5.4', provider: 'OpenAI', input: '175', output: '1,050', cacheRead: '17.5', cacheWrite: '175' },
    { name: 'gpt-5.4-mini', provider: 'OpenAI', input: '52.5', output: '315', cacheRead: '5.25', cacheWrite: '52.5' },
    { name: 'claude-sonnet-4-6', provider: 'Anthropic', input: '210', output: '1,050', cacheRead: '21', cacheWrite: '262.5' },
    { name: 'claude-opus-4-6', provider: 'Anthropic', input: '350', output: '1,750', cacheRead: '35', cacheWrite: '437.5' },
    { name: 'claude-opus-4-7', provider: 'Anthropic', input: '350', output: '1,750', cacheRead: '35', cacheWrite: '437.5' },
    { name: 'claude-haiku-4-5', provider: 'Anthropic', input: '70', output: '350', cacheRead: '7', cacheWrite: '87.5' },
    { name: 'gemini-3.1-pro-preview', provider: 'Google', input: '140', output: '840', cacheRead: '14', cacheWrite: '140' },
    { name: 'gemini-3.1-flash-lite-preview', provider: 'Google', input: '17.5', output: '105', cacheRead: '1.75', cacheWrite: '17.5' },
    { name: 'grok-4.1-fast', provider: 'xAI', input: '20', output: '50', cacheRead: '5', cacheWrite: '20' },
    { name: 'grok-4-fast', provider: 'xAI', input: '20', output: '50', cacheRead: '5', cacheWrite: '20' },
    { name: 'grok-4.20', provider: 'xAI', input: '200', output: '600', cacheRead: '20', cacheWrite: '200' },
    { name: 'step-3.5-flash', provider: 'Step', input: '10', output: '30', cacheRead: '10', cacheWrite: '10' },
    { name: 'mimo-v2-pro', provider: 'OpenAI', input: '100', output: '300', cacheRead: '20', cacheWrite: '100' },
    { name: 'mimo-v2-flash', provider: 'OpenAI', input: '9', output: '29', cacheRead: '4.5', cacheWrite: '9' },
    { name: 'mimo-v2.5-pro', provider: 'OpenAI', input: '100', output: '300', cacheRead: '20', cacheWrite: '100' },
    { name: 'mimo-v2-omni', provider: 'OpenAI', input: '40', output: '200', cacheRead: '8', cacheWrite: '40' },
    { name: 'mimo-v2.5', provider: 'OpenAI', input: '40', output: '200', cacheRead: '8', cacheWrite: '40' },
    { name: 'gpt-oss-120b', provider: 'OpenSource', input: '3.9', output: '19', cacheRead: '3.9', cacheWrite: '3.9' },
    { name: 'gpt-oss-20b', provider: 'OpenSource', input: '3', output: '14', cacheRead: '3', cacheWrite: '3' },
    { name: 'glm-5-turbo', provider: 'Zhipu', input: '120', output: '400', cacheRead: '24', cacheWrite: '120' },
    { name: 'glm-4.5-air', provider: 'Zhipu', input: '13', output: '85', cacheRead: '2.5', cacheWrite: '13' },
    { name: 'glm-4.7', provider: 'Zhipu', input: '40', output: '175', cacheRead: '8', cacheWrite: '40' },
    { name: 'glm-4.6', provider: 'Zhipu', input: '39', output: '190', cacheRead: '39', cacheWrite: '39' },
    { name: 'glm-4.7-flash', provider: 'Zhipu', input: '6', output: '40', cacheRead: '1', cacheWrite: '6' },
    { name: 'gemma-4-31b-it', provider: 'Google', input: '13', output: '38', cacheRead: '13', cacheWrite: '13' },
    { name: 'gemma-4-26b-a4b-it', provider: 'Google', input: '13', output: '40', cacheRead: '13', cacheWrite: '13' },
    { name: 'gemma-3-27b-it', provider: 'Google', input: '8', output: '16', cacheRead: '8', cacheWrite: '8' },
    { name: 'gemma-3-12b-it', provider: 'Google', input: '4', output: '13', cacheRead: '4', cacheWrite: '4' },
    { name: 'mistral-nemo', provider: 'Mistral', input: '2', output: '4', cacheRead: '2', cacheWrite: '2' },
    { name: 'mistral-small-3.2-24b-instruct', provider: 'Mistral', input: '7.5', output: '20', cacheRead: '7.5', cacheWrite: '7.5' },
    { name: 'qwen3.5-flash-02-23', provider: 'Alibaba', input: '10', output: '40', cacheRead: '1', cacheWrite: '12.5' },
  ];

  const handleRecognize = () => {
    // Mock recognition
    setNewHeader({
      name: '北京智元科技有限公司',
      taxId: '91110108MA01XXXXXX',
      type: '企业'
    });
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-10 pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-60 flex flex-col gap-6 shrink-0 pt-2">
            <div className="flex items-center gap-3 px-4 mb-2">
               <Logo className="h-8 w-8" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Dashboard</p>
            </div>

            <nav className="space-y-8">
              {menuGroups.map((group, idx) => (
                <div key={idx} className="space-y-2">
                   <div className="flex items-center gap-4 px-4 overflow-hidden">
                      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-700 whitespace-nowrap">{group.title}</p>
                      <div className="h-[1px] w-full bg-gradient-to-r from-zinc-800 to-transparent"></div>
                   </div>
                   <div className="space-y-1">
                      {group.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-left group/btn",
                            activeTab === item.id 
                              ? "bg-brand-gold text-black shadow-lg shadow-brand-gold/20" 
                              : "text-zinc-500 hover:text-white hover:bg-white/5"
                          )}
                        >
                          <item.icon className={cn("h-4 w-4 shrink-0 transition-transform group-hover/btn:scale-110", activeTab === item.id ? "text-black" : "text-zinc-600")} />
                          {item.name}
                        </button>
                      ))}
                   </div>
                </div>
              ))}
            </nav>

            {/* Referral Card */}
            <div className="mt-8 p-6 bg-gradient-to-br from-brand-gold/20 to-brand-secondary/20 rounded-3xl border border-brand-gold/20 relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 h-20 w-20 bg-brand-gold/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
              <Share2 className="h-6 w-6 mb-4 text-brand-gold" />
              <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.15em] mb-2">Partner Bonus</p>
              <p className="text-sm font-bold text-white leading-tight">邀请好友加入<br/>获取 15% 佣金</p>
              <button 
                onClick={() => setActiveTab('referral')}
                className="mt-6 w-full py-2.5 bg-brand-gold text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-lg shadow-brand-gold/20"
              >
                立即获取
              </button>
            </div>

            {/* Logout Button */}
            <button 
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="mt-4 w-full flex items-center gap-3 px-4 py-4 rounded-xl text-xs font-black text-rose-500 hover:bg-rose-500/10 transition-all uppercase tracking-widest border border-transparent hover:border-rose-500/20"
            >
               <LogOut className="h-4 w-4" />
               退出登录 Logout
            </button>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 min-w-0">
             {activeTab === 'overview' && (
               <div className="space-y-8">
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-8">
                   <div>
                     <h2 className="text-3xl font-black uppercase tracking-tighter text-white">数据概览 Overview</h2>
                     <p className="text-xs text-zinc-500 mt-2 font-bold uppercase tracking-widest">最近 30 天的账户活动摘要</p>
                   </div>
                   <div className="flex gap-2">
                      <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-2 flex flex-col">
                         <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Account Status</span>
                         <span className="text-xs font-bold text-emerald-500 uppercase">● PRO ACTIVE</span>
                      </div>
                   </div>
                 </div>

                 {/* Quick Stats Bento Row */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="card-bento p-8 flex flex-col justify-between min-h-[180px] bg-gradient-to-br from-white/[0.03] to-transparent">
                      <div>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">账户剩余点数 (PTS)</p>
                        <h3 className="text-5xl font-black text-white tracking-tighter">12,405 <span className="text-brand-gold text-sm font-black ml-2">PTS</span></h3>
                      </div>
                      <button 
                        onClick={() => setIsRechargeOpen(true)}
                        className="self-start text-[10px] font-black text-brand-gold flex items-center gap-2 hover:translate-x-1 transition-transform uppercase tracking-widest"
                      >
                        立即充值点数 TOP-UP <ArrowRight className="h-3 w-3" />
                      </button>
                   </div>
                   <div className="card-bento p-8 flex flex-col justify-between min-h-[180px]">
                      <div>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">今日模型调用 Requests</p>
                        <h3 className="text-5xl font-black text-white tracking-tighter">12,408</h3>
                      </div>
                      <button 
                        onClick={() => setActiveTab('monitoring')}
                        className="self-start text-[10px] font-black text-zinc-500 flex items-center gap-2 hover:text-white transition-colors uppercase tracking-widest"
                      >
                        查看详细日志 VIEW LOGS <ArrowRight className="h-3 w-3" />
                      </button>
                   </div>
                 </div>

                 {/* Recent Orders Table-Style */}
                 <div className="card-bento overflow-hidden border-white/5">
                   <div className="p-6 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
                      <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">近期活动记录 Activity</h3>
                      <button onClick={() => setActiveTab('orders')} className="text-[10px] font-black text-brand-gold uppercase tracking-widest hover:underline">查看全部 &rarr;</button>
                   </div>
                   <div className="divide-y divide-white/5">
                      {[
                        { id: 'ORD-82734', name: 'ChatGPT Plus 充值', date: '2026-05-06', price: '-1,450 PTS', status: 'Success' },
                        { id: 'ORD-82110', name: 'Claude Pro 充值', date: '2026-05-01', price: '-1,380 PTS', status: 'Success' },
                      ].map((order) => (
                        <div key={order.id} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                          <div className="flex items-center gap-5">
                            <div className="h-10 w-10 rounded-xl bg-white/5 shrink-0 flex items-center justify-center text-zinc-500 group-hover:text-brand-gold transition-colors border border-white/5">
                              <Receipt className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white group-hover:text-brand-gold transition-colors">{order.name}</p>
                              <p className="text-[10px] text-zinc-600 font-mono mt-1 uppercase tracking-widest">{order.id} · {order.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-black text-white">{order.price}</p>
                            <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest mt-1 block">CONFIRMED</span>
                          </div>
                        </div>
                      ))}
                   </div>
                 </div>
               </div>
             )}

             {activeTab === 'models' && (
               <div className="space-y-8">
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-8">
                   <div>
                     <h2 className="text-3xl font-black uppercase tracking-tighter text-white">模型管理 Models</h2>
                     <p className="text-xs text-zinc-500 mt-2 font-bold uppercase tracking-widest">这些模型目前可用于您的帐户。显示的元数据包含每百万 Token 的点数消耗。</p>
                   </div>
                 </div>

                 <div className="card-bento overflow-hidden border-white/5">
                   <div className="overflow-x-auto">
                     <table className="w-full text-left">
                       <thead>
                         <tr className="bg-white/5 text-[10px] font-black text-zinc-600 uppercase tracking-widest border-b border-white/5">
                           <th className="px-6 py-5">模型名称 Model</th>
                           <th className="px-6 py-5">提供商 Provider</th>
                           <th className="px-6 py-5">输入 Input</th>
                           <th className="px-6 py-5">输出 Output</th>
                           <th className="px-6 py-5">缓存读取 Cache R</th>
                           <th className="px-6 py-5">缓存写入 Cache W</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5">
                         {modelsData.map((model, i) => (
                           <tr key={i} className="text-xs hover:bg-white/[0.02] transition-colors group">
                             <td className="px-6 py-6 font-bold text-white group-hover:text-brand-gold transition-colors">{model.name}</td>
                             <td className="px-6 py-6 text-zinc-500">{model.provider}</td>
                             <td className="px-6 py-6 font-mono text-zinc-400">{model.input} Credits / 1M</td>
                             <td className="px-6 py-6 font-mono text-zinc-400">{model.output} Credits / 1M</td>
                             <td className="px-6 py-6 font-mono text-zinc-500">{model.cacheRead} Credits / 1M</td>
                             <td className="px-6 py-6 font-mono text-zinc-500">{model.cacheWrite} Credits / 1M</td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                 </div>
               </div>
             )}

             {activeTab === 'api_keys' && (
               <div className="space-y-8">
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-8">
                   <div>
                     <h2 className="text-3xl font-black uppercase tracking-tighter text-white">API Keys</h2>
                     <p className="text-xs text-zinc-500 mt-2 font-bold uppercase tracking-widest">管理您的 API 访问密钥，支持分组管理与权限切换</p>
                   </div>
                   <button 
                    onClick={() => setIsCreateKeyOpen(true)}
                    className="bg-brand-gold text-black px-6 py-3 rounded-2xl text-xs font-black tracking-widest uppercase hover:scale-105 transition-all shadow-lg shadow-brand-gold/20 flex items-center gap-2"
                   >
                     <Plus className="h-4 w-4" /> 新建 Key
                   </button>
                 </div>

                 <div className="card-bento overflow-hidden border-white/5">
                   <div className="overflow-x-auto">
                     <table className="w-full text-left">
                       <thead>
                         <tr className="bg-white/5 text-[10px] font-black text-zinc-600 uppercase tracking-widest border-b border-white/5">
                           <th className="px-6 py-5">名称 Name</th>
                           <th className="px-6 py-5">分组 Group</th>
                           <th className="px-6 py-5">密钥 Key</th>
                           <th className="px-6 py-5">状态 Status</th>
                           <th className="px-6 py-5">日期 Created</th>
                           <th className="px-6 py-5 text-right">操作 Action</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5">
                         {apiKeys.map((key) => (
                           <tr key={key.id} className="text-xs hover:bg-white/[0.02] transition-colors group">
                             <td className="px-6 py-6 font-bold text-white uppercase tracking-tight">{key.name}</td>
                             <td className="px-6 py-6">
                               <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-500 font-black text-[9px] uppercase border border-white/10">{key.group}</span>
                             </td>
                             <td className="px-6 py-6">
                               <div className="flex items-center gap-3">
                                 <code className="text-zinc-500 font-mono tracking-wider">{key.key}</code>
                                 <button 
                                   onClick={() => {
                                      navigator.clipboard.writeText('sk-llm-real-key-would-go-here');
                                   }}
                                   className="text-zinc-700 hover:text-brand-gold transition-colors"
                                 >
                                   <Copy className="h-3.5 w-3.5" />
                                 </button>
                               </div>
                             </td>
                             <td className="px-6 py-6">
                               <div className="flex items-center gap-2">
                                 <div className={cn("h-1.5 w-1.5 rounded-full", key.status === 'active' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-zinc-700")} />
                                 <span className={cn("font-black uppercase text-[10px]", key.status === 'active' ? "text-emerald-500" : "text-zinc-600")}>
                                   {key.status === 'active' ? 'Active' : 'Disabled'}
                                 </span>
                               </div>
                             </td>
                             <td className="px-6 py-6 text-zinc-600 font-mono">{key.createdAt}</td>
                             <td className="px-6 py-6 text-right">
                               <div className="flex justify-end gap-3">
                                 <button className="text-zinc-500 hover:text-white transition-colors">
                                   {key.status === 'active' ? '禁用' : '启用'}
                                 </button>
                                 <button className="text-rose-500/50 hover:text-rose-500 transition-colors uppercase font-black text-[10px]">删除</button>
                               </div>
                             </td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                 </div>
               </div>
             )}

             {/* Create API Key Modal */}
             <AnimatePresence>
               {isCreateKeyOpen && (
                 <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="absolute inset-0 bg-brand-bg/80 backdrop-blur-md"
                     onClick={() => setIsCreateKeyOpen(false)}
                   />
                   <motion.div
                     initial={{ opacity: 0, scale: 0.95, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.95, y: 20 }}
                     className="relative w-full max-w-md overflow-hidden rounded-[40px] bg-zinc-900 shadow-[0_32px_80px_rgba(0,0,0,0.5)] border border-white/10 p-10"
                   >
                     <div className="flex justify-between items-center mb-8">
                       <h2 className="text-2xl font-black text-white uppercase tracking-tighter">新建 API Key</h2>
                       <button onClick={() => setIsCreateKeyOpen(false)} className="h-10 w-10 flex items-center justify-center hover:bg-white/5 rounded-2xl transition-all">
                         <X className="h-6 w-6 text-zinc-500" />
                       </button>
                     </div>

                     <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest ml-1">Key 名称 Name</label>
                           <input 
                             type="text" 
                             value={newKeyForm.name}
                             onChange={(e) => setNewKeyForm({...newKeyForm, name: e.target.value})}
                             className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-6 text-sm text-white focus:outline-none focus:border-brand-gold/30 transition-all font-bold" 
                             placeholder="例如: Production-API" 
                           />
                        </div>

                        <div className="space-y-4">
                           <div className="flex justify-between items-center ml-1">
                              <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">所属分组 Group</label>
                              <button 
                                onClick={() => setShowAddGroup(true)}
                                className="text-[10px] font-black text-brand-gold uppercase tracking-tighter hover:underline"
                              >
                                + 自定义分组
                              </button>
                           </div>

                           {showAddGroup ? (
                             <div className="flex gap-2">
                                <input 
                                  type="text" 
                                  value={newGroupName}
                                  onChange={(e) => setNewGroupName(e.target.value)}
                                  className="flex-1 h-12 bg-white/5 border border-white/5 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-brand-gold/30 transition-all font-bold" 
                                  placeholder="输入新分组名称..." 
                                />
                                <button 
                                  onClick={() => {
                                    if (newGroupName && !apiKeyGroups.includes(newGroupName)) {
                                      setApiKeyGroups([...apiKeyGroups, newGroupName]);
                                      setNewKeyForm({...newKeyForm, group: newGroupName});
                                      setNewGroupName('');
                                      setShowAddGroup(false);
                                    }
                                  }}
                                  className="px-4 bg-brand-gold text-black rounded-xl text-[10px] font-black"
                                >
                                  添加
                                </button>
                                <button 
                                  onClick={() => setShowAddGroup(false)}
                                  className="px-4 bg-white/5 text-zinc-500 rounded-xl text-[10px] font-black"
                                >
                                  取消
                                </button>
                             </div>
                           ) : (
                             <div className="space-y-2">
                               <select 
                                 value={newKeyForm.group}
                                 onChange={(e) => {
                                   if (e.target.value === 'CUSTOM_ACTION') {
                                     setShowAddGroup(true);
                                   } else {
                                     setNewKeyForm({...newKeyForm, group: e.target.value});
                                   }
                                 }}
                                 className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-6 text-sm text-white focus:outline-none focus:border-brand-gold/30 transition-all font-bold appearance-none cursor-pointer"
                               >
                                 {apiKeyGroups.map(group => (
                                   <option key={group} value={group} className="bg-zinc-900">{group}</option>
                                 ))}
                                 <option value="CUSTOM_ACTION" className="bg-zinc-900 text-brand-gold font-bold">+ 自定义分组...</option>
                               </select>
                               
                               {/* Manage Custom Groups */}
                               <div className="flex flex-wrap gap-2 mt-2">
                                  {apiKeyGroups.map(group => (
                                    !['默认', '生成', '测试'].includes(group) && (
                                      <div key={group} className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-lg border border-white/10">
                                         <span className="text-[9px] font-bold text-zinc-500 uppercase">{group}</span>
                                         <button 
                                          onClick={() => {
                                            setApiKeyGroups(apiKeyGroups.filter(g => g !== group));
                                            if (newKeyForm.group === group) setNewKeyForm({...newKeyForm, group: '默认'});
                                          }}
                                          className="text-zinc-700 hover:text-rose-500 transition-colors"
                                         >
                                           <X className="h-3 w-3" />
                                         </button>
                                      </div>
                                    )
                                  ))}
                               </div>
                             </div>
                           )}
                        </div>

                        <div className="p-6 rounded-3xl bg-brand-gold/5 border border-brand-gold/20">
                           <div className="flex gap-4">
                              <ShieldCheck className="h-5 w-5 text-brand-gold shrink-0 mt-1" />
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black text-brand-gold uppercase tracking-widest">安全提示 Security</p>
                                 <p className="text-xs text-zinc-500 leading-relaxed font-bold">Key 将在创建后可见，请妥善保管。不要将 API Key 泄露给他人或上传至公共代码库。</p>
                              </div>
                           </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                           <button 
                             onClick={() => setIsCreateKeyOpen(false)}
                             className="flex-1 py-4 bg-white/5 text-zinc-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
                           >
                             取消 Cancel
                           </button>
                           <button 
                             onClick={() => {
                               setIsCreateKeyOpen(false);
                               setNewKeyForm({ name: '', group: '默认' });
                             }}
                             className="flex-[2] py-4 bg-brand-gold text-black rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-gold/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                           >
                             确认新建 Generate
                           </button>
                        </div>
                     </div>
                   </motion.div>
                 </div>
               )}
             </AnimatePresence>

             {/* Recharge Modal */}
             <AnimatePresence>
               {isRechargeOpen && (
                 <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="absolute inset-0 bg-brand-bg/80 backdrop-blur-md"
                     onClick={() => setIsRechargeOpen(false)}
                   />
                   <motion.div
                     initial={{ opacity: 0, scale: 0.95, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.95, y: 20 }}
                     className="relative w-full max-w-md overflow-hidden rounded-[40px] bg-zinc-900 shadow-[0_32px_80px_rgba(0,0,0,0.5)] border border-white/10 p-10"
                   >
                     <div className="flex justify-between items-center mb-8">
                       <h2 className="text-2xl font-black text-white uppercase tracking-tighter">点数充值 Top-Up</h2>
                       <button onClick={() => setIsRechargeOpen(false)} className="h-10 w-10 flex items-center justify-center hover:bg-white/5 rounded-2xl transition-all">
                         <X className="h-6 w-6 text-zinc-500" />
                       </button>
                     </div>
                     
                     <div className="p-6 rounded-3xl bg-brand-gold/5 border border-brand-gold/20 mb-8">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[10px] text-brand-gold font-black uppercase tracking-widest">当前兑换率 Rate</span>
                          <span className="text-xs font-mono font-bold text-white bg-brand-gold/20 px-2 py-0.5 rounded">1 CNY = 10 PTS</span>
                        </div>
                        <p className="text-xs text-zinc-500 leading-relaxed font-bold">账户点数可用于平台所有模型调用费用抵扣及账号服务购买。</p>
                     </div>

                     <div className="space-y-6">
                        <div className="grid grid-cols-3 gap-3">
                           {['50', '100', '200', '500', '1000', '2000'].map(val => (
                             <button 
                               key={val}
                               onClick={() => setRechargeAmount(val)}
                               className={cn(
                                 "py-4 rounded-2xl border text-sm font-black transition-all",
                                 rechargeAmount === val 
                                   ? "bg-brand-gold border-transparent text-black shadow-lg shadow-brand-gold/20" 
                                   : "bg-white/5 border-white/5 text-zinc-500 hover:text-white hover:bg-white/10"
                               )}
                             >
                               ¥{val}
                             </button>
                           ))}
                        </div>
                        
                        <div className="flex items-center justify-between p-6 bg-black/40 rounded-3xl border border-white/5">
                           <div>
                              <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest mb-1">您将获得 You Receive</p>
                              <p className="text-4xl font-black text-white tracking-tighter">{parseInt(rechargeAmount) * 10} <span className="text-xs font-black text-brand-gold uppercase tracking-widest ml-1">Pts</span></p>
                           </div>
                           <Wallet className="h-8 w-8 text-white/10" />
                        </div>

                        <button 
                          onClick={() => setIsRechargeOpen(false)}
                          className="w-full btn-primary py-5 text-xs"
                        >
                          确认并支付 Confirm & Pay
                        </button>
                     </div>
                   </motion.div>
                 </div>
               )}
             </AnimatePresence>

             {activeTab === 'monitoring' && (
               <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-8">
                    <div>
                       <h2 className="text-3xl font-black uppercase tracking-tighter text-white">模型监控 Monitoring</h2>
                       <p className="text-xs text-zinc-500 mt-2 font-bold uppercase tracking-widest">实时观测模型调用分布与资源损耗</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                     {[
                       { label: '平均延迟 Latency', value: '345ms', trend: '-12%', positive: true },
                       { label: '消耗量 Tokens', value: '1.24M', trend: '+5%', positive: false },
                       { label: '错误率 Errors', value: '0.02%', trend: 'Stable', positive: true },
                       { label: '并发 Concurrency', value: '42', trend: '+8', positive: false },
                     ].map((stat, i) => (
                       <div key={i} className="card-bento p-6">
                          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">{stat.label}</p>
                          <div className="flex items-baseline justify-between">
                            <p className="text-2xl font-black text-white">{stat.value}</p>
                            <span className={cn(
                              "text-[10px] font-black uppercase",
                              stat.positive ? "text-emerald-500" : "text-brand-gold"
                            )}>
                              {stat.trend}
                            </span>
                          </div>
                       </div>
                     ))}
                  </div>

                  <div className="card-bento overflow-hidden">
                     <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                        <div className="flex items-center gap-3">
                          <Search className="h-4 w-4 text-zinc-700" />
                          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">调用日志 Request Logs</span>
                        </div>
                        <button className="text-[10px] font-black uppercase text-zinc-500 hover:text-brand-gold tracking-widest">更多筛选 Filters</button>
                     </div>
                     <div className="divide-y divide-white/5">
                        {[
                          { id: 'req_8723x', model: 'gpt-5.4', tokens: '1,244', cost: '12.4 pts', time: '12:45:01' },
                          { id: 'req_8722a', model: 'claude-3-5-sonnet', tokens: '4,102', cost: '85.2 pts', time: '12:42:15' },
                          { id: 'req_8721c', model: 'deepseek-r1', tokens: '215', cost: '0.5 pts', time: '12:40:02' },
                        ].map((log) => (
                          <div key={log.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors group">
                            <div className="flex items-center gap-6">
                              <p className="font-mono text-zinc-700 text-[10px] w-20 group-hover:text-zinc-500 transition-colors uppercase tracking-widest">{log.id}</p>
                              <div className="w-40">
                                <span className="font-black text-white group-hover:text-brand-gold transition-colors">{log.model}</span>
                                <p className="text-[9px] text-zinc-700 uppercase tracking-widest mt-0.5">{log.time}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-12 flex-1">
                               <div className="text-right">
                                 <p className="font-black text-white">{log.tokens}</p>
                                 <p className="text-[9px] text-zinc-700 uppercase tracking-widest">Tokens</p>
                               </div>
                               <div className="text-right w-20">
                                 <p className="font-black text-brand-gold">{log.cost}</p>
                                 <p className="text-[9px] text-zinc-700 uppercase tracking-widest">Cost</p>
                               </div>
                               <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded font-black text-[10px] border border-emerald-500/20">200 OK</span>
                            </div>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
             )}

             {activeTab === 'orders' && (
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-8">
                     <div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-white">订单发票 Orders</h2>
                        <p className="text-xs text-zinc-500 mt-2 font-bold uppercase tracking-widest">管理历史交易与开具电子发票</p>
                     </div>
                     <button 
                      onClick={() => setIsInvoiceModalOpen(true)}
                      className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-2xl text-xs font-black tracking-widest uppercase hover:bg-white/10 transition-all flex items-center gap-3"
                     >
                       <FileText className="h-4 w-4" /> 发票抬头管理
                     </button>
                  </div>

                  <div className="card-bento overflow-hidden">
                     <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">所有订单 List</span>
                        <div className="flex gap-2">
                           <button className="p-2 hover:bg-white/5 rounded-xl transition-all"><Download className="h-4 w-4 text-zinc-700" /></button>
                           <button className="p-2 hover:bg-white/5 rounded-xl transition-all"><Filter className="h-4 w-4 text-zinc-700" /></button>
                        </div>
                     </div>
                     <div className="overflow-x-auto">
                        <table className="w-full text-left">
                           <thead>
                              <tr className="bg-white/5 text-[10px] font-black text-zinc-600 uppercase tracking-widest border-b border-white/5">
                                 <th className="px-6 py-5">订单号 Order ID</th>
                                 <th className="px-6 py-5">商品 Item</th>
                                 <th className="px-6 py-5">金额 Amount</th>
                                 <th className="px-6 py-5">时间 Date</th>
                                 <th className="px-6 py-5 text-right">操作 Action</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-white/5">
                              {[
                                { id: '728341', name: '点数充值 1000 PTS', price: '¥100.00', date: '2026-05-04' },
                                { id: '728112', name: 'ChatGPT Plus 订阅', price: '¥145.00', date: '2026-05-01' },
                              ].map(order => (
                                <tr key={order.id} className="text-xs hover:bg-white/[0.02] transition-colors group">
                                   <td className="px-6 py-6 font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors">{order.id}</td>
                                   <td className="px-6 py-6 font-bold text-white group-hover:text-brand-gold transition-colors">{order.name}</td>
                                   <td className="px-6 py-6 font-black text-white">{order.price}</td>
                                   <td className="px-6 py-6 text-zinc-500">{order.date}</td>
                                   <td className="px-6 py-6 text-right">
                                      <button className="text-brand-gold font-black uppercase tracking-widest hover:underline">点击开票</button>
                                   </td>
                                </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
                </div>
             )}

             {activeTab === 'referral' && (
                <div className="space-y-8">
                  <div className="flex flex-col xl:flex-row gap-8 items-center bg-zinc-900 rounded-[40px] p-8 md:p-10 text-white overflow-hidden relative group">
                     {/* Background Pattern */}
                     <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-gold/40 to-transparent" />
                        <div className="grid grid-cols-12 gap-4 h-full w-full opacity-20 rotate-12 scale-150">
                           {Array.from({ length: 48 }).map((_, i) => (
                             <div key={i} className="h-32 border border-white/10 rounded-3xl" />
                           ))}
                        </div>
                     </div>

                     <div className="flex-1 space-y-6 relative z-10 text-center xl:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/30 text-brand-gold text-[10px] font-black uppercase tracking-widest">
                          Affiliate System v4.0
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9]">
                          邀请好友加入 <br/> 
                          <span className="text-brand-gold">获取 15% 永久佣金</span>
                        </h2>
                        <p className="text-zinc-500 text-sm max-w-md leading-relaxed font-bold mx-auto xl:mx-0">
                          邀请开发者、企业或工作室使用 LLMGate，每笔点数消耗您都将获得现金奖励。
                        </p>
                        
                        <div className="pt-2 flex flex-col sm:flex-row gap-4">
                           <div className="flex-1 bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between group/link">
                              <span className="text-xs font-mono text-zinc-500 truncate mr-4">https://llmgate.co/ref=jd_8k2l</span>
                              <button className="h-9 w-9 rounded-xl bg-brand-gold text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shrink-0 shadow-lg shadow-brand-gold/20">
                                 <Copy className="h-4 w-4" />
                              </button>
                           </div>
                           <button className="btn-primary px-8 py-4 font-black uppercase text-xs tracking-widest shadow-2xl shadow-brand-gold/30">
                              生成海报 POSTER
                           </button>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-2">
                     {[
                       { label: '累计邀请人数 Total', value: '12' },
                       { label: '待结算收益 (PTS) Pending', value: '1,420' },
                       { label: '累计预估收益 Lifetime', value: '¥240.50' },
                     ].map((stat, i) => (
                       <div key={i} className="card-bento p-8">
                          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">{stat.label}</p>
                          <p className="text-3xl font-black text-white tracking-tighter">{stat.value}</p>
                       </div>
                     ))}
                  </div>
                </div>
             )}

             {/* Invoice Management Modal */}
             <AnimatePresence>
               {isInvoiceModalOpen && (
                 <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="absolute inset-0 bg-brand-bg/80 backdrop-blur-md"
                     onClick={() => {
                        setIsInvoiceModalOpen(false);
                        setIsAddingHeader(false);
                     }}
                   />
                   <motion.div
                     initial={{ opacity: 0, scale: 0.95, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.95, y: 20 }}
                     className="relative w-full max-w-2xl overflow-hidden rounded-[40px] bg-zinc-900 shadow-[0_32px_80px_rgba(0,0,0,0.5)] border border-white/10 p-10"
                   >
                     <div className="flex justify-between items-center mb-10">
                       <div>
                         <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                           {isAddingHeader ? '添加新抬头 New Header' : '发票抬头管理 Invoice Headers'}
                         </h2>
                         <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">
                           {isAddingHeader ? '请输入抬头详细信息或点击自动识别' : '管理维护您的企业及个人开票信息'}
                         </p>
                       </div>
                       <button onClick={() => {
                          setIsInvoiceModalOpen(false);
                          setIsAddingHeader(false);
                       }} className="h-10 w-10 flex items-center justify-center hover:bg-white/5 rounded-2xl transition-all">
                         <X className="h-6 w-6 text-zinc-500" />
                       </button>
                     </div>

                     {isAddingHeader ? (
                       <div className="space-y-6 mb-10">
                          <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest ml-1">抬头类型 Type</label>
                                <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1">
                                   <button 
                                    onClick={() => setNewHeader({...newHeader, type: '企业'})}
                                    className={cn("flex-1 py-2 text-[10px] font-black uppercase rounded-xl transition-all", newHeader.type === '企业' ? "bg-brand-gold text-black shadow-md" : "text-zinc-500 hover:text-white")}
                                   >企业</button>
                                   <button 
                                    onClick={() => setNewHeader({...newHeader, type: '个人'})}
                                    className={cn("flex-1 py-2 text-[10px] font-black uppercase rounded-xl transition-all", newHeader.type === '个人' ? "bg-brand-gold text-black shadow-md" : "text-zinc-500 hover:text-white")}
                                   >个人 / 其他</button>
                                </div>
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest ml-1">智能辅助 AI</label>
                                <button 
                                  onClick={handleRecognize}
                                  className="w-full h-11 bg-brand-gold/10 border border-brand-gold/20 rounded-2xl flex items-center justify-center gap-2 text-brand-gold text-[10px] font-black uppercase hover:bg-brand-gold/20 transition-all"
                                >
                                   <Scan className="h-3.5 w-3.5" /> 智能识别填充
                                </button>
                             </div>
                          </div>

                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest ml-1">{newHeader.type === '企业' ? '单位全称' : '个人姓名'} Full Name</label>
                             <input 
                               type="text" 
                               value={newHeader.name}
                               onChange={(e) => setNewHeader({...newHeader, name: e.target.value})}
                               className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-6 text-sm text-white focus:outline-none focus:border-brand-gold/30 transition-all font-bold" 
                               placeholder={newHeader.type === '企业' ? "请输入营业执照上的名称" : "请输入姓名"} 
                             />
                          </div>

                          {newHeader.type === '企业' && (
                             <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-zinc-600 tracking-widest ml-1">纳税人识别号 Tax ID</label>
                                <div className="relative">
                                   <input 
                                     type="text" 
                                     value={newHeader.taxId}
                                     onChange={(e) => setNewHeader({...newHeader, taxId: e.target.value})}
                                     className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-6 text-sm text-white focus:outline-none focus:border-brand-gold/30 transition-all font-bold font-mono" 
                                     placeholder="通常为 18 位社会统一信用代码" 
                                   />
                                   <button className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-700 hover:text-brand-gold" onClick={() => {
                                      navigator.clipboard.writeText(newHeader.taxId);
                                   }}>
                                      <Copy className="h-4 w-4" />
                                   </button>
                                </div>
                             </div>
                          )}

                          <div className="flex gap-4 pt-4">
                             <button 
                               onClick={() => setIsAddingHeader(false)}
                               className="flex-1 py-4 bg-white/5 text-zinc-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
                             >
                               取消 Cancel
                             </button>
                             <button 
                               onClick={() => setIsAddingHeader(false)}
                               className="flex-[2] py-4 bg-brand-gold text-black rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-gold/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                             >
                               保存抬头 Save Header
                             </button>
                          </div>
                       </div>
                     ) : (
                       <>
                         <div className="space-y-4 mb-10">
                           {invoiceHeaders.map((header) => (
                             <div key={header.id} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-between group">
                                <div className="flex items-center gap-6">
                                   <div className="h-12 w-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold border border-brand-gold/20">
                                      <FileText className="h-6 w-6" />
                                   </div>
                                   <div>
                                      <div className="flex items-center gap-3">
                                         <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-white/5 text-zinc-500 border border-white/10">{header.type}</span>
                                         <p className="text-sm font-bold text-white">{header.name}</p>
                                      </div>
                                      <p className="text-xs text-zinc-600 font-mono mt-1 uppercase tracking-widest">Tax ID: {header.taxId}</p>
                                   </div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <button className="text-[10px] font-black uppercase text-zinc-500 hover:text-white underline">编辑</button>
                                   <button className="text-[10px] font-black uppercase text-rose-500 hover:underline">删除</button>
                                </div>
                             </div>
                           ))}
                           
                           <button 
                            onClick={() => setIsAddingHeader(true)}
                            className="w-full p-6 rounded-3xl border border-white/5 border-dashed flex items-center justify-center gap-3 text-zinc-500 hover:text-brand-gold hover:border-brand-gold/30 hover:bg-brand-gold/[0.02] transition-all group"
                           >
                              <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
                              <span className="text-xs font-black uppercase tracking-widest">添加新抬头 Add New Header</span>
                           </button>
                         </div>

                         <button 
                           onClick={() => {
                              setIsInvoiceModalOpen(false);
                              setIsAddingHeader(false);
                           }}
                           className="w-full bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
                         >
                           完成管理 Finish
                         </button>
                       </>
                     )}
                   </motion.div>
                 </div>
               )}
             </AnimatePresence>

             {activeTab === 'support' && (
               <div className="space-y-8">
                  <div className="flex flex-col sm:items-center text-center gap-4 border-b border-white/5 pb-8">
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-white">工单反馈 Support</h2>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">如有任何技术问题或建议，请随时反馈</p>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center py-24 rounded-[40px] border border-white/5 bg-white/[0.01] overflow-hidden relative">
                    <div className="absolute inset-0 bg-brand-gold/5 blur-[120px] opacity-20" />
                    <div className="relative z-10 text-center space-y-6">
                      <div className="h-20 w-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto border border-brand-gold/20">
                        <LifeBuoy className="h-10 w-10 text-brand-gold/40" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">工单系统维护中</h3>
                        <p className="text-zinc-500 text-sm mt-2 font-bold max-w-sm mx-auto">
                          为了提供更高效的服务，工单系统正在进行架构升级。如有紧急需求，请点击右下角发起【在线会话】。
                        </p>
                      </div>
                      <button 
                         onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
                         className="btn-primary py-3 px-8 text-xs font-black uppercase tracking-widest"
                      >
                        发起实时对话 Contact Chat
                      </button>
                    </div>
                  </div>
               </div>
             )}
          </main>
        </div>
      </div>
    </div>
  );
}
