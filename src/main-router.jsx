import { createBrowserRouter } from 'react-router-dom';
import MainPage from './routes/page';
import SignupPage from './routes/signup/page';

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
]);

export default router;
