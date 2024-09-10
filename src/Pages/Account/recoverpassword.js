// src/Login.js
import axios from 'axios';
import 'antd/dist/reset.css';
import React from 'react';
import { useState } from 'react';
import { Form, Input, Button, notification, Divider, Steps, Result } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { DatePicker, Upload, Select } from 'antd';
import countries from 'i18n-iso-countries';
import portuguese from 'i18n-iso-countries/langs/pt.json';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const { Option } = Select;

const Recover = () => {
  const navigate = useNavigate()
  countries.registerLocale(portuguese);
  const countryNames = countries.getNames('pt');
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();

  const handleSubmit = async (e) => {
    navigate('/')
  };

  const provinces = [
    {
      id: '1',
      name: 'Maputo',
      country: 'Moçambique',
    },
    {
      id: '2',
      name: 'Matola',
      country: 'Moçambique',
    },
    {
      id: '3',
      name: 'Gaza',
      country: 'Moçambique',
    },
    {
      id: '4',
      name: 'Inhambane',
      country: 'Moçambique',
    },
    {
      id: '5',
      name: 'Sofala',
      country: 'Moçambique',
    },
    {
      id: '6',
      name: 'Manica',
      country: 'Moçambique',
    },
    {
      id: '7',
      name: 'Tete',
      country: 'Moçambique',
    },
    {
      id: '8',
      name: 'Zambezia',
      country: 'Moçambique',
    },
    {
      id: '9',
      name: 'Nampula',
      country: 'Moçambique',
    },
    {
      id: '10',
      name: 'Cabo Delgado',
      country: 'Moçambique',
    },
    {
      id: '11',
      name: 'Niassa',
      country: 'Moçambique',
    },
  ]

  const institutions = [
    {
      id: '1',
      name: 'Universidade Eduardo Mondlane',
      country: 'Moçambique',
    },
    {
      id: '2',
      name: 'Universidade Pedagógica',
      country: 'Moçambique',
    },
    {
      id: '3',
      name: 'Universidade Católica de Moçambique',
      country: 'Moçambique',
    },
  ]

  return (
    <CSSTransition in={true} appear={true} timeout={300} classNames="fade">
      <div className='mx-auto' style={{ minHeight: '100vh', backgroundColor: 'white', maxWidth:'1400px' }}>
        <div style={{ backgroundColor: 'white' }}>
          <div className='flex flex-col w-full'>
            <div className='p-2 sm:px-4 md:px-10 mb-1 py-3 flex gap-1 items-center bg-white flex-row'>
              <img src={require('../../assets/logo/ins.png')} className="w-16 h-16 md:w-20 md:h-20 lg:w-20 lg:h-20" style={{ marginTop: 5 }} />
              <Divider type="vertical" style={{ height: '85px', borderWidth: '1.5px', borderColor: '#047D4B' }} className="" />
              <div className="flex flex-col w-full md:w-auto">
                <div className="text-lg md:text-xl lg:text-2xl font-bold " style={{ color: '#047D4B' }}>Plataforma de Gestão de Resumos</div>
                <div className="text-sm md:text-base lg:text-lg font-semibold text-gray-500">Instituto Nacional de Saúde</div>
              </div>
            </div>
          </div>
          <div className='w-full px-4 sm:px-10'>
            <div className="flex flex-row w-full px-4 py-1 border-b-2 border-gray-500 border-t-2">
              <div className="flex flex-row w-full justify-left items-center gap-3">
                {localStorage.getItem('type') == '2' && (
                  <FaArrowLeft size={20} color="black" />
                )}
                <div className='text-base sm:text-lg font-bold' style={{ color: 'black' }}>Recuperar Password</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full px-4 py-4 sm:px-10">
          <div className='px-4 sm:px-10 py-5 w-full mb-10' style={{ border: '1px solid #f0f0f0', overflow: 'hidden' }}>
            <div className='hidden sm:block'>
              <Steps
                size="small"
                current={currentStep}
                direction='horizontal'
                items={[
                  {
                    title:
                      <span
                        className="hidden sm:inline cursor-pointer"
                        onClick={() => setCurrentStep(0)}
                      >
                        Email
                      </span>,
                  },
                  {
                    title:
                      <span
                        className="hidden sm:inline"
                      >
                        Código de Confirmação
                      </span>,
                  },
                  {
                    title:
                      <span
                        className="hidden sm:inline"
                      >
                        Nova Senha
                      </span>,
                  },
                  {
                    title:
                      <span
                        className="hidden sm:inline"
                      >
                        Concluído
                      </span>,
                  },
                ]}
              />
            </div>
            <div className="sm:hidden">
              <h2 className="text-center text-lg font-bold mb-3">
                {currentStep === 0 && 'Email'}
                {currentStep === 1 && 'Código de Confirmação'}
                {currentStep === 2 && 'Nova Senha'}
                {currentStep === 3 && 'Concluído'}
              </h2>
            </div>

            {currentStep === 0 && (
              <div className='w-full'>
                <p className="text-center text-sm sm:text-sm font-semibold mb-4 mt-4 sm:px-28" style={{ color: 'black' }}>Insira o seu email para recuperar a sua senha</p>
                <Form.Item
                  name="email"
                  className='w-full sm:w-1/4 mx-auto mb-4'
                  rules={[{ required: true, message: 'Por favor insira o seu email' }]}
                >
                  <Input placeholder='Insira o seu Email' />
                </Form.Item>
                <Form.Item
                  className="flex justify-center mb-4 w-full sm:w-1/4 mx-auto"
                >
                  <Button
                    htmlType="submit"
                    loading={loading}
                    className='bg-blue-600 w-full text-white font-bold m-0 flex-row items-center flex justify-center gap-2 px-5'
                    onClick={() => setCurrentStep(1)}
                  >
                    Continuar
                    <FaArrowRight size={18} color="white" />
                  </Button>
                </Form.Item>
              </div>

            )}
            {currentStep === 1 && (
              <div className='w-full'>
                <p className="text-center text-sm sm:text-sm font-semibold mb-4 mt-4 sm:px-28" style={{ color: 'black' }}>Enviamos um código de confirmação para o seu email. Por favor insira o código para confirmar o seu email</p>
                <Form.Item
                  name="confirmationCode"
                  className='w-full sm:w-1/4 mx-auto mb-4'
                  rules={[{ required: true, message: 'Por favor insira o código de confirmação' }]}
                >
                  <Input placeholder='Insira o Código de Confirmação' />
                </Form.Item>
                <Form.Item
                  className="flex justify-center mb-4 w-full sm:w-1/4 mx-auto"
                >
                  <Button
                    htmlType="submit"
                    loading={loading}
                    className='bg-blue-600 w-full text-white font-bold m-0 flex-row items-center flex justify-center gap-2 px-5'
                    onClick={() => setCurrentStep(2)}
                  >
                    Continuar
                    <FaArrowRight size={18} color="white" />
                  </Button>
                </Form.Item>
                <p className='flex flex-row justify-center cursor-pointer gap-2 text-center w-full mt-0'>
                  <a className="text-sm sm:text-sm text-blue-600">Reenviar Código</a>
                </p>
              </div>
            )}
            {currentStep === 2 && (
              <div className='w-full'>
                <p className="text-center text-sm sm:text-sm font-semibold mb-4 mt-4 sm:px-28" style={{ color: 'black' }}>Insira a sua nova senha</p>
                <Form.Item
                  name="password"
                  className='w-full sm:w-1/4 mx-auto mb-4'
                  rules={[{ required: true, message: 'Por favor insira a sua nova senha' }]}
                >
                  <Input.Password placeholder='Insira a sua nova senha' />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  className='w-full sm:w-1/4 mx-auto mb-4'
                  rules={[{ required: true, message: 'Por favor confirme a sua nova senha' }]}
                >
                  <Input.Password placeholder='Confirme a sua nova senha' />
                </Form.Item>
                <Form.Item
                  className="flex justify-center mb-4 w-full sm:w-1/4 mx-auto"
                >
                  <Button
                    htmlType="submit"
                    loading={loading}
                    className='bg-blue-600 w-full text-white font-bold m-0 flex-row items-center flex justify-center gap-2 px-5'
                    onClick={() => setCurrentStep(3)}
                  >
                    Continuar
                    <FaArrowRight size={18} color="white" />
                  </Button>
                </Form.Item>
              </div>

            )}
            {currentStep === 3 && (
              <Result
                className='p-0 mt-4'
                status="success"
                title="Recuperação de Senha Concluída"
                subTitle="Agora pode fazer login na plataforma"
                extra={[
                  <Button className='bg-blue-500 text-white' key="console" onClick={() => navigate('/account/login')}>
                    Login
                  </Button>
                ]}
              />
            )}
          </div>
        </div>

      </div>
    </CSSTransition>
  );
};

export default Recover;
