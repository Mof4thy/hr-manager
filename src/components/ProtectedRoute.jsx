
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/Authcontext' 

const ProtectedRoute = () => {
    
    const {  useGetProfile} = useAuth()
    
    // const { data: user } = useGetProfile()
    // console.log(user.data.user.role)
    // const userRole = user.data.user.role
    
    const { data: user } = useGetProfile()
    
    // if(user.data){
    //     console.log(user.data)
    // }
    
    if (user) {
        return <Outlet />
    } else {
        return <Navigate to="/login" />
    }
}


export default ProtectedRoute

