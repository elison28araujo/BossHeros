'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Info, UserPlus, Image as ImageIcon, Download, Shield, Zap, MessageSquare, Phone } from 'lucide-react';

const TabSection = () => {
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: 'Sobre nós', icon: Info },
    { id: 'recruitment', label: 'Alistamento', icon: UserPlus },
    { id: 'media', label: 'Mídia', icon: ImageIcon },
  ];

  return (
    <div className="bg-brand-card rounded-xl border border-brand-wine/30 overflow-hidden">
      {/* Tab Headers */}
      <div className="flex border-b border-brand-wine/30 bg-black/40">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-8 py-5 font-bold text-sm uppercase tracking-widest transition-all relative ${
              activeTab === tab.id ? 'text-brand-orange' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-brand-orange"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-8 min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-brand-orange mb-4 font-montserrat italic">SOBRE A GUILD</h3>
                  <p className="text-gray-400 leading-relaxed">
                    A BossHeras nasceu da união de guerreiros lendários com um único propósito: dominar o continente de Mu Online. 
                    Com uma trajetória marcada por vitórias épicas no Castle Siege, nos tornamos referência em estratégia, 
                    disciplina e poder de fogo. Não somos apenas uma guilda, somos uma família forjada no campo de batalha.
                  </p>
                  <div className="mt-6 p-4 bg-brand-wine/10 border-l-4 border-brand-red rounded">
                    <p className="text-sm italic text-gray-300">&quot;Onde a fênix renasce, o inimigo sucumbe.&quot;</p>
                  </div>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden border border-brand-wine/50">
                  <Image 
                    src="https://picsum.photos/seed/mu-siege/800/450" 
                    alt="Castle Siege Banner" 
                    fill
                    className="object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent flex items-end p-4">
                    <span className="text-xs font-bold text-brand-orange uppercase tracking-widest">Banner Oficial - Siege 2025</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="p-4 bg-white/5 rounded border border-white/10">
                  <Shield className="w-6 h-6 text-brand-red mb-2" />
                  <h4 className="font-bold text-sm mb-1">MU ONLINE</h4>
                  <p className="text-xs text-gray-500">O clássico MMORPG que define gerações de jogadores.</p>
                </div>
                <div className="p-4 bg-white/5 rounded border border-white/10">
                  <Zap className="w-6 h-6 text-brand-orange mb-2" />
                  <h4 className="font-bold text-sm mb-1">CASTLE SIEGE</h4>
                  <p className="text-xs text-gray-500">A batalha suprema pelo controle do Valley of Loren.</p>
                </div>
                <div className="p-4 bg-white/5 rounded border border-white/10">
                  <Zap className="w-6 h-6 text-brand-red mb-2" />
                  <h4 className="font-bold text-sm mb-1">INTRODUÇÃO</h4>
                  <p className="text-xs text-gray-500">Conheça nossa história e nossas diretrizes oficiais.</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'recruitment' && (
            <motion.div
              key="recruitment"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-brand-orange font-montserrat italic">REQUISITOS MÍNIMOS</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 bg-brand-red rotate-45" />
                      <div>
                        <span className="font-bold block text-sm">DISCIPLINA E RESPEITO</span>
                        <span className="text-xs text-gray-500">Essencial para a convivência em grupo.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 bg-brand-red rotate-45" />
                      <div>
                        <span className="font-bold block text-sm">TEAMSPEAK 3 OBRIGATÓRIO</span>
                        <span className="text-xs text-gray-500">Comunicação é a chave para a vitória no Siege.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 bg-brand-red rotate-45" />
                      <div>
                        <span className="font-bold block text-sm">WHATSAPP ATIVO</span>
                        <span className="text-xs text-gray-500">Para avisos rápidos e organização de eventos.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 bg-brand-red rotate-45" />
                      <div>
                        <span className="font-bold block text-sm">PERSONAGEM FULL</span>
                        <span className="text-xs text-gray-500">Dependendo do servidor, exigimos build competitiva.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-brand-wine/5 p-6 rounded-lg border border-brand-wine/20">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-brand-orange" />
                    PROCESSO DE SELEÇÃO
                  </h4>
                  <p className="text-sm text-gray-400 mb-6">
                    Após realizar o alistamento, nossa equipe de recrutamento analisará seu perfil. 
                    Entraremos em contato via WhatsApp para uma breve entrevista e teste de campo.
                  </p>
                  <button className="w-full py-4 bg-brand-red hover:bg-brand-red/80 text-white font-bold rounded transition-all gamer-glow-red uppercase tracking-widest text-sm">
                    REALIZAR ALISTAMENTO AGORA
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'media' && (
            <motion.div
              key="media"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-white/5 rounded border border-white/10 overflow-hidden group cursor-pointer relative">
                    <Image 
                      src={`https://picsum.photos/seed/mu-gallery-${i}/400/400`} 
                      alt="Gallery" 
                      fill
                      className="object-cover group-hover:scale-110 transition-all duration-500 opacity-70 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded border border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold mb-1">LOGO OFICIAL (PNG)</h4>
                    <p className="text-xs text-gray-500">Alta resolução com fundo transparente.</p>
                  </div>
                  <button className="p-3 bg-brand-wine/20 text-brand-orange rounded hover:bg-brand-wine/40">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 bg-white/5 rounded border border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold mb-1">BANNER SIEGE (PSD)</h4>
                    <p className="text-xs text-gray-500">Arquivo editável para divulgação.</p>
                  </div>
                  <button className="p-3 bg-brand-wine/20 text-brand-orange rounded hover:bg-brand-wine/40">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TabSection;
