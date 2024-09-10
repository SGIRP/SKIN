import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Divider, Dropdown, Layout, Menu } from 'antd';
import { Outlet } from 'react-router-dom';
import { useNavigate, useRoutes, useLocation } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaArrowLeft, FaCaretDown } from 'react-icons/fa';
import { Modal } from 'antd';
import {
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { MdPeople } from 'react-icons/md';
import { router } from '../index';
import '../Components/css/forms.css'
const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const MainLayout = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTitle(localStorage.getItem('title'));
    /*if (sessionStorage.getItem('token') == null) {
      navigate('/account/login');
    } else {
      setVisible(true);
    }*/
  }, [location.pathname]);

  const goLogout = () => {
    sessionStorage.clear();
    navigate('/account/login');
  }

  const goBack = () => {
    navigate(-1);
  }

  const menu = (
    <Menu>
      <Menu.Item disabled>
        <div className="flex flex-col items-center gap-2">
          <FaUser color='#047D4B' size={20} />
          <span className='text-black'>{JSON.parse(sessionStorage.getItem('user'))?.nome}</span>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={<UserOutlined />}>
        <a onClick={() => navigate('/meu-perfil')}>
          Meu Perfil
        </a>
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />}>
        <a onClick={() => setModalVisible(true)}>
          Terminar sessão
        </a>
      </Menu.Item>
    </Menu>
  );

  return (<>
    {visible && (
      <Layout className='mx-auto' style={{ minHeight: '100vh', backgroundColor: 'white', maxWidth: '1200px' }}>
        <Layout style={{ backgroundColor: 'white' }}>
          <div style={{ position: 'sticky', top: 0, zIndex: 999, backgroundColor: 'white' }}>

            <div className='flex flex-row justify-between'>

              <div className='mb-0 py-2 flex gap-1 items-center bg-white flex-row'>
                <img src={require('../assets/logo/logo-v2.png')} className="w-16 md:w-16" style={{ marginTop: 5 }} />
                <Divider type="vertical" style={{ height: '85px', borderWidth: '1.5px', borderColor: '#047D4B' }} className="" />
                <div className="flex flex-col justify-center gap-1">
                  <img src={require('../assets/logo/logoGirp.jpg')} className="w-16 md:w-24" style={{ marginTop: 5 }} />
                  <div className="text-sm md:text-lg font-semibold text-gray-500">SISTEMA DE GESTÃO INTEGRADA DA RECEITA PRÓPRIA</div>
                </div>
              </div>

              <div className="flex flex-row justify-between">
                <Dropdown overlay={menu} trigger={['click']}>
                  <a className="ant-dropdown-link flex flex-row items-center px-1 gap-2 rounded-md cursor-pointer" onClick={e => e.preventDefault()}>
                    <div className='flex flex-row gap-2 items-center'>
                      {sessionStorage.getItem('profile') ? <img src={sessionStorage.getItem('profile')} className='w-8 h-8 rounded-full' /> : <FaUser size={20} color='#6c7072' />}
                      <span className='text'>{JSON.parse(sessionStorage.getItem('user'))?.username}</span>
                      <FaCaretDown color='#6c7072' size={15} />
                    </div>
                  </a>
                </Dropdown>
              </div>

            </div>

            <div className='w-full'>
              <div className="flex flex-row w-full justify-between px-4 py-1 border-b-2 border-gray-500 border-t-2">
                <div className="flex flex-row justify-left items-center gap-3">
                  {localStorage.getItem('type') == '2' && (
                    <FaArrowLeft size={20} color="black" onClick={goBack} />
                  )}
                  <div className='text-base sm:text-lg font-bold' style={{ color: 'black' }}>{title}</div>
                </div>

              </div>
            </div>
            <Modal
              title="Sair do sistema"
              centered
              visible={modalVisible}
              onOk={() => goLogout()}
              onCancel={() => setModalVisible(false)}
              okButtonProps={{ danger: true }}
            >
              <p>Deseja sair do sistema?</p>
            </Modal>
          </div>
          <div className="flex w-full py-3">
            <Content className="p-2 rounded-md" style={{ border: '1px solid #f0f0f0', overflow: 'hidden' }} >
              <Outlet />
            </Content>
          </div>
          <div className='w-full'>
            <div className="flex flex-row w-full px-4 py-2 border-b-2 border-gray-500 border-t-2 mb-4">
              <div className="flex flex-row justify-between">
                <div className='text-xs sm:text-xs font-bold' style={{ color: 'black' }}>Copyright © 2024 UEM - Todos Direitos Reservados </div>
              </div>
              <div className="flex flex-row justify-between ml-auto">
                <div className="text-xs font-bold mr-2 hidden sm:block" style={{ color: 'black' }}>Email: dfin@uem.ac.mz</div>
              </div>
            </div>
          </div>
        </Layout>
      </Layout>
    )}
  </>
  );
}

export default MainLayout;
