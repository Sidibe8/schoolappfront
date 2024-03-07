// AddStudent.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEleve } from '../../actions/eleveActions';

function AddStudent({ classes }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nom: '',
    surnom: '',
    email: '',
    password:'',
    numero: '',
    nomDuPere: '',
    nomDuMere: '',
    numeroParent: '',
    classe: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    dispatch(addEleve(formData))
      .then(() => setFormData({
        nom: '',
        surnom: '',
        email: '',
        password:'',
        numero: '',
        nomDuPere: '',
        nomDuMere: '',
        numeroParent: '',
        classe: ''
      }))
      .catch(error => console.log(error));
  };


  return (
    <form onSubmit={handleAddSubmit} className="row g-3 align-items-center">
      <div className="col-md-4">
        <label htmlFor="nom" className="form-label">Nom</label>
        <input type="text" className="form-control" id="nom" name="nom" value={formData.nom} onChange={handleChange} required />
      </div>
      <div className="col-md-4">
        <label htmlFor="surnom" className="form-label">Surnom</label>
        <input type="text" className="form-control" id="surnom" name="surnom" value={formData.surnom} onChange={handleChange} required />
      </div>
      <div className="col-md-4">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="col-md-4">
        <label htmlFor="password" className="form-label">Mot de passe</label>
        <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <div className="col-md-4">
        <label htmlFor="numero" className="form-label">Numero</label>
        <input type="number" className="form-control" id="numero" name="numero" value={formData.numero} onChange={handleChange} required />
      </div>
      <div className="col-md-4">
        <label htmlFor="numeroParent" className="form-label">Numero du Pere</label>
        <input type="number" className="form-control" id="numeroParent" name="numeroParent" value={formData.numeroParent} onChange={handleChange} required />
      </div>
      <div className="col-md-4">
        <label htmlFor="fatherName" className="form-label">Nom du père</label>
        <input type="text" className="form-control" id="fatherName" name="nomDuPere" value={formData.nomDuPere} onChange={handleChange} required />
      </div>
      <div className="col-md-4">
        <label htmlFor="motherName" className="form-label">Nom de la mère</label>
        <input type="text" className="form-control" id="motherName" name="nomDuMere" value={formData.nomDuMere} onChange={handleChange} required />
      </div>
      <div className="col-md-4">
        <label htmlFor="classe" className="form-label">Classe</label>
        <select className="form-select" id="classe" name="classe" value={formData.classe} onChange={handleChange} required>
          <option value="">Sélectionner une classe</option>
          {classes && classes.map(cl => (
            <option key={cl._id} value={cl._id}>{cl.nom}</option>
          ))}
        </select>
      </div>
      <div className="col-md-12">
        <button type="submit" className="me-2"> Ajouter</button>
       
      </div>
    </form>
  );
}

export default AddStudent;
