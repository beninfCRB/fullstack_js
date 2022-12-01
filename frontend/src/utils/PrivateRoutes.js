import { useCookies } from "react-cookie";
import jwt_decoded from 'jwt-decode'
import { Navigate, Outlet, useLocation } from "react-router-dom";


export const PrivateRoutes = () => {
    const [cookies] = useCookies(['refresh_token']);
    const user = jwt_decoded(JSON.stringify(cookies))
    const location = useLocation()

    return (
        user ? <Outlet /> : <Navigate replace to='/' state={{ from: location }} />
    )
}

export default PrivateRoutes