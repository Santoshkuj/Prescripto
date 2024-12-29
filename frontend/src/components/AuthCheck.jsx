import {Navigate,useLocation} from 'react-router-dom'
const AuthCheck = ({userToken,children}) => {
    const location  = useLocation()
    if (!userToken && location.pathname !== '/login') {
        return <Navigate to={'/login'}/>
    } 
     if (userToken && location.pathname === '/login') {
        return <Navigate to={'/'}/>
    }

    return children
}
export default AuthCheck