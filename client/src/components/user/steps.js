import * as Yup from 'yup';

import WizardUserFormFirstPage from "./WizardUserFormFirstPage";
import WizardUserFormSecondPage from "./WizardUserFormSecondPage";
import WizardUserFormThirdPage from "./WizardUserFormThirdPage";

export default [
  {
    id: 'ids',
    component: WizardUserFormFirstPage,
    initialValues: {
      firstName: '',
      lastName: '',
      email: ''
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string()
        .required('Le prénom est requis'),
      lastName: Yup.string()
        .required('Le nom est requis'),
      email: Yup.string()
        .email('L\'addresse email est invalide')
        .required('L\'email est requis'),
    }),
  },
  {
    id: 'skills',
    component: WizardUserFormSecondPage,
    initialValues: {
      mainSkill: '',
    },
    validationSchema: Yup.object().shape({
      mainSkill: Yup.string().required()
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
