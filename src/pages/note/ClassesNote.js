import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getElevesByClasse } from '../../actions/AllStudentByClasseActions';
import { addNote } from '../../actions/noteActions';
import BackButton from '../../components/backBtn/Backbtn';

const ClassesNote = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [teacherMatieres, setTeacherMatieres] = useState([]);
  const [teacherName, setTeacherName] = useState('');
  const itemsPerPage = 8;
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getElevesByClasse(id));
  }, [dispatch, id]);

  const students = useSelector((state) => state.elevesByClasseReducer.eleves);
  const trimestres = useSelector((state) => state.trimestreReducer.trimestres);
  const matieres = useSelector((state) => state.matiereReducer.matieres);
  const loading = useSelector((state) => state.elevesByClasseReducer.loading);
  const error = useSelector((state) => state.elevesByClasseReducer.error);

  const [formData, setFormData] = useState({
    notesDevoir: '',
    noteCompo: '',
    trimestre: '',
    matiere: '',
    trimestreId: '',
    matiereId: ''
  });

  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (user && user.role === 'teacher') {
      setTeacherMatieres(user.matieres);
      setTeacherName(user.nom + ' ' + user.surnom);
    }
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  const handleFormChange = (e) => {
    if (e.target.id === 'trimestre') {
      const selectedTrimestre = trimestres.find(trimestre => trimestre.nom === e.target.value);
      setFormData({ ...formData, [e.target.id]: e.target.value, trimestreId: selectedTrimestre._id });
    } else if (e.target.id === 'matiere') {
      setFormData({ ...formData, [e.target.id]: e.target.value, matiereId: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent) return;

    try {
      await dispatch(addNote({
        eleveId: selectedStudent._id,
        trimestreId: formData.trimestreId,
        matiereId: formData.matiereId,
        notesDevoir: formData.notesDevoir,
        noteCompo: formData.noteCompo
      }));

      setFormData({
        notesDevoir: '',
        noteCompo: '',
        trimestre: '',
        matiere: '',
        trimestreId: '',
        matiereId: ''
      });


      await dispatch(getElevesByClasse(id));
      handleCloseModal();
    } catch (err) {
      console.log(err);
    }
  };


  if (error) {
    return (
      <div className='container my-4 d-flex justify-content-center align-items-center flex-column' style={{height: "70vh"}}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <br />
        <small>Aucun élève trouvé pour cette classe.</small>
      </div>
    );
  }
  
  // if (!loading && (!students || students.length === 0)) {
  //   return (
  //     <div className='container my-4 d-flex justify-content-center align-items-center flex-column' style={{height: "70vh"}}>
  //       <div className="spinner-border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </div>
  //       <br />
  //       <small>Aucun élève trouvé pour cette classe.</small>
  //     </div>
  //   );
  // }
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = students.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredData = students.filter(item =>
    item.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.surnom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let displayData = [];

  // Vérifiez le rôle de l'utilisateur
  if (user && user.role === 'admin') {
    // Si l'utilisateur est un admin, affichez simplement les élèves sans filtrage
    displayData = currentItems;
  } else if (user && user.role === 'teacher') {
    // Si l'utilisateur est un enseignant, filtrez les notes en fonction des matières de l'enseignant
    displayData = currentItems.map(item => ({
      ...item,
      notes: item.notes.filter(note => note.matiere && teacherMatieres.some(mat => mat === note.matiere._id))
    }));
  }

  return (
    <div className='mt-5 container'>
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-4">{teacherName}</h1>
        </div>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleChange}
      />
      <div className="table-wrapper-scroll-x">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nom</th>
                <th scope="col">Surnom</th>
                <th scope="col">Classe</th>
                <th scope="col" style={{ textAlign: 'center' }}>Notes</th>
                {user && user.role === 'teacher' && <th scope="col" style={{ textAlign: 'center' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {displayData.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.nom}</td>
                  <td>{item.surnom}</td>
                  <td>{item.classe.nom}</td>
                  <td>
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th className="bg-b" style={{ background: '#047d95', color: '#fff' }}>Trimestre</th>
                            <th className="bg-b" style={{ background: '#047d95', color: '#fff' }}>Matière</th>
                            <th className="bg-b" style={{ background: '#047d95', color: '#fff' }}>Notes devoir</th>
                            <th className="bg-b" style={{ background: '#047d95', color: '#fff' }}>Note compo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.notes.map((note, index) => (
                            <tr key={index}>
                              <td>{note.trimestre.nom}</td>
                              <td>{note.matiere.nom}</td>
                              <td>{note.notesDevoir}</td>
                              <td>{note.noteCompo}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                  {user && user.role === 'teacher' && (
                    <td>
                      <button type="button" className="btn me-2" onClick={() => handleEdit(item)} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <i className="fas fa-edit"></i> Modifier
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">{selectedStudent && selectedStudent.nom} {selectedStudent && selectedStudent.surnom}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
              {selectedStudent && (
                <form className="row g-3" onSubmit={handleFormSubmit}>
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Nom</label>
                    <input type="text" className="form-control" id="name" value={selectedStudent.nom} readOnly />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="surname" className="form-label">Surnom</label>
                    <input type="text" className="form-control" id="surname" value={selectedStudent.surnom} readOnly />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="notesDevoir" className="form-label">Notes Devoir</label>
                    <input type="number" className="form-control" id="notesDevoir" value={formData.notesDevoir} onChange={handleFormChange} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="noteCompo" className="form-label">Note Compo</label>
                    <input type="number" className="form-control" id="noteCompo" value={formData.noteCompo} onChange={handleFormChange} />
                  </div>
                  <div className="col-md-6">
                    <select className="form-select" aria-label="Trimester" value={formData.trimestre} onChange={handleFormChange} id="trimestre">
                      <option value="">Sélectionner un trimestre</option>
                      {trimestres.map(trimestre => (
                        <option key={trimestre._id} value={trimestre.nom}>{trimestre.nom}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <select className="form-select" aria-label="Subject" value={formData.matiereId} onChange={handleFormChange} id="matiere">
                      <option value="">Sélectionner une matière</option>
                      {teacherMatieres.map((matiereId) => {
                        const matiere = matieres.find(mat => mat._id === matiereId);
                        return (
                          <option key={matiere._id} value={matiere._id}>{matiere.nom}</option>
                        );
                      })}
                    </select>
                  </div>
                </form>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="" onClick={handleFormSubmit}>Enregistrer</button>
            </div>
          </div>
        </div>
      </div>


      <BackButton/>

    </div>
  );
};

export default ClassesNote;
