import React from "react";
import { Icon } from "@aws-amplify/ui-react";

import { MdDashboard, MdNotifications, MdBookmarks, MdAccountBox, MdSettings, MdBook, MdSchool, MdPerson, MdGroup } from "react-icons/md";
import { Link } from "react-router-dom";

export const baseConfig = {
  projectLink: "/", // Lien GitHub dans la barre de navigation
  docsRepositoryBase: "", // URL de base du dépôt de documentation
  titleSuffix: "",
  search: true,
  header: true,
  headerText: "Note+",
  footer: true,
  footerText: (
    <>
      <span>
        ©{new Date().getFullYear()}, Made with ❤️ by <span> </span>
        <Link to="https://wa.me/+22378019342" target="_blank" rel="noreferrer" style={{ color: "hsl(190, 95%, 30%)", textDecoration: "none" }}>
          SIDIBE
        </Link>
      </span>
    </>
  ),

  logo: (
    <>
      <img
        src='https://www.iad-3d.fr/wp-content/uploads/2017/10/logo-light@2x-300x232.png'
        // src={process.env.PUBLIC_URL + "/logo.png"}
        alt="logo"
        width="30"
        height="22"
      />
    </>
  ),
};

/// Navigation sidebar
export const appNavs = () => {
  // Récupération du rôle utilisateur à partir du localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  const userRole = user.role;

  // Vérification si le rôle utilisateur est défini
  if (!userRole) {
    // Gérer le cas où le rôle utilisateur n'est pas défini
    console.error("Le rôle de l'utilisateur n'est pas défini dans le stockage local.");
    return [];
  }

  // Détermination des autorisations en fonction du rôle utilisateur
  const isAdmin = userRole === "admin" || userRole === "superAdmin";
  const isTeacher = userRole === "teacher";
  // const isStudent = userRole === "eleve";

  // Logique pour afficher les liens en fonction des rôles des utilisateurs
  const navs = [
    {
      eventKey: "dashboard",
      icon: <Icon as={MdDashboard} />,
      title: "Tableau de bord",
      to: "/",
      // hidden: !isAdmin || !isTeacher,
    },
    {
      eventKey: "admin",
      icon: <Icon as={MdSettings} />,
      title: "Admin",
      // hidden: !isAdmin || !isTeacher,
      children: isAdmin ? [
        {
          eventKey: "classes",
          icon: <Icon as={MdSchool} />,
          title: "Classes",
          to: "/classes",
        },
        {
          eventKey: "matieres",
          icon: <Icon as={MdSchool} />,
          title: "Matieres",
          to: "/matieres",
        },
        {
          eventKey: "trimestre",
          icon: <Icon as={MdSchool} />,
          title: "Trimestre",
          to: "/trimestres",
        },
        {
          eventKey: "student",
          icon: <Icon as={MdPerson} />,
          title: "Eleves",
          to: "/student",
        },
        {
          eventKey: "professeur",
          icon: <Icon as={MdGroup} />,
          title: "Professeurs",
          to: "/professeur",
        },
      ] : null,
    },
    {
      eventKey: "note",
      icon: <MdBook />,
      title: "Note",
      to: "/note",
      hidden: !isTeacher, // Cacher si l'utilisateur n'est pas un enseignant
    },
    // {
    //   eventKey: "eleve",
    //   icon: <MdBook />,
    //   title: "Moi",
    //   to: "/moi",
    //   // hidden: !isStudent, // Cacher si l'utilisateur n'est pas un élève
    // },
    {
      eventKey: "bulletin",
      icon: <MdBookmarks />,
      title: "Bulletin",
      to: "/bulletin_classe",
      hidden: !isAdmin, // Cacher si l'utilisateur n'est pas un admin ou super admin
    },
    // {
    //   eventKey: "notifications",
    //   icon: <MdNotifications />,
    //   title: "Notifications",
    //   to: "/notifications",
    //   // hidden: !isAdmin || !isTeacher,
    // },
    {
      eventKey: "profile",
      icon: <Icon as={MdAccountBox} />,
      title: "Profile",
      to: "/profile",
      // hidden: !isAdmin || isTeacher,
    },
  ];

  // Filtrer les liens cachés
  const filteredNavs = navs.filter(nav => !nav.hidden);

  return filteredNavs;
};
