import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ArrowUpDown, ChevronRight, Zap, Database, Clock, Coins, Info, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

// Unified model data from user request
const MODELS_PRICING = [
  { name: 'qwen3.5-plus', provider: 'Alibaba', input: 8.05, output: 48.16, cacheRead: 0.805, cacheWrite: 10.0625 },
  { name: 'qwen3.5-flash', provider: 'Alibaba', input: 2.03, output: 20.09, cacheRead: 0.203, cacheWrite: 2.5375 },
  { name: 'qwen3.6-plus', provider: 'Alibaba', input: 19.32, output: 115.57, cacheRead: 1.932, cacheWrite: 24.15 },
  { name: 'qwen3-coder-plus', provider: 'Alibaba', input: 40.18, output: 160.58, cacheRead: 4.018, cacheWrite: 50.225 },
  { name: 'kimi-k2.6', provider: 'Moonshot', input: 66.5, output: 280, cacheRead: 11.2, cacheWrite: 66.5 },
  { name: 'kimi-k2.5', provider: 'Moonshot', input: 42, output: 210, cacheRead: 7, cacheWrite: 42 },
  { name: 'MiniMax-M2.7', provider: 'MiniMax', input: 21, output: 84, cacheRead: 4.2, cacheWrite: 26.25 },
  { name: 'MiniMax-M2.5', provider: 'MiniMax', input: 21, output: 84, cacheRead: 4.2, cacheWrite: 26.25 },
  { name: 'glm-5.1', provider: 'Zhipu', input: 112, output: 352, cacheRead: 20.8, cacheWrite: 0 },
  { name: 'claude-3-5-sonnet', provider: 'Anthropic', input: 21, output: 105, cacheRead: 2.1, cacheWrite: 26.25 },
  { name: 'gpt-4o', provider: 'OpenAI', input: 18, output: 72, cacheRead: 1.8, cacheWrite: 22.5 },
];

interface Model {
  name: string;
  description: string;
  provider: string;
  type: string;
  context: number;
  input: number;
  output: number;
  cacheRead: number;
  cacheWrite: number;
  featured?: boolean;
}

const PROVIDERS = [
  "Alibaba", "Anthropic", "DeepSeek", "Google", "Meta", "MiniMax", 
  "Mistral", "Moonshot", "NVIDIA", "OpenAI", "StepFun", "Xiaomi", "Zhipu", "xAI"
];

const MODELS: Model[] = [
  ...MODELS_PRICING.map(m => ({
    ...m,
    description: `高性能 ${m.provider} 模型，提供统一接口接入。适用于各类智能化应用场景。`,
    type: 'Text',
    context: 128000,
    featured: m.name.includes('plus') || m.name.includes('sonnet') || m.name.includes('4o')
  }))
];

const MODEL_TYPES = ["All", "Text", "Image", "Embeddings", "Audio", "Video"];

