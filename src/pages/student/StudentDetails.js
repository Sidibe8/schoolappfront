import React, { useEffect, useState } from 'react';
import '../Professeur/prof.css'; // Assurez-vous d'importer votre fichier de styles CSS
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEleveById, updateEleve } from '../../actions/eleveActions';

function StudentDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEleveById(id));
  }, [dispatch, id]);

  const eleve = useSelector(state => state.eleveByIdReducer.eleve);

  const [formData, setFormData] = useState({
    nom: eleve?.nom,
    email: eleve?.email,
    surnom: eleve?.surnom,
    numero: eleve?.numero, // Correction du nom de la propriété "number"
    adresse: eleve?.adresse,
    numeroParent: eleve?.numeroParent,
    nomDuPere: eleve?.nomDuPere,
    password: '', // Efface le mot de passe précédent lorsque les données du eleve sont mises à jour
  
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    dispatch(updateEleve(eleve?._id, formData))
      .then(() => {
          // Réinitialiser la valeur du champ mot de passe à une chaîne vide
          setFormData({ ...formData, password: '' });
          // console.log('Submitted!');
      })
      .catch(error => console.log(error));
};


  if (!eleve) {
    return (
      <div className='container my-4 d-flex justify-content-center align-items-center flex-column' style={{height: "70vh"}}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <br />
        <small>Loading...</small>
      </div>
    );
  }
  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              src="https://static.vecteezy.com/system/resources/previews/026/976/772/non_2x/3d-icon-avatar-cute-girl-going-to-school-pupil-with-backpack-student-walking-and-carry-studentbooks-cartoon-scene-of-first-day-or-schooling-on-isolated-on-transparent-background-generative-ai-png.png"
              alt="profile-pic"
            />
            <span className="font-weight-bold mt-4">
              {eleve && eleve.nom.toUpperCase()} {eleve && eleve?.surnom.toUpperCase()}
            </span>
            <span className="text-black-50">{eleve?.email}</span>
            
            <span className="text-black-50">{eleve?.cle}</span>
          </div>
        </div>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile de {eleve?.nom}</h4>
            </div>
            {/* first box */}
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Nom</label>
                <input type="text" className="form-control" name="nom" value={eleve?.nom} readOnly />
              </div>
              <div className="col-md-6">
                <label className="labels">Surnom</label>
                <input type="text" className="form-control" name="surnom" value={eleve?.surnom} readOnly />
              </div>
            </div>
            {/* second box */}
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Nom Du Pere</label>
                <input type="text" className="form-control" name="email" value={ eleve?.nomDuPere} readOnly />
              </div>
              <div className="col-md-6">
                <label className="labels">Numero</label>
                <input type="number" className="form-control" name="numero" value={eleve?.numero} readOnly />
              </div>
            </div>
            {/* third box */}
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Numero du parent</label>
                <input type="number" className="form-control" name="numeroParent" value={eleve?.numeroParent} readOnly />
              </div>
              <div className="col-md-6">
                <label className="labels">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Autres champs de formulaire ici */}
            <div className="mt-5 text-center">
              <button  onClick={handleSubmit} type="submit">
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center experience">
              <span>Classes</span>
              {/* <span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Experience</span> */}
            </div>
            <br />
            <div className="col-md-12">
              {/* Afficher les matières */}
            
                <input type="text" className="form-control" placeholder="matière" value={eleve.classe.nom} readOnly />
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetail;
