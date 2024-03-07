import { toast } from "react-toastify";

// Action pour créer un nouvel utilisateur
export const createUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://schoolappback-a58x.onrender.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to create user.');
      }

      const data = await response.json();
      dispatch({ type: 'CREATE_USER_SUCCESS', payload: data.user });
      dispatch(getAllUsers())
      toast.success('User created successfully');
    } catch (error) {
      dispatch({ type: 'CREATE_USER_FAILURE', payload: error.message });
      toast.error('Error creating user');
    }
  };
};

// Action pour récupérer tous les utilisateurs
export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://schoolappback-a58x.onrender.com/api/users', {
        method: 'GET',
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users.');
      }

      const data = await response.json();
      dispatch({ type: 'GET_ALL_USERS_SUCCESS', payload: data.users });
    } catch (error) {
      dispatch({ type: 'GET_ALL_USERS_FAILURE', payload: error.message });
      toast.error('Error fetching users');
    }
  };
};

// Action pour récupérer un utilisateur par son ID
export const getUserById = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://schoolappback-a58x.onrender.com/api/users${userId}`, {
        method: 'GET',
      });
      dispatch({ type: 'GET_USER_BY_ID_SUCCESS', payload: response.data.user });
    } catch (error) {
      dispatch({ type: 'GET_USER_BY_ID_FAILURE', payload: error.message });
      toast.error('Error fetching user');
    }
  };
};

// Action pour mettre à jour un utilisateur par son ID
export const updateUserById = (userId, updatedUserData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://schoolappback-a58x.onrender.com/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUserData)
      });

      if (!response.ok) {
        throw new Error('Failed to update user.');
      }

      const data = await response.json();
      dispatch({ type: 'UPDATE_USER_BY_ID_SUCCESS', payload: data.user });
      toast.success('User updated successfully');
    } catch (error) {
      dispatch({ type: 'UPDATE_USER_BY_ID_FAILURE', payload: error.message });
      toast.error('Error updating user');
    }
  };
};

// Action pour supprimer un utilisateur par son ID
export const deleteUserById = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://schoolappback-a58x.onrender.com/api/users${userId}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'DELETE_USER_BY_ID_SUCCESS', payload: response.data.user });
      toast.success('User deleted successfully');
    } catch (error) {
      dispatch({ type: 'DELETE_USER_BY_ID_FAILURE', payload: error.message });
      toast.error('Error deleting user');
    }
  };
};
