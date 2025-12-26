import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

// Hook personnalisé pour récupérer le nombre de comptes bloqués
const useBlockedAccountsCount = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        // Remplacez par votre appel API réel
        // const response = await api.get('/api/security/blocked-count');
        // setCount(response.data.count);
        
        // Mock pour la démo
        const mockCount = 7; // Nombre de comptes bloqués
        setCount(mockCount);
        setLoading(false);
      } catch (error) {
        console.error('Erreur récupération compteur:', error);
        setLoading(false);
      }
    };

    fetchCount();
    
    // Actualiser toutes les 30 secondes
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, []);

  return { count, loading };
};

// Composant Badge simple
export const BlockedAccountsBadge = ({ className = '' }) => {
  const { count, loading } = useBlockedAccountsCount();

  if (loading || count === 0) return null;

  return (
    <span className={`bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full ${className}`}>
      {count > 99 ? '99+' : count}
    </span>
  );
};

// Composant Badge avec animation (pour attirer l'attention)
export const AnimatedBlockedBadge = ({ className = '' }) => {
  const { count, loading } = useBlockedAccountsCount();

  if (loading || count === 0) return null;

  return (
    <span className={`relative inline-flex ${className}`}>
      <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
      <span className="relative inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
        {count > 99 ? '99+' : count}
      </span>
    </span>
  );
};

// Composant Badge détaillé (pour header ou cards)
export const DetailedBlockedBadge = () => {
  const { count, loading } = useBlockedAccountsCount();

  if (loading) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 animate-pulse">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3">
        <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">Aucun compte bloqué</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="relative">
          <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-red-700 dark:text-red-400">
            {count} compte{count > 1 ? 's' : ''} bloqué{count > 1 ? 's' : ''}
          </p>
          <p className="text-xs text-red-600 dark:text-red-500">
            Action requise
          </p>
        </div>
      </div>
    </div>
  );
};

// Composant notification flottante
export const BlockedAccountsNotification = ({ onViewDetails }) => {
  const { count } = useBlockedAccountsCount();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (count > 0) {
      setShow(true);
      // Auto-hide après 5 secondes
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  if (!show || count === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm animate-slideIn">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-l-4 border-red-500 p-4">
        <div className="flex items-start gap-3">
          <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 dark:text-white mb-1">
              Alerte Sécurité
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {count} compte{count > 1 ? 's' : ''} nécessite{count > 1 ? 'nt' : ''} votre attention
            </p>
            <div className="flex gap-2">
              <button
                onClick={onViewDetails}
                className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                Voir les détails
              </button>
              <button
                onClick={() => setShow(false)}
                className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Ignorer
              </button>
            </div>
          </div>
          <button
            onClick={() => setShow(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Exemple d'utilisation dans le menu de navigation
export const NavigationItemWithBadge = ({ 
  icon, 
  label, 
  showBlockedBadge = false,
  onClick 
}) => {
  const { count } = useBlockedAccountsCount();

  return (
    <button
      onClick={onClick}
      className="relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-medium flex-1 text-left">{label}</span>
      
      {showBlockedBadge && count > 0 && (
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      )}
    </button>
  );
};

// Style CSS pour l'animation slideIn (à ajouter dans votre fichier CSS global)
const styles = `
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slideIn {
  animation: slideIn 0.3s ease-out;
}
`;

export default BlockedAccountsBadge;