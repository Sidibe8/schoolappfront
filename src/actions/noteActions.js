import { toast } from "react-toastify";
import { getElevesByClasse } from "./AllStudentByClasseActions";

export const ADD_NOTE = 'ADD_NOTE';
export const GET_NOTES = 'GET_NOTES';
export const GET_NOTES_BY_MATIERE = 'GET_NOTES_BY_MATIERE';

// Ajouter une note pour un élève
export const addNote = (noteData) => async (dispatch) => {
  try {
    const response = await fetch('https://schoolappback-a58x.onrender.com/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(errorMessage);
      toast.error(errorMessage);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    dispatch({
      type: ADD_NOTE,
      payload: data.note,
    });

    // dispatch(getElevesByClasse())
    toast.success('Note added successfully');
  } catch (error) {
    console.error('Error adding note:', error);
    toast.error('Error adding note');
  }
};

// Récupérer toutes les notes d'un élève
export const getNotesByEleveId = (eleveId) => async (dispatch) => {
  try {
    const response = await fetch(`https://schoolappback-a58x.onrender.com/api/notes/${eleveId}`);
    const data = await response.json();

    dispatch({
      type: GET_NOTES,
      payload: data.notes,
    });
  } catch (error) {
    console.error('Error getting notes by eleveId:', error);
    toast.error('Error fetching notes');
  }
};

// Récupérer les notes d'un élève pour une matière spécifique
export const getNotesByMatiereId = (eleveId, matiereId) => async (dispatch) => {
  try {
    const response = await fetch(`https://schoolappback-a58x.onrender.com/api/notes/${matiereId}/matieres`);
    const data = await response.json();

    dispatch({
      type: GET_NOTES_BY_MATIERE,
      payload: data.notes,
    });
  } catch (error) {
    console.error('Error getting notes by matiereId:', error);
    toast.error('Error fetching notes');
  }
};
