import PortfolioPage from '@/pages/PortfolioPage/PortfolioPage'
import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout/MainLayout'
import ScrollToTop from '../utils/scrollToTop'

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
    return (
        <>
            <ScrollToTop />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route exact path='/' element={<HomePage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/signup' element={<SignupPage />} />
                        <Route path='/feedback' element={<FeedbackPage />} />
                        <Route
                            path='/request-otp'
                            element={<RequestOtpPage />}
                        />
                        <Route path='/verify-otp' element={<VerifyOTPPage />} />
                        <Route
                            path='/change-password'
                            element={<ChangePasswordPage />}
                        />
                        <Route
                            path='/portfolio/:username'
                            element={<PortfolioPage />}
                        />
                        <Route
                            path='/project-input-form'
                            element={<ProjectDetailsInputFormComponent />}
                        />
                        <Route
                            path='/:username/:projectSlug'
                            element={<ProjectDetailsPage />}
                        />
                        <Route
                            path='/update-profile'
                            element={<UpdateProfileComponent />}
                        />
                    </Route>

                    <Route path='/*' element={<div>Error Page</div>} />
                </Routes>
            </Suspense>
        </>
    )
}

export default AppRoutes
