import { object, string } from "yup";

const schema = object().shape({
  nom: string().required("Veuillez renseigner le nom"),
  prenom: string().required("Veuillez renseigner le prénom"),
  email: string()
    .email("L'adresse email doit être valide")
    .matches(
      /@gmail.com/,
      "l'adresse email doit être sous ce forma (exp@gmail.com) "
    )
    .required("L'adresse email est requise"),
  poste: string().required("Le poste est requis"),
  tel: string().required("Veuillez renseigner le numéro de téléphone"),
  password: string()
    .min(8, "Le mot de passe doit avoir au moins 8 caractères")
    .matches(/[A-Z]/, "Votre mot de passe doit contenir au moins une majuscule")
    .required("Veuillez entrer un mot de passe"),
});

export default schema;
