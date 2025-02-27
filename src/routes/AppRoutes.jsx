import PortfolioPage from '@/pages/PortfolioPage/PortfolioPage'
import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout/MainLayout'
import ScrollToTop from '../utils/scrollToTop'
import AuthenticationFlowRoute from './AuthenticationFlowRoute'
import ProtectedRoute from './ProtectedRoute' // ✅ Import protected route
import useUserContext from '@/hooks/useUserContext'

// Lazy load pages
const LazyComponent = (Component) => (
    <Suspense fallback={<div>Loading...</div>}>
        <Component />
    </Suspense>
)

const HomePage = lazy(() => import('../pages/HomePage/HomePage'))
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'))
const SignupPage = lazy(() => import('../pages/SignupPage/SignupPage'))
const FeedbackPage = lazy(() => import('@/pages/FeedbackPage/FeedbackPage'))
const RequestOtpPage = lazy(() =>
    import('../pages/RequestOtpPage/RequestOtpPage')
)
const VerifyOTPPage = lazy(() => import('../pages/VerifyOTPPage/VerifyOTPPage'))
const ChangePasswordPage = lazy(() =>
    import('../pages/ChangePasswordPage/ChangePasswordPage')
)
const ProjectDetailsPage = lazy(() =>
    import('../pages/ProjectDetailsPage/ProjectDetailsPage')
)
const ProjectDetailsInputFormComponent = lazy(() =>
    import(
        '../components/ProjectDetailsInputFormComponent/ProjectDetailsInputFormComponent'
    )
)
const UpdateProfileComponent = lazy(() =>
    import('@/components/UpdateProfileComponent/UpdateProfileComponent')
)

const AppRoutes = () => {
    const { isAuthenticated } = useUserContext()

    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route element={<MainLayout />}>
                    <Route exact path='/' element={LazyComponent(HomePage)} />
                    <Route path='/login' element={LazyComponent(LoginPage)} />
                    <Route path='/signup' element={LazyComponent(SignupPage)} />
                    <Route
                        path='/feedback'
                        element={LazyComponent(FeedbackPage)}
                    />

                    {/* OTP Authentication Flow */}
                    <Route
                        path='/request-otp'
                        element={LazyComponent(RequestOtpPage)}
                    />
                    <Route
                        path='/verify-otp'
                        element={
                            <AuthenticationFlowRoute
                                requiredState={{ email: true }}
                                redirectPath='/request-otp'>
                                {LazyComponent(VerifyOTPPage)}
                            </AuthenticationFlowRoute>
                        }
                    />
                    <Route
                        path='/change-password'
                        element={
                            <AuthenticationFlowRoute
                                requiredState={{ email: true }}
                                redirectPath='/verify-otp'>
                                {LazyComponent(ChangePasswordPage)}
                            </AuthenticationFlowRoute>
                        }
                    />

                    {/* Protected Routes (Require Authentication) */}
                    <Route
                        path='/portfolio/:username'
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                {LazyComponent(PortfolioPage)}
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/update-profile'
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                {LazyComponent(UpdateProfileComponent)}
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/project-input-form'
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                {LazyComponent(
                                    ProjectDetailsInputFormComponent
                                )}
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/:username/:projectSlug'
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                {LazyComponent(ProjectDetailsPage)}
                            </ProtectedRoute>
                        }
                    />
                </Route>

                <Route path='/*' element={<div>Error Page</div>} />
            </Routes>
        </>
    )
}

export default AppRoutes
