import React, { useState } from "react";
import { Link } from "react-router-dom";
import schema from "./validation";

function Formulaire() {
  const [infos, setInfos] = useState({
    nom: "",
    prenom: "",
    email: "",
    poste: "",
    tel: "",
    password: "",
  });
  const [erreur, setErreur] = useState("");
  const [afficher, setAfficher] = useState(false);

  const Afficher = (e) => {
    setAfficher(e.target.checked);
  };

  const Valeur = (e) => {
    setInfos({
      ...infos,
      [e.target.name]: e.target.value,
    });
  };

  const Ajouter = async (e) => {
    e.preventDefault();
    console.log("yo");

    try {
      await schema.validate(infos, { abortEarly: false });
      console.log("formulaire soumis avec succès", infos);
      setInfos({
        nom: "",
        prenom: "",
        email: "",
        poste: "",
        tel: "",
        password: "",
      });
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErreur(validationErrors);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="cadre w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
          <div className="titre text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Créer un compte
            </h1>
          </div>

          <div onSubmit={Ajouter} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  placeholder="Entrez votre nom"
                  value={infos.nom}
                  onChange={Valeur}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400 text-sm hover:border-gray-400 ${
                    erreur.nom ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                {erreur.nom && (
                  <div className="flex items-center mt-2">
                    <svg
                      className="w-4 h-4 text-red-500 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <p className="text-red-500 text-sm">{erreur.nom}</p>
                  </div>
                )}
              </div>

              <div>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  placeholder="Entrez votre prénom"
                  value={infos.prenom}
                  onChange={Valeur}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400 text-sm hover:border-gray-400 ${
                    erreur.prenom
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                {erreur.prenom && (
                  <div className="flex items-center mt-2">
                    <svg
                      className="w-4 h-4 text-red-500 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <p className="text-red-500 text-sm">{erreur.prenom}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Entrez votre email"
                value={infos.email}
                onChange={Valeur}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400 text-sm"
              />
              {erreur.email && (
                <div className="flex items-center mt-2">
                  <svg
                    className="w-4 h-4 text-red-500 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <p className="text-red-500 text-sm">{erreur.email}</p>
                </div>
              )}
            </div>

            <div>
              <input
                type="number"
                id="tel"
                name="tel"
                placeholder="Téléphone"
                value={infos.tel}
                onChange={Valeur}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400 text-sm"
              />
              {erreur.tel && (
                <div className="flex items-center mt-2">
                  <svg
                    className="w-4 h-4 text-red-500 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <p className="text-red-500 text-sm">{erreur.tel}</p>
                </div>
              )}
            </div>

            <div>
              <input
                type="text"
                id="poste"
                name="poste"
                placeholder="votre poste"
                value={infos.poste}
                onChange={Valeur}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400 text-sm"
              />
              {erreur.poste && (
                <div className="flex items-center mt-2">
                  <svg
                    className="w-4 h-4 text-red-500 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <p className="text-red-500 text-sm">{erreur.poste}</p>
                </div>
              )}
            </div>

            <div>
              <input
                type={afficher ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Mot de passe"
                value={infos.password}
                onChange={Valeur}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400 text-sm"
              />
              {erreur.password && (
                <div className="flex items-center mt-2">
                  <svg
                    className="w-4 h-4 text-red-500 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <p className="text-red-500 text-sm">{erreur.password}</p>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={afficher}
                onChange={Afficher}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-gray-600">
                Afficher le mot de passe
              </label>
            </div>

            <button
              onClick={Ajouter}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] transition duration-200 shadow-lg"
            >
              Créer mon compte
            </button>
          </div>

          <div className="connexion mt-6 text-center">
            <p className="text-gray-600">
              j'ai un compte ?{" "}
              <Link
                to="/connexion"
                className="text-blue-600 hover:text-blue-700 font-semibold underline transition duration-200"
              >
                se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Formulaire;
