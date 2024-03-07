import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getElevesByClasse } from '../../actions/AllStudentByClasseActions';
import { addNote } from '../../actions/noteActions';
import BackButton from '../../components/backBtn/Backbtn';

const BulletinEleveCLasse = () => {
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
  // console.log('students', students);
  const trimestres = useSelector((state) => state.trimestreReducer.trimestres);
  const matieres = useSelector((state) => state.matiereReducer.matieres);
  const loading = useSelector((state) => state.elevesByClasseReducer.loading);
  const error = useSelector((state) => state.elevesByClasseReducer.error);


  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (user && user.role === 'teacher') {
      setTeacherMatieres(user.matieres);
      setTeacherName(user.nom + ' ' + user.surnom);
    }
  }, []);

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

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };


  //   console.log('Notes', filteredNotes);
  // console.log('teacherMatieres', teacherMatieres);

  return (
    <div className='mt-5 container'>
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-4">{teacherName}</h1>
          {/* Si vous souhaitez afficher les matières de l'enseignant, décommentez la ligne suivante */}
          {/* <p className="mb-0">{teacherMatieres.length > 0 && `Matieres: ${teacherMatieres.map(matiere => matiere.nom).join(', ')}`}</p> */}
          {/* <p className="lead mb-0">Veuillez choisir une classe!</p> */}
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
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item?.nom}</td>
                  <td>{item?.surnom}</td>
                  <td>{item?.classe?.nom}</td>
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
                          {/* Vérifier si item.notes est défini et non null avant de le parcourir */}
                          {item?.notes && item.notes.map((note, index) => (
                            <tr key={index}>
                              <td>{note?.trimestre?.nom}</td>
                              <td>{note?.matiere?.nom}</td>
                              <td>{note?.notesDevoir}</td>
                              <td>{note?.noteCompo}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                  {user && user.role === 'admin' || user.role == 'superAdmin' ? (
                    <td>
                      <Link to={`/bulletin_note/${item._id}`} className="btn me-2" onClick=''>
                        <i className="fas fa-edit"></i> Voir
                      </Link>
                    </td>
                  ) : ''}
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

      <BackButton/>
    </div>
  );
};

export default BulletinEleveCLasse;
