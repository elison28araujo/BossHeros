'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, User, Lock, ArrowRight, CheckCircle2, Phone, Sword, ShieldAlert, Users, Target, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const StepIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="flex items-center justify-center gap-4 mb-12">
    {[1, 2, 3].map((step) => (
      <React.Fragment key={step}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${
          currentStep >= step 
            ? 'bg-brand-orange border-brand-orange text-white gamer-glow' 
            : 'border-brand-wine/50 text-gray-600'
        }`}>
          {currentStep > step ? <Check className="w-5 h-5" /> : step}
        </div>
        {step < 3 && (
          <div className={`w-12 h-1 bg-brand-wine/30 rounded ${currentStep > step ? 'bg-brand-orange' : ''}`} />
        )}
      </React.Fragment>
    ))}
  </div>
);

export default function RecruitmentPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    user: '',
    password: '',
    confirmPassword: '',
    whatsapp: '',
    charAttack: '',
    missionAttack: '',
    charDefense: '',
    missionDefense: '',
    otherChars: '',
    charUp: '',
    charBoss: '',
    receiveVideos: false,
    acceptRules: false
  });

  const handleNext = () => setStep(s => Math.min(s + 1, 3));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6">
            <div className="w-16 h-16 bg-brand-wine rounded-full flex items-center justify-center border-2 border-brand-orange mx-auto gamer-glow">
              <Shield className="w-8 h-8 text-brand-orange" />
            </div>
          </Link>
          <h1 className="text-4xl font-black italic tracking-tighter font-montserrat text-glow mb-2">
            ALISTAMENTO <span className="text-brand-orange">ALLYFENIX</span>
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Junte-se à elite do continente</p>
        </div>

        <div className="bg-brand-card border border-brand-wine/30 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-wine via-brand-orange to-brand-wine" />
          
          <StepIndicator currentStep={step} />

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Usuário</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                      <input 
                        type="text" 
                        placeholder="Seu login preferido"
                        className="w-full bg-black/40 border border-brand-wine/30 rounded-lg py-3 pl-12 pr-4 text-sm focus:border-brand-orange outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">WhatsApp</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                      <input 
                        type="text" 
                        placeholder="(00) 00000-0000"
                        className="w-full bg-black/40 border border-brand-wine/30 rounded-lg py-3 pl-12 pr-4 text-sm focus:border-brand-orange outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Senha</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full bg-black/40 border border-brand-wine/30 rounded-lg py-3 pl-12 pr-4 text-sm focus:border-brand-orange outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Confirmar Senha</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full bg-black/40 border border-brand-wine/30 rounded-lg py-3 pl-12 pr-4 text-sm focus:border-brand-orange outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleNext}
                  className="w-full py-4 bg-brand-orange text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all gamer-glow uppercase tracking-widest text-sm"
                >
                  PRÓXIMA ETAPA
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Personagem Ataque</label>
                    <div className="relative">
                      <Sword className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-red" />
                      <input 
                        type="text" 
                        placeholder="Nome do char"
                        className="w-full bg-black/40 border border-brand-wine/30 rounded-lg py-3 pl-12 pr-4 text-sm focus:border-brand-orange outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Missão Ataque</label>
                    <div className="relative">
                      <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-red" />
                      <input 
                        type="text" 
                        placeholder="Ex: Switch, Killer"
                        className="w-full bg-black/40 border border-brand-wine/30 rounded-lg py-3 pl-12 pr-4 text-sm focus:border-brand-orange outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Personagem Defesa</label>
                    <div className="relative">
                      <ShieldAlert className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                      <input 
                        type="text" 
                        placeholder="Nome do char"
                        className="w-full bg-black/40 border border-brand-wine/30 rounded-lg py-3 pl-12 pr-4 text-sm focus:border-brand-orange outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Missão Defesa</label>
                    <div className="relative">
                      <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                      <input 
                        type="text" 
                        placeholder="Ex: Tanker, Support"
                        className="w-full bg-black/40 border border-brand-wine/30 rounded-lg py-3 pl-12 pr-4 text-sm focus:border-brand-orange outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Personagem de Up</label>
                    <input 
                      type="text" 
                      placeholder="Nome do char"
                      className="w-full bg-black/40 border border-brand-wine/30 rounded-lg py-3 px-4 text-sm focus:border-brand-orange outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Personagem de Boss</label>
                    <input 
                      type="text" 
                      placeholder="Nome do char"
                      className="w-full bg-black/40 border border-brand-wine/30 rounded-lg py-3 px-4 text-sm focus:border-brand-orange outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded border border-white/10">
                  <input type="checkbox" className="w-4 h-4 accent-brand-orange" id="videos" />
                  <label htmlFor="videos" className="text-xs text-gray-400 font-bold uppercase tracking-widest cursor-pointer">Deseja receber vídeos e tutoriais da guild?</label>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={handleBack}
                    className="flex-1 py-4 bg-brand-wine/20 border border-brand-wine/30 text-gray-400 font-bold rounded-lg hover:bg-brand-wine/40 transition-all uppercase tracking-widest text-sm"
                  >
                    VOLTAR
                  </button>
                  <button 
                    onClick={handleNext}
                    className="flex-[2] py-4 bg-brand-orange text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all gamer-glow uppercase tracking-widest text-sm"
                  >
                    PRÓXIMA ETAPA
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="bg-black/40 border border-brand-wine/30 rounded-lg p-6 max-h-60 overflow-y-auto space-y-4 text-sm text-gray-400 leading-relaxed">
                  <h4 className="font-bold text-brand-orange uppercase tracking-widest mb-4">REGRAS DA ALLYFENIX</h4>
                  <p>1. O uso do TeamSpeak 3 é obrigatório durante todos os eventos de Castle Siege.</p>
                  <p>2. Respeito mútuo entre todos os membros, independente de cargo ou tempo de guild.</p>
                  <p>3. Proibido o uso de qualquer software auxiliar (hacks, bots) que comprometa a integridade da guild.</p>
                  <p>4. Participação ativa nos treinos e reuniões pré-siege.</p>
                  <p>5. Lealdade à aliança acima de tudo.</p>
                  <p>6. O descumprimento de qualquer regra resultará em expulsão imediata.</p>
                </div>

                <div className="flex items-center gap-3 p-4 bg-brand-orange/5 rounded border border-brand-orange/20">
                  <input type="checkbox" className="w-5 h-5 accent-brand-orange" id="rules" />
                  <label htmlFor="rules" className="text-xs text-brand-orange font-bold uppercase tracking-widest cursor-pointer">Li e aceito todas as regras da guilda AllyFenix</label>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={handleBack}
                    className="flex-1 py-4 bg-brand-wine/20 border border-brand-wine/30 text-gray-400 font-bold rounded-lg hover:bg-brand-wine/40 transition-all uppercase tracking-widest text-sm"
                  >
                    VOLTAR
                  </button>
                  <button 
                    className="flex-[2] py-4 bg-gradient-to-r from-brand-red to-brand-orange text-white font-black rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all gamer-glow uppercase tracking-widest text-sm"
                  >
                    ENVIAR ALISTAMENTO
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 text-center">
          <Link href="/login" className="text-xs font-bold text-gray-600 hover:text-brand-orange transition-colors uppercase tracking-widest">
            Já possui uma conta? Realizar Login
          </Link>
        </div>
      </div>
    </div>
  );
}
