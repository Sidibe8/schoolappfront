import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function ProfesseurComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [teachName, setTeacherName] = useState('');
  const [teacherMatieres, setTeacherMatieres] = useState([]);
  const [matiere, setMatiere] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Ajout d'un state pour gérer le rôle admin/teacher

  const classes = useSelector(state => state.classeReducer.classes);
  const matieres = useSelector(state => state.matiereReducer.matieres);
  const userStocked = JSON.parse(localStorage.getItem('user'));

  const pathname = window.location.pathname;
  const nom = pathname.substring(1); // Pour enlever le premier "/"
  // console.log("PathName",nom);



  useEffect(() => {
    // Vérifier le rôle de l'utilisateur
    if (userStocked) {
      if (userStocked.role === 'admin' || userStocked.role === 'superAdmin') {
        setIsAdmin(true);
        setFilteredClasses(classes); // Afficher toutes les classes pour l'admin
      } else if (userStocked.role === 'teacher') {
        setIsAdmin(false);
        // Filtrer les classes pour l'enseignant
        const teacherClasses = userStocked.classes
          .map(classId => classes.find(c => c._id === classId)) // Trouver les classes correspondantes
          .filter(classItem => classItem !== undefined); // Filtrer les éléments undefined
        // console.log('Teacher classes', teacherClasses);
        setFilteredClasses(teacherClasses);
        // Utiliser les informations de l'utilisateur pour l'affichage
        setTeacherName(`${userStocked.nom} ${userStocked.surnom}`);
        // Filtrer les matières spécifiques à l'enseignant
        const teacherMatieres = matieres.filter(matiere => userStocked.matieres.includes(matiere._id));
        // console.log('Teacher matieres', teacherMatieres);
        setTeacherMatieres(teacherMatieres);
      }
    }
  }, []);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };



  if (!filteredClasses) {
    return <div className='container my-4 d-flex justify-content-center'>
      <small>There's no classes to show</small>
    </div>
  }


  const filteredData = filteredClasses.filter(item =>
    item.nom.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">


      <div className="row my-4">
        <div className="col-lg-6 d-flex">
          <div className="w-100">
            <div className="form-group mb-0">
              <input
                type="text"
                className="form-control"
                id="classeId2"
                aria-describedby="classeHelp"
                placeholder="Rechercher une classe..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </div>


      <div className='row my-5'>
        {filteredData.map((item) => (
          item && (
            <div className="col-xl-3 col-md-6 mb-4" key={item._id}>
              <div className="card h-100">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-uppercase mb-1">Classe</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800" style={{ fontSize: "18px" }}>
                        {item.nom}
                      </div>
                    </div>
                    {/* // Masquer les boutons si l'utilisateur n'est pas admin */}

                    <div className="col-auto">
                      <Link to={userStocked && userStocked.role !== 'teacher' ? `/classe/${item._id}` : `/note/${item._id}`} className="text-decoration-none me-2">
                        <i className="fas fa-eye fa-2x"></i>
                      </Link>

                    </div>


                  </div>
                </div>
              </div>
            </div>
          )
        ))}
      </div>


    </div>
  );
}

export default ProfesseurComponent;
