import { toast } from "react-toastify";
import { getClasseById } from "./classeByIdActions";

// Importez les types d'action nécessaires
export const ADD_COEF_TO_MATIERE_SUCCESS = 'ADD_COEF_TO_MATIERE_SUCCESS';
export const ADD_COEF_TO_MATIERE_FAILURE = 'ADD_COEF_TO_MATIERE_FAILURE';
export const UPDATE_COEF_SUCCESS = 'UPDATE_COEF_SUCCESS';
export const UPDATE_COEF_FAILURE = 'UPDATE_COEF_FAILURE';
export const DELETE_COEF_SUCCESS = 'DELETE_COEF_SUCCESS';
export const DELETE_COEF_FAILURE = 'DELETE_COEF_FAILURE';

// Action pour ajouter un coefficient à une matière dans une classe
export const addCoefToMatiere = (classeId, matiereId, coef) => {
  return async (dispatch) => {
    try {
      // Faites la requête pour ajouter le coefficient à la matière dans la classe
      const response = await fetch(`https://schoolappback-a58x.onrender.com/api/classe/${classeId}/add-matiere`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ classeId, matiereId, coef }) // Corps de la requête
      });

      // Si la requête est réussie, traitez la réponse
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        // dispatch(getClasseById())
        // Dispatchez l'action ADD_COEF_TO_MATIERE_SUCCESS avec les données de réponse si nécessaires
        dispatch({ type: ADD_COEF_TO_MATIERE_SUCCESS, payload: data });
      } else {
        // Si la requête a échoué, récupérez l'erreur et dispatchez l'action ADD_COEF_TO_MATIERE_FAILURE
        const error = await response.json();
        toast.error(error.message);
        dispatch({ type: ADD_COEF_TO_MATIERE_FAILURE, payload: error });
      }
    } catch (error) {
      // Si une erreur se produit pendant la requête, dispatchez l'action ADD_COEF_TO_MATIERE_FAILURE avec l'erreur
      toast.error(error);
      dispatch({ type: ADD_COEF_TO_MATIERE_FAILURE, payload: error.message });
    }
  };
};

// Action pour mettre à jour le coefficient d'une matière dans une classe
export const updateCoef = (classeId, matiereId, newCoef) => {
  return async (dispatch) => {
    try {
      // Faites la requête pour mettre à jour le coefficient de la matière dans la classe
      const response = await fetch(`https://schoolappback-a58x.onrender.com/api/classe/${classeId}/update-coef`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({classeId, matiereId, newCoef }) // Corps de la requête
      });

      // Si la requête est réussie, traitez la réponse
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        // Dispatchez l'action UPDATE_COEF_SUCCESS avec les données de réponse si nécessaires
        dispatch({ type: UPDATE_COEF_SUCCESS, payload: data });
      } else {
        // Si la requête a échoué, récupérez l'erreur et dispatchez l'action UPDATE_COEF_FAILURE
        const error = await response.json();
        console.error(error);
        dispatch({ type: UPDATE_COEF_FAILURE, payload: error });
      }
    } catch (error) {
      // Si une erreur se produit pendant la requête, dispatchez l'action UPDATE_COEF_FAILURE avec l'erreur
      console.error(error);
      dispatch({ type: UPDATE_COEF_FAILURE, payload: error.message });
    }
  };
};

// Action pour supprimer le coefficient d'une matière dans une classe
export const deleteCoef = (classeId, matiereId) => {
  return async (dispatch) => {
    try {
      // Faites la requête pour supprimer le coefficient de la matière dans la classe
      const response = await fetch(`https://schoolappback-a58x.onrender.com/api/classe/${classeId}/delete-coef`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({classeId, matiereId }) // Corps de la requête
      });

      // Si la requête est réussie, traitez la réponse
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        // Dispatchez l'action DELETE_COEF_SUCCESS avec les données de réponse si nécessaires
        dispatch({ type: DELETE_COEF_SUCCESS, payload: data });
      } else {
        // Si la requête a échoué, récupérez l'erreur et dispatchez l'action DELETE_COEF_FAILURE
        const error = await response.json();
        // toast.error(error.messages);
        dispatch({ type: DELETE_COEF_FAILURE, payload: error });
      }
    } catch (error) {
      // Si une erreur se produit pendant la requête, dispatchez l'action DELETE_COEF_FAILURE avec l'erreur
      toast.error(error.message);
      dispatch({ type: DELETE_COEF_FAILURE, payload: error.message });
    }
  };
};