export default function Models() {
  const [keyword, setKeyword] = useState('');
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [minContext, setMinContext] = useState<number>(0);
  const [maxPricing, setMaxPricing] = useState<number>(0);
  const [activeType, setActiveType] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'explorer' | 'pricing'>('pricing');

  const filteredModels = useMemo(() => {
    let list = [...MODELS];

    // Search
    if (keyword) {
      const k = keyword.toLowerCase();
      list = list.filter(m => 
        m.name.toLowerCase().includes(k) || 
        m.description.toLowerCase().includes(k) || 
        m.provider.toLowerCase().includes(k)
      );
    }

    // Provider
    if (selectedProviders.length > 0) {
      list = list.filter(m => selectedProviders.includes(m.provider));
    }

    // Type
    if (activeType !== 'All') {
      list = list.filter(m => m.type === activeType);
    }

    // Context
    if (minContext > 0) {
      list = list.filter(m => m.context >= minContext);
    }

    // Pricing
    if (maxPricing > 0) {
      list = list.filter(m => m.input <= maxPricing);
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'context_desc') return b.context - a.context;
      if (sortBy === 'input_asc') return a.input - b.input;
      if (sortBy === 'output_asc') return a.output - b.output;
      
      // Default: Featured
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

    return list;
  }, [keyword, selectedProviders, activeType, minContext, maxPricing, sortBy]);

  const toggleProvider = (p: string) => {
    setSelectedProviders(current => 
      current.includes(p) ? current.filter(item => item !== p) : [...current, p]
    );
  };

  const formatContext = (val: number) => {
    if (val >= 1000000) return `${val / 1000000}M`;
    if (val >= 1000) return `${val / 1000}K`;
    return val;
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-10 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-black uppercase tracking-widest mb-4">
              <Zap className="h-3 w-3 fill-current" /> Unified Model Router
            </div>
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
              可用 <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-gold to-brand-secondary">模型列表</span>
            </h1>
            <p className="text-zinc-500 text-lg">
              所有模型通过统一的 OpenAI 兼容接口即可调用。实时监控、按量计费、极速响应。
            </p>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
             <button 
              onClick={() => setViewMode('pricing')}
              className={cn(
                "px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                viewMode === 'pricing' ? "bg-brand-gold text-black shadow-lg" : "text-zinc-500 hover:text-white"
              )}
             >
               价格表 Table
             </button>
             <button 
              onClick={() => setViewMode('explorer')}
              className={cn(
                "px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                viewMode === 'explorer' ? "bg-brand-gold text-black shadow-lg" : "text-zinc-500 hover:text-white"
              )}
             >
               探索卡片 Cards
             </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar Filters */}
          <aside className={cn(
            "lg:w-64 w-full flex-shrink-0 space-y-8 lg:sticky lg:top-28 transition-all",
            isFilterOpen ? "block" : "hidden lg:block"
          )}>
            <div className="card-bento p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-xs uppercase tracking-widest text-brand-gold">筛选条件 Filters</h3>
                <button 
                  onClick={() => {
                    setSelectedProviders([]);
                    setMinContext(0);
                    setMaxPricing(0);
                  }}
                  className="text-[10px] uppercase font-bold text-zinc-500 hover:text-white transition-colors"
                >
                  重置 Reset
                </button>
              </div>

              <div className="space-y-8">
                {/* Providers */}
                <div>
                  <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-4">模型供应商 Provider</p>
                  <div className="grid grid-cols-1 gap-2">
                    {PROVIDERS.slice(0, 10).map((p) => (
                      <label key={p} className="flex items-center gap-3 group cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={selectedProviders.includes(p)}
                          onChange={() => toggleProvider(p)}
                          className="w-4 h-4 rounded bg-white/5 border-white/10 text-brand-gold focus:ring-offset-brand-bg focus:ring-brand-gold"
                        />
                        <span className="text-[13px] font-bold text-zinc-500 group-hover:text-white transition-colors">{p}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Context Length */}
                <div>
                  <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-4">上下文长度 Context</p>
                  <div className="grid grid-cols-1 gap-3">
                    {[0, 32000, 128000, 1000000].map((val) => (
                      <label key={val} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="context" 
                          checked={minContext === val}
                          onChange={() => setMinContext(val)}
                          className="w-4 h-4 bg-white/5 border-white/10 text-brand-gold focus:ring-offset-brand-bg focus:ring-brand-gold" 
                        />
                        <span className="text-[13px] font-bold text-zinc-500 group-hover:text-white">
                          {val === 0 ? '不限 Any' : `${formatContext(val)}+`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 w-full space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:max-w-md group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-brand-gold transition-colors" />
                <input 
                  type="text" 
                  placeholder="搜索模型名称或关键描述..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full bg-brand-card border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-brand-gold/30 focus:shadow-[0_0_20px_rgba(234,179,8,0.05)] transition-all"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden flex-1 btn-secondary py-4 flex items-center justify-center gap-2"
                >
                  <Filter className="h-4 w-4" /> 筛选 Filters
                </button>
              </div>
            </div>

            {viewMode === 'pricing' ? (
               <div className="card-bento overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="bg-white/5 text-[10px] font-black text-zinc-600 uppercase tracking-widest border-b border-white/5">
                             <th className="px-6 py-5">Model 模型</th>
                             <th className="px-6 py-5">Provider 供应商</th>
                             <th className="px-6 py-5">Input 输入</th>
                             <th className="px-6 py-5">Output 输出</th>
                             <th className="px-6 py-5">Cache Read 缓存读</th>
                             <th className="px-6 py-5">Cache Write 缓存写</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5">
                          {filteredModels.map((model) => (
                             <tr key={model.name} className="text-xs hover:bg-white/[0.02] transition-colors group">
                                <td className="px-6 py-6 font-bold text-white group-hover:text-brand-gold transition-colors">{model.name}</td>
                                <td className="px-6 py-6 text-zinc-500 uppercase font-black tracking-widest">{model.provider}</td>
                                <td className="px-6 py-6">
                                   <div className="flex flex-col">
                                      <span className="font-mono font-black text-brand-gold">{model.input} Credits</span>
                                      <span className="text-[9px] text-zinc-600 uppercase">/ 1M pts</span>
                                   </div>
                                </td>
                                <td className="px-6 py-6">
                                   <div className="flex flex-col">
                                      <span className="font-mono font-black text-white">{model.output} Credits</span>
                                      <span className="text-[9px] text-zinc-600 uppercase">/ 1M pts</span>
                                   </div>
                                </td>
                                <td className="px-6 py-6 text-zinc-500 font-mono">{model.cacheRead} pts</td>
                                <td className="px-6 py-6 text-zinc-500 font-mono">{model.cacheWrite > 0 ? `${model.cacheWrite} pts` : '-'}</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                  </div>
               </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredModels.map((model, idx) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2, delay: idx * 0.05 }}
                      key={model.name}
                      className="card-bento p-6 md:p-8 flex flex-col md:flex-row gap-8 group relative overflow-hidden"
                    >
                      {model.featured && (
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-3xl pointer-events-none" />
                      )}
                      
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-brand-gold text-xl group-hover:scale-110 transition-transform">
                            {model.provider.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-3">
                              <h3 className="text-xl font-bold text-white group-hover:text-brand-gold transition-colors">{model.name}</h3>
                              {model.featured && (
                                <span className="px-2 py-0.5 rounded-md bg-brand-gold/10 text-brand-gold text-[8px] font-black uppercase tracking-widest border border-brand-gold/20">Featured</span>
                              )}
                            </div>
                            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mt-0.5">{model.provider}</p>
                          </div>
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">{model.description}</p>
                        
                        <div className="flex flex-wrap gap-4 pt-2">
                          <div className="flex items-center gap-2 text-zinc-500 text-[11px] font-bold uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                             <Database className="h-3 w-3" /> {formatContext(model.context)} Context
                          </div>
                          <div className="flex items-center gap-2 text-zinc-500 text-[11px] font-bold uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                             <Zap className="h-3 w-3" /> {model.type}
                          </div>
                        </div>
                      </div>

                      <div className="md:w-72 grid grid-cols-2 gap-3 shrink-0">
                         <div className="bg-white/5 border border-white/10 rounded-2xl p-4 group-hover:border-brand-gold/20 transition-colors">
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                               <Clock className="h-2.5 w-2.5" /> Input rate
                            </p>
                            <p className="text-lg font-mono font-black text-brand-gold tracking-tighter">¥{model.input} <span className="text-[10px] opacity-40 ml-0.5 uppercase tracking-normal">/ 1M pts</span></p>
                         </div>
                         <div className="bg-white/5 border border-white/10 rounded-2xl p-4 group-hover:border-brand-gold/20 transition-colors">
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                               <Clock className="h-2.5 w-2.5" /> Output rate
                            </p>
                            <p className="text-lg font-mono font-black text-white tracking-tighter">¥{model.output} <span className="text-[10px] opacity-40 ml-0.5 uppercase tracking-normal">/ 1M pts</span></p>
                         </div>
                         <div className="bg-white/5 border border-white/10 rounded-2xl p-4 col-span-2 flex items-center justify-between group-hover:bg-brand-gold/5 transition-all">
                            <div className="flex items-center gap-4">
                              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                                 Cache Hits: <span className="text-white ml-1">10% Rate</span>
                              </div>
                              <div className="w-[1px] h-3 bg-white/10" />
                              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                                 Latency: <span className="text-white ml-1">~350ms</span>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-zinc-700 group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                         </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filteredModels.length === 0 && (
                  <div className="card-bento p-20 flex flex-col items-center justify-center text-center gap-4">
                     <div className="h-16 w-16 rounded-3xl bg-white/5 flex items-center justify-center text-zinc-600">
                        <Search className="h-8 w-8" />
                     </div>
                     <div>
                       <h3 className="text-xl font-bold text-white mb-2">未找到匹配模型</h3>
                       <p className="text-zinc-500 text-sm">尝试更换关键词或清除筛选条件</p>
                     </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
