// actions/classeActions.js


export const GET_CLASSE_BY_ID_SUCCESS = 'GET_CLASSE_BY_ID_SUCCESS';
export const GET_CLASSE_BY_ID_FAILURE = 'GET_CLASSE_BY_ID_FAILURE';

export const getClasseById = (id) => async (dispatch) => {
  
  try {
    const response = await fetch(`https://schoolappback-a58x.onrender.com/api/classes/${id}`)

    // / Vérification du statut de la réponse HTTP
      if (!response.ok) {
        throw new Error('Error retrieving professeur. HTTP status: ' + response.status);
      }      
      const data = await response.json();

    //   console.log(":::",data);

    dispatch({
      type: GET_CLASSE_BY_ID_SUCCESS,
      payload: data.classe,
    });
  } catch (error) {
    dispatch({
      type: GET_CLASSE_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};

