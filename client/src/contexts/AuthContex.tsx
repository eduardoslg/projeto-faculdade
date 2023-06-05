import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useLoading } from '@siakit/loading'
import { useToast } from '@siakit/toast'

import { api } from '../lib/api'

type User = {
  name?: string
  username?: string | null
}

type AuthContextData = {
  isSigned?: boolean
  user?: User
  signIn: (data: any) => Promise<void>
  signOut: () => Promise<void>
}

type LoginProps = {
  username: string
  password: string
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: any) {
  const navigate = useNavigate()
  const { setLoading } = useLoading()
  const { addToast } = useToast()

  const [user, setUser] = useState<User | undefined>(() => {
    const persistedUser = localStorage.getItem('@faculdade')

    if (persistedUser) {
      return JSON.parse(persistedUser)
    }

    return null
  })

  async function signIn(data: LoginProps) {
    try {
      setLoading(true)

      const response = await api.post('/session', data)

      const userValues = {
        name: response.data.name,
        username: response.data.username,
      }

      localStorage.setItem(`@faculdade:user`, JSON.stringify(userValues))
      localStorage.setItem(`@faculdade:token`, response.data.token)

      setUser(userValues)
      localStorage.setItem('@faculdade', JSON.stringify(response.data))
      navigate('/')

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Bem vindo!',
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function signOut() {
    try {
      setLoading(true)

      localStorage.removeItem('@faculdade')
      localStorage.removeItem('@faculdade:user')
      localStorage.removeItem('@faculdade:token')

      setUser(undefined)
      navigate('/sign-in')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isSigned: !!user,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
