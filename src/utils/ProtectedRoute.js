import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    // Utilisez window.localStorage au lieu de JSON.localStorage
    let auth = localStorage.getItem("token");

    return(
        auth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes
