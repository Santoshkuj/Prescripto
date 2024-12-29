import {Navigate,useLocation} from 'react-router-dom'
const AuthCheck = ({adminToken,children}) => {
    const location  = useLocation()
    if (!adminToken && location.pathname !== '/login') {
        return <Navigate to={'/login'}/>
    } 
     if (adminToken && location.pathname === '/login') {
        return <Navigate to={'/'}/>
    }

    return children
}
export default AuthCheck