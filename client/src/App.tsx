import { lazy, Suspense, useEffect, useState, type FC } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { LoadingPage } from '@components/pages'
import { AuthLayout, DefaultLayout } from '@components/layout'
import { Loader } from '@components/ui'
import { ProtectedRoute, ScrollToTop } from '@components/utils'
import { ROUTES, USER_ROLES } from '@constants'
import { useActions, useAppSelector, useLogout } from '@hooks'
import { useGetMeQuery } from '@store/api'
import 'react-toastify/dist/ReactToastify.css'
import { AppointmentModalProvider } from '@context'
import { AppointmentModalWrapper } from '@components/modals'

const HomePage = lazy(() => import('@components/pages/Home'))
const ServicesPage = lazy(() => import('@components/pages/Services'))
const AppointmentPage = lazy(() => import('@components/pages/Appointment'))

const ProfilePage = lazy(() => import('@components/pages/Profile'))
const ProfileAccountDetails = lazy(() => import('@components/pages/Profile/AccountDetails'))
const ProfilePets = lazy(() => import('@components/pages/Profile/Pets'))
const ProfileAppointments = lazy(() => import('@components/pages/Profile/Appointments'))

const LoginPage = lazy(() => import('@components/pages/Login'))
const RegistrationPage = lazy(() => import('@components/pages/Registration'))
const UnauthorizedPage = lazy(() => import('@components/pages/Unauthorized'))

const AdminPage = lazy(() => import('@components/pages/Admin'))
const AdminSpeciesPage = lazy(() => import('@components/pages/Admin/Species'))
const AdminBreedsPage = lazy(() => import('@components/pages/Admin/Breeds'))
const AdminServicesPage = lazy(() => import('@components/pages/Admin/Services'))
const AdminVetsPage = lazy(() => import('@components/pages/Admin/Vets'))

export const App: FC = () => {
  const { setAuthUser } = useActions()
  const { logout } = useLogout()
  const { userToken, userInfo } = useAppSelector(state => state.authReducer)
  const [isUserLoading, setIsUserLoading] = useState(false)

  const {
    data,
    isSuccess,
    isError,
    error,
    refetch,
    isFetching: isUserFetching,
  } = useGetMeQuery(userToken ? undefined : skipToken)

  const isLoading = isUserLoading || (userToken && !userInfo && isUserFetching)

  useEffect(() => {
    if (userToken && !userInfo) {
      setIsUserLoading(true)
      refetch()
    }
  }, [userToken, userInfo, refetch])

  useEffect(() => {
    if (isSuccess && data) {
      setAuthUser(data)
      setIsUserLoading(false)
    }
  }, [isSuccess, data, setAuthUser])

  useEffect(() => {
    if (isError && error) {
      logout()
      setIsUserLoading(false)
    }
  }, [isError, error, logout])

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <AppointmentModalProvider>
        <Router>
          <ScrollToTop />
          <AppointmentModalWrapper />
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              <Route element={<UnauthorizedPage />} path={ROUTES.UNAUTHORIZED} />
              <Route element={<DefaultLayout />}>
                <Route index element={<HomePage />} path={ROUTES.HOME} />
                <Route element={<ServicesPage />} path={ROUTES.SERVICES} />
                <Route
                  element={<AppointmentPage />}
                  path={ROUTES.APPOINTMENT}
                />
                <Route
                  element={<ProtectedRoute allowedRoles={[USER_ROLES.CLIENT]} />}
                >
                  <Route element={<ProfilePage />} path={ROUTES.PROFILE}>
                    <Route
                      element={<ProfileAccountDetails />}
                      path={ROUTES.PROFILE_ACCOUNT_DETAILS}
                    />
                    <Route
                      element={<ProfilePets />}
                      path={ROUTES.PROFILE_PETS}
                    />
                    <Route
                      element={<ProfileAppointments />}
                      path={ROUTES.PROFILE_APPOINTMENTS}
                    />
                  </Route>
                </Route>
              </Route>
              <Route element={<AuthLayout />}>
                <Route element={<LoginPage />} path={ROUTES.LOGIN} />
                <Route
                  element={<RegistrationPage />}
                  path={ROUTES.REGISTRATION}
                />
              </Route>
              <Route
                element={<ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]} />}
              >
                <Route element={<AdminPage />} path={ROUTES.ADMIN}>
                  <Route
                    element={<AdminSpeciesPage />}
                    path={ROUTES.ADMIN_SPECIES}
                  />
                  <Route
                    element={<AdminBreedsPage />}
                    path={ROUTES.ADMIN_BREEDS}
                  />
                  <Route
                    element={<AdminServicesPage />}
                    path={ROUTES.ADMIN_SERVICES}
                  />
                  <Route
                    element={<AdminVetsPage />}
                    path={ROUTES.ADMIN_VETS}
                  />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </AppointmentModalProvider>



      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  )
}