function AccessRefuser({
  section = "cette section",
  showBackButton = true,
  className = "",
}) {
  return (
    <div
      className={`text-center py-16 bg-white rounded-3xl shadow-lg border border-red-100 ${className}`}
    >
      <div className="text-6xl mb-4">🔒</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        💔Cher amie ce n'est pas de ta faute mais l'accès t'est refusé
      </h2>
      <p className="text-gray-600 mb-4">
        Vous n'avez pas les permissions nécessaires pour accéder à {section}.
      </p>
      <div className="text-sm text-gray-500 bg-gray-50 inline-block px-4 py-2 rounded-lg mb-4">
        Contactez un administrateur pour obtenir l'accès
      </div>
      {showBackButton && (
        <div>
          <button
            onClick={() => window.history.back()}
            // onClick={() => authUtils.logout()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors mt-2"
          >
            Retour
          </button>
        </div>
      )}
    </div>
  );
}
export default AccessRefuser;
