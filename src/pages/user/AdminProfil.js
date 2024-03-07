import React, { useEffect, useState } from 'react';
import '../Professeur/prof.css'; // Assurez-vous d'importer votre fichier de styles CSS
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { getProfesseurById } from '../../actions/professeurByIdAction';
// import { updateProfesseur } from '../../actions/professeurActions';
import { getUserById, updateUserById } from '../../actions/userActions';

function AdminProfil() {

    const userStocked = JSON.parse(localStorage.getItem('user'));
    //   const { id } = useParams();
    const id = userStocked._id
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getUserById(id));
    // }, [dispatch, id]);

    //   const professeur = useSelector(state => state.professeurByIdReducer.professeur);


    const [formData, setFormData] = useState({
        nom: userStocked?.nom || '', // Ajoutez une vérification pour éviter l'erreur si userStocked est null
        email: userStocked?.email || '',
        prenom: userStocked?.prenom || '',
        numero: userStocked?.numero || '', // Correction du nom de la propriété "number"
        adresse: userStocked?.adresse || '',
        password: '', // Efface le mot de passe précédent lorsque les données du professeur sont mises à jour
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(updateUserById(id, formData))
            .then(() => {
                // Réinitialiser la valeur du champ mot de passe à une chaîne vide
                setFormData({ ...formData, password: '' });
                // console.log('Submitted!');
            })
            .catch(error => console.log(error));
    };


    // console.log('proffffff', professeur);

    //   if (!(professeur)) {
    //     return (
    //       <div className='container my-4 d-flex justify-content-center align-items-center flex-column' style={{ height: "70vh" }}>
    //         <div className="spinner-border" role="status">
    //           <span className="visually-hidden">Loading...</span>
    //         </div>
    //         <br />
    //         <small>Loading...</small>
    //       </div>
    //     );
    //   }


    return (
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img
                            className="rounded-circle mt-5"
                            width="150px"
                            src="https://static.vecteezy.com/system/resources/previews/012/447/670/original/3d-illustration-avatar-profile-man-png.png"
                            alt="profile-pic"
                        />
                        <span className="font-weight-bold">
                            {userStocked?.nom.toUpperCase()} {userStocked?.prenom.toUpperCase()}
                        </span>
                        <span className="text-black-50">{userStocked?.email}</span>


                        <span className="text-black-50">{userStocked?.cle}</span>
                        <span className="text-black-50">Role: {userStocked?.role}</span>


                    </div>
                </div>
                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Settings</h4>
                        </div>
                        {/* first box */}
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label className="labels">Nom</label>
                                <input type="text" className="form-control" name="nom" value={formData?.nom} readOnly />
                            </div>
                            <div className="col-md-6">
                                <label className="labels">Prenom</label>
                                <input type="text" className="form-control" name="prenom" value={formData?.prenom} readOnly />
                            </div>
                        </div>
                        {/* second box */}
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label className="labels">Email</label>
                                <input type="email" className="form-control" name="email" value={formData?.email} readOnly />
                            </div>
                            <div className="col-md-6">
                                <label className="labels">Numero</label>
                                <input type="number" className="form-control" name="numero" value={formData?.numero} readOnly />
                            </div>
                        </div>
                        {/* third box */}
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label className="labels">Adresse</label>
                                <input type="text" className="form-control" name="adresse" value={formData?.adresse} readOnly />
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
                        {userStocked && userStocked.role !== "admin" && userStocked && userStocked.role !== "superAdmin" ? (
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
                            {/* <span>Matieres</span> */}
                            {/* <span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Experience</span> */}
                        </div>
                        <br />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProfil;
