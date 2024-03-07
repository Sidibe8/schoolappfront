import { toast } from "react-toastify";

// export const  GET_ELEVES_BY_CLASSE = "GET_ELEVES_BY_CLASSE"
export const   GET_ELEVES_BY_CLASSE_SUCCESS =" GET_ELEVES_BY_CLASSE_SUCCESS"   
export const  GET_ELEVES_BY_CLASSE_FAILURE = 'GET_ELEVES_BY_CLASSE_FAILURE'
 
  
  export const getElevesByClasse = (classeId) => async (dispatch) => {
    try {
      const response = await fetch(`https://schoolappback-a58x.onrender.com/api/eleves/classe/${classeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch eleves by classe');
      }
      const data = await response.json();

      // console.log('classse eleves', data);
      toast.success(data.message)
      dispatch({ type: GET_ELEVES_BY_CLASSE_SUCCESS, payload: data.eleves });
    } catch (error) {
      console.error('Error fetching eleves by classe:', error);
      dispatch({ type: GET_ELEVES_BY_CLASSE_FAILURE, payload: error.message });
    }
  };
  