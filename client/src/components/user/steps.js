import * as Yup from 'yup';

import WizardUserFormFirstPage from "./WizardUserFormFirstPage";
import WizardUserFormThirdPage from "./WizardUserFormThirdPage";

export default [
  {
    id: 'ids',
    component: WizardUserFormFirstPage,
    initialValues: {
      name: '',
      email: ''
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required('Le nom est requis'),
      email: Yup.string()
        .email('L\'addresse email est invalide')
        .required('L\'email est requis'),
    }),
  },
  {
    id: 'password',
    component: WizardUserFormThirdPage,
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
        .required('Le mot de passe est requis'),
      confirmPassword:  Yup.string()
        .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
        .required('Le mot de passe de confirmation est requis')
    }),  },
]
