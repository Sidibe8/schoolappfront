export const GET_PROF_IN_CLASSE_SUCCESS = 'GET_PROF_IN_CLASSE_SUCCESS';
export const GET_PROF_IN_CLASSE_FAILURE = 'GET_PROF_IN_CLASSE_FAILURE'; 

// Action creator pour récupérer les professeurs par l'ID de la classe
export const getProfesseursByClasse = (classeId) => async (dispatch) => {
    try {
      const response = await fetch(`https://schoolappback-a58x.onrender.com/api/professeurs/classe/${classeId}`, {
        method: 'GET',
      });
  
      // Vérification du statut de la réponse HTTP
      if (!response.ok) {
        throw new Error('Error retrieving professeurs by classe. HTTP status: ' + response.status);
      }
  
      const data = await response.json();
  
    //   console.log(':dt:',data.professeurs);
  
      dispatch({
        type: GET_PROF_IN_CLASSE_SUCCESS,
        payload: data.professeurs,
      });
    } catch (error) {
      console.error('Error getting professeurs by classe:', error);
      dispatch({
        type: GET_PROF_IN_CLASSE_FAILURE,
        payload: error.message,
      });
    }
  };
  