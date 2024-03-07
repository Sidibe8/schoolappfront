import React from 'react'

function UserInfo() {

    const userStocked = JSON.parse(localStorage.getItem('user'));
    
  return (
    <div className="row my-4">
    <div className="col-12">
      <h1 className="display-4">{userStocked?.nom.toUpperCase()}</h1>
      <p className="lead mb-0">Role: {userStocked?.role}</p>
      {/* <p className="mb-0">Matiere: Anglais</p> */}
    </div>
  </div>
  )
}

export default UserInfo