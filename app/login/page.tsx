'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, User, Lock, LogIn, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-brand-orange transition-colors uppercase tracking-widest mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Início
        </Link>

        {/* Logo Area */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-brand-wine rounded-full flex items-center justify-center border-2 border-brand-orange mx-auto mb-4 gamer-glow">
            <Shield className="w-10 h-10 text-brand-orange" />
          </div>
          <h1 className="text-3xl font-black italic tracking-tighter font-montserrat text-glow">
            ÁREA DO <span className="text-brand-orange">MEMBRO</span>
          </h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-1">Portal de controle AllyFenix</p>
        </div>

        {/* Login Form */}
        <div className="bg-brand-card border border-brand-wine/30 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-wine via-brand-orange to-brand-wine" />
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Usuário</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                <input 
                  type="text" 
                  placeholder="Seu login"
                  className="w-full bg-black/40 border border-brand-wine/30 rounded-lg py-3 pl-12 pr-4 text-sm focus:border-brand-orange outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Senha</label>
                <button type="button" className="text-[10px] font-bold text-brand-red hover:text-brand-orange transition-colors uppercase tracking-widest">Esqueci a senha</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-brand-wine/30 rounded-lg py-3 pl-12 pr-4 text-sm focus:border-brand-orange outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 px-1">
              <input type="checkbox" className="w-4 h-4 accent-brand-orange" id="remember" />
              <label htmlFor="remember" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest cursor-pointer">Lembrar login</label>
            </div>

            <button className="w-full py-4 bg-brand-orange text-white font-black rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all gamer-glow uppercase tracking-widest text-sm">
              ACESSAR PORTAL
              <LogIn className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Footer Info */}
        <div className="mt-8 p-6 bg-brand-wine/10 border border-brand-wine/20 rounded-xl text-center">
          <p className="text-xs text-gray-400 mb-4">Ainda não faz parte da nossa elite?</p>
          <Link href="/recruitment">
            <button className="text-xs font-black text-brand-orange hover:text-brand-red transition-colors uppercase tracking-widest flex items-center justify-center gap-2 mx-auto">
              REALIZAR ALISTAMENTO AGORA
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
