import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getClasseById } from '../../actions/classeByIdActions';
import { addCoefToMatiere, updateCoef, deleteCoef } from '../../actions/addCoefAction';
import { getProfesseursByClasse } from '../../actions/profInClasseAction';
import { getElevesByClasse } from '../../actions/AllStudentByClasseActions';
import BackButton from '../backBtn/Backbtn'

function ClasseDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // États locaux pour stocker le coefficient et le trimestre à ajouter/éditer
  const [selectedMatiere, setSelectedMatiere] = useState('');
  const [coefValue, setCoefValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    dispatch(getClasseById(id));
    dispatch(getProfesseursByClasse(id));
    dispatch(getElevesByClasse(id));
  }, [dispatch, id]);

  const classe = useSelector((state) => state.classeByIdReducer.classe);
  const profInClasse = useSelector((state) => state.profInClasseReducer.professeursByClasse)
  const students = useSelector((state) => state.elevesByClasseReducer.eleves);

  const matiere = useSelector((state) => state.matiereReducer.matieres);


  if (!classe) {
    <div className='container my-4 d-flex justify-content-center'>
      <small>There's no classe to show</small>
    </div>
  }


  // console.log(profInClasse,'qwertyui');
  // Fonction de gestion de la sélection d'une matière
  const handleMatiereChange = (event) => {
    setSelectedMatiere(event.target.value);
  };

  // Fonction de gestion de la modification du coefficient
  const handleCoefChange = (event) => {
    setCoefValue(event.target.value);
  };

  // Fonction de soumission du coefficient
  const handleSubmitCoef = async (event) => {
    try {
      event.preventDefault();
      // Vérifier si une matière est sélectionnée
      if (!selectedMatiere) {
        // console.error('Veuillez sélectionner une matière.');
        return;
      }
      // Envoyer le coefficient au serveur pour l'ajout
      await dispatch(addCoefToMatiere(classe?._id, selectedMatiere, coefValue));
      // Après l'ajout réussi, réinitialiser les valeurs et recharger les détails de la classe
      setSelectedMatiere('');
      setCoefValue('');
      dispatch(getClasseById(id));
    } catch (error) {
      console.error("Erreur lors de l'ajout du coefficient :", error);
    }
  };


  // Fonction de mise à jour du coefficient
  const handleUpdateCoef = async (matiereId, newCoef) => {
    try {
      // Envoyer la nouvelle valeur de coefficient au serveur pour la mise à jour
      await dispatch(updateCoef(classe?._id, matiereId, newCoef));
      // Après la mise à jour réussie, recharger les détails de la classe
      dispatch(getClasseById(id));
    } catch (error) {
      console.error("Erreur lors de la mise à jour du coefficient :", error);
    }
  };


  // Fonction de suppression du coefficient
  const handleDeleteCoef = async (matiereId) => {
    try {
      // Envoyer l'ID de la matière au serveur pour la suppression
      await dispatch(deleteCoef(classe?._id, matiereId));
      // console.log(matiereId);
      // Après la suppression réussie, recharger les détails de la classe
      dispatch(getClasseById(id));
    } catch (error) {
      console.error("Erreur lors de la suppression du coefficient :", error);
    }
  };




  // filter

  const filteredData = students && students.filter(item =>
  (item.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.surnom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nomDuPere.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container my-5">
      <h2>Classe : {classe?.nom}</h2>
      {/* <h3>Matieres :</h3> */}



      <form onSubmit={handleSubmitCoef} className='my-2'>
        <div className="mb-3">
          <select className="form-select" value={selectedMatiere} onChange={handleMatiereChange}>
            <option value="">Sélectionner une matière</option>
            {matiere?.map((matiere, index) => (
              <option key={index} value={matiere._id}>{matiere.nom}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            value={coefValue}
            onChange={handleCoefChange}
            placeholder="Coefficient"
          />
        </div>
        <button type="submit" className="">Ajouter Coef</button>
      </form>

      <div className="row classeCoefProf">

        <small className='mt-4'>Matieres avec coefficient</small>
        <div className="col-lg-4 col-md-12">
          <table className="table mt-3 coef" >
            <thead>
              <tr>
                <th scope="col">Matière</th>
                <th scope="col">Coefs.</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classe?.coefInfo.map((matiere, index) => (
                <tr key={index}>
                  <td >{matiere.matiere.nom}</td>
                  <td >{matiere.coef}</td>
                  <td>
                    <button className="btn " onClick={() => handleDeleteCoef(matiere?.matiere?._id)}>
                      <i className="fas fa-trash text-danger"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-lg-8 col-md-12">
          <small>Proffeseurs dans la classe</small>

          <table className="table my-4 prof">
            <thead>
              <tr>
                <th scope="col">Professeurs</th>
                <th scope="col">Matiere</th>
                {/* <th scope="col">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {profInClasse && profInClasse.map((pro, index) => (
                <tr key={index}>
                  <td >{pro?.nom}</td>
                  <td >{pro?.matieres.map((pr) => pr?.nom).join(' - ')}</td>
                  <td>
                  <Link to={`/professeur/${pro._id}`} type="button" className="btn ">
                    <i className="fas fa-eye"></i> Voir
                  </Link>
              </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row">
        Eleve dans la classe
        <div className="d-flex align-items-center justify-content-between my-3">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Rechercher un eleve"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <div className="btn-group">
          {classes.map(cl => (
            <button key={cl._id} type="button" className={`btn ${selectedClasse === cl.nom ? 'btn-primary' : 'btn-secondary'}`} onClick={() => filterByClasse(cl.nom)}>{cl.nom}</button>
          ))}
        </div> */}
        </div>

        <table className="table my-4">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Prenom</th>
              <th scope="col">Nom du pere</th>
              <th scope="col">Nom du mere</th>
              {/* <th scope="col">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredData && filteredData.map((pro, index) => (
              <tr key={index}>
                <td >{pro?.nom}</td>
                <td >{pro?.surnom}</td>
                <td >{pro?.nomDuPere}</td>
                <td >{pro?.nomDuMere}</td>
                <td >
                <Link to={`/student/${pro._id}`} type="button" className="btn ">
                    <i className="fas fa-eye"></i> Voir
                  </Link>
                </td>
                {/* <td>
                <button className="btn " onClick={() => handleDeleteCoef(matiere?.matiere?._id)}>
                <i className="fas fa-trash text-danger"></i>
                </button>
              </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>




<BackButton/>

    </div>
  );
}

export default ClasseDetails;
