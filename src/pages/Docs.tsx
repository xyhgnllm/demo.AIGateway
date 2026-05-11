import React from 'react';
import { motion } from 'motion/react';
import { 
  ChevronRight, 
  Terminal, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Globe, 
  Code2, 
  BookOpen, 
  Info, 
  AlertCircle,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

interface NavItem {
  id: string;
  label: string;
  subItems?: { id: string; label: string }[];
}

const docNav: NavItem[] = [
  {
    id: 'overview',
    label: '概览 Overview',
    subItems: [
      { id: 'introduction', label: '介绍 Introduction' },
      { id: 'quickstart', label: '快速开始 Quickstart' },
      { id: 'authentication', label: '身份验证 Auth' },
    ]
  },
  {
    id: 'api-reference',
    label: 'API 参考 Reference',
    subItems: [
      { id: 'chat-completions', label: '对话生成 Chat' },
      { id: 'models', label: '模型列表 Models' },
      { id: 'errors', label: '错误代码 Errors' },
    ]
  },
  {
    id: 'guides',
    label: '实践指南 Guides',
    subItems: [
      { id: 'pricing', label: '计费说明 Pricing' },
      { id: 'sdk', label: 'SDK 示例 SDKs' },
    ]
  }
];

export default function Docs() {
  const [activeSection, setActiveSection] = React.useState('introduction');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-white pt-20 pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-32 space-y-8">
              {docNav.map((group) => (
                <div key={group.id}>
                  <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4 px-4">{group.label}</h4>
                  <nav className="space-y-1">
                    {group.subItems?.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setActiveSection(item.id)}
                        className={cn(
                          "flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-all group",
                          activeSection === item.id 
                            ? "bg-brand-gold text-black shadow-lg shadow-brand-gold/20" 
                            : "text-zinc-500 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {item.label}
                        <ChevronRight className={cn("h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity", activeSection === item.id && "opacity-100")} />
                      </a>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 max-w-3xl space-y-24">
            
            {/* Introduction */}
            <section id="introduction" className="scroll-mt-32">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-black uppercase tracking-widest mb-6">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                Version 1.2.0 GA
              </div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-8">
                LLMGate <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-gold to-brand-secondary">开发者文档</span>
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                LLMGate 提供统一的 AI 模型 API 路由网关。通过 OpenAI 兼容的接口协议，您可以轻松调用全球主流模型供应商（Anthropic, OpenAI, Google, DeepSeek 等）。
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Terminal, title: '兼容协议', desc: '完美兼容 OpenAI SDK 与 API 规范' },
                  { icon: ShieldCheck, title: '安全隔离', desc: '多级 API Key 权限管控与独立配额' },
                  { icon: Zap, title: '极低延迟', desc: '全球多节点智能寻址与并发加速' },
                  { icon: Cpu, title: '模型聚合', desc: '一键接入 50+ 顶级大模型资源' },
                ].map((item, i) => (
                  <div key={i} className="card-bento p-5 border-white/5 bg-white/[0.02]">
                    <item.icon className="h-5 w-5 text-brand-gold mb-3" />
                    <h4 className="font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-zinc-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Quickstart */}
            <section id="quickstart" className="scroll-mt-32">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">快速开始 Quickstart</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="h-8 w-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-xs font-black text-brand-gold shrink-0 mt-1">1</div>
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold">创建 API Key</h4>
                    <p className="text-zinc-500 text-sm">在 <Link to="/dashboard" className="text-brand-gold hover:underline">管理后台</Link> 中创建一个 LLM_LIVE 系列密钥。密钥仅在创建时完整展示，请妥善保管。</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="h-8 w-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-xs font-black text-brand-gold shrink-0 mt-1">2</div>
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold">修改接口地址</h4>
                    <p className="text-zinc-500 text-sm">将您的应用或 SDK 中的 Base URL 替换为：</p>
                    <div className="bg-black border border-white/5 rounded-xl p-4 font-mono text-sm text-brand-gold flex items-center justify-between group">
                      <code>https://api.llmgate.co/v1</code>
                      <button onClick={() => copyToClipboard('https://api.llmgate.co/v1')} className="p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/5 rounded-lg">
                        <Copy className="h-4 w-4 text-zinc-500" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="h-8 w-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-xs font-black text-brand-gold shrink-0 mt-1">3</div>
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold">完成首次调用</h4>
                    <div className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                       <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/5">
                          <span className="text-[10px] uppercase font-black text-zinc-500 tracking-widest">CURL Request</span>
                          <button onClick={() => copyToClipboard('curl https://api.llmgate.co/v1/chat/completions ...')} className="text-[10px] font-black text-zinc-500 hover:text-white transition-colors">COPY</button>
                       </div>
                       <pre className="p-6 text-xs text-blue-100/80 font-mono leading-relaxed overflow-x-auto">
{`curl https://api.llmgate.co/v1/chat/completions \\
  -H "Authorization: Bearer $LLMGATE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-3-5-sonnet",
    "messages": [{"role": "user", "content": "Hi!"}]
  }'`}
                       </pre>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Authentication */}
            <section id="authentication" className="scroll-mt-32">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">身份验证 Auth</h2>
              <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-2xl p-6 mb-8 flex gap-4">
                 <Info className="h-6 w-6 text-brand-gold shrink-0" />
                 <p className="text-sm text-zinc-400 font-medium leading-relaxed">
                   所有请求必须包含有效的授权请求头。我们使用 Bearer Token 规范进行身份验证。
                 </p>
              </div>
              <div className="space-y-6">
                 <p className="text-zinc-400 text-sm leading-relaxed">在您的 HTTP 请求头中包含以下内容：</p>
                 <div className="bg-black border border-white/5 rounded-xl p-5 font-mono text-sm">
                    <span className="text-zinc-500 tracking-widest uppercase text-[10px] block mb-2 font-black">Authorization Header</span>
                    <span className="text-white">Authorization: Bearer </span>
                    <span className="text-brand-gold">ll_live_x7K9...2mQp</span>
                 </div>
              </div>
            </section>

            {/* Chat Completions */}
            <section id="chat-completions" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-black uppercase tracking-tighter">对话生成 Chat</h2>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">POST</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                接口地址为 <code className="bg-white/5 px-2 py-0.5 rounded text-brand-gold font-mono">/v1/chat/completions</code>。支持多段对话上下文接入、流式返回（SSE）以及函数调用（Tools）。
              </p>
              
              <div className="space-y-12">
                 <div>
                    <h4 className="text-lg font-bold mb-4">关键请求参数</h4>
                    <div className="overflow-hidden border border-white/5 rounded-2xl">
                       <table className="w-full text-left text-sm">
                          <thead className="bg-white/5 border-b border-white/5">
                             <tr>
                                <th className="px-6 py-4 font-black uppercase tracking-widest text-zinc-500 text-[10px]">参数 Field</th>
                                <th className="px-6 py-4 font-black uppercase tracking-widest text-zinc-500 text-[10px]">类型 Type</th>
                                <th className="px-6 py-4 font-black uppercase tracking-widest text-zinc-500 text-[10px]">必填 Req</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                             <tr>
                                <td className="px-6 py-4 font-mono text-brand-gold">model</td>
                                <td className="px-6 py-4 text-zinc-500">string</td>
                                <td className="px-6 py-4 text-emerald-500">Yes</td>
                             </tr>
                             <tr>
                                <td className="px-6 py-4 font-mono text-brand-gold">messages</td>
                                <td className="px-6 py-4 text-zinc-500">array</td>
                                <td className="px-6 py-4 text-emerald-500">Yes</td>
                             </tr>
                             <tr>
                                <td className="px-6 py-4 font-mono text-brand-gold">stream</td>
                                <td className="px-6 py-4 text-zinc-500">boolean</td>
                                <td className="px-6 py-4 text-zinc-700">No</td>
                             </tr>
                             <tr>
                                <td className="px-6 py-4 font-mono text-brand-gold">temperature</td>
                                <td className="px-6 py-4 text-zinc-500">number</td>
                                <td className="px-6 py-4 text-zinc-700">No</td>
                             </tr>
                          </tbody>
                       </table>
                    </div>
                 </div>

                 <div>
                    <h4 className="text-lg font-bold mb-4">流式返回 (SSE)</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                       在请求体中设置 <code className="text-brand-gold font-mono">stream: true</code>。接口将持续推送消息块直至完成。
                    </p>
                    <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 font-mono text-xs text-blue-100/60 flex flex-col gap-2">
                       <p>{'data: {"id": "chatcmpl-123", "choices": [{"delta": {"content": "Hello"}, "finish_reason": null}]}'}</p>
                       <p>{'data: {"id": "chatcmpl-123", "choices": [{"delta": {"content": "!"}, "finish_reason": "stop"}]}'}</p>
                       <p className="text-zinc-700 font-bold">data: [DONE]</p>
                    </div>
                 </div>
              </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="scroll-mt-32">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">计费说明 Pricing</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {[
                   { title: '按量计费', desc: '根据输入和输出的 Token 数实时扣除账户点数 (PTS)。' },
                   { title: '无过期限制', desc: '充值的点数永久有效，不会因为时间过期而被清零。' },
                   { title: '多端共享', desc: '一个 API Key 下的所有模型共享同一个账户余额配额。' },
                   { title: '透明公开', desc: '每一笔请求都可以在账单中心查询到具体花费。' },
                 ].map((item, i) => (
                   <div key={i} className="card-bento p-6">
                      <h4 className="font-bold text-brand-gold mb-2">{item.title}</h4>
                      <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                   </div>
                 ))}
              </div>
              <div className="mt-8 p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center gap-6">
                 <div>
                    <h4 className="text-xl font-bold">查看实时费率</h4>
                    <p className="text-sm text-zinc-500 mt-2">由于模型供应商价格浮动，我们实时同步最新的费率列表。</p>
                 </div>
                 <Link to="/models" className="btn-primary py-3 px-8 text-xs">
                    查看完整价格表 View Rates
                 </Link>
              </div>
            </section>

            {/* Error Codes */}
            <section id="errors" className="scroll-mt-32">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 text-rose-500">错误代码 Errors</h2>
              <div className="overflow-hidden border border-white/5 rounded-2xl">
                 <table className="w-full text-sm text-left">
                    <thead className="bg-white/5">
                       <tr>
                          <th className="px-6 py-4 font-black uppercase tracking-widest text-zinc-500 text-[10px]">状态 Code</th>
                          <th className="px-6 py-4 font-black uppercase tracking-widest text-zinc-500 text-[10px]">含义 Meaning</th>
                          <th className="px-6 py-4 font-black uppercase tracking-widest text-zinc-500 text-[10px]">解决方案 Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                       {[
                         { status: '401', meaning: '未授权', action: '检查 API Key 是否正确及是否被禁用' },
                         { status: '402', meaning: '点数不足', action: '请前往账户中心进行充值' },
                         { status: '429', meaning: '速率限制', action: '请求过于频繁，请降低并发或申请提额' },
                         { status: '503', meaning: '模型下线', action: '供应商暂时不可用，尝试切换到对标模型' },
                       ].map((err, i) => (
                         <tr key={i}>
                            <td className="px-6 py-4 font-mono font-bold text-white">{err.status}</td>
                            <td className="px-6 py-4 text-zinc-400">{err.meaning}</td>
                            <td className="px-6 py-4 text-zinc-500 text-xs">{err.action}</td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
            </section>

          </main>

          {/* Table of Contents - Hidden on small screens */}
          <aside className="hidden xl:block w-48 shrink-0">
             <div className="sticky top-32">
                <p className="text-[10px] font-black text-zinc-700 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">本页目录 (TOC)</p>
                <div className="flex flex-col gap-4">
                   <a href="#introduction" className="text-xs text-zinc-500 hover:text-brand-gold transition-colors font-bold">项目介绍</a>
                   <a href="#quickstart" className="text-xs text-zinc-500 hover:text-brand-gold transition-colors font-bold">三步快速开始</a>
                   <a href="#authentication" className="text-xs text-zinc-500 hover:text-brand-gold transition-colors font-bold">安全认证说明</a>
                   <a href="#chat-completions" className="text-xs text-zinc-500 hover:text-brand-gold transition-colors font-bold">对话 API 参数</a>
                   <a href="#pricing" className="text-xs text-zinc-500 hover:text-brand-gold transition-colors font-bold">计费与配额</a>
                   <a href="#errors" className="text-xs text-zinc-500 hover:text-brand-gold transition-colors font-bold text-rose-900/50">基础排错指引</a>
                </div>
                <div className="mt-12 p-4 bg-brand-gold/10 rounded-2xl border border-brand-gold/20 flex flex-col items-center gap-3">
                   <p className="text-[10px] text-brand-gold font-black uppercase text-center tracking-tighter">Need Help?</p>
                   <button className="text-[10px] font-bold text-zinc-400 hover:text-white underline">联系技术支持</button>
                </div>
             </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
