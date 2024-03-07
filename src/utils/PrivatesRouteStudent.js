//privateRoutes.js

import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

function PrivatesRouteStudent() {
const StudentToken = JSON.parse(localStorage.getItem('user'))
const token = StudentToken.role

if (token === 'eleve') return token ? <Outlet /> : <Navigate to='/' />
}

export default PrivatesRouteStudent