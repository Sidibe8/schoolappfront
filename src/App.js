import React, { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import { ThemeProvider } from "@aws-amplify/ui-react";
import theme from "./theme";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Tables from "./pages/tables";
import UsersTable from "./pages/tables/UsersTablePage";
import Forms from "./pages/forms";
import EditForm from "./pages/forms/EditForm";

// Own pages
import ClassePage from "./pages/classes/ClassePage";
import NotePage from "./pages/note/Note";
import ClassesNote from "./pages/note/ClassesNote";
import ClasseDetails from "./components/classeDetails/ClasseDetails";
import Student from "./pages/student/index";
import StudentDetail from "./pages/student/StudentDetails";
import Professeur from "./pages/Professeur/Professeur";
import ProfDetail from "./pages/Professeur/ProfDetail";
import BulletinEleveCLasse from "./pages/bulletin/BulletinEleveCLasse";
import Matieres from "./pages/matieres/Matieres";
import Trimestre from "./pages/trimestres/Trimestre";
import BulletinClasse from "./pages/bulletin/BulletinClasse";
import BulletinEleveNote from "./pages/bulletin/Bulletin";
import OnlineResult  from "./pages/StudenteResultOnline/OnlineResult";
import StudentConnected  from "./pages/StudenteResultOnline/StudentConnected";
import Login from "./pages/auth/Login";
import PrivateRoutes from "./utils/ProtectedRoute";

export default function App() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Vérifier si le token a expiré et nettoyer le localStorage si nécessaire
    checkTokenExpiry();
  }, []);

  const checkTokenExpiry = () => {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (token && tokenExpiration) {
      const now = new Date().getTime();
      if (now > parseInt(tokenExpiration)) {
        // Supprimer le token et les autres informations stockées dans le localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('user');
      } else {
        // Rediriger vers la page d'accueil si l'utilisateur est déjà connecté
        navigate('/');
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Routes>
          <Route path='/login' element={<Login />} />
          {user && user.role === 'eleve' ? (
            <>
            <Route path="/" element={<StudentConnected />} />
            <Route path="/:id" element={<OnlineResult />} />
            </>
          ) : (
            <Route element={<PrivateRoutes />} > 
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path='/classes' element={<ClassePage />} />
                <Route path='/classe/:id' element={<ClasseDetails />} />
                <Route path='/note' element={<NotePage />} />
                <Route path='/note/:id' element={<ClassesNote />} />
                <Route path='/student' element={<Student />} />
                <Route path='/student/:id' element={<StudentDetail />} />
                <Route path='/professeur' element={<Professeur />} />
                <Route path='/professeur/:id' element={<ProfDetail />} />
                <Route path='/matieres' element={<Matieres />} />
                <Route path='/trimestres' element={<Trimestre />} />
                <Route path='/bulletin_classe' element={<BulletinClasse />} />
                <Route path='/bulletin/:id' element={<BulletinEleveCLasse />} />
                <Route path='/bulletin_note/:id' element={<BulletinEleveNote />} />
                <Route path="forms" element={<Forms />} />
                <Route path="edit-form" element={<EditForm />} />
                <Route path="tables" element={<Tables />} />
                <Route path="users-table" element={<UsersTable />} />
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<NoMatch />} />
              </Route>
            </Route>
          )}
        </Routes>
       
        <ToastContainer />
      </div>
    </ThemeProvider>
  );
}


function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
