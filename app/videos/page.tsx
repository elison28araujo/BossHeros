'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
import { Play, Calendar, User, Search, Filter } from 'lucide-react';
import { motion } from 'motion/react';

const VideoCard = ({ index }: { index: number }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05 }}
    className="bg-brand-card border border-brand-wine/20 rounded-lg overflow-hidden group hover:border-brand-orange/50 transition-all"
  >
    <div className="relative aspect-video overflow-hidden">
      <Image 
        src={`https://picsum.photos/seed/mu-video-archive-${index}/640/360`} 
        alt="Video Thumbnail" 
        fill
        className="object-cover group-hover:scale-105 transition-all duration-500 opacity-80"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center gamer-glow">
          <Play className="w-6 h-6 text-white fill-white" />
        </div>
      </div>
      <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-tighter">
        12:40
      </div>
    </div>
    <div className="p-4">
      <h4 className="font-bold text-sm mb-3 line-clamp-1 group-hover:text-brand-orange transition-colors uppercase tracking-tighter">
        CASTLE SIEGE - {index % 2 === 0 ? 'VITÓRIA ÉPICA' : 'DEFESA LENDÁRIA'} #0{index + 1}
      </h4>
      <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase tracking-widest">
        <div className="flex items-center gap-1">
          <User className="w-3 h-3 text-brand-red" />
          <span>PLAYER_{index + 100}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-brand-red" />
          <span>MAR 2026</span>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function VideosPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-72 p-10 space-y-12">
        {/* Header */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter font-montserrat text-glow">
              ARQUIVO DE <span className="text-brand-orange">VÍDEOS</span>
            </h2>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">Galeria completa de batalhas e tutoriais</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Buscar vídeo..."
                className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs focus:border-brand-orange outline-none transition-all w-64"
              />
            </div>
            <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-brand-orange hover:border-brand-orange/30 transition-all">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Video Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <VideoCard key={i} index={i} />
          ))}
        </section>

        {/* Pagination Placeholder */}
        <section className="flex justify-center gap-2">
          {[1, 2, 3, '...', 10].map((page, i) => (
            <button 
              key={i}
              className={`w-10 h-10 rounded flex items-center justify-center text-xs font-bold border transition-all ${
                page === 1 
                  ? 'bg-brand-orange border-brand-orange text-white gamer-glow' 
                  : 'bg-white/5 border-white/10 text-gray-500 hover:border-brand-orange/30'
              }`}
            >
              {page}
            </button>
          ))}
        </section>
      </main>
    </div>
  );
}
