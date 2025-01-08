import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import SignupPage from '../pages/SignupPage/SignupPage'
import HomePage from '../pages/HomePage/HomePage'
import MainLayout from '../layouts/MainLayout/MainLayout'
import VerifyOTPPage from '../pages/VerifyOTPPage/VerifyOTPPage'
import ChangePasswordPage from '../pages/ChangePasswordPage/ChangePasswordPage'
import RequestOtpPage from '../pages/RequestOtpPage/RequestOtpPage'
import AccountLayout from '../layouts/AccountLayout/AccountLayout'
import ProjectDetailsInputFormComponent from '../components/ProjectDetailsInputFormComponent/ProjectDetailsInputFormComponent'
import ProjectDetailsValidationFrom from '../utils/ProjectDetailsValidationFrom'
import ProjectDetailsPage from '../pages/ProjectDetailsPage/ProjectDetailsPage'
import ScrollToTop from '../utils/scrollToTop'

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
                    </Route>

                    <Route path='/*' element={<div>Error Page</div>} />
                </Routes>
            </Suspense>
        </>
    )
}

export default AppRoutes
