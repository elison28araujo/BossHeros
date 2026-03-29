'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { 
  Users, 
  Trophy, 
  Video, 
  Settings, 
  Check, 
  X, 
  Eye, 
  Search,
  LayoutDashboard,
  MessageSquare,
  Bell,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-brand-card border border-brand-wine/20 rounded-xl p-6 flex items-center gap-4">
    <div className={`p-3 rounded-lg ${color} bg-opacity-10 border border-opacity-20 ${color.replace('text-', 'border-')}`}>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
    <div>
      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{title}</div>
      <div className="text-2xl font-black text-white">{value}</div>
    </div>
  </div>
);

const RecruitmentRow = ({ name, char, date, status }: any) => (
  <tr className="border-b border-brand-wine/5 hover:bg-white/5 transition-colors group">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-brand-wine/20 flex items-center justify-center text-brand-orange font-bold text-xs uppercase">
          {name[0]}
        </div>
        <div>
          <div className="text-sm font-bold text-white">{name}</div>
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">ID: #8821</div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 text-sm font-bold text-brand-orange">{char}</td>
    <td className="px-6 py-4 text-xs text-gray-400">{date}</td>
    <td className="px-6 py-4">
      <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase tracking-tighter border ${
        status === 'Pendente' ? 'bg-yellow-900/20 text-yellow-500 border-yellow-500/20' :
        status === 'Aprovado' ? 'bg-green-900/20 text-green-500 border-green-500/20' :
        'bg-red-900/20 text-red-500 border-red-500/20'
      }`}>
        {status}
      </span>
    </td>
    <td className="px-6 py-4 text-right">
      <div className="flex items-center justify-end gap-2">
        <button className="p-2 bg-white/5 rounded hover:bg-brand-orange/20 hover:text-brand-orange transition-all"><Eye className="w-4 h-4" /></button>
        <button className="p-2 bg-green-900/20 text-green-500 rounded hover:bg-green-500 hover:text-white transition-all"><Check className="w-4 h-4" /></button>
        <button className="p-2 bg-red-900/20 text-red-500 rounded hover:bg-red-500 hover:text-white transition-all"><X className="w-4 h-4" /></button>
      </div>
    </td>
  </tr>
);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-72 p-10 space-y-10">
        {/* Admin Header */}
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter font-montserrat text-glow">
              PAINEL <span className="text-brand-orange">ADMINISTRATIVO</span>
            </h2>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">Bem-vindo de volta, GM_FENIX</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-3 bg-brand-card border border-brand-wine/20 rounded-lg text-gray-400 hover:text-brand-orange transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-red rounded-full border border-brand-dark" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-brand-wine/20">
              <div className="text-right">
                <div className="text-xs font-bold text-white">GM_FENIX</div>
                <div className="text-[10px] text-brand-orange font-bold uppercase tracking-tighter">Guild Master</div>
              </div>
              <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center gamer-glow">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Quick Stats */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Novos Alistamentos" value="12" icon={Users} color="text-brand-orange" />
          <StatCard title="Vitórias CS" value="152" icon={Trophy} color="text-yellow-500" />
          <StatCard title="Vídeos Postados" value="48" icon={Video} color="text-blue-500" />
          <StatCard title="Membros Online" value="84" icon={Users} color="text-green-500" />
        </section>

        {/* Admin Tabs */}
        <section className="space-y-6">
          <div className="flex gap-2 p-1 bg-black/40 border border-brand-wine/20 rounded-lg w-fit">
            {[
              { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
              { id: 'recruitment', label: 'Recrutamento', icon: Users },
              { id: 'stats', label: 'Estatísticas CS', icon: Trophy },
              { id: 'content', label: 'Conteúdo', icon: Video },
              { id: 'settings', label: 'Configurações', icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2 rounded text-xs font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab.id 
                    ? 'bg-brand-orange text-white gamer-glow' 
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'recruitment' && (
              <motion.div
                key="recruitment"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-brand-card border border-brand-wine/20 rounded-xl overflow-hidden"
              >
                <div className="p-6 border-b border-brand-wine/20 flex items-center justify-between">
                  <h3 className="font-bold text-sm uppercase tracking-widest text-brand-orange">Candidatos Pendentes</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="text" 
                      placeholder="Filtrar por nome..."
                      className="bg-black/40 border border-brand-wine/30 rounded-lg py-2 pl-10 pr-4 text-xs focus:border-brand-orange outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-brand-wine/10">
                        <th className="px-6 py-4">Usuário</th>
                        <th className="px-6 py-4">Personagem</th>
                        <th className="px-6 py-4">Data</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <RecruitmentRow name="Elison Araujo" char="FENIX_BK" date="29 Mar 2026" status="Pendente" />
                      <RecruitmentRow name="Ricardo Silva" char="SM_LEGEND" date="28 Mar 2026" status="Pendente" />
                      <RecruitmentRow name="Ana Paula" char="ELF_QUEEN" date="27 Mar 2026" status="Aprovado" />
                      <RecruitmentRow name="Marcos Souza" char="DL_MASTER" date="25 Mar 2026" status="Reprovado" />
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <div className="bg-brand-card border border-brand-wine/20 rounded-xl p-8">
                  <h3 className="font-bold text-sm uppercase tracking-widest text-brand-orange mb-6">Últimas Atividades</h3>
                  <div className="space-y-6">
                    {[
                      { user: 'GM_FENIX', action: 'atualizou o ranking CS', time: '2 horas atrás', icon: Trophy },
                      { user: 'SISTEMA', action: 'novo alistamento recebido', time: '4 horas atrás', icon: Users },
                      { user: 'MOD_DARK', action: 'adicionou um novo vídeo', time: '1 dia atrás', icon: Video },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="p-2 bg-brand-wine/20 rounded border border-brand-wine/30">
                          <item.icon className="w-4 h-4 text-brand-orange" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-300">
                            <span className="font-bold text-white">{item.user}</span> {item.action}
                          </p>
                          <span className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-brand-card border border-brand-wine/20 rounded-xl p-8">
                  <h3 className="font-bold text-sm uppercase tracking-widest text-brand-orange mb-6">Mensagens Rápidas</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-black/40 border border-brand-wine/10 rounded italic text-sm text-gray-400">
                      &quot;Lembrar de avisar a todos sobre o treino de sábado às 20h.&quot;
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Escrever lembrete..."
                        className="flex-1 bg-black/40 border border-brand-wine/30 rounded-lg py-2 px-4 text-xs focus:border-brand-orange outline-none transition-all"
                      />
                      <button className="px-4 py-2 bg-brand-orange text-white font-bold rounded-lg text-xs uppercase tracking-widest">Postar</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
