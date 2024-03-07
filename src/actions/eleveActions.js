import { toast } from "react-toastify";

export const ADD_ELEVE = 'ADD_ELEVE';
export const GET_ELEVES = 'GET_ELEVES';
export const DELETE_ELEVE = 'DELETE_ELEVE';
export const UPDATE_ELEVE = 'UPDATE_ELEVE';
export const GET_ELEVE_BY_ID = 'GET_ELEVE_BY_ID';

// Ajouter un élève
export const addEleve = (eleveData) => async (dispatch) => {
  try {
    const response = await fetch('https://schoolappback-a58x.onrender.com/api/eleves', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eleveData),
    });

    if (!response.ok) {
      const errorResponse = await response.json(); // Parse the response body as JSON
      const errorMessage = errorResponse.error; // Extract the error message
      toast.error(errorMessage); // Display the error message in a toast notification
      // throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    dispatch({
      type: ADD_ELEVE,
      payload: data.eleve,
    });
    dispatch(getEleves());
    toast.success('Student added successfully');
  } catch (error) {
    console.error('Error adding eleve:', error);
    toast.error(error.message);
  }
};

// Récupérer tous les élèves
export const getEleves = () => async (dispatch) => {
  try {
    const response = await fetch('https://schoolappback-a58x.onrender.com/api/eleves', {
      method: 'GET',
    });
    const data = await response.json();

    dispatch({
      type: GET_ELEVES,
      payload: data,
    });
  } catch (error) {
    console.error('Error getting eleves:', error);
    toast.error('Error fetching students');
  }
};

// Supprimer un élève

export const deleteEleve = (eleveId) => async (dispatch) => {
  try {
    const response = await fetch(`https://schoolappback-a58x.onrender.com/api/eleves/${eleveId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch({
        type: DELETE_ELEVE,
        payload: eleveId,
      });
      dispatch(getEleves());
      toast.success('Student deleted successfully');
    } else {
      console.error('Error deleting eleve:', response.statusText);
      // toast.error('Error deleting student');
    }
  } catch (error) {
    console.error('Error deleting eleve:', error);
    toast.error('Error deleting student');
  }
};

// Mettre à jour un élève
export const updateEleve = (eleveId, formData) => async (dispatch) => {
  try {
    const response = await fetch(`https://schoolappback-a58x.onrender.com/api/eleves/${eleveId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();

      dispatch({
        type: UPDATE_ELEVE,
        payload: data.eleve,
      });
      dispatch(getEleves());
      toast.success('Student updated successfully');
    } else {
      console.error('Error updating eleve:', response.statusText);
      toast.error('Error updating student');
    }
  } catch (error) {
    console.error('Error updating eleve:', error);
    toast.error('Error updating student');
  }
};

// Récupérer un élève par son ID
export const getEleveById = (id) => async (dispatch) => {
  try {
    const response = await fetch(`https://schoolappback-a58x.onrender.com/api/eleves/${id}`);
    const data = await response.json();

    dispatch({
      type: GET_ELEVE_BY_ID,
      payload: data,
    });
  } catch (error) {
    console.error('Error getting eleve by ID:', error);
    toast.error('Error fetching student by ID');
  }
};
