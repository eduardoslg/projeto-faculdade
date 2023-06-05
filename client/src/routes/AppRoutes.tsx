import { Route, Routes } from 'react-router-dom'

import { DefaultLayout } from '../pages/_layouts'
import { Home } from '../pages/Home'
import { Register } from '../pages/Register'
import { SignIn } from '../pages/SignIn'
import { Protected } from './Protected'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Protected isProtected={false} />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<Register />} />
      </Route>

      <Route element={<Protected isProtected />}>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  )
}
