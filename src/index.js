import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {QueryClient, QueryClientProvider} from 'react-query';
import Login from './Pages/Account/signin';
import MainLayout from './Layouts/MainLayout';
import Recover from './Pages/Account/recoverpassword';
import Menu from './Pages/Menu';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MeuPerfil from './Pages/User/meu-perfil';
import EditPerfil from './Pages/User/editar-meu-perfil';
import GestaoMenu from './Pages/Menu/menu';
import Marcacao from './Pages/Marcacao/marcacao';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/account/login',
    element: <Login />
  },
  {
    path: '/account/resetpass',
    element: <Recover />
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Menu />
      },
      {
        path: '/menu',
        element: <GestaoMenu />
      },
      {
        path:'/marcacoes',
        element: <Marcacao />
      },
      {
        path: '/meu-perfil',
        element: <MeuPerfil/>
      },
      {
        path: '/editar-perfil',
        element: <EditPerfil/>
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
