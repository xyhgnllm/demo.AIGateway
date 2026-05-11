import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Terminal, Copy, Trash2, Power, PowerOff, Filter, MoreVertical, Search, CheckCircle2, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  group: string;
  status: 'active' | 'disabled';
  createdAt: string;
  usage: number;
}

export default function ApiService() {
  const [keys, setKeys] = useState<ApiKey[]>([
    { id: '1', name: '生产环境主力', key: 'sk-elite-8h3j2...9d1s', group: 'Production', status: 'active', createdAt: '2026-04-12', usage: 12503 },
    { id: '2', name: '测试组 A', key: 'sk-elite-2p9m1...0f7v', group: 'Testing', status: 'active', createdAt: '2026-05-01', usage: 452 },
    { id: '3', name: '废弃 Key-1', key: 'sk-elite-7y3w4...2q8u', group: 'Default', status: 'disabled', createdAt: '2026-03-20', usage: 8901 },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyGroup, setNewKeyGroup] = useState('Default');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const addKey = () => {
    if (!newKeyName) return;
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `sk-elite-${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`,
      group: newKeyGroup,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      usage: 0
    };
    setKeys([newKey, ...keys]);
    setNewKeyName('');
    setIsCreating(false);
  };

  const toggleKey = (id: string) => {
    setKeys(keys.map(k => k.id === id ? { ...k, status: k.status === 'active' ? 'disabled' : 'active' } : k));
  };

  const deleteKey = (id: string) => {
    setKeys(keys.filter(k => k.id !== id));
  };

  const copyKey = (id: string, fullKey: string) => {
    navigator.clipboard.writeText(fullKey);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-brand-primary">API 令牌管理</h1>
          <p className="mt-4 text-zinc-500 max-w-2xl">
            创建及管理您的 API 访问密钥。通过分组管理不同项目的使用配额，实时监控消费明细。
          </p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> 创建新密钥
        </button>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="card-bento p-6">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">活跃密钥</p>
          <p className="text-3xl font-black text-zinc-900">{keys.filter(k => k.status === 'active').length}</p>
        </div>
        <div className="card-bento p-6">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">今日调用总量</p>
          <p className="text-3xl font-black text-zinc-900">45,210</p>
        </div>
        <div className="card-bento p-6">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">剩余可用余额 (CNY)</p>
          <p className="text-3xl font-black text-brand-primary">¥1,452.40</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="搜索密钥名称或分组..." 
            className="w-full bg-white border border-brand-accent rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary"
          />
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-brand-accent text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-colors">
              <Filter className="h-4 w-4" /> 筛选分组
           </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-brand-accent bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-brand-accent">
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">密钥名称</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">令牌内容</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">所属分组</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">调用次数</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-accent">
            {keys.map((k) => (
              <tr key={k.id} className={cn("transition-colors hover:bg-zinc-50/50", k.status === 'disabled' && "opacity-60")}>
                <td className="px-6 py-4">
                  <div className="font-semibold text-brand-primary">{k.name}</div>
                  <div className="text-xs text-zinc-400 mt-0.5">创建于 {k.createdAt}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono bg-zinc-900 border border-white/5 text-brand-primary px-3 py-1.5 rounded-lg shadow-inner">{k.key}</code>
                    <button 
                      onClick={() => copyKey(k.id, k.key)}
                      className="p-1.5 hover:bg-zinc-200 rounded-md transition-colors text-zinc-400 hover:text-brand-primary"
                    >
                      {copiedId === k.id ? <CheckCircle2 className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-xs font-bold text-zinc-600 uppercase">
                    {k.group}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-mono font-bold text-zinc-500 tracking-tight">{k.usage.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold",
                    k.status === 'active' ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-400"
                  )}>
                    <div className={cn("h-1.5 w-1.5 rounded-full", k.status === 'active' ? "bg-emerald-500" : "bg-zinc-400")} />
                    {k.status === 'active' ? '正常运行' : '已禁用'}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                       onClick={() => toggleKey(k.id)}
                       title={k.status === 'active' ? "禁用" : "启用"}
                       className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-400 transition-colors"
                    >
                      {k.status === 'active' ? <PowerOff className="h-4 w-4 text-orange-400" /> : <Power className="h-4 w-4 text-emerald-400" />}
                    </button>
                    <button 
                      onClick={() => deleteKey(k.id)}
                      className="p-2 hover:bg-red-50 rounded-lg text-zinc-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {isCreating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-primary/40 backdrop-blur-sm"
              onClick={() => setIsCreating(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-brand-primary mb-6">创建 API 密钥</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">密钥名称</label>
                  <input 
                    type="text" 
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="例如: 财务分析机器人"
                    className="w-full rounded-xl border border-brand-accent p-3 text-sm focus:ring-2 focus:ring-brand-primary/10 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">所属分组</label>
                  <select 
                    value={newKeyGroup}
                    onChange={(e) => setNewKeyGroup(e.target.value)}
                    className="w-full rounded-xl border border-brand-accent p-3 text-sm focus:ring-2 focus:ring-brand-primary/10 focus:outline-none bg-white"
                  >
                    <option value="Default">Default</option>
                    <option value="Production">Production</option>
                    <option value="Testing">Testing</option>
                    <option value="Experimental">Experimental</option>
                  </select>
                </div>
                <div className="pt-4 flex gap-3">
                  <button onClick={() => setIsCreating(false)} className="flex-1 btn-secondary text-sm py-3">取消</button>
                  <button onClick={addKey} className="flex-1 btn-primary text-sm py-3">立即创建</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
