import React from 'react'
import { Link } from 'react-router-dom'

function DashboardInfo() {
    return (
        <div className='row my-5'>
        {[1, 2, 3, 4].map((item) => (
          <div className="col-xl-3 col-md-6 mb-4" key={item}>
            <div className="card h-100">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-uppercase mb-1">Classe</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800" style={{ fontSize: "18px" }} id={item.id}>
                      {item}
                    </div>
                  </div>
                  <div className="col-auto">
                    <Link to={`/classe/${item}`} className="text-decoration-none me-2">
                      <i className="fas fa-eye fa-2x"></i>
                    </Link>
                    {/* <Link to={`#editer/${item}`} className="text-decoration-none">
                      <i className="fas fa-edit fa-2x text-warning"></i>
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
}

export default DashboardInfo