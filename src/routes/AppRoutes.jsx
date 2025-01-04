import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import SignupPage from '../pages/SignupPage/SignupPage'
import RequestOtpPage from '../pages/RequestOTPPage/RequestOTPPage'
import HomePage from '../pages/HomePage/HomePage'
import MainLayout from '../layouts/MainLayout/MainLayout'
import VerifyOTPPage from '../pages/VerifyOTPPage/VerifyOTPPage'
import ChangePasswordPage from '../pages/ChangePasswordPage/ChangePasswordPage'

const AppRoutes = () => {
    return (
        <>
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
                        <Route path='/verify-otp' element={<VerifyOTPPage/>}/>
                        <Route path='/change-password' element={<ChangePasswordPage/>}/>
                    </Route>
                    <Route path='/*' element={<div>Error Page</div>} />
                </Routes>
            </Suspense>
        </>
    )
}

export default AppRoutes
