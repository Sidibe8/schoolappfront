import React, { useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfesseur } from '../../actions/professeurActions';

function EditProfesseur({ editedProf, resetForm }) {
    const professeurs = useSelector(state => state.professeurReducer.professeurs);
    const matieres = useSelector((state) => state.matiereReducer.matieres);
    const classes = useSelector((state) => state.classeReducer.classes);
    console.log('Edit student', editedProf);

    const [formData, setFormData] = useState({
        nom: editedProf ? editedProf.nom : '', // Vérification de nullité pour éviter l'erreur
        email: editedProf ? editedProf.email : '',
        surnom: editedProf ? editedProf.surnom : '',
        number: editedProf ? editedProf.number : '',
        adresse: editedProf ? editedProf.adresse : '',
        password: '',
        matieres: editedProf?.matieres || [], // Vérification de nullité pour matieres
        classes: editedProf?.classes || [] // Vérification de nullité pour classes
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClassChange = (selectedOptions) => {
        setFormData({ ...formData, classes: selectedOptions.map(option => option.value) });
    };

    const handleMatieresChange = (selectedOptions) => {
        setFormData({ ...formData, matieres: selectedOptions.map(option => option.value) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfesseur(editedProf._id, formData))
            .then(() => resetForm())
            .catch(error => console.log(error));
    };


    return (
        <div className="mt-5">
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="nom" className="form-label">Nom</label>
                    <input type="text" className="form-control" id="nom" name="nom" value={formData.nom} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="surnom" className="form-label">surnom</label>
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
                    <label htmlFor="password" className="form-label">Mot de passe</label>
<br />
                    <small className='text-danger'>Ceci n'est pas conseillé</small>
                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="adresse" className="form-label">Adresse</label>
                    <input type="text" className="form-control" id="adresse" name="adresse" value={formData.adresse} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="classes" className="form-label">Classes</label>
                    <Select
                        isMulti
                        options={classes && classes.map(classe => ({ value: classe._id, label: classe.nom }))}
                        value={formData.classes.map(classeId => {
                            const foundClass = classes.find(classe => classe._id === classeId);
                            return { value: classeId, label: foundClass ? foundClass.nom : '' };
                        })}
                        onChange={handleClassChange}
                    />

                </div>
                <div className="col-md-4">
                    <label htmlFor="matieres" className="form-label">Matieres</label>
                    <Select
                        isMulti
                        options={matieres && matieres.map(matiere => ({ value: matiere._id, label: matiere.nom }))}
                        value={formData.matieres.map(matId => {
                            const foundMatiere = matieres.find(matiere => matiere._id === matId);
                            return { value: matId, label: foundMatiere ? foundMatiere.nom : '' };
                        })}
                        onChange={handleMatieresChange}
                    />

                </div>
                <div className="col-12 my-3">
                    <button type="submit" className="me-2">Mettre à jour Professeur</button>
                    <button type="button" className="btn btn-danger" onClick={resetForm}>Annuler</button>
                </div>
            </form>
        </div>
    );
}

export default EditProfesseur;
