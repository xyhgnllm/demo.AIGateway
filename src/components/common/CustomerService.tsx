import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, Upload, Image as ImageIcon, Paperclip, GripVertical } from 'lucide-react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { cn } from '../../lib/utils';

export default function CustomerService() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: '您好！LLMGate 技术支持中心竭诚为您服务。请问有什么可以帮您的？', isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragControls = useDragControls();

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-chat', handleOpenChat);
    return () => window.removeEventListener('open-chat', handleOpenChat);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = { id: Date.now(), text: input, isBot: false };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    
    // Mock bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: '收到您的咨询。我们的客服专员目前正在处理其他工单，您的请求已进入队列，平均等待时间 2 分钟。', 
        isBot: true 
      }]);
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      const isImage = file.type.startsWith('image/');
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: `📎 已上传文件: ${file.name}`,
        isBot: false,
        fileUrl: isImage ? URL.createObjectURL(file) : undefined,
        isFile: true
      }]);
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragControls={dragControls}
            dragMomentum={false}
            dragListener={false}
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
            className="mb-4 w-[380px] overflow-hidden rounded-3xl bg-zinc-900 shadow-[0_32px_64px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col h-[550px] backdrop-blur-xl"
            style={{ transformOrigin: 'bottom right' }}
          >
            {/* Header */}
            <div className="bg-zinc-900 border-b border-white/5 p-4 text-white flex justify-between items-center cursor-default">
              <div className="flex items-center gap-3">
                <div 
                  onPointerDown={(e) => dragControls.start(e)}
                  className="p-1 hover:bg-white/5 rounded cursor-grab active:cursor-grabbing text-zinc-500"
                >
                  <GripVertical className="h-4 w-4" />
                </div>
                <div className="relative">
                  <div className="h-10 w-10 rounded-2xl bg-brand-gold/20 flex items-center justify-center border border-brand-gold/30">
                    <MessageSquare className="h-5 w-5 text-brand-gold" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-zinc-900 shadow-sm"></div>
                </div>
                <div>
                   <h4 className="text-sm font-black uppercase tracking-tight">在线技术支持</h4>
                   <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Online Support</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 flex items-center justify-center hover:bg-white/5 rounded-xl transition-all text-zinc-500 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/5">
              {messages.map((m: any) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex max-w-[85%] flex-col gap-2",
                    m.isBot ? "self-start" : "self-end items-end"
                  )}
                >
                   {m.isBot && (
                      <span className="text-[10px] font-black uppercase text-zinc-600 tracking-widest ml-1">Support Bot</span>
                   )}
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                      m.isBot 
                        ? "bg-white/5 border border-white/5 text-zinc-300 rounded-tl-none"
                        : "bg-brand-gold text-black font-medium rounded-tr-none shadow-brand-gold/10"
                    )}
                  >
                    {m.isFile && m.fileUrl ? (
                      <div className="space-y-2">
                        <img src={m.fileUrl} alt="upload" className="max-w-full rounded-lg border border-black/10" />
                        <p className="text-xs font-bold opacity-80">{m.text}</p>
                      </div>
                    ) : (
                      m.text
                    )}
                  </div>
                  {!m.isBot && <span className="text-[10px] font-black uppercase text-zinc-700 tracking-widest mr-1">You</span>}
                </div>
              ))}
              {isUploading && (
                <div className="self-end flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl text-[10px] text-zinc-500 font-bold uppercase animate-pulse">
                   <Upload className="h-3 w-3" /> 正在上传文件...
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-zinc-900 border-t border-white/5">
              <div className="flex items-center gap-2 mb-3">
                 <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="h-8 w-8 flex items-center justify-center rounded-xl bg-white/5 text-zinc-500 hover:text-brand-gold hover:bg-white/10 transition-all border border-transparent hover:border-brand-gold/20"
                 >
                   <Paperclip className="h-4 w-4" />
                 </button>
                 <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="h-8 w-8 flex items-center justify-center rounded-xl bg-white/5 text-zinc-500 hover:text-brand-gold hover:bg-white/10 transition-all border border-transparent hover:border-brand-gold/20"
                 >
                   <ImageIcon className="h-4 w-4" />
                 </button>
              </div>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
              />

              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="输入您的问题..."
                  className="flex-1 h-12 rounded-2xl bg-white/5 border border-white/5 px-4 text-sm text-white focus:outline-none focus:border-brand-gold/30 transition-all placeholder:text-zinc-700 font-medium"
                />
                <button
                  onClick={handleSend}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold text-black transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-gold/20"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gold text-black shadow-2xl shadow-brand-gold/20 transition-all hover:scale-110 active:scale-95 group relative z-[1000]",
          isOpen && "bg-zinc-800 text-brand-gold border border-white/10 shadow-none"
        )}
      >
        {isOpen ? (
          <X className="h-7 w-7 transition-all" />
        ) : (
          <>
            <MessageSquare className="h-7 w-7 transition-transform group-hover:rotate-12" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-brand-bg shadow-sm" />
          </>
        )}
      </button>
    </div>
  );
}
