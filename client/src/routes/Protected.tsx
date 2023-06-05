// import { useContext } from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContex'

// import { AuthContext } from '../contexts/authContext'

type ProtectedProps = {
  isProtected: boolean
}

export function Protected({ isProtected }: ProtectedProps) {
  const { isSigned } = useContext(AuthContext)

  if (!isSigned && isProtected) {
    return <Navigate to="/sign-in" />
  }

  if (isSigned && !isProtected) {
    return <Navigate to="/" />
  }

  return <Outlet />
}
