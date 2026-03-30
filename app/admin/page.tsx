'use client';

import React, { useState, useEffect } from 'react';
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
  Shield,
  Lock,
  User,
  LogIn,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db, onAuthStateChanged, collection, getDocs, updateDoc, doc, deleteDoc, onSnapshot, signOut, setDoc } from '@/firebase';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [recruits, setRecruits] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState({ guildWins: 152, activeMembers: 450, yearsOfGlory: 8 });
  const [editStats, setEditStats] = useState({ guildWins: 152, activeMembers: 450, yearsOfGlory: 8 });
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsUserLoggedIn(true);
        // Check role
        const userDoc = await getDocs(collection(db, 'users'));
        const currentUser = userDoc.docs.find(d => d.id === user.uid)?.data();
        
        if (currentUser?.role === 'admin' || user.email === 'elison28araujo@gmail.com') {
          setIsLoggedIn(true);
          setUserRole('admin');
        } else {
          setIsLoggedIn(false);
        }
      } else {
        setIsUserLoggedIn(false);
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    const unsubscribeRecruits = onSnapshot(collection(db, 'recruits'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecruits(data);
    });

    const unsubscribeStats = onSnapshot(doc(db, 'stats', 'global'), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as any;
        setStats(data);
        setEditStats(data);
      }
    });

    const unsubscribeVideos = onSnapshot(collection(db, 'videos'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVideos(data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    });

    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(data);
    });

    return () => {
      unsubscribeRecruits();
      unsubscribeStats();
      unsubscribeVideos();
      unsubscribeUsers();
    };
  }, [isLoggedIn]);

  const handleApprove = async (id: string) => {
    try {
      await updateDoc(doc(db, 'recruits', id), { status: 'Aprovado' });
    } catch (error) {
      console.error(error);
      alert('Erro ao aprovar alistamento.');
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateDoc(doc(db, 'recruits', id), { status: 'Reprovado' });
    } catch (error) {
      console.error(error);
      alert('Erro ao reprovar alistamento.');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/login';
  };

  const handleUpdateStats = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'stats', 'global'), editStats, { merge: true });
      alert('Estatísticas atualizadas com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar estatísticas.');
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este vídeo?')) {
      try {
        await deleteDoc(doc(db, 'videos', id));
      } catch (error) {
        console.error(error);
        alert('Erro ao excluir vídeo.');
      }
    }
  };

  const handleDeleteRecruit = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este alistamento?')) {
      try {
        await deleteDoc(doc(db, 'recruits', id));
        alert('Alistamento excluído com sucesso.');
      } catch (error) {
        console.error(error);
        alert('Erro ao excluir alistamento.');
      }
    }
  };

  const handleBanUser = async (userId: string) => {
    if (window.confirm('Tem certeza que deseja BANIR este usuário?')) {
      try {
        await updateDoc(doc(db, 'users', userId), { approved: false, role: 'banned' });
        alert('Usuário banido com sucesso.');
      } catch (error) {
        console.error(error);
        alert('Erro ao banir usuário.');
      }
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Tem certeza que deseja EXCLUIR este usuário? Esta ação não pode ser desfeita.')) {
      try {
        await deleteDoc(doc(db, 'users', userId));
        alert('Usuário excluído com sucesso.');
      } catch (error) {
        console.error(error);
        alert('Erro ao excluir usuário.');
      }
    }
  };

  const handleToggleRole = async (userId: string, currentRole: string) => {
    try {
      const newRole = currentRole === 'admin' ? 'user' : 'admin';
      await updateDoc(doc(db, 'users', userId), { role: newRole });
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar permissões do usuário.');
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-brand-dark flex items-center justify-center text-brand-orange font-bold">CARREGANDO...</div>;
  }

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-72 p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-brand-wine rounded-full flex items-center justify-center border-2 border-brand-orange mx-auto mb-4 gamer-glow">
                <Shield className="w-10 h-10 text-brand-orange" />
              </div>
              <h1 className="text-3xl font-black italic tracking-tighter font-montserrat text-glow">
                ACESSO <span className="text-brand-orange">RESTRITO</span>
              </h1>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-1">Painel Administrativo</p>
            </div>

            <div className="bg-brand-card border border-brand-wine/30 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-wine via-brand-orange to-brand-wine" />
              
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); window.location.href = isUserLoggedIn ? '/profile' : '/login'; }}>
                <div className="p-3 bg-red-900/20 border border-red-500/30 rounded text-red-500 text-xs font-bold text-center">
                  Você não tem permissão para acessar o painel. Faça login com uma conta de administrador.
                </div>
                
                <button type="submit" className="w-full py-4 bg-brand-orange text-white font-black rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all gamer-glow uppercase tracking-widest text-sm">
                  {isUserLoggedIn ? 'IR PARA MEU PERFIL' : 'IR PARA LOGIN'}
                  <LogIn className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
            <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">Bem-vindo de volta, GM_BOSSHERAS</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleLogout} className="relative p-3 bg-brand-card border border-brand-wine/20 rounded-lg text-red-400 hover:text-red-500 transition-all">
              <LogOut className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-brand-wine/20">
              <div className="text-right">
                <div className="text-xs font-bold text-white">GM_BOSSHERAS</div>
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
          <StatCard title="Novos Alistamentos" value={recruits.filter(r => r.status === 'Pendente').length} icon={Users} color="text-brand-orange" />
          <StatCard title="Vitórias CS" value={stats.guildWins} icon={Trophy} color="text-yellow-500" />
          <StatCard title="Membros Ativos" value={stats.activeMembers} icon={Users} color="text-green-500" />
          <StatCard title="Anos de Glória" value={stats.yearsOfGlory} icon={Trophy} color="text-blue-500" />
        </section>

        {/* Admin Tabs */}
        <section className="space-y-6">
          <div className="flex gap-2 p-1 bg-black/40 border border-brand-wine/20 rounded-lg w-fit">
            {[
              { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
              { id: 'recruitment', label: 'Recrutamento', icon: Users },
              { id: 'users', label: 'Usuários', icon: Shield },
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
            {activeTab === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-brand-card border border-brand-wine/20 rounded-xl overflow-hidden"
              >
                <div className="p-6 border-b border-brand-wine/20">
                  <h3 className="font-bold text-sm uppercase tracking-widest text-brand-orange">Gerenciar Usuários</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-brand-wine/10">
                        <th className="px-6 py-4">Usuário</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Aprovado</th>
                        <th className="px-6 py-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-brand-wine/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-sm font-bold text-white">{user.displayName || 'Sem nome'}</td>
                          <td className="px-6 py-4 text-xs text-gray-400">{user.email}</td>
                          <td className="px-6 py-4">
                            <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase tracking-tighter border ${
                              user.role === 'admin' ? 'bg-brand-orange/20 text-brand-orange border-brand-orange/20' : 'bg-gray-800 text-gray-400 border-gray-700'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button 
                              onClick={() => updateDoc(doc(db, 'users', user.id), { approved: !user.approved })}
                              className={`text-[10px] px-2 py-1 rounded font-bold uppercase tracking-tighter border ${
                                user.approved ? 'bg-green-900/20 text-green-500 border-green-500/20' : 'bg-red-900/20 text-red-500 border-red-500/20'
                              }`}
                            >
                              {user.approved ? 'Sim' : 'Não'}
                            </button>
                          </td>
                          <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleToggleRole(user.id, user.role)}
                              className="text-xs font-bold text-brand-orange hover:text-white transition-all uppercase tracking-widest"
                            >
                              {user.role === 'admin' ? 'Remover Admin' : 'Tornar Admin'}
                            </button>
                            <button 
                              onClick={() => handleBanUser(user.id)}
                              className="text-xs font-bold text-yellow-500 hover:text-white transition-all uppercase tracking-widest"
                            >
                              Banir
                            </button>
                            <button 
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-xs font-bold text-red-500 hover:text-white transition-all uppercase tracking-widest"
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

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
                      {recruits.map((recruit) => (
                        <tr key={recruit.id} className="border-b border-brand-wine/5 hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-brand-wine/20 flex items-center justify-center text-brand-orange font-bold text-xs uppercase">
                                {recruit.user?.[0] || '?'}
                              </div>
                              <div>
                                <div className="text-sm font-bold text-white">{recruit.user}</div>
                                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">WPP: {recruit.whatsapp}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-brand-orange">{recruit.charAttack}</td>
                          <td className="px-6 py-4 text-xs text-gray-400">{new Date(recruit.createdAt).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase tracking-tighter border ${
                              recruit.status === 'Pendente' ? 'bg-yellow-900/20 text-yellow-500 border-yellow-500/20' :
                              recruit.status === 'Aprovado' ? 'bg-green-900/20 text-green-500 border-green-500/20' :
                              'bg-red-900/20 text-red-500 border-red-500/20'
                            }`}>
                              {recruit.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleApprove(recruit.id)} className="p-2 bg-green-900/20 text-green-500 rounded hover:bg-green-500 hover:text-white transition-all"><Check className="w-4 h-4" /></button>
                              <button onClick={() => handleReject(recruit.id)} className="p-2 bg-red-900/20 text-red-500 rounded hover:bg-red-500 hover:text-white transition-all"><X className="w-4 h-4" /></button>
                              <button onClick={() => handleDeleteRecruit(recruit.id)} className="p-2 bg-gray-900/20 text-gray-500 rounded hover:bg-gray-500 hover:text-white transition-all"><X className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {recruits.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-gray-500 text-sm">Nenhum alistamento encontrado.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-brand-card border border-brand-wine/20 rounded-xl p-8"
              >
                <h3 className="font-bold text-sm uppercase tracking-widest text-brand-orange mb-6">Atualizar Estatísticas CS</h3>
                <form onSubmit={handleUpdateStats} className="space-y-6 max-w-md">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Vitórias CS</label>
                    <input 
                      type="number" 
                      value={editStats.guildWins}
                      onChange={(e) => setEditStats({...editStats, guildWins: Number(e.target.value)})}
                      className="w-full bg-black/40 border border-brand-wine/30 rounded-lg py-3 px-4 text-sm focus:border-brand-orange outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Membros Ativos</label>
                    <input 
                      type="number" 
                      value={editStats.activeMembers}
                      onChange={(e) => setEditStats({...editStats, activeMembers: Number(e.target.value)})}
                      className="w-full bg-black/40 border border-brand-wine/30 rounded-lg py-3 px-4 text-sm focus:border-brand-orange outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Anos de Glória</label>
                    <input 
                      type="number" 
                      value={editStats.yearsOfGlory}
                      onChange={(e) => setEditStats({...editStats, yearsOfGlory: Number(e.target.value)})}
                      className="w-full bg-black/40 border border-brand-wine/30 rounded-lg py-3 px-4 text-sm focus:border-brand-orange outline-none transition-all"
                    />
                  </div>
                  <button type="submit" className="w-full py-4 bg-brand-orange text-white font-black rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all gamer-glow uppercase tracking-widest text-sm">
                    SALVAR ESTATÍSTICAS
                    <Check className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>
            )}

            {activeTab === 'content' && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-brand-card border border-brand-wine/20 rounded-xl overflow-hidden"
              >
                <div className="p-6 border-b border-brand-wine/20 flex items-center justify-between">
                  <h3 className="font-bold text-sm uppercase tracking-widest text-brand-orange">Gerenciar Vídeos</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-brand-wine/10">
                        <th className="px-6 py-4">Título</th>
                        <th className="px-6 py-4">Autor</th>
                        <th className="px-6 py-4">Data</th>
                        <th className="px-6 py-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {videos.map((video) => (
                        <tr key={video.id} className="border-b border-brand-wine/5 hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="text-sm font-bold text-white line-clamp-1">{video.title}</div>
                            <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-brand-orange hover:underline uppercase font-bold tracking-tighter">Ver Vídeo</a>
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-gray-400">{video.authorName}</td>
                          <td className="px-6 py-4 text-xs text-gray-400">{new Date(video.createdAt).toLocaleDateString()}</td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => handleDeleteVideo(video.id)} className="p-2 bg-red-900/20 text-red-500 rounded hover:bg-red-500 hover:text-white transition-all"><X className="w-4 h-4" /></button>
                          </td>
                        </tr>
                      ))}
                      {videos.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-gray-500 text-sm">Nenhum vídeo encontrado.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-brand-card border border-brand-wine/20 rounded-xl p-8"
              >
                <h3 className="font-bold text-sm uppercase tracking-widest text-brand-orange mb-6">Configurações do Sistema</h3>
                
                <div className="space-y-8 max-w-2xl">
                  <div className="p-6 border border-red-500/20 bg-red-900/10 rounded-xl">
                    <h4 className="font-bold text-red-500 mb-2 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      ZONA DE PERIGO
                    </h4>
                    <p className="text-sm text-gray-400 mb-6">
                      As ações abaixo são destrutivas e não podem ser revertidas. Tenha certeza absoluta antes de prosseguir.
                    </p>
                    
                    <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-red-500/10">
                      <div>
                        <div className="font-bold text-white text-sm">Zerar Alistamentos</div>
                        <div className="text-xs text-gray-500">Funcionalidade indisponível temporariamente.</div>
                      </div>
                    </div>
                  </div>
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
                      { user: 'GM_BOSSHERAS', action: 'atualizou o ranking CS', time: '2 horas atrás', icon: Trophy },
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
