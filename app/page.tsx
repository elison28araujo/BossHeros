'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import TabSection from '@/components/TabSection';
import Image from 'next/image';
import { Play, ChevronRight, Calendar, User } from 'lucide-react';
import { motion } from 'motion/react';
import { db, collection, onSnapshot, doc, query, orderBy, limit } from '@/firebase';
import Link from 'next/link';

const VideoCard = ({ video, index }: { video: any, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-brand-card border border-brand-wine/20 rounded-lg overflow-hidden group hover:border-brand-orange/50 transition-all"
  >
    <a href={video.url} target="_blank" rel="noopener noreferrer" className="block relative aspect-video overflow-hidden">
      <Image 
        src={`https://picsum.photos/seed/${video.id}/640/360`} 
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
    </a>
    <div className="p-4">
      <h4 className="font-bold text-sm mb-3 line-clamp-1 group-hover:text-brand-orange transition-colors">
        {video.title}
      </h4>
      <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase tracking-widest">
        <div className="flex items-center gap-1">
          <User className="w-3 h-3 text-brand-red" />
          <span>{video.authorName}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-brand-red" />
          <span>{new Date(video.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function Home() {
  const [globalStats, setGlobalStats] = useState({ guildWins: 152, activeMembers: 450, yearsOfGlory: 8 });
  const [latestVideos, setLatestVideos] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribeStats = onSnapshot(doc(db, 'stats', 'global'), (snapshot) => {
      if (snapshot.exists()) {
        setGlobalStats(snapshot.data() as any);
      }
    });

    const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'), limit(3));
    const unsubscribeVideos = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLatestVideos(data);
    });

    return () => {
      unsubscribeStats();
      unsubscribeVideos();
    };
  }, []);
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-72 p-10 space-y-12">
        {/* Hero Section / Latest Videos */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black italic tracking-tighter font-montserrat text-glow">
                ÚLTIMOS <span className="text-brand-orange">VÍDEOS</span>
              </h2>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">Acompanhe nossas conquistas em campo</p>
            </div>
            <Link href="/videos" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-orange hover:text-brand-red transition-colors group">
              Ver todos os vídeos
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestVideos.map((video, i) => (
              <VideoCard key={video.id} video={video} index={i} />
            ))}
            {latestVideos.length === 0 && (
              <div className="col-span-full text-center py-10 text-gray-500 text-sm font-bold uppercase tracking-widest">
                Nenhum vídeo publicado ainda.
              </div>
            )}
          </div>
        </section>

        {/* Information Section */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-black italic tracking-tighter font-montserrat text-glow">
              CENTRAL DE <span className="text-brand-orange">INFORMAÇÕES</span>
            </h2>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">Tudo o que você precisa saber sobre a BossHeras</p>
          </div>
          
          <TabSection />
        </section>

        {/* Quick Stats Banner */}
        <section className="bg-gradient-to-r from-brand-wine/40 to-brand-red/20 border border-brand-wine/30 rounded-xl p-8 flex flex-col md:flex-row items-center justify-around gap-8">
          <div className="text-center">
            <div className="text-4xl font-black text-brand-orange mb-1">{globalStats.guildWins}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vitórias CS</div>
          </div>
          <div className="w-px h-12 bg-brand-wine/30 hidden md:block" />
          <div className="text-center">
            <div className="text-4xl font-black text-brand-orange mb-1">{globalStats.activeMembers}+</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Membros Ativos</div>
          </div>
          <div className="w-px h-12 bg-brand-wine/30 hidden md:block" />
          <div className="text-center">
            <div className="text-4xl font-black text-brand-orange mb-1">{globalStats.yearsOfGlory < 10 ? `0${globalStats.yearsOfGlory}` : globalStats.yearsOfGlory}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Anos de Glória</div>
          </div>
        </section>
      </main>
    </div>
  );
}
