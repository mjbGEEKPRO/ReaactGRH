import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import schema from "./validation";
function Connexion() {
  const [infos, setInfos] = useState({
    email: "",
    password: "",
  });
  const [erreur, setErreur] = useState("");
  const [afficher, setAfficher] = useState(false);

  const Afficher = (e) => {
    setAfficher(e.target.checked);
  };

  const Valeur = (e) => {
    setInfos({ ...infos, [e.target.name]: e.target.value });
  };

  const connecter = async (e) => {
    e.preventDefault();

    try {
      await schema.validate(infos,{abortEarly: false} )
      console.log("Connexion réussie", infos);

      setInfos({
        email: "",
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
    <div>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Se connecter
            </h1>
          </div>

          <div onSubmit={connecter} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Entrez votre email"
                value={infos.email}
                onChange={Valeur}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 placeholder-gray-400 hover:border-gray-400"
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mot de passe
              </label>
              <input
                type={afficher ? "text" : "password"}
                id="password"
                name="password"
                value={infos.password}
                placeholder="Entrez votre mot de passe"
                onChange={Valeur}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 placeholder-gray-400 hover:border-gray-400"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={afficher}
                  onChange={Afficher}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                />
                <label className="text-sm text-gray-600">
                  Afficher le mot de passe
                </label>
              </div>

              <Link
                type="button"
                className="text-sm text-purple-600 hover:text-purple-700 font-semibold underline transition duration-200"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <button
              type="submit"
              onClick={connecter}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-[1.02] transition duration-200 shadow-lg"
            >
              Se connecter
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Pas encore de compte ?{" "}
              <Link
                to={"/"}
                className="text-purple-600 hover:text-purple-700 font-semibold underline transition duration-200"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connexion;
