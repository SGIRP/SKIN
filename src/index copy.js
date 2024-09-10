import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider} from 'react-query';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Pages/Account/signin';
import MainLayout from './Layouts/MainLayout';
import Recover from './Pages/Account/recoverpassword';
import Menu from './Pages/Menu';
import CreateUser from './Pages/User/create';
import ListUser from './Pages/User/list';
import EditUser from './Pages/User/edit';
import LogData from './Pages/History';
import MeuPerfil from './Pages/User/meu-perfil';
import EditPerfil from './Pages/User/editar-meu-perfil';

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
    element: <MainLayout/>,
    children:[
      {
        path: '/',
        element: <Menu/>
      },
      {
        path: '/usuarios/novo',
        element: <CreateUser/>
      },
      {
        path: '/usuarios',
        element: <ListUser/>
      },
      {
        path: '/usuarios/editar/:id',
        element: <EditUser/>
      },
      {
        path: '/historico',
        element: <LogData/>
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
  },
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
