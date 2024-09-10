// src/Login.js
import axios from 'axios';
import 'antd/dist/reset.css';
import React from 'react';
import { Form, Input, Button, notification, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getProfilePicture } from '../../API/StaticGetters';

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)

  const submit = useMutation({
    mutationFn: (data) => {
      setLoading(true)
      return axios.post('http://127.0.0.1:8000/api/auth/', {
        username: data.username,
        password: data.password
      })
        .then(res => res.data)
    },
    onSuccess: (data) => {
      console.log(data)
      setLoading(false)
      localStorage.setItem('title', 'Bem-vindo a Plataforma');
      localStorage.setItem('type', '1');
      localStorage.setItem('url', 'http://127.0.0.1:8000/');
      if (data.groups[0].name == 'Administrador') {
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('user', JSON.stringify(data))
        sessionStorage.setItem('nuit', data.nuit)
        sessionStorage.setItem('access', data.groups[0].name)
        navigate('/')
      } else {
        notification.error({
          message: 'Erro',
          description: 'Você não tem permissão para acessar esta plataforma'
        })
      }
      getProfilePicture()
    },
    onError: (error) => {
      notification.error({
        message: 'Erro',
        description: 'Login Falhou'
      })
      setLoading(false)
    }
  })

  const handleSubmit = async (e) => {
    submit.mutate(e)
  };

  return (
    <CSSTransition in={true} appear={true} timeout={300} classNames="fade">
      <div className="flex h-screen bg-white sm:bg-gray-100">
        <div className="m-auto w-full sm:w-auto">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            className="bg-white sm:shadow-md px-8 pt-0 pb-8 sm:w-96"
            style={{ borderRadius: '15px' }}
          >
            <div className='flex flex-row justify-center items-center gap-2 mb-2 pt-6 pb-2'>
              <img src={require('../../assets/logo/logo-v2.png')} alt="logo" className="w-40 sm:w-16" />
              <Divider type="vertical" style={{ height: '100px', borderWidth: '1.5px', borderColor: 'green' }} />
              <img src={require('../../assets/logo/logoSGAL.png')} alt="logo" className="w-40 sm:w-34" />
            </div>
            <p className="text-center text-lg sm:text-lg font-bold mb-1" style={{ color: 'black' }}>SISTEMA DE GESTÃO INTEGRADA DA RECEITA PRÓPRIA</p>
            <p className="text-center text-sm sm:text-sm " style={{ color: 'black' }}>INTRODUZA AS CREDENCIAIS DE ACESSO</p>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Introduza o seu nome de usuário!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Usuário"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Introduza a sua senha!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item className='my-2 p-0'>
              <Button loading={loading} style={{ background: '#047D4B', margin: 0 }} className='text-white' htmlType="submit" block>
                Entrar
              </Button>
            </Form.Item>
            {/*<p className='flex flex-row justify-center gap-2 text-center w-full mt-5'>
              <a className="text-sm sm:text-sm" style={{ color: '#047D4B' }} onClick={() => navigate('/account/resetpass')}>Recuperar Senha</a>
            </p>*/}
          </Form>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Login;
