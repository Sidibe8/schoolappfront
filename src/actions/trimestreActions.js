import { toast } from "react-toastify";

export const ADD_TRIMESTRE = 'ADD_TRIMESTRE';
export const GET_TRIMESTRES = 'GET_TRIMESTRES';
export const GET_TRIMESTRE_BY_ID = 'GET_TRIMESTRE_BY_ID';
export const UPDATE_TRIMESTRE = 'UPDATE_TRIMESTRE';
export const DELETE_TRIMESTRE = 'DELETE_TRIMESTRE';

// Ajouter un trimestre
export const addTrimestre = (trimestreData) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:4000/api/trimestre', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trimestreData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(errorMessage);
      toast.error(errorMessage);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    dispatch({
      type: ADD_TRIMESTRE,
      payload: data.trimestre,
    });
    dispatch(getTrimestres());
    toast.success('Trimestre added successfully');
  } catch (error) {
    console.error('Error adding trimestre:', error);
    toast.error('Error adding trimestre');
  }
};

// Récupérer tous les trimestres
export const getTrimestres = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:4000/api/trimestre');
    const data = await response.json();

    dispatch({
      type: GET_TRIMESTRES,
      payload: data,
    });
  } catch (error) {
    console.error('Error getting trimestres:', error);
    toast.error('Error fetching trimestres');
  }
};

// Mettre à jour un trimestre
export const updateTrimestre = (trimestreId, updatedTrimestreData) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:4000/api/trimestre/${trimestreId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTrimestreData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(errorMessage);
      toast.error(errorMessage);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    dispatch({
      type: UPDATE_TRIMESTRE,
      payload: data.trimestre,
    });
    toast.success('Trimestre updated successfully');
  } catch (error) {
    console.error('Error updating trimestre:', error);
    toast.error('Error updating trimestre');
  }
};

// Supprimer un trimestre
export const deleteTrimestre = (trimestreId) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:4000/api/trimestre/${trimestreId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch({
        type: DELETE_TRIMESTRE,
        payload: trimestreId,
      });
      toast.success('Trimestre deleted successfully');
    } else {
      console.error('Error deleting trimestre:', response.statusText);
      toast.error('Error deleting trimestre');
    }
  } catch (error) {
    console.error('Error deleting trimestre:', error);
    toast.error('Error deleting trimestre');
  }
};
