import PortfolioPage from '@/pages/PortfolioPage/PortfolioPage'
import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout/MainLayout'
import ScrollToTop from '../utils/scrollToTop'

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
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route element={<MainLayout />}>
                    <Route exact path='/' element={LazyComponent(HomePage)} />
                    <Route path='/login' element={LazyComponent(LoginPage)} />
                    <Route path='/signup' element={LazyComponent(SignupPage)} />
                    <Route path='/feedback' element={LazyComponent(FeedbackPage)} />
                    <Route path='/request-otp' element={LazyComponent(RequestOtpPage)} />
                    <Route path='/verify-otp' element={LazyComponent(VerifyOTPPage)} />
                    <Route path='/change-password' element={LazyComponent(ChangePasswordPage)} />
                    <Route path='/portfolio/:username' element={LazyComponent(PortfolioPage)} />
                    <Route path='/project-input-form' element={LazyComponent(ProjectDetailsInputFormComponent)} />
                    <Route path='/:username/:projectSlug' element={LazyComponent(ProjectDetailsPage)} />
                    <Route path='/update-profile' element={LazyComponent(UpdateProfileComponent)} />
                </Route>

                <Route path='/*' element={<div>Error Page</div>} />
            </Routes>
        </>
    )
}

export default AppRoutes
