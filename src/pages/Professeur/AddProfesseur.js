import React, { useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { addProfesseur, updateProfesseur } from '../../actions/professeurActions';

function AddProf() {
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        surnom: '',
        number: '',
        adresse: '',
        matieres: [],
        password: '',
        classes: []
    });


    const dispatch = useDispatch();
    const classes = useSelector((state) => state.classeReducer.classes);
    const matieres = useSelector((state) => state.matiereReducer.matieres);

    if(!Array.isArray(classes)){
        return <div><h2>Il semblerait que vous n'etes pas connecter</h2></div>
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClassChange = (selectedOptions) => {
        const selectedClassIds = selectedOptions.map(option => option.value);
        setFormData({ ...formData, classes: selectedClassIds });
    };

    const handleMatieresChange = (selectedOptions) => {
        const selectedMatiereIds = selectedOptions.map(option => option.value);
        setFormData({ ...formData, matieres: selectedMatiereIds });
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addProfesseur(formData))
        .then(() => {
            setFormData({
                nom: '',
                email: '',
                surnom: '',
                number: '',
                adresse: '',
                matieres: [],
                password: '',
                classes: []
            });
        })
        .catch(err => console.error(err));
    };
    

    return (
        <div className="mt-5">
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="nom" className="form-label">Nom</label>
                    <input type="text" className="form-control" id="nom" name="nom" value={formData.nom} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="surnom" className="form-label">Surnom</label>
                    <input type="text" className="form-control" id="surnom" name="surnom" value={formData.surnom} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="number" className="form-label">Number</label>
                    <input type="number" className="form-control" id="number" name="number" value={formData.number} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="adresse" className="form-label">Adresse</label>
                    <input type="text" className="form-control" id="adresse" name="adresse" value={formData.adresse} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="classes" className="form-label">Classes</label>
                    <Select
                        isMulti
                        options={classes && classes.map(classe => ({ value: classe._id, label: classe.nom }))}
                        value={formData.classes.map(classeId => ({ value: classeId, label: classes.find(mat => mat._id === classeId).nom }))}
                        onChange={handleClassChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="classes" className="form-label">Matieres</label>
                    <Select
                        isMulti
                        options={matieres && matieres.map(mat => ({ value: mat._id, label: mat.nom }))}
                        value={formData.matieres.map(matId => ({ value: matId, label: matieres.find(mat => mat._id === matId).nom }))}
                        onChange={handleMatieresChange}
                    />

                </div>
                <div className="col-12 my-3">
                    <button type="submit" className="me-2">Ajouter Professeur</button>
                </div>
            </form>
        </div>
    );
}

export default AddProf;
