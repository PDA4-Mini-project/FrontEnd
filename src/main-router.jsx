import { createBrowserRouter } from 'react-router-dom';
import MainPage from './routes/page';
import SignupPage from './routes/signup/page';
import LoginPage from './routes/login/page';

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
]);

export default router;
