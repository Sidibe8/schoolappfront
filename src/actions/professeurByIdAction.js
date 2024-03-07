export const GET_PROFESSEUR_BY_ID_SUCCESS = 'GET_PROFESSEUR_BY_ID_SUCCESS';
export const GET_PROFESSEUR_BY_ID_FAILURE = 'GET_PROFESSEUR_BY_ID_FAILURE';

// Action creator pour récupérer un professeur par son ID
export const getProfesseurById = (professeurId) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:4000/api/professeurs/${professeurId}`);
    
    // Vérification du statut de la réponse HTTP
    if (!response.ok) {
      throw new Error('Error retrieving professeur. HTTP status: ' + response.status);
    }
    
    const data = await response.json();
    
    dispatch({
      type: GET_PROFESSEUR_BY_ID_SUCCESS,
      payload: data.professeur,
    });
  } catch (error) {
    console.error('Error getting professeur by ID:', error);
    dispatch({
      type: GET_PROFESSEUR_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};

