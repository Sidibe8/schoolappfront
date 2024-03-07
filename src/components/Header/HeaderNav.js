import React from "react";
import { Menu, MenuItem, MenuButton, Link } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
// import { AiFillGithub } from "react-icons/ai";
import { baseConfig } from "../../config";
import { MdSchool } from "react-icons/md";

const HeaderNav = () => {
  const navigate = useNavigate();

  const userStocked = JSON.parse(localStorage.getItem('user'));



  const logout = () => {

    const confirm = window.confirm('Are you sure you want to logged out?');

    if (confirm) {

      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');

      navigate('/')
    }    // Enregistrer le token et son expiration dans le localStorage

  }


  return (
    <>
      {baseConfig.projectLink ? (
        <div className="github-link" style={{ marginTop: '0' }}>
          <Link
            // href={baseConfig.projectLink}
            // isExternal={true}
            ariaLabel="Note +"
          >
            {/* <AiFillGithub /> */}
            <MdSchool />
          </Link>
        </div>
      ) : (
        <></>
      )}

      <Menu
        menuAlign="end"
        trigger={
          <MenuButton variation="menu">
            <div className="header-avatar">
              <img alt="avatar" src={"https://cdn3d.iconscout.com/3d/premium/thumb/add-account-5590847-4652483.png"}></img>
            </div>
          </MenuButton>
        }
      >
        <MenuItem onClick={() => navigate("/profile")}>{userStocked?.nom}</MenuItem>
        {/* <MenuItem>Settings</MenuItem> */}
        <MenuItem onClick={logout}>Deconnecter</MenuItem>
      </Menu>
    </>
  );
};

export default HeaderNav;
