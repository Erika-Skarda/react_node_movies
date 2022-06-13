import React, { useEffect, useState } from 'react';
import { 
  Redirect, 
  Route, 
  RouteProps 
} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

interface RoutesPropsData extends RouteProps {
  role?: string;
}

const PrivateRoutes: React.FC<RoutesPropsData> = ({ role, ...rest }) => {
  const [hasPermission, setPermission] = useState([] as string[]);

  useEffect(() => {
    async function loadRoles() {
      const response = api.get('/users/roles');
      const findRole = (await response).data.find((r: string) => r === role)
      setPermission(findRole)
    }

    loadRoles();
  }, [])
  
  const { userLogged } = useAuth()
  console.log(userLogged)
  // Usuário logado com permissão
  // Usuário logado sem permissão
  // Usuário não logado

  if(!userLogged()) {
    return <Redirect to ="/"/>
  }

  if(!role && userLogged()) {
    <Route />
  }
  return (
    hasPermission ? <Route {...rest} /> : <Redirect to ="/" />
  )
}
export default PrivateRoutes;