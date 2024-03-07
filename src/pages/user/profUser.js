import React, { useEffect, useState } from 'react';
import '../Professeur/prof.css'; // Assurez-vous d'importer votre fichier de styles CSS
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfesseurById } from '../../actions/professeurByIdAction';
import { updateProfesseur } from '../../actions/professeurActions';

function Profuser() {

  const userStocked = JSON.parse(localStorage.getItem('user'));
  //   const { id } = useParams();
  const id = userStocked._id
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfesseurById(id));
  }, [dispatch, id]);

  const professeur = useSelector(state => state.professeurByIdReducer.professeur);


  const [formData, setFormData] = useState({
    nom: professeur?.nom || '', // Ajoutez une vérification pour éviter l'erreur si professeur est null
    email: professeur?.email || '',
    surnom: professeur?.surnom || '',
    number: professeur?.number || '', // Correction du nom de la propriété "number"
    adresse: professeur?.adresse || '',
    password: '', // Efface le mot de passe précédent lorsque les données du professeur sont mises à jour
    classes: professeur?.classes || [],
    matieres: professeur?.matieres || []
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(updateProfesseur(professeur?._id, formData))
      .then(() => {
        // Réinitialiser la valeur du champ mot de passe à une chaîne vide
        setFormData({ ...formData, password: '' });
        // console.log('Submitted!');
      })
      .catch(error => console.log(error));
  };


  // console.log('proffffff', professeur);

  if (!(professeur)) {
    return (
      <div className='container my-4 d-flex justify-content-center align-items-center flex-column' style={{ height: "70vh" }}>
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
              src="https://png.pngtree.com/png-clipart/20230620/original/pngtree-3d-avatar-man-like-teacher-detective-png-image_9192788.png"
              alt="profile-pic"
            />
            <span className="font-weight-bold">
              {professeur?.nom.toUpperCase()} {professeur?.surnom.toUpperCase()}
            </span>
            <span className="text-black-50">{professeur?.email}</span>


            <span className="text-black-50">{professeur?.cle}</span>


          </div>
        </div>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile de {professeur?.nom}</h4>
            </div>
            {/* first box */}
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Nom</label>
                <input type="text" className="form-control" name="nom" value={professeur?.nom} readOnly />
              </div>
              <div className="col-md-6">
                <label className="labels">Surnom</label>
                <input type="text" className="form-control" name="surnom" value={professeur?.surnom} readOnly />
              </div>
            </div>
            {/* second box */}
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Email</label>
                <input type="email" className="form-control" name="email" value={professeur?.email} readOnly />
              </div>
              <div className="col-md-6">
                <label className="labels">Numero</label>
                <input type="number" className="form-control" name="numero" value={professeur?.number} readOnly />
              </div>
            </div>
            {/* third box */}
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Adresse</label>
                <input type="text" className="form-control" name="adresse" value={professeur?.adresse} readOnly />
              </div>
              <div className="col-md-6">
                <label className="labels">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {/* Autres champs de formulaire ici */}
            {userStocked && userStocked.role !== "teacher" ? (
              ''
            ) : (
              <div className="mt-5 text-center">
                <button onClick={handleSubmit} type="submit">
                  Save Profile
                </button>
              </div>
            )}

          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center experience">
              <span>Matieres</span>
              {/* <span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Experience</span> */}
            </div>
            <br />
            <div className="col-md-12">
              {/* Afficher les matières */}
              {professeur.matieres.map((mat, index) => (
                <input key={index} type="text" className="form-control" placeholder="matière" value={mat.nom} readOnly />
              ))}

              <div className="d-flex justify-content-between align-items-center experience mt-4 mb-2">
                <span>Classes</span>
                {/* <span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Experience</span> */}
              </div>
              {professeur.classes.map((cla, index) => (
                <input key={index} type="text" className="form-control my-1" placeholder="matière" value={cla.nom} readOnly />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profuser;
