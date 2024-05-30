import { createBrowserRouter } from 'react-router-dom';
import MainPage from './routes/page';
import SignupPage from './routes/signup/page';
import LoginPage from './routes/login/page';
import ProfileLayout from './routes/profile/layout';
import ProfilePage from './routes/profile/page';
import GardenPage from './routes/garden/page';
import GardenInsidePage from './routes/garden/inside/page';
import WebRtcProvider from './components/webRtcProvider';
import InfoPage from './routes/info/page';

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
                path: '',
                element: <ProfilePage />,
                index: true,
            },
        ],
    },
    {
        path: '/garden',
        element: <GardenPage />,
    },
    {
        path: '/garden/inside',
        element: <GardenInsidePage />,
    },
    {
        path: '/info',
        element: <InfoPage />,
    },
]);

export default router;
