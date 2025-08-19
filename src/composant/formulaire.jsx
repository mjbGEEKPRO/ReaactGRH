import React, { useState } from "react";
import { Link } from "react-router-dom";
import schema from "./validation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Formulaire() {
  const [infos, setInfos] = useState({
    nom: "",
    prenom: "",
    email: "",
    poste: "",
    telephone: "",
    password: "",
  });

  const [erreur, setErreur] = useState({});
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
    try {
      await schema.validate(infos, { abortEarly: false });

      var loadingToast = toast.loading("Connexion en cours...");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/users",
        infos
      );
      const serverMessage = response.data.message;
      toast.update(loadingToast, {
        render: `✅ ${serverMessage}`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setInfos({
        nom: "",
        prenom: "",
        email: "",
        poste: "",
        telephone: "",
        password: "",
      });
      setErreur({});
      
      
    const timer = setTimeout(() => {
      window.location.href = '/connexion'; 
    }, 2000); 

    return () => clearTimeout(timer);

    } catch (error) {
      if (loadingToast) {
        toast.dismiss(loadingToast);
      }

      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErreur(validationErrors);
      } else if (error.response?.status === 422) {
        const serverErrorMessage = error.response.data.message;
        toast.error(`❌ ${serverErrorMessage}`);
      } else if (error.response?.status === 500) {
        const serverErrorMessage = error.response.data.message;

        toast.error(`❌ ${serverErrorMessage}`);
      }
      else{
        const sms="La requette a expirée"
        toast.error(`❌ ${sms}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="cadre w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <div className="titre text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Créer un compte
          </h1>
        </div>

        <form onSubmit={Ajouter} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                id="nom"
                name="nom"
                type="text"
                placeholder="Entrez votre nom"
                value={infos.nom}
                onChange={Valeur}
                className={`w-full px-4 py-3 border rounded-lg ${
                  erreur.nom ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
              />
              {erreur.nom && (
                <p className="text-red-500 text-sm mt-1">{erreur.nom}</p>
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
                className={`w-full px-4 py-3 border rounded-lg ${
                  erreur.prenom ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
              />
              {erreur.prenom && (
                <p className="text-red-500 text-sm mt-1">{erreur.prenom}</p>
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
              className={`w-full px-4 py-3 border rounded-lg ${
                erreur.email ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {erreur.email && (
              <p className="text-red-500 text-sm mt-1">{erreur.email}</p>
            )}
          </div>

          <div>
            <input
              type="number"
              id="telephone"
              name="telephone"
              placeholder="Téléphone"
              value={infos.telephone}
              onChange={Valeur}
              className={`w-full px-4 py-3 border rounded-lg ${
                erreur.telephone
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />
            {erreur.telephone && (
              <p className="text-red-500 text-sm mt-1">{erreur.telephone}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              id="poste"
              name="poste"
              placeholder="Votre poste"
              value={infos.poste}
              onChange={Valeur}
              className={`w-full px-4 py-3 border rounded-lg ${
                erreur.poste ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {erreur.poste && (
              <p className="text-red-500 text-sm mt-1">{erreur.poste}</p>
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
              className={`w-full px-4 py-3 border rounded-lg ${
                erreur.password ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {erreur.password && (
              <p className="text-red-500 text-sm mt-1">{erreur.password}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={afficher}
              onChange={Afficher}
              className="w-4 h-4 text-blue-600 border-gray-300"
            />
            <label className="text-sm text-gray-600">
              Afficher le mot de passe
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition duration-200 shadow-lg"
          >
            Créer mon compte
          </button>
        </form>

        <div className="connexion mt-6 text-center">
          <p className="text-gray-600">
            J'ai déjà un compte ?{" "}
            <Link
              to="/connexion"
              className="text-blue-600 hover:text-blue-700 font-semibold underline transition duration-200"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Formulaire;
