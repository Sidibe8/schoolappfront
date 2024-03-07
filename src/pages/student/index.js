import React from 'react'
import StudentList from './Student'
function index() {
  return (
    <div className='container mt-2'>
  <div className="row ">
        <div className="col-12">
          <h1 className="display-4">Dinhojr</h1>
          <p className="lead mb-0">Admin</p>
          {/* <p className="mb-0">Matiere: Anglais</p> */}
        </div>
      </div>

      <StudentList/>
    </div>
  )
}

export default index