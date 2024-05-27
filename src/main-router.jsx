import { createBrowserRouter } from 'react-router-dom';
import MainPage from './routes/page';
import SignupPage from './routes/signup/page';
import LoginPage from './routes/login/page';
import ProfileLayout from './routes/profile/layout';
import ProfilePage from './routes/profile/page';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
        index: true,
    },
    {
        path: '/signup',
        element: <SignupPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/profile',
        element: <ProfileLayout />,
        children: [
            {
                path: "",
                element: <ProfilePage />,
                index: true
            }
        ]
    }
]);

export default router;
