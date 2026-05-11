import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, Terminal, Zap, ShieldCheck, Users, 
  Search, Info, Database, Globe, Cpu, CreditCard, 
  MessageSquare, Briefcase, Mail, Download, Filter
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAuth } from '../lib/auth';

const metrics = [
  { value: '50+', label: '可用模型数' },
  { value: '80M+', label: 'API 每日请求数' },
  { value: '99.98%', label: 'Uptime' },
  { value: '12k+', label: '用户数' },
];

const features = [
  {
    icon: <span className="text-xl">¥</span>,
    title: '竞争力价格',
    description: '聚合多家模型供应商，按实际 token 用量计费，帮助团队控制推理成本。',
    link: '/api-service',
    linkText: 'View models'
  },
  {
    icon: <Terminal className="h-5 w-5" />,
    title: 'Unified API',
    description: '一个 API Key 访问多个主流模型。切换模型时只需要修改 model 参数。',
    link: '/api-service',
    linkText: 'Read docs'
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: '隐私安全',
    description: '支持请求隔离、权限控制、密钥管理和敏感信息保护，适合企业内部使用。',
    link: '/api-service',
    linkText: 'Learn more'
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: 'Real-time Analytics',
    description: '实时查看 token 消耗、调用延迟、模型分布、错误率和费用趋势。',
    link: '/dashboard',
    linkText: 'See dashboard'
  }
];

const models = [
  {
    provider: 'A',
    name: 'Claude 3.5 Sonnet',
    company: 'Anthropic',
    processed: '18.42B',
    trend: '+12.38%',
    trendUp: true
  },
  {
    provider: 'O',
    name: 'GPT-4o',
    company: 'OpenAI',
    processed: '25.76B',
    trend: '+8.91%',
    trendUp: true
  },
  {
    provider: 'G',
    name: 'Gemini 1.5 Pro',
    company: 'Google',
    processed: '11.08B',
    trend: '-2.14%',
    trendUp: false
  }
];

const services = [
  {
    icon: <Users className="h-6 w-6" />,
    title: '账号服务',
    description: '协助客户完成 AI 工具账号开通、团队成员管理、权限配置和基础使用培训。',
    link: '/services'
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: '充值服务',
    description: '为企业提供合规的订阅、额度充值和发票支持，降低海外支付和采购门槛。',
    link: '/services'
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: '定制服务',
    description: '根据业务流程定制 AI 助手、内部知识库、自动化工作流和企业管理后台。',
    link: '/services'
  }
];

