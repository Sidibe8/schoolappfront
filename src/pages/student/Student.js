import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import { addEleve, updateEleve, deleteEleve } from '../../actions/eleveActions';
import BackButton from '../../components/backBtn/Backbtn';

const StudentComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedClasse, setSelectedClasse] = useState('');

  const [formData, setFormData] = useState({
    nom: '',
    surnom: '',
    email: '',
    numero: '',
    nomDuPere: '',
    nomDuMere: '',
    numeroParent: '',
    classe: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);

  const eleves = useSelector((state) => state.eleveReducer.eleves);
  const classes = useSelector((state) => state.classeReducer.classes);
  const dispatch = useDispatch();
  
  if (!Array.isArray(eleves)) {
    return (
      <div className='container my-4 d-flex justify-content-center align-items-center flex-column' style={{height: "70vh"}}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <br />
        <small>No eleves to show</small>
      </div>
    );
  }

  

  // Fonction de filtrage par classe
  const filterByClasse = (classe) => {
    setSelectedClasse(classe);
    setCurrentPage(1);
  };

  // Filtrage des étudiants en fonction du terme de recherche et de la classe sélectionnée
  const filteredData = eleves && eleves.filter(item =>
    (item.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.surnom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nomDuPere.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedClasse ? item.classe === selectedClasse : true)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const handleEdit = (student) => {
    setFormData({ ...student });
    setEditedStudent({ ...student });
    setIsEditing(true);
  };

  const handleDelete = (studentId) => {
    // console.log('ID de l\'étudiant à supprimer :', studentId);
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      dispatch(deleteEleve(studentId));
    }
  };

  const resetForm = () => {
    setFormData({
      nom: '',
      surnom: '',
      email: '',
      numero: '',
      nomDuPere: '',
      nomDuMere: '',
      numeroParent: '',
      classe: ''
    });
    setIsEditing(false);
  };



  return (
    <div className="container mt-5">
      <h2>Étudiants</h2>
      <div className="row my-4">
        <div className="col-12">
          {isEditing ? (
            <EditStudent
              editedStudent={editedStudent}
              resetForm={resetForm}
              classes={ classes && classes}
            />
          ) : (
            <AddStudent

              classes={classes && classes}
            />
          )}
        </div>
      </div>

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

      <div className="table-wrapper-scroll-x">
        <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col">Surnom</th>
              <th scope="col">Nom du père</th>
              <th scope="col">Nom de la mère</th>
              <th scope="col">Classe</th>
              <th scope="col" style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item?.nom}</td>
                <td>{item?.surnom}</td>
                <td>{item?.nomDuPere}</td>
                <td>{item?.nomDuMere}</td>
                <td>{item?.classe?.nom}</td>
                <td>
                  <button type="button" className="btn  me-2" onClick={() => handleEdit(item)}>
                    <i className="fas fa-edit text-warning"></i> Modifier
                  </button>
                  <Link to={`/student/${item._id}`} type="button" className="btn ">
                    <i className="fas fa-eye"></i> Voir
                  </Link>
                  <button type="button" className="btn " onClick={() => handleDelete(item._id)}>
                    <i className="fas fa-trash text-danger"></i> Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>


      <div className='row mt-2' style={{width:100}}>
      <BackButton/>

      </div>
    </div>
  );
};

export default StudentComponent;
