import React from "react";

export default function ModalCompteDesactive({
  open = true,
  onClose = () => {
    window.location.href = "/";
  },
  onContact = () => {},
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {" "}
      {/* Backdrop */}{" "}
      <div
        className="fixed inset-0 bg-gradient-to-b from-black/60 to-black/50 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative z-10 mx-4 max-w-xl w-full">
        <div className="transform transition-all duration-300 ease-out scale-100">
          <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10">
            {/* Header with Indo Purple gradient */}
            <div className="px-6 py-5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {/* Shield / Lock icon */}
                  <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 11c.97 0 1.75-.78 1.75-1.75S12.97 7.5 12 7.5 10.25 8.28 10.25 9.25 11.03 11 12 11z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 8.75v5.5a8.25 8.25 0 11-16.5 0v-5.5A2.75 2.75 0 016.5 6h11.25A2.75 2.75 0 0120.25 8.75z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-white text-lg font-semibold leading-tight">
                    Compte désactivé
                  </h3>
                  <p className="mt-1 text-indigo-100 text-sm/relaxed">
                    Accès non autorisé
                  </p>
                </div>

                <button
                  onClick={onClose}
                  aria-label="Fermer"
                  className="ml-3 -mr-2 rounded-md p-2 text-indigo-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="bg-white p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12A9 9 0 1112 3v0"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong>Compte désactivé.</strong> Veuillez contacter
                    l'administration pour le récupérer. Vous avez désactiver
                    votre compte
                  </p>

                  <p className="mt-3 text-xs text-slate-400">
                    Si vous pensez que c'est une erreur, fournissez le maximum
                    d'informations (nom d'utilisateur, adresse e‑mail, date
                    approximative) au support.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
                <button
                  onClick={() => {
                    onContact();
                  }}
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold bg-indigo-600 text-white shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Contacter l'administration
                </button>

                <button
                  onClick={onClose}
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg px-4 py-2 text-sm font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  Fermer
                </button>
              </div>
            </div>

            {/* Footer subtle */}
            <div className="px-6 py-3 bg-gradient-to-t from-white/0 to-white/30 text-xs text-slate-400">
              <div className="flex items-center justify-between">
                <span>Assistance disponible du lundi au vendredi</span>
                <span className="font-mono">Réf. #AC-403</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
