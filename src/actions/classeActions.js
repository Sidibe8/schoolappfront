import { toast } from "react-toastify";

export const GET_CLASSES = 'GET_CLASSES';
export const ADD_CLASSE = 'ADD_CLASSE';
export const DELETE_CLASSE = 'DELETE_CLASSE';
export const UPDATE_CLASSE = 'UPDATE_CLASSE';

export const getClasses = () => async (dispatch) => {
  try {
    const response = await fetch('https://schoolappback-a58x.onrender.com/api/classes');
    const data = await response.json();

    // console.log("::data::", data.);
    dispatch({
      type: GET_CLASSES,
      payload: data.classes,
    });
  } catch (error) {
    console.error('Error getting classes:', error);
    toast.error('Error getting classes');
  }
};

export const addClasse = (classeData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(
      'https://schoolappback-a58x.onrender.com/api/classes',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(classeData),
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}. Message: ${errorMessage}`
      );
    }

    const data = await response.json();

    dispatch({
      type: ADD_CLASSE,
      payload: data,
    });
    toast.success('Class added successfully');
  } catch (error) {
    console.error('Error adding classe:', error);
    toast.error('Error adding class');
  }
};

export const deleteClasse = (classeId) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://schoolappback-a58x.onrender.com/api/classes/${classeId}`,
      {
        method: 'DELETE',
      }
    );

    if (response.ok) {
      dispatch({
        type: DELETE_CLASSE,
        payload: classeId,
      });
      toast.success('Class deleted successfully');
    } else {
      console.error('Error deleting classe:', response.statusText);
      toast.error('Error deleting class');
    }
  } catch (error) {
    console.error('Error deleting classe:', error);
    toast.error('Error deleting class');
  }
};

export const updateClasse = (classeId, updatedClasseData) => async (
  dispatch
) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(
      `https://schoolappback-a58x.onrender.com/api/classes/${classeId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedClasseData),
      }
    );

    if (response.ok) {
      const data = await response.json();

      dispatch({
        type: UPDATE_CLASSE,
        payload: data,
      });
      toast.success('Class updated successfully');
    } else {
      console.error('Error updating classe:', response.statusText);
      toast.error('Error updating class');
    }
  } catch (error) {
    console.error('Error updating classe:', error);
    toast.error('Error updating class');
  }
};
