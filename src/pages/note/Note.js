import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfesseurComponent from '../../components/professeurs/ProfesseurComponent'
import { toast } from 'react-toastify';
import UserInfo from '../../components/headerInfo/UserInfo';
import BackButton from '../../components/backBtn/Backbtn';
function NotePage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [teachName, setTeacherName] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [teacherMatieres, setTeacherMatieres] = useState([]);

  const userStocked = JSON.parse(localStorage.getItem('user'));
  const matieres = useSelector(state => state.matiereReducer.matieres);

  const classes = useSelector(state => state.classeReducer.classes);

  // if (!Array.isArray(classes)) {
  //   return (
  //     <div className='container my-4 d-flex justify-content-center align-items-center flex-column' style={{height: "70vh"}}>
  //       <div className="spinner-border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </div>
  //       <br />
  //       <small>No classes to show</small>
  //     </div>
  //   );
  // }


  

  useEffect(() => {
    // Vérifier le rôle de l'utilisateur
    if (userStocked) {
      if (userStocked.role === 'admin') {
        setIsAdmin(true);
        // setFilteredClasses(classes); // Afficher toutes les classes pour l'admin
      } else if (userStocked.role === 'teacher') {
        // setIsAdmin(false);
        // Filtrer les classes pour l'enseignant
        const teacherClasses = userStocked.classes
          .map(classId => classes.find(c => c._id === classId)) // Trouver les classes correspondantes
          .filter(classItem => classItem !== undefined); // Filtrer les éléments undefined
        // console.log('Teacher classes', teacherClasses);
        setFilteredClasses(teacherClasses);
        // Utiliser les informations de l'utilisateur pour l'affichage
        setTeacherName(`${userStocked?.nom} ${userStocked?.surnom}`);
        // // Filtrer les matières spécifiques à l'enseignant
        const teacherMatieres = matieres.filter(matiere => userStocked.matieres.includes(matiere._id));
        // console.log('Teacher matieres', teacherMatieres);
        setTeacherMatieres(teacherMatieres);
      }
    }
  }, [userStocked]);
  

  return (
    <>
    <div className="row mb-4">
        <div className="col-12">
          {/* <h1 className="display-4">{teachName.toLocaleUpperCase()}</h1> */}
          <UserInfo/>
          {/* Si vous souhaitez afficher les matières de l'enseignant, décommentez la ligne suivante */}
          <p className="mb-0">{teacherMatieres.length > 0 && `Matieres: ${teacherMatieres.map(matiere => matiere.nom).join(', ')}`}</p>
          <p className="lead mb-0">Veuillez choisir une classe!</p>
        </div>
      </div>

   <ProfesseurComponent />


   <BackButton/>

    </>
  );
}

export default NotePage;
