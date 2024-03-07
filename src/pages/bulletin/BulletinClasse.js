import BackButton from '../../components/backBtn/Backbtn';
import UserInfo from '../../components/headerInfo/UserInfo';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function BulletinClasse() {
  // État pour stocker le terme de recherche
  const [searchTerm, setSearchTerm] = useState('');

  // Éléments de données
  const classes = useSelector((state) => state.classeReducer.classes);

  if (!Array.isArray(classes)) {
    return (
      <div className='container my-4 d-flex justify-content-center align-items-center flex-column' style={{height: "70vh"}}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <br />
        <small>No classes to show</small>
      </div>
    );
  }


  // Fonction pour filtrer les éléments en fonction du terme de recherche
  const filteredData = classes && classes.filter(item =>
    item.toString().includes(searchTerm.toLowerCase())
  );

  // Fonction de gestion du changement du terme de recherche
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-12">
          <UserInfo />
          {/* <p className="mb-0">Matiere: Anglais</p> */}
        </div>
      </div>
      {/* Barre de recherche */}
      <div className="row my-4">
        <div className="col-lg-6 d-flex">

          <div className="w-100">
            <div className="form-group mb-0">
              <input
                type="text"
                className="form-control"
                id="classeId2"
                aria-describedby="classeHelp"
                placeholder="Rechercher une classe..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* // Affichage des éléments filtrés */}
      <div className='row my-5'>
        {filteredData.map((item) => (
          // Vérifier si l'élément est null avant d'afficher son contenu
          item && (
            <div className="col-xl-3 col-md-6 mb-4" key={item._id}>
              <div className="card h-100">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-uppercase mb-1">Classe</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800" style={{ fontSize: "18px" }}>
                        {item?.nom}
                      </div>
                    </div>
                    <div className="col-auto">
                      <Link to={`/bulletin/${item._id}`} className="text-decoration-none me-2">
                        <i className="fas fa-eye fa-2x"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
      <BackButton/>
    </div>
  );
}

export default BulletinClasse;
