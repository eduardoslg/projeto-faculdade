import { BrowserRouter } from 'react-router-dom'

import { Provider } from '@siakit/core'
import { DialogProvider } from '@siakit/dialog'
import { LoadingProvider } from '@siakit/loading'
import { ToastProvider } from '@siakit/toast'

import AuthProvider from './contexts/AuthContex'
import { PageHeaderProvider } from './hooks/pageHeader'
import { AppRoutes } from './routes/AppRoutes'

export function App() {
  return (
    <BrowserRouter>
      <PageHeaderProvider>
        <Provider>
          <DialogProvider>
            <ToastProvider>
              <LoadingProvider>
                <AuthProvider>
                  <AppRoutes />
                </AuthProvider>
              </LoadingProvider>
            </ToastProvider>
          </DialogProvider>
        </Provider>
      </PageHeaderProvider>
    </BrowserRouter>
  )
}
