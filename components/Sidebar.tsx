'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  BarChart2, 
  Video, 
  UserPlus, 
  LogIn, 
  Mic2,
  Trophy,
  Shield,
  Settings,
  UserCircle,
  LogOut
} from 'lucide-react';
import { motion } from 'motion/react';
import { auth, db, onAuthStateChanged, collection, getDocs, signOut } from '@/firebase';

const Sidebar = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        // Check role
        const userDoc = await getDocs(collection(db, 'users'));
        const currentUser = userDoc.docs.find(d => d.id === user.uid)?.data();
        
        if (currentUser?.role === 'admin' || user.email === 'elison28araujo@gmail.com') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const menuItems = [
    { name: 'Início', icon: Home, href: '/' },
    { name: 'Estatísticas CS', icon: BarChart2, href: '/stats' },
    { name: 'Vídeos', icon: Video, href: '/videos' },
    ...(isLoggedIn ? [{ name: 'Meu Perfil', icon: UserCircle, href: '/profile' }] : []),
    ...(isAdmin ? [{ name: 'Painel Admin', icon: Settings, href: '/admin' }] : []),
  ];

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/';
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-brand-dark border-r border-brand-wine/30 flex flex-col z-50">
      {/* Logo Area */}
      <div className="p-8 flex flex-col items-center">
        <div className="w-24 h-24 bg-brand-wine rounded-full flex items-center justify-center mb-4 border-2 border-brand-orange gamer-glow">
          <Shield className="w-12 h-12 text-brand-orange" />
        </div>
        <h1 className="text-2xl font-bold tracking-tighter text-glow font-montserrat">
          BOSS<span className="text-brand-orange">HERAS</span>
        </h1>
        
        {/* Badge */}
        <div className="mt-4 px-3 py-1 bg-gradient-to-r from-brand-wine to-brand-red rounded-full border border-brand-orange/50 flex items-center gap-2">
          <Trophy className="w-3 h-3 text-brand-orange" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Maior vencedora de 2025</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 space-y-3 mb-8">
        <button className="w-full py-3 bg-blue-900/20 border border-blue-500/30 rounded text-blue-400 font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-900/40 transition-all">
          <Mic2 className="w-4 h-4" />
          ACESSAR TEAMSPEAK
        </button>
        {!isLoggedIn ? (
          <Link href="/login" className="block">
            <button className="w-full py-3 bg-brand-wine/20 border border-brand-red/30 rounded text-brand-red font-bold text-sm flex items-center justify-center gap-2 hover:bg-brand-wine/40 transition-all">
              <LogIn className="w-4 h-4" />
              ENTRAR NA MINHA CONTA
            </button>
          </Link>
        ) : (
          <button onClick={handleLogout} className="w-full py-3 bg-brand-wine/20 border border-brand-red/30 rounded text-brand-red font-bold text-sm flex items-center justify-center gap-2 hover:bg-brand-wine/40 transition-all">
            <LogOut className="w-4 h-4" />
            SAIR DA CONTA
          </button>
        )}
        <Link href="/recruitment" className="block">
          <button className="w-full py-3 bg-brand-orange border border-brand-orange rounded text-white font-bold text-sm flex items-center justify-center gap-2 hover:scale-105 transition-all gamer-glow">
            <UserPlus className="w-4 h-4" />
            REALIZAR ALISTAMENTO
          </button>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest px-4 mb-4">Menu Principal</div>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link href={item.href}>
                  <div className={`flex items-center gap-4 px-4 py-3 rounded transition-all group ${
                    isActive 
                      ? 'bg-brand-wine/30 text-brand-orange border-r-4 border-brand-orange' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}>
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-brand-orange' : 'group-hover:text-brand-red'}`} />
                    <span className="font-medium">{item.name}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-brand-wine/20">
        <p className="text-[10px] text-gray-600 text-center uppercase tracking-tighter">
          &copy; 2026 BOSSHERAS GUILD.<br/>TODOS OS DIREITOS RESERVADOS.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
