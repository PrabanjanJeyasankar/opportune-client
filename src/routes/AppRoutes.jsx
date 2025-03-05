import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import useUserContext from "@/hooks/useUserContext";
import PortfolioPage from "@/pages/PortfolioPage/PortfolioPage";
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import ScrollToTop from "../utils/scrollToTop";
import AuthenticationFlowRoute from "./AuthenticationFlowRoute";
import ProtectedRoute from "./ProtectedRoute";

const LazyComponent = (Component) => {
    const WrappedComponent = () => <Component />;

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {process.env.NODE_ENV === "production" ? (
                <ErrorBoundary>
                    <WrappedComponent />
                </ErrorBoundary>
            ) : (
                <WrappedComponent />
            )}
        </Suspense>
    );
};

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const SignupPage = lazy(() => import("../pages/SignupPage/SignupPage"));
const FeedbackPage = lazy(() => import("@/pages/FeedbackPage/FeedbackPage"));
const RequestOtpPage = lazy(() =>
    import("../pages/RequestOtpPage/RequestOtpPage")
);
const VerifyOTPPage = lazy(() =>
    import("../pages/VerifyOTPPage/VerifyOTPPage")
);
const ChangePasswordPage = lazy(() =>
    import("../pages/ChangePasswordPage/ChangePasswordPage")
);
const ProjectDetailsPage = lazy(() =>
    import("../pages/ProjectDetailsPage/ProjectDetailsPage")
);
const ProjectDetailsInputFormComponent = lazy(() =>
    import(
        "../components/ProjectDetailsInputFormComponent/ProjectDetailsInputFormComponent"
    )
);
const UpdateProfileComponent = lazy(() =>
    import("@/components/UpdateProfileComponent/UpdateProfileComponent")
);
const EditProjectComponent = lazy(() =>
    import("@/components/EditProjectComponent/EditProjectComponent")
);

const AppRoutes = () => {
    const { isUserLoggedIn } = useUserContext();

    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route element={<MainLayout />}>
                    <Route exact path="/" element={LazyComponent(HomePage)} />
                    <Route path="/login" element={LazyComponent(LoginPage)} />
                    <Route path="/signup" element={LazyComponent(SignupPage)} />

                    <Route
                        path="/feedback"
                        element={LazyComponent(FeedbackPage)}
                    />

                    {/* OTP Authentication Flow */}
                    <Route
                        path="/request-otp"
                        element={LazyComponent(RequestOtpPage)}
                    />
                    <Route
                        path="/verify-otp"
                        element={
                            <AuthenticationFlowRoute
                                requiredState={{ email: true }}
                                redirectPath="/request-otp"
                            >
                                {LazyComponent(VerifyOTPPage)}
                            </AuthenticationFlowRoute>
                        }
                    />
                    <Route
                        path="/change-password"
                        element={
                            <AuthenticationFlowRoute
                                requiredState={{ email: true }}
                                redirectPath="/verify-otp"
                            >
                                {LazyComponent(ChangePasswordPage)}
                            </AuthenticationFlowRoute>
                        }
                    />

                    <Route
                        path="/portfolio/:username"
                        element={LazyComponent(PortfolioPage)}
                    />
                    <Route
                        path="/update-profile"
                        element={
                            // <ProtectedRoute isAuthenticated={isUserLoggedIn}>
                            //     {LazyComponent(UpdateProfileComponent)}
                            // </ProtectedRoute>
                            <UpdateProfileComponent />
                        }
                    />
                    <Route
                        path="/new"
                        element={
                            <ProtectedRoute isAuthenticated={isUserLoggedIn}>
                                {LazyComponent(
                                    ProjectDetailsInputFormComponent
                                )}
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/:username/:projectSlug"
                        element={LazyComponent(ProjectDetailsPage)}
                    />

                    <Route
                        path="/edit-project/:slug"
                        element={
                            <ProtectedRoute isAuthenticated={isUserLoggedIn}>
                                {LazyComponent(EditProjectComponent)}
                            </ProtectedRoute>
                        }
                    />
                </Route>
                <Route path="/*" element={<div>Error Page</div>} />
            </Routes>
        </>
    );
};

export default AppRoutes;