export default function Home() {
  const navigate = useNavigate();
  const { user, showAuthModal, setIntendedPath } = useAuth();

  return (
    <div className="bg-brand-bg text-white overflow-hidden">
      {/* Hero Section */}
      <section id="home" className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[120px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-brand-gold text-xs font-bold mb-8">
                <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                Unified AI API Gateway for Builders
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-8 uppercase">
                一个接口，接入<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-gold to-brand-secondary">主流 AI 模型</span>
              </h1>

              <p className="text-zinc-400 text-lg mb-10 max-w-xl leading-relaxed">
                为开发者和企业提供统一的 AI API 中转、模型路由、用量监控与成本管理能力。
                使用 OpenAI 兼容接口快速接入 Claude、GPT、Gemini 等主流模型。
              </p>

              <div className="flex flex-wrap gap-4 mb-16">
                <button 
                  onClick={() => {
                    if (!user) {
                      setIntendedPath('/dashboard?tab=api_keys');
                      showAuthModal();
                    } else {
                      navigate('/dashboard?tab=api_keys');
                    }
                  }}
                  className="btn-primary flex items-center gap-2 px-8"
                >
                  获取 API Key <ArrowRight className="h-4 w-4" />
                </button>
                <Link to="/models" className="btn-secondary px-8 text-center flex items-center">
                  探索可用模型
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                {metrics.map((metric, i) => (
                  <div key={i}>
                    <p className="text-3xl font-black tracking-tighter text-white">{metric.value}</p>
                    <p className="text-xs uppercase font-bold text-zinc-500 tracking-widest mt-1">{metric.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-brand-gold/20 blur-3xl rounded-none" />
              <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden font-mono text-sm leading-relaxed">
                <div className="flex gap-2 mb-6">
                  <div className="h-3 w-3 rounded-full bg-zinc-700" />
                  <div className="h-3 w-3 rounded-full bg-zinc-700" />
                  <div className="h-3 w-3 rounded-full bg-zinc-700" />
                </div>
                <pre className="text-blue-100/90 whitespace-pre-wrap">
                  <code>
                    <span className="text-zinc-500">// OpenAI 兼容请求示例</span><br />
                    curl https://api.llmgate.co/v1/chat/completions \<br />
                    {'  '}-H <span className="text-brand-gold">"Authorization: Bearer $LLMGATE_API_KEY"</span> \<br />
                    {'  '}-H <span className="text-brand-gold">"Content-Type: application/json"</span> \<br />
                    {'  '}-d {'{'}<br />
                    {'    '}<span className="text-brand-gold">"model"</span>: <span className="text-brand-gold">"anthropic/claude-3-5-sonnet"</span>,<br />
                    {'    '}<span className="text-brand-gold">"messages"</span>: [<br />
                    {'      '}{'{'}<br />
                    {'        '}<span className="text-brand-gold">"role"</span>: <span className="text-brand-gold">"user"</span>,<br />
                    {'        '}<span className="text-brand-gold">"content"</span>: <span className="text-brand-gold">"Build a production-ready AI app."</span><br />
                    {'      '}{'}'}<br />
                    {'    '}]<br />
                    {'  '}{'}'}
                  </code>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="why" className="py-32 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <p className="text-brand-gold text-xs font-black uppercase tracking-widest mb-3">Why LLMGate</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">为什么选择 LLMGate</h2>
            <p className="text-zinc-500 max-w-xl">
              统一模型接入、透明用量计费、实时数据看板和企业级安全策略，帮助团队更低成本地构建 AI 应用。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="card-bento p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="h-10 w-10 flex items-center justify-center bg-brand-gold/10 text-brand-gold rounded-xl mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{feature.description}</p>
                </div>
                <Link to={feature.link} className="flex items-center gap-2 text-xs font-bold text-brand-gold mt-8 hover:underline uppercase tracking-widest">
                  {feature.linkText} <ArrowRight className="h-3 w-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section id="models" className="py-32 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <p className="text-brand-gold text-xs font-black uppercase tracking-widest mb-3">Featured Models</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">精选模型</h2>
              <p className="text-zinc-500 max-w-xl">
                为对话、代码、Agent、文本分析和企业自动化场景提供稳定的主流模型接入。
              </p>
            </div>
            <Link to="/models" className="flex items-center gap-2 text-xs font-bold text-brand-gold hover:underline uppercase tracking-widest">
              查看全部模型 <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {models.map((model, i) => (
              <div key={i} className="card-bento p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-12 w-12 flex items-center justify-center bg-gradient-to-br from-brand-gold/30 to-brand-secondary/20 border border-white/10 rounded-2xl text-xl font-black">
                    {model.provider}
                  </div>
                  <div>
                    <h3 className="font-bold">{model.name}</h3>
                    <p className="text-xs text-zinc-500 uppercase font-black">{model.company}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                    <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Tokens Processed</p>
                    <p className="font-black text-lg">{model.processed}</p>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-right">
                    <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Weekly Trend</p>
                    <p className={cn("font-black text-lg", model.trendUp ? "text-emerald-500" : "text-rose-500")}>
                      {model.trend}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <p className="text-brand-gold text-xs font-black uppercase tracking-widest mb-3">Getting Started</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">三步开始构建</h2>
            <p className="text-zinc-500 max-w-xl">
              从注册账号到生成 API Key，再到接入业务代码，整个流程保持开发者友好。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-bento p-8 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl group-hover:bg-brand-gold/20 transition-all" />
              <div className="h-12 w-12 flex items-center justify-center bg-gradient-to-br from-brand-gold to-brand-secondary text-black rounded-2xl font-black text-xl mb-6 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                1
              </div>
              <h3 className="text-xl font-bold mb-4">注册账户</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">注册账号并进入控制台，完成基础账户配置和身份认证。</p>
              
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
                <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">账户配置</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded-md bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-widest border border-brand-gold/20">Email Login</span>
                  <span className="px-2 py-1 rounded-md bg-white/5 text-white/50 text-xs font-bold uppercase tracking-widest border border-white/10">Team API</span>
                </div>
              </div>
            </div>

            <div className="card-bento p-8 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl group-hover:bg-brand-gold/20 transition-all" />
              <div className="h-12 w-12 flex items-center justify-center bg-gradient-to-br from-brand-gold to-brand-secondary text-black rounded-2xl font-black text-xl mb-6 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                2
              </div>
              <h3 className="text-xl font-bold mb-4">生成 API Key</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">在控制台中创建 API Key，可按项目、环境和权限进行隔离管理。</p>
              
              <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-brand-gold font-bold font-mono">ll_live_x7K9...2mQp</p>
                  <span className="text-xs text-zinc-500 uppercase font-black cursor-pointer">Copy</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-widest opacity-50">
                  <span>Production</span>
                  <span>•</span>
                  <span>Rate Limit</span>
                </div>
              </div>
            </div>

            <div className="card-bento p-8 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl group-hover:bg-brand-gold/20 transition-all" />
              <div className="h-12 w-12 flex items-center justify-center bg-gradient-to-br from-brand-gold to-brand-secondary text-black rounded-2xl font-black text-xl mb-6 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                3
              </div>
              <h3 className="text-xl font-bold mb-4">集成到应用</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">替换 Base URL 和 API Key，即可在现有系统中实现模型切换。</p>
              
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 font-mono text-xs leading-tight text-brand-gold/80">
                client = OpenAI(<br />
                {'  '}api_key="ll_live_xxx",<br />
                {'  '}base_url="https://api.llmgate.co/v1"<br />
                )
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <p className="text-brand-gold text-xs font-black uppercase tracking-widest mb-3">Other Services</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">其他增值服务</h2>
            <p className="text-zinc-500 max-w-xl">
              除 API 中转能力外，我们也为企业客户提供精选账号、便捷充值和深度定制交付。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={i} className="card-bento p-8 flex flex-col justify-between group">
                <div>
                  <div className="h-14 w-14 flex items-center justify-center bg-brand-gold/10 text-brand-gold rounded-2xl mb-8 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 grow">{service.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{service.description}</p>
                </div>
                <Link to={service.link} className="flex items-center gap-2 text-xs font-bold text-brand-gold mt-12 hover:underline tracking-widest uppercase">
                  立即访问 Access Now <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-gold text-xs font-black uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-4xl font-black uppercase tracking-tighter">常见问题解答</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: '是否兼容 OpenAI SDK？',
                a: '高度兼容。你只需要修改 base_url 为我们的私有网关地址，并使用我们在后台生成的 ll_live 系列 API Key，即可直接在现有的 OpenAI 项目中使用。'
              },
              {
                q: '支持哪些支付方式？',
                a: '我们支持支付宝、微信、虚拟货币以及企业对公转账。充值过程全自动化，点数秒到账。'
              },
              {
                q: '如何查看我的 API 调用明细？',
                a: '您可以在控制台的“控制面板”板块实时查看每一次请求的模型型号、Token 消耗、响应延迟以及产生的费用（PTS）。'
              },
              {
                q: '适合企业级生产环境吗？',
                a: '当然。我们的集群分发系统采用多节点容灾，SLA 保证在 99.9% 以上，并提供请求级并发控制与独立的配额管理系统。'
              }
            ].map((item, i) => (
              <details key={i} className="group card-bento p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                <summary className="flex items-center justify-between gap-4 font-bold">
                  <span className="text-lg">{item.q}</span>
                  <span className="transition-transform group-open:rotate-180 text-brand-gold underline text-xs font-black uppercase">展开</span>
                </summary>
                <div className="mt-4 text-zinc-400 text-sm leading-relaxed pt-4 border-t border-white/5">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[40px] bg-brand-card p-8 md:p-16 overflow-hidden border border-white/10 group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-gold/20 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-brand-gold text-xs font-black uppercase tracking-widest mb-3">Connect</p>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-tight">需要深度合作？<br/>联系我们的团队</h2>
                <p className="text-zinc-500 mb-0 max-w-md text-sm">
                  需要 API 中转、企业账号批量采购、AI 战略咨询或定制模型交付？联系我们，我们将在 2 小时内响应。
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
                <a href="mailto:contact@llmgate.co" className="btn-primary py-4 px-10 text-center uppercase tracking-widest font-black text-sm">
                  联系销售团队
                </a>
                <Link to="/docs" className="btn-secondary py-4 px-10 text-center uppercase tracking-widest font-black text-sm shadow-xl">
                  查阅 API 文档
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

