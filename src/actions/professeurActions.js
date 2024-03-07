import { toast } from "react-toastify";

export const ADD_PROFESSEUR = 'ADD_PROFESSEUR';
export const GET_PROFESSEURS = 'GET_PROFESSEURS';
export const GET_PROFESSEUR_BY_ID = 'GET_PROFESSEUR_BY_ID';
export const UPDATE_PROFESSEUR = 'UPDATE_PROFESSEUR';
export const DELETE_PROFESSEUR = 'DELETE_PROFESSEUR';

// Ajouter un professeur
export const addProfesseur = (professeurData) => async (dispatch) => {
  try {
    const response = await fetch('https://schoolappback-a58x.onrender.com/api/professeurs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(professeurData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(errorMessage);
      toast.error(errorMessage);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    dispatch({
      type: ADD_PROFESSEUR,
      payload: data.professeur,
    });
    dispatch(getProfesseurs());
    toast.success('Professeur added successfully');
  } catch (error) {
    console.error('Error adding professeur:', error);
    toast.error('Error adding professeur');
  }
};

// Récupérer tous les professeurs
export const getProfesseurs = () => async (dispatch) => {
  try {
    const response = await fetch('https://schoolappback-a58x.onrender.com/api/professeurs');
    const data = await response.json();

    dispatch({
      type: GET_PROFESSEURS,
      payload: data.professeurs,
    });
  } catch (error) {
    console.error('Error getting professeurs:', error);
    toast.error('Error fetching professeurs');
  }
};

// Mettre à jour un professeur
export const updateProfesseur = (professeurId, updatedProfesseurData) => async (dispatch) => {
  try {
    const response = await fetch(`https://schoolappback-a58x.onrender.com/api/professeurs/${professeurId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProfesseurData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(errorMessage);
      toast.error(errorMessage);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    dispatch({
      type: UPDATE_PROFESSEUR,
      payload: data.professeur,
    });
    dispatch(getProfesseurs());
    toast.success('Professeur updated successfully');
  } catch (error) {
    console.error('Error updating professeur:', error);
    toast.error('Error updating professeur');
  }
};

// Supprimer un professeur
export const deleteProfesseur = (professeurId) => async (dispatch) => {
  try {
    const response = await fetch(`https://schoolappback-a58x.onrender.com/api/professeurs/${professeurId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch({
        type: DELETE_PROFESSEUR,
        payload: professeurId,
      });
      dispatch(getProfesseurs());
      toast.success('Professeur deleted successfully');
    } else {
      console.error('Error deleting professeur:', response.statusText);
      toast.error('Error deleting professeur');
    }
  } catch (error) {
    console.error('Error deleting professeur:', error);
    toast.error('Error deleting professeur');
  }
};


// Récupérer un professeur par son ID
// export const getProfesseurById = (professeurId) => async (dispatch) => {
//   try {
//     const response = await fetch(`https://schoolappback-a58x.onrender.com/api/professeurs/${professeurId}`, {
//       method: 'GET',
//     });

//     // Vérification du statut de la réponse HTTP
//     if (!response.ok) {
//       throw new Error('Error retrieving professeur. HTTP status: ' + response.status);
//     }

//     const data = await response.json();

//     // Vérification si la réponse contient le champ "professeur"
//     if (!data.professeur) {
//       throw new Error('Professeur not found in response');
//     }

//     dispatch({
//       type: GET_PROFESSEUR_BY_ID,
//       payload: data.professeurId,
//     });
//   } catch (error) {
//     console.error('Error getting professeur by ID:', error);
//     console.log('Error getting professeur by ID:', error);
//     // Vous pouvez également dispatcher une action pour gérer l'erreur dans votre reducer
//   }
// };