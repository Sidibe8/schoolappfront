import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { addProfesseur, updateProfesseur, deleteProfesseur } from '../../actions/professeurActions';
import EditProfesseur from './EditProfesseur';
import AddProf from './AddProfesseur';
import BackButton from '../../components/backBtn/Backbtn';

const Professeur = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [selectedClasse, setSelectedClasse] = useState([]);
    const [selectedProf, setSelectedProf] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProf, setEditedProf] = useState(null);
    const dispatch = useDispatch();
    const professeurs = useSelector(state => state.professeurReducer.professeurs);
    const classes = useSelector((state) => state.classeReducer.classes);


    if (!Array.isArray(professeurs)) {
        return (
            <div className='container my-4 d-flex justify-content-center align-items-center flex-column' style={{ height: "70vh" }}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <br />
                <small>No professeurs to show</small>
            </div>
        );
    }

    const userStocked = JSON.parse(localStorage.getItem('user'));



    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClassChangeFilter = (selectedOptions) => {
        setSelectedClasse(selectedOptions.map(option => option.value));
    };

    const handleEdit = (prof) => {
        setSelectedProf(prof);
        setEditedProf({ ...prof });
        // console.log("A editer", editedProf);
        setIsEditing(true);
    };


    const handleCancel = () => {
        setSelectedProf(null);
        setIsEditing(false);
    };

    const handleDelete = (profId) => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer le professeur avec l'ID ${profId} ?`)) {
            dispatch(deleteProfesseur(profId));
        }
    };

    const resetForm = () => {
        setSelectedProf(null);
        setIsEditing(false);
    };

    function addSpaceEveryTwoCharacters(number) {
        if (typeof number !== 'string') {
            return number;
        }
        const numberWithoutSpaces = number.replace(/\s/g, '');
        const formattedNumber = numberWithoutSpaces.replace(/(.{2})(?=.)/g, '$1 ');
        return formattedNumber;
    }

    return (
        <div className="container mt-5">
            <h2>Professeurs</h2>

            {isEditing ? (
                <EditProfesseur editedProf={editedProf} resetForm={resetForm} />
            ) : (
                <AddProf />
            )}

            <div className="d-flex align-items-center justify-content-between mb-3">
                <input
                    type="text"
                    className="form-control me-2 col-"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>

            <div className="col-md-6 mb-3">
                <label htmlFor="classes" className="form-label">Filtrer par classe</label>
                <Select
                    isMulti
                    options={classes && classes.map(classe => ({ value: classe._id, label: classe.nom }))}
                    onChange={handleClassChangeFilter}
                />
            </div>

            <div className="table-wrapper-scroll-x">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Prenom</th>
                            <th scope="col">Numero</th>
                            <th scope="col">Classe</th>
                            <th scope="col">Matieres</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {professeurs && professeurs.filter(professeur => selectedClasse.length === 0 || selectedClasse.some(classe => professeur.classes.includes(classe._id)))
                            .map((professeur, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{professeur?.nom}</td>
                                    <td>{professeur?.surnom}</td>
                                    <td>+223 {addSpaceEveryTwoCharacters(professeur?.number)}</td>
                                    <td>{professeur?.classes.map(classe => classe.nom).join(', ')}</td>
                                    <td>{professeur?.matieres.map(classe => classe.nom).join(', ')}</td>
                                    <td>

                                        {
                                            userStocked && userStocked.role !== 'superAdmin' ? (
                                                ''
                                            ) : (
                                                <span type="button" className="me-2" onClick={() => handleEdit(professeur)}>
                                                <i className="fas fa-edit text-warning"></i> Modifier
                                            </span>
                                            )
                                        }
                                   
                                        <Link to={`/professeur/${professeur._id}`} type="button" >
                                            <i className="fas fa-eye"></i> Afficher
                                        </Link>
                                        <span type="button" className='mx-3' onClick={() => handleDelete(professeur._id)}>
                                            <i className="fas fa-trash  text-danger" ></i> Supprimer
                                        </span>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {Array.from({ length: Math.ceil(professeurs.length / itemsPerPage) }, (_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>


            <div className="row mt-2 " style={{ width: 100 }}>
                <BackButton />


            </div>
        </div>
    );
};

export default Professeur;
