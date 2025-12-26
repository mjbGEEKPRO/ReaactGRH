import React, { useState, useEffect } from 'react';
import { 
  Lock, Unlock, Search, Filter, AlertTriangle, 
  Clock, Shield, CheckCircle, XCircle, RefreshCw,
  User, Mail, Calendar, MapPin, Activity, Ban, UserX
} from 'lucide-react';

const BlockedAccountsManager = () => {
  const [blockedAccounts, setBlockedAccounts] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState(''); // 'unblock', 'block', 'unblock-ip'
  const [activeTab, setActiveTab] = useState('blocked'); // 'blocked' ou 'active'
  const [blockReason, setBlockReason] = useState('');

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Remplacez par vos appels API réels
      // const [blockedRes, activeRes] = await Promise.all([
      //   api.get('/api/security/blocked-accounts'),
      //   api.get('/api/users/active')
      // ]);
      
      const mockBlockedData = {
        users: [
          {
            id: 1,
            email: 'jean.dupont@entreprise.com',
            name: 'Jean Dupont',
            blocked_at: '2024-12-14 10:30:00',
            reason: 'Compte désactivé par l\'administrateur',
            attempts: 0,
            last_ip: '192.168.1.100',
            type: 'user',
            department: 'RH'
          },
          {
            id: 2,
            email: 'marie.martin@entreprise.com',
            name: 'Marie Martin',
            blocked_at: '2024-12-14 14:20:00',
            reason: 'Demande de l\'utilisateur',
            attempts: 0,
            last_ip: '192.168.1.105',
            type: 'user',
            department: 'Finance'
          }
        ],
        ips: [
          {
            id: 1,
            ip_address: '192.168.1.200',
            blocked_until: '2024-12-14 18:30:00',
            attempts_count: 5,
            first_attempt: '2024-12-14 15:15:00',
            last_attempt: '2024-12-14 15:30:00',
            type: 'ip',
            emails_tried: ['test@test.com', 'admin@test.com', 'user@test.com']
          },
          {
            id: 2,
            ip_address: '203.45.67.89',
            blocked_until: '2024-12-14 20:00:00',
            attempts_count: 8,
            first_attempt: '2024-12-14 17:00:00',
            last_attempt: '2024-12-14 17:45:00',
            type: 'ip',
            emails_tried: ['hack@test.com', 'admin@admin.com']
          }
        ]
      };

      const mockActiveUsers = [
        {
          id: 3,
          email: 'pierre.durand@entreprise.com',
          name: 'Pierre Durand',
          department: 'IT',
          role: 'Développeur',
          last_login: '2024-12-14 09:15:00',
          status: 'active'
        },
        {
          id: 4,
          email: 'sophie.bernard@entreprise.com',
          name: 'Sophie Bernard',
          department: 'Marketing',
          role: 'Manager',
          last_login: '2024-12-14 08:30:00',
          status: 'active'
        },
        {
          id: 5,
          email: 'luc.petit@entreprise.com',
          name: 'Luc Petit',
          department: 'Ventes',
          role: 'Commercial',
          last_login: '2024-12-13 17:45:00',
          status: 'active'
        }
      ];

      const allBlocked = [...mockBlockedData.users, ...mockBlockedData.ips];
      setBlockedAccounts(allBlocked);
      setActiveUsers(mockActiveUsers);
      setLoading(false);
    } catch (error) {
      console.error('Erreur chargement:', error);
      setLoading(false);
    }
  };

  const handleAction = (account, action) => {
    setSelectedAccount(account);
    setActionType(action);
    setShowActionModal(true);
    setBlockReason('');
  };

  const confirmAction = async () => {
    try {
      if (actionType === 'unblock') {
        // await api.post(`/api/security/unblock-user/${selectedAccount.id}`);
        console.log('Déblocage utilisateur:', selectedAccount.id);
        alert(`✅ Compte ${selectedAccount.name} débloqué avec succès`);
      } else if (actionType === 'block') {
        if (!blockReason.trim()) {
          alert('⚠️ Veuillez indiquer une raison pour le blocage');
          return;
        }
        // await api.post(`/api/security/block-user/${selectedAccount.id}`, { reason: blockReason });
        console.log('Blocage utilisateur:', selectedAccount.id, 'Raison:', blockReason);
        alert(`✅ Compte ${selectedAccount.name} bloqué avec succès`);
      } else if (actionType === 'unblock-ip') {
        // await api.post(`/api/security/unblock-ip/${selectedAccount.ip_address}`);
        console.log('Déblocage IP:', selectedAccount.ip_address);
        alert(`✅ IP ${selectedAccount.ip_address} débloquée avec succès`);
      }
      
      setShowActionModal(false);
      setSelectedAccount(null);
      setBlockReason('');
      loadData();
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors de l\'opération');
    }
  };

  const getTimeRemaining = (blockedUntil) => {
    const now = new Date();
    const until = new Date(blockedUntil);
    const diff = until - now;
    
    if (diff <= 0) return 'Expiré';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const filteredBlocked = blockedAccounts.filter(account => {
    const matchesSearch = account.type === 'user'
      ? (account.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         account.email?.toLowerCase().includes(searchTerm.toLowerCase()))
      : account.ip_address?.includes(searchTerm);
    
    const matchesFilter = filterType === 'all' ||
      (filterType === 'users' && account.type === 'user') ||
      (filterType === 'ips' && account.type === 'ip');
    
    return matchesSearch && matchesFilter;
  });

  const filteredActive = activeUsers.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalBlocked: blockedAccounts.length,
    blockedUsers: blockedAccounts.filter(a => a.type === 'user').length,
    blockedIPs: blockedAccounts.filter(a => a.type === 'ip').length,
    activeUsers: activeUsers.length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">Actifs</p>
              <p className="text-3xl font-bold">{stats.activeUsers}</p>
            </div>
            <CheckCircle className="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium mb-1">Total Bloqués</p>
              <p className="text-3xl font-bold">{stats.totalBlocked}</p>
            </div>
            <Lock className="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium mb-1">Utilisateurs</p>
              <p className="text-3xl font-bold">{stats.blockedUsers}</p>
            </div>
            <UserX className="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">Adresses IP</p>
              <p className="text-3xl font-bold">{stats.blockedIPs}</p>
            </div>
            <Shield className="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>

      {/* Tabs et recherche */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('blocked')}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                  activeTab === 'blocked'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Comptes Bloqués
                  {stats.totalBlocked > 0 && (
                    <span className="bg-white/30 px-2 py-0.5 rounded-full text-xs font-bold">
                      {stats.totalBlocked}
                    </span>
                  )}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('active')}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                  activeTab === 'active'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Comptes Actifs
                </span>
              </button>
            </div>

            {/* Bouton refresh */}
            <button
              onClick={loadData}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg"
            >
              <RefreshCw className="w-4 h-4" />
              Actualiser
            </button>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher par email, nom, IP ou département..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {activeTab === 'blocked' && (
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-4 py-2.5 rounded-xl font-medium transition-all ${
                    filterType === 'all'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Tous
                </button>
                <button
                  onClick={() => setFilterType('users')}
                  className={`px-4 py-2.5 rounded-xl font-medium transition-all ${
                    filterType === 'users'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <User className="w-4 h-4 inline mr-1" />
                  Utilisateurs
                </button>
                <button
                  onClick={() => setFilterType('ips')}
                  className={`px-4 py-2.5 rounded-xl font-medium transition-all ${
                    filterType === 'ips'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Shield className="w-4 h-4 inline mr-1" />
                  IPs
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Liste des comptes */}
      <div className="space-y-4">
        {activeTab === 'blocked' ? (
          filteredBlocked.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-sm border border-gray-200 dark:border-gray-700">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Aucun compte bloqué
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tous les comptes sont actuellement actifs
              </p>
            </div>
          ) : (
            filteredBlocked.map((account) => (
              <div
                key={`${account.type}-${account.id}`}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                {account.type === 'user' ? (
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                          {account.name}
                        </h3>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {account.email}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Bloqué le: {new Date(account.blocked_at).toLocaleString('fr-FR')}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Dernière IP: {account.last_ip}
                          </p>
                          <div className="mt-2 inline-block">
                            <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-1 rounded-full text-xs font-medium">
                              {account.reason}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAction(account, 'unblock')}
                      className="px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center gap-2 shadow-lg whitespace-nowrap"
                    >
                      <Unlock className="w-4 h-4" />
                      Débloquer
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                          IP: {account.ip_address}
                        </h3>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            {account.attempts_count} tentatives échouées
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Bloqué jusqu'à: {new Date(account.blocked_until).toLocaleString('fr-FR')}
                          </p>
                          <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                            Temps restant: {getTimeRemaining(account.blocked_until)}
                          </p>
                          <div className="mt-2">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Emails tentés:</p>
                            <div className="flex flex-wrap gap-1">
                              {account.emails_tried.map((email, idx) => (
                                <span key={idx} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded text-xs">
                                  {email}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAction(account, 'unblock-ip')}
                      className="px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center gap-2 shadow-lg whitespace-nowrap"
                    >
                      <Unlock className="w-4 h-4" />
                      Débloquer IP
                    </button>
                  </div>
                )}
              </div>
            ))
          )
        ) : (
          // Liste des comptes actifs
          filteredActive.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-sm border border-gray-200 dark:border-gray-700">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Aucun utilisateur trouvé
              </h3>
            </div>
          ) : (
            filteredActive.map((user) => (
              <div
                key={user.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                          {user.name}
                        </h3>
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full text-xs font-medium">
                          Actif
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {user.email}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {user.role} • {user.department}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-2">
                          <Activity className="w-4 h-4" />
                          Dernière connexion: {new Date(user.last_login).toLocaleString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAction(user, 'block')}
                    className="px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium flex items-center gap-2 shadow-lg whitespace-nowrap"
                  >
                    <Ban className="w-4 h-4" />
                    Bloquer
                  </button>
                </div>
              </div>
            ))
          )
        )}
      </div>

      {/* Modal de confirmation */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {actionType === 'block' ? 'Bloquer le compte' : 'Débloquer le compte'}
              </h2>
              <button
                onClick={() => {
                  setShowActionModal(false);
                  setBlockReason('');
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <XCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="mb-6">
              {actionType === 'unblock' && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                  <p className="text-sm text-green-800 dark:text-green-300 mb-2">
                    Êtes-vous sûr de vouloir débloquer ce compte ?
                  </p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    {selectedAccount?.name || selectedAccount?.ip_address}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {selectedAccount?.email}
                  </p>
                </div>
              )}

              {actionType === 'unblock-ip' && (
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
                  <p className="text-sm text-purple-800 dark:text-purple-300 mb-2">
                    Êtes-vous sûr de vouloir débloquer cette adresse IP ?
                  </p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    {selectedAccount?.ip_address}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {selectedAccount?.attempts_count} tentatives enregistrées
                  </p>
                </div>
              )}

              {actionType === 'block' && (
                <div className="space-y-4">
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                    <p className="text-sm text-red-800 dark:text-red-300 mb-2">
                      Êtes-vous sûr de vouloir bloquer ce compte ?
                    </p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {selectedAccount?.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {selectedAccount?.email}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Raison du blocage *
                    </label>
                    <textarea
                      value={blockReason}
                      onChange={(e) => setBlockReason(e.target.value)}
                      placeholder="Exemple: Violation des règles, activité suspecte, demande de l'utilisateur..."
                      rows={3}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowActionModal(false);
                  setBlockReason('');
                }}
                className="flex-1 px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                Annuler
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 px-6 py-2.5 rounded-xl transition-colors font-medium text-white ${
                  actionType === 'block'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {actionType === 'block' ? 'Bloquer' : 'Débloquer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockedAccountsManager;