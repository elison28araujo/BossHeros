'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Trophy, Shield, User, Star, TrendingUp, Award } from 'lucide-react';
import { motion } from 'motion/react';

const RankingTable = ({ title, data }: { title: string, data: any[] }) => (
  <div className="bg-brand-card border border-brand-wine/20 rounded-xl overflow-hidden">
    <div className="p-6 bg-black/40 border-b border-brand-wine/20 flex items-center justify-between">
      <h3 className="font-bold text-sm uppercase tracking-widest text-brand-orange">{title}</h3>
      <TrendingUp className="w-4 h-4 text-brand-red" />
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-brand-wine/10">
            <th className="px-6 py-4">Pos</th>
            <th className="px-6 py-4">Guild / Player</th>
            <th className="px-6 py-4 text-center">Vitórias</th>
            <th className="px-6 py-4 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-wine/5">
          {data.map((item, idx) => (
            <tr key={idx} className="hover:bg-white/5 transition-colors group">
              <td className="px-6 py-4">
                <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                  idx === 0 ? 'bg-brand-orange text-white gamer-glow' : 
                  idx === 1 ? 'bg-gray-400 text-black' : 
                  idx === 2 ? 'bg-orange-800 text-white' : 'bg-white/10 text-gray-400'
                }`}>
                  {idx + 1}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-wine/20 rounded border border-brand-wine/30 flex items-center justify-center">
                    {item.type === 'guild' ? <Shield className="w-4 h-4 text-brand-red" /> : <User className="w-4 h-4 text-brand-orange" />}
                  </div>
                  <span className="font-bold text-sm group-hover:text-brand-orange transition-colors">{item.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-center font-mono font-bold text-brand-orange">{item.wins}</td>
              <td className="px-6 py-4 text-right">
                <span className="text-[10px] px-2 py-1 bg-green-900/20 text-green-500 rounded border border-green-500/20 font-bold uppercase tracking-tighter">
                  Ativo
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default function StatsPage() {
  const guildRanking = [
    { name: 'ALLYFENIX', wins: 152, type: 'guild' },
    { name: 'LEGENDS_MU', wins: 124, type: 'guild' },
    { name: 'DARK_SOULS', wins: 98, type: 'guild' },
    { name: 'VALHALLA', wins: 85, type: 'guild' },
    { name: 'IMPERIUM', wins: 72, type: 'guild' },
  ];

  const gmRanking = [
    { name: 'GM_FENIX', wins: 84, type: 'player' },
    { name: 'LORD_DARK', wins: 62, type: 'player' },
    { name: 'ZEUS_MU', wins: 55, type: 'player' },
    { name: 'ARTEMIS', wins: 48, type: 'player' },
    { name: 'THOR_GOD', wins: 41, type: 'player' },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-72 p-10 space-y-12">
        {/* Header */}
        <section>
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-brand-wine/20 rounded border border-brand-wine/30">
              <Trophy className="w-8 h-8 text-brand-orange" />
            </div>
            <div>
              <h2 className="text-3xl font-black italic tracking-tighter font-montserrat text-glow">
                ESTATÍSTICAS <span className="text-brand-orange">CASTLE SIEGE</span>
              </h2>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.2em]">Painel de controle e rankings históricos</p>
            </div>
          </div>
        </section>

        {/* Top 3 Highlight */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { pos: 2, name: 'LEGENDS_MU', wins: 124, color: 'border-gray-400' },
            { pos: 1, name: 'ALLYFENIX', wins: 152, color: 'border-brand-orange', highlight: true },
            { pos: 3, name: 'DARK_SOULS', wins: 98, color: 'border-orange-800' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-brand-card rounded-xl border-2 ${item.color} p-8 flex flex-col items-center relative overflow-hidden ${item.highlight ? 'gamer-glow' : ''}`}
            >
              {item.highlight && (
                <div className="absolute top-0 right-0 p-2">
                  <Star className="w-6 h-6 text-brand-orange fill-brand-orange" />
                </div>
              )}
              <div className="text-xs font-black text-gray-500 mb-4 uppercase tracking-widest">TOP {item.pos}</div>
              <div className="w-20 h-20 bg-brand-wine/10 rounded-full flex items-center justify-center mb-4 border border-white/10">
                <Shield className={`w-10 h-10 ${item.pos === 1 ? 'text-brand-orange' : 'text-gray-400'}`} />
              </div>
              <h4 className="text-xl font-black italic tracking-tighter mb-1">{item.name}</h4>
              <div className="text-3xl font-black text-brand-orange">{item.wins} <span className="text-xs text-gray-500 uppercase">Vitórias</span></div>
              
              {item.highlight && (
                <div className="mt-6 px-4 py-2 bg-brand-orange/10 rounded-full border border-brand-orange/30 flex items-center gap-2">
                  <Award className="w-4 h-4 text-brand-orange" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">Dominante 2025</span>
                </div>
              )}
            </motion.div>
          ))}
        </section>

        {/* Tables Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RankingTable title="Ranking Geral de Guildas" data={guildRanking} />
          <RankingTable title="Ranking de Game Masters" data={gmRanking} />
        </section>

        {/* Yearly Stats */}
        <section className="bg-brand-card border border-brand-wine/20 rounded-xl p-8">
          <h3 className="font-bold text-sm uppercase tracking-widest text-brand-orange mb-8 text-center">Maiores Vencedoras por Ano</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[2025, 2024, 2023, 2022, 2021, 2020].map((year) => (
              <div key={year} className="p-4 bg-white/5 rounded border border-white/10 text-center hover:border-brand-orange/30 transition-all cursor-default">
                <div className="text-xs font-bold text-gray-500 mb-1">{year}</div>
                <div className="text-sm font-black text-brand-red">ALLYFENIX</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
