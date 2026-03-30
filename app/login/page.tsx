'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, User, Lock, LogIn, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { auth, signInWithPopup, googleProvider, db, doc, getDoc, setDoc, signInWithEmailAndPassword } from '@/firebase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/profile');
    } catch (err: any) {
      console.error(err);
      setError('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user exists in db
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        // Create user
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          role: 'user',
          displayName: user.displayName || '',
          photoUrl: user.photoURL || '',
          createdAt: new Date().toISOString()
        });
      }
      
      router.push('/profile');
    } catch (err: any) {
      console.error(err);
      setError('Erro ao fazer login com Google. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6 bg-carbon">
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
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-1">Portal de controle BossHeras</p>
        </div>

        {/* Login Form */}
        <div className="bg-brand-card border border-brand-wine/30 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-wine via-brand-orange to-brand-wine" />
          
          <div className="space-y-6">
            {error && (
              <div className="p-3 bg-red-900/20 border border-red-500/30 rounded text-red-500 text-xs font-bold text-center">
                {error}
              </div>
            )}
            
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <input 
                type="email" 
                placeholder="E-mail" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-brand-wine/30 rounded-lg py-3 px-4 text-sm focus:border-brand-orange outline-none transition-all text-white"
                required
              />
              <input 
                type="password" 
                placeholder="Senha" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-brand-wine/30 rounded-lg py-3 px-4 text-sm focus:border-brand-orange outline-none transition-all text-white"
                required
              />
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-brand-orange text-white font-black rounded-lg hover:scale-[1.02] transition-all uppercase tracking-widest text-sm disabled:opacity-50"
              >
                {loading ? 'ENTRANDO...' : 'ENTRAR'}
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-brand-wine/30"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-brand-card px-2 text-gray-500">Ou</span>
              </div>
            </div>

            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-4 bg-white text-black font-black rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all uppercase tracking-widest text-sm disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
              </svg>
              {loading ? 'AUTENTICANDO...' : 'ENTRAR COM GOOGLE'}
            </button>
          </div>
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
