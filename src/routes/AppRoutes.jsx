import UpdateProfileComponent from '@/components/UpdateProfileComponent/UpdateProfileComponent'
import FeedbackPage from '@/pages/FeedbackPage/FeedbackPage'
import PublicProfilePage from '@/pages/PortfolioPage/PortfolioPage'
import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProjectDetailsInputFormComponent from '../components/ProjectDetailsInputFormComponent/ProjectDetailsInputFormComponent'
import AccountLayout from '../layouts/AccountLayout/AccountLayout'
import MainLayout from '../layouts/MainLayout/MainLayout'
import ChangePasswordPage from '../pages/ChangePasswordPage/ChangePasswordPage'
import HomePage from '../pages/HomePage/HomePage'
import LoginPage from '../pages/LoginPage/LoginPage'
import ProjectDetailsPage from '../pages/ProjectDetailsPage/ProjectDetailsPage'
import RequestOtpPage from '../pages/RequestOtpPage/RequestOtpPage'
import SignupPage from '../pages/SignupPage/SignupPage'
import VerifyOTPPage from '../pages/VerifyOTPPage/VerifyOTPPage'
import ScrollToTop from '../utils/scrollToTop'
import PortfolioPage from '@/pages/PortfolioPage/PortfolioPage'

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

                        {/* STRICTLY FOR DEVELOPMENT PURPOSE ONLY , DELETE BEFORE COMMITTING */}
                        <Route
                            path='/aboutus'
                            element={<PortfolioPage />}
                        />
                        {/* STRICTLY FOR DEVELOPMENT PURPOSE ONLY , DELETE BEFORE COMMITTING */}

                        <Route
                            path='/request-otp'
                            element={<RequestOtpPage />}
                        />
                        <Route path='/verify-otp' element={<VerifyOTPPage />} />
                        <Route
                            path='/change-password'
                            element={<ChangePasswordPage />}
                        />
                        <Route path='/account' element={<AccountLayout />}>
                            <Route
                                index
                                path=''
                                element={<Navigate to={'my-profile'} replace />}
                            />
                            <Route
                                path='my-profile'
                                element={<div>My Profile</div>}
                            />
                            <Route
                                path='my-projects'
                                element={<div>My Projects</div>}
                            />
                        </Route>
                        <Route
                            path='/project-input-form'
                            element={<ProjectDetailsInputFormComponent />}
                        />
                        <Route
                            path='/project-details'
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
