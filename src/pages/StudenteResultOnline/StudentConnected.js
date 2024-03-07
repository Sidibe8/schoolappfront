import React, { useEffect } from 'react';
import { getEleveById } from '../../actions/eleveActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function StudentConnected() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const id = user?._id; // Utilisation de la syntaxe de l'opérateur de coalescence nulle pour éviter les erreurs si user est null

  useEffect(() => {
    if (id) {
      dispatch(getEleveById(id));
    }
  }, [dispatch, id]);

  const eleve = useSelector(state => state.eleveByIdReducer.eleve);

  if (!eleve) {
    return (
      <div className='container my-4 d-flex justify-content-center align-items-center flex-column' style={{height: "70vh"}}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <br />
        <small>Chargement en cours...</small>
      </div>
    );
  }
  return (
    <div className='container mt-4'>
      <p>Salut {eleve.nom}</p>
      <Link to={`/${eleve._id}`}>Voir mes bulletins</Link>
    </div>
  );
}

export default StudentConnected;
