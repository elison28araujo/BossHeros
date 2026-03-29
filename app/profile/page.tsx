'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { User, Video, Image as ImageIcon, Check, LogOut, Upload } from 'lucide-react';
import { motion } from 'motion/react';
import { auth, db, doc, getDoc, updateDoc, onAuthStateChanged, signOut, collection, addDoc } from '@/firebase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    displayName: '',
    photoUrl: ''
  });
  const [videoData, setVideoData] = useState({
    title: '',
    url: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setProfileData({
            displayName: data.displayName || '',
            photoUrl: data.photoUrl || ''
          });
        }
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement('img');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 200;
        const MAX_HEIGHT = 200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setProfileData({...profileData, photoUrl: dataUrl});
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        displayName: profileData.displayName,
        photoUrl: profileData.photoUrl
      });
      setMessage({ text: 'Perfil atualizado com sucesso!', type: 'success' });
    } catch (error) {
      console.error(error);
      setMessage({ text: 'Erro ao atualizar perfil.', type: 'error' });
    }
  };

  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    try {
      await addDoc(collection(db, 'videos'), {
        title: videoData.title,
        url: videoData.url,
        authorId: user.uid,
        authorName: profileData.displayName || user.email,
        createdAt: new Date().toISOString()
      });
      setVideoData({ title: '', url: '' });
      setMessage({ text: 'Vídeo enviado com sucesso!', type: 'success' });
    } catch (error) {
      console.error(error);
      setMessage({ text: 'Erro ao enviar vídeo.', type: 'error' });
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (loading) {
    return <div className="min-h-screen bg-brand-dark flex items-center justify-center text-brand-orange font-bold">CARREGANDO...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-72 p-10 space-y-12">
        {/* Header */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter font-montserrat text-glow">
              MEU <span className="text-brand-orange">PERFIL</span>
            </h2>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">Gerencie sua conta e envie vídeos</p>
          </div>
          <button onClick={handleLogout} className="p-3 bg-brand-card border border-brand-wine/20 rounded-lg text-red-400 hover:text-red-500 transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </section>

        {message.text && (
          <div className={`p-4 rounded-lg text-sm font-bold text-center ${message.type === 'success' ? 'bg-green-900/20 text-green-500 border border-green-500/30' : 'bg-red-900/20 text-red-500 border border-red-500/30'}`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-brand-card border border-brand-wine/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-brand-orange" />
              <h3 className="font-bold uppercase tracking-widest text-sm">Dados do Perfil</h3>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-brand-wine/30 border-2 border-brand-orange flex items-center justify-center overflow-hidden relative shrink-0">
                  {profileData.photoUrl ? (
                    <Image src={profileData.photoUrl} alt="Profile" fill className="object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <User className="w-10 h-10 text-brand-orange" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Fazer Upload de Foto</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full bg-black/40 border border-brand-wine/30 rounded-lg py-2 px-4 text-sm focus:border-brand-orange outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-brand-orange file:text-white hover:file:bg-brand-orange/80"
                    />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">Ou cole uma URL abaixo:</p>
                  <div className="relative mt-2">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                    <input 
                      type="text" 
                      value={profileData.photoUrl}
                      onChange={(e) => setProfileData({...profileData, photoUrl: e.target.value})}
                      placeholder="https://exemplo.com/foto.jpg"
                      className="w-full bg-black/40 border border-brand-wine/30 rounded-lg py-3 pl-12 pr-4 text-sm focus:border-brand-orange outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Nome de Exibição / Personagem Principal</label>
                <input 
                  type="text" 
                  value={profileData.displayName}
                  onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                  placeholder="Seu nome ou nick"
                  className="w-full bg-black/40 border border-brand-wine/30 rounded-lg py-3 px-4 text-sm focus:border-brand-orange outline-none transition-all"
                />
              </div>

              <button type="submit" className="w-full py-4 bg-brand-orange text-white font-black rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all gamer-glow uppercase tracking-widest text-sm">
                SALVAR PERFIL
                <Check className="w-4 h-4" />
              </button>
            </form>
          </motion.section>

          {/* Video Upload */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-brand-card border border-brand-wine/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Video className="w-5 h-5 text-brand-orange" />
              <h3 className="font-bold uppercase tracking-widest text-sm">Enviar Vídeo</h3>
            </div>

            <form onSubmit={handleVideoSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Título do Vídeo</label>
                <input 
                  type="text" 
                  required
                  value={videoData.title}
                  onChange={(e) => setVideoData({...videoData, title: e.target.value})}
                  placeholder="Ex: Castle Siege 29/03 - Vitória BossHeras"
                  className="w-full bg-black/40 border border-brand-wine/30 rounded-lg py-3 px-4 text-sm focus:border-brand-orange outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">URL do Vídeo (YouTube/Twitch)</label>
                <input 
                  type="url" 
                  required
                  value={videoData.url}
                  onChange={(e) => setVideoData({...videoData, url: e.target.value})}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full bg-black/40 border border-brand-wine/30 rounded-lg py-3 px-4 text-sm focus:border-brand-orange outline-none transition-all"
                />
              </div>

              <button type="submit" className="w-full py-4 bg-brand-wine/20 border border-brand-wine/30 text-brand-orange font-black rounded-lg flex items-center justify-center gap-2 hover:bg-brand-orange hover:text-white transition-all uppercase tracking-widest text-sm">
                ENVIAR VÍDEO PARA APROVAÇÃO
                <Upload className="w-4 h-4" />
              </button>
            </form>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
