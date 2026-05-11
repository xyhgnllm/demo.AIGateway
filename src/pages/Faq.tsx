import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, Search, ChevronDown, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Getting Started
  {
    category: '入门指南',
    question: 'LLMGate 是什么？',
    answer: 'LLMGate 是一个统一的 AI API 中转网关。它允许开发者通过一个标准的 OpenAI 兼容接口，访问全球顶尖的 AI 模型（如 GPT-4、Claude 3.5、Gemini 1.5 Pro 等），并提供详细的用量监控与成本结算功能。'
  },
  {
    category: '入门指南',
    question: '我需要准备什么才能开始？',
    answer: '您只需要注册一个 LLMGate 账户，进入控制台充值少量点数 (PTS)，并生成一个 API Key 即可。无需海外支付卡，无需手动维护多个供应商账号。'
  },
  {
    category: '入门指南',
    question: '如何替换我现有的 OpenAI URL？',
    answer: '大部分 SDK 都支持 baseURL 或 base_url 参数。将其修改为 https://api.llmgate.co/v1，并使用我们在后台生成的 API Key，即可完成迁移。'
  },
  
  // Billing
  {
    category: '计费与点数',
    question: '点数 (PTS) 是如何消耗的？',
    answer: '点数根据您调用的模型及其具体 Token 消耗量换算。每种模型都有其确定的每百万 Token 单价。我们会实时从您的账户余额中扣除对应的 PTS。'
  },
  {
    category: '计费与点数',
    question: '支持哪些支付方式？',
    answer: '我们目前支持支付宝、微信支付以及通过私聊客服进行的 USDT 支付或企业对公转账。'
  },
  {
    category: '计费与点数',
    question: '点数会过期吗？',
    answer: '您的充值点数永久有效，除非您注销账户，否则点数余额不会因为时间到期而清零。'
  },
  
  // Models & Performance
  {
    category: '模型与性能',
    question: '支持流式输出 (Streaming) 吗？',
    answer: '完全支持。我们在网关层对 Server-Sent Events (SSE) 进行了深度优化，确保流式响应的延迟与上游供应商保持一致，甚至通过节点加速实现更快的首字响应。'
  },
  {
    category: '模型与性能',
    question: '是否支持模型 Function Calling (Tools)？',
    answer: '支持。只要该模型原生支持 Tools 调用（如 GPT、Claude、Gemini），我们的网关都能透传对应的工具定义与结果。'
  },
  {
    category: '模型与性能',
    question: '如果上游模型挂了怎么办？',
    answer: '我们的系统会自动监测供应商健康状态。建议在业务层编写简单的回退逻辑。我们也提供自动路由切换服务（定制版），当首选模型超时时自动尝试备用模型。'
  },

  // Security
  {
    category: '安全与隐私',
    question: '我的数据会被用于训练吗？',
    answer: '绝对不会。LLMGate 仅作为透明中转网关，我们与模型供应商均签署了非训练协议。所有通过 API 传输的数据都不会被用于模型改进或训练。'
  },
  {
    category: '安全与隐私',
    question: '如何保护我的 API Key？',
    answer: '请勿在前端代码中暴露 API Key。建议在您的后端服务端存放密钥。您可以为不同的项目设置不同的 Key，并随时在控制台撤销或重置疑似泄露的密钥。'
  }
];

const categories = ['全部', ...Array.from(new Set(faqData.map(item => item.category)))];

export default function Faq() {
  const [activeCategory, setActiveCategory] = React.useState('全部');
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredFaqs = faqData.filter(item => {
    const matchesCategory = activeCategory === '全部' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-brand-bg pt-10 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
              常见 <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-gold to-brand-secondary">问题中心</span>
            </h1>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg leading-relaxed">
              在这里您可以找到关于账号接入、点数计费、模型性能以及数据安全的最新解答。
            </p>
          </motion.div>
          
          {/* Search */}
          <div className="relative max-w-xl mx-auto group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600 group-focus-within:text-brand-gold transition-colors" />
            <input 
              type="text"
              placeholder="搜索您的问题 (例如: 充值, 兼容性...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 bg-white/5 border border-white/5 rounded-3xl pl-16 pr-8 text-white focus:outline-none focus:border-brand-gold/30 focus:bg-white/[0.08] transition-all font-bold placeholder:text-zinc-700"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all border",
                activeCategory === cat 
                  ? "bg-brand-gold text-black border-transparent shadow-lg shadow-brand-gold/20" 
                  : "bg-white/5 border-white/5 text-zinc-500 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
           {filteredFaqs.length > 0 ? (
             filteredFaqs.map((item, idx) => (
               <div 
                key={idx} 
                className={cn(
                  "card-bento overflow-hidden transition-all duration-300",
                  openIndex === idx ? "bg-white/[0.04] border-brand-gold/20" : "bg-white/[0.02]"
                )}
               >
                 <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between group"
                 >
                   <div className="flex items-center gap-4">
                      <div className={cn(
                        "h-8 w-8 rounded-lg flex items-center justify-center transition-all",
                        openIndex === idx ? "bg-brand-gold text-black" : "bg-white/5 text-zinc-700 group-hover:bg-white/10 group-hover:text-brand-gold"
                      )}>
                        <HelpCircle className="h-5 w-5" />
                      </div>
                      <span className={cn(
                        "text-lg font-bold transition-colors",
                        openIndex === idx ? "text-white" : "text-zinc-400 group-hover:text-white"
                      )}>
                        {item.question}
                      </span>
                   </div>
                   <div className={cn(
                     "h-6 w-6 rounded-full flex items-center justify-center transition-all duration-500 border border-white/5",
                     openIndex === idx ? "rotate-180 bg-brand-gold/20 text-brand-gold" : "text-zinc-700"
                   )}>
                     <ChevronDown className="h-4 w-4" />
                   </div>
                 </button>
                 
                 <div className={cn(
                   "overflow-hidden transition-all duration-300 ease-in-out",
                   openIndex === idx ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                 )}>
                   <div className="px-6 pb-6 pt-2">
                     <div className="pl-12 border-l border-brand-gold/20 ml-4 py-2">
                        <p className="text-zinc-500 text-base leading-relaxed font-bold">
                          {item.answer}
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                           <span className="text-[10px] font-black uppercase text-zinc-600 tracking-widest px-2 py-0.5 rounded border border-white/5">
                             Category: {item.category}
                           </span>
                           <button className="text-[10px] font-black uppercase text-brand-gold hover:underline tracking-widest">
                             这是否有帮助？
                           </button>
                        </div>
                     </div>
                   </div>
                 </div>
               </div>
             ))
           ) : (
             <div className="py-20 text-center">
                <div className="h-20 w-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                   <Search className="h-8 w-8 text-zinc-700" />
                </div>
                <h3 className="text-xl font-bold text-zinc-600">未找到相关问题</h3>
                <p className="text-sm text-zinc-700 mt-2">试试其他关键词，或者直接联系人工客服。</p>
             </div>
           )}
        </div>

        {/* Contact Support */}
        <div className="mt-20 card-bento p-10 bg-zinc-900 border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">没找到您的答案？</h3>
              <p className="text-zinc-500 font-bold">我们的支持团队在 72 小时内随时待命。</p>
           </div>
           <div className="flex gap-4">
              <Link to="/docs" className="btn-secondary py-3 px-8 text-xs">查看社区知识库</Link>
              <Link to="/contact" className="btn-primary py-3 px-8 text-xs">联系人工支持</Link>
           </div>
        </div>

      </div>
    </div>
  );
}
