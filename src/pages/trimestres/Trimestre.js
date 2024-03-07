import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addTrimestre, deleteTrimestre, updateTrimestre } from '../../actions/trimestreActions';
import UserInfo from '../../components/headerInfo/UserInfo';
import BackButton from '../../components/backBtn/Backbtn';

function Trmestre() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [editedClassName, setEditedClassName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTrimestreId, setEditedTrimestreId] = useState(null); 

  const trimestre = useSelector((state) => state.trimestreReducer.trimestres);
  

  if (!Array.isArray(trimestre)) {
    return (
      <div className='container my-4 d-flex justify-content-center align-items-center flex-column' style={{height: "70vh"}}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <br />
        <small>No trimestre to show</small>
      </div>
    );
  }

  

  const filteredData = trimestre && trimestre.filter((item) =>
    item.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (trimestre) => {
    setEditedClassName(trimestre.nom);
    setEditedTrimestreId(trimestre._id); 
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedClassName('');
    setEditedTrimestreId(null); 
    setIsEditing(false);
  };

  const handleUpdate = () => {
    if (editedClassName.trim() !== '') { // Vérifiez si le nom édité n'est pas vide
      dispatch(updateTrimestre(editedTrimestreId, { nom: editedClassName })); // Passer l'ID et les données mises à jour
      setEditedClassName('');
      setEditedTrimestreId(null); 
      setIsEditing(false);
    }
  };

  const handleAdd = () => {
    if (editedClassName.trim() !== '') {
      dispatch(addTrimestre({ nom: editedClassName }));
      setEditedClassName('');
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTrimestre(id));
  };
  return (
    <div className="container mt-5">
     <UserInfo/>
      <div className="row my-4">
        <div className="col-lg-6 d-flex">
          <form className="w-100" onClick={(e) => e.preventDefault()}>
            <div className="form-group mb-0">
              <input
                type="text"
                className="form-control"
                placeholder="Nom du trimestre"
                value={editedClassName}
                onChange={(e) => setEditedClassName(e.target.value)}
              />
            </div>
            {isEditing ? (
              <div>
                <button type="button" className="my-3 me-1" onClick={handleUpdate}>
                  Mettre à jour
                </button>
                <button type="button" className="btn btn-danger my-3" onClick={handleCancel}>
                  Annuler
                </button>
              </div>
            ) : (
              <button type="button" className="my-3" onClick={handleAdd}>
                Enregistrer
              </button>
            )}
          </form>
          <div className="w-100 ms-3">
            <div className="form-group mb-0">
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher un trimestre..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row my-5">
        {filteredData.map((item) => (
          <div className="col-xl-3 col-md-6 mb-4" key={item._id}>
            <div className="card h-100">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-uppercase mb-1">Trimestre</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800" style={{ fontSize: '18px' }}>
                      {item.nom}
                    </div>
                  </div>
                  <div className="col-auto">
                    {/* <Link to={`/classe/${item}`} className="text-decoration-none me-2">
                      <i className="fas fa-eye" style={{ fontSize: 20 }}></i>
                    </Link> */}
                    <Link to="#" className="text-decoration-none" onClick={() => handleEdit(item)}>
                      <i className="fas fa-pencil-alt" style={{ fontSize: 20 }}></i>
                    </Link>
                    <Link to="#" className="text-decoration-none ms-2" onClick={() => handleDelete(item._id)}>
                      <i className="fas fa-trash-alt text-danger" style={{ fontSize: 20 }}></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BackButton/>

    </div>
  );
}

export default Trmestre;
