import { toast } from "react-toastify";

export const ADD_MATIERE = 'ADD_MATIERE';
export const GET_MATIERES = 'GET_MATIERES';
export const DELETE_MATIERE = 'DELETE_MATIERE';
export const UPDATE_MATIERE = 'UPDATE_MATIERE';
export const DELETE_NOTES_BY_MATIERE = 'DELETE_NOTES_BY_MATIERE';

// Ajouter une matière
export const addMatiere = (matiereData) => async (dispatch) => {
  try {
    const response = await fetch('https://schoolappback-a58x.onrender.com/api/matieres', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(matiereData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      toast.error(errorMessage);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    dispatch({
      type: ADD_MATIERE,
      payload: data,
    });

    dispatch(getMatieres());
    toast.success('Subject added successfully');
  } catch (error) {
    console.error('Error adding matiere:', error);
    toast.error('Error adding subject');
  }
};

// Récupérer toutes les matières
export const getMatieres = () => async (dispatch) => {
  try {
    const response = await fetch('https://schoolappback-a58x.onrender.com/api/matieres');
    const data = await response.json();

    dispatch({
      type: GET_MATIERES,
      payload: data,
    });
  } catch (error) {
    console.error('Error getting matieres:', error);
    toast.error('Error fetching subjects');
  }
};

// Supprimer une matière
export const deleteMatiere = (matiereId) => async (dispatch) => {
  try {
    const response = await fetch(`https://schoolappback-a58x.onrender.com/api/matieres/${matiereId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch({
        type: DELETE_MATIERE,
        payload: matiereId,
      });
      toast.success('Subject deleted successfully');
    } else {
      console.error('Error deleting matiere:', response.statusText);
      toast.error('Error deleting subject');
    }
  } catch (error) {
    console.error('Error deleting matiere:', error);
    toast.error('Error deleting subject');
  }
};

// Mettre à jour une matière
export const updateMatiere = (matiereId, updatedMatiereData) => async (dispatch) => {
  try {
    const response = await fetch(`https://schoolappback-a58x.onrender.com/api/matieres/${matiereId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMatiereData),
    });

    if (response.ok) {
      const data = await response.json();

      dispatch({
        type: UPDATE_MATIERE,
        payload: data,
      });
      toast.success('Subject updated successfully');
    } else {
      console.error('Error updating matiere:', response.statusText);
      // toast.error('Error updating subject');
    }
  } catch (error) {
    console.error('Error updating matiere:', error);
    toast.error('Error updating subject');
  }
};

// Supprimer les notes d'une matière
export const deleteNotesByMatiere = (matiereId) => async (dispatch) => {
  try {
    const response = await fetch(`https://schoolappback-a58x.onrender.com/api/matieres/${matiereId}/delete-notes`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch({
        type: DELETE_NOTES_BY_MATIERE,
        payload: matiereId,
      });
      toast.success('Notes deleted successfully');
    } else {
      // console.error('Error deleting notes by matiere:', response.statusText);
      // toast.error('Error deleting notes');
    }
  } catch (error) {
    console.error('Error deleting notes by matiere:', error);
    toast.error('Error deleting notes');
  }
};
