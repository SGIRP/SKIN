import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaNotesMedical, FaPlus } from 'react-icons/fa';
import { MdPeople } from 'react-icons/md';
import { Input, Button, Menu, Space, Table, Divider, notification, Modal, Collapse, List, Form } from 'antd';
import { PlusOutlined, EditOutlined, CloseOutlined, LockOutlined } from '@ant-design/icons';
import NovoUser from '../../Components/User/NovoUser';
import EditarUser from '../../Components/User/EditarUser';

const { Panel } = Collapse;

function ProfileLayout() {
  const navigate = useNavigate();
  const [modalPass, setModalPass] = useState(null)
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    localStorage.setItem('title', 'Meu Perfil');
    localStorage.setItem('type', '2');
  }, [])

  return (
    <div className='flex flex-col gap-4'>
      <div className="flex flex-col bg-white rounded-lg p-2 sm:p-4">
        <p className="text-lg font-bold m-0 p-0">Informações</p>
        <Divider className='my-2' />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm m-0 p-0">Nome</p>
            <Input className='w-full' value='Nome do Usuário' disabled />
          </div>
          <div>
            <p className="text-sm m-0 p-0">Genéro</p>
            <Input className='w-full' value='Genéro' disabled />
          </div>
          <div>
            <p className="text-sm m-0 p-0">Data de Nascimento</p>
            <Input className='w-full' value='Data' disabled />
          </div>
          <div>
            <p className="text-sm m-0 p-0">Nacionalidade</p>
            <Input className='w-full' value='Nacionalidade' disabled />
          </div>
          <div>
            <p className="text-sm m-0 p-0">Província</p>
            <Input className='w-full' value='Província' disabled />
          </div>
          <div>
            <p className="text-sm m-0 p-0">Distrito</p>
            <Input className='w-full' value='Distrito' disabled />
          </div>
          <div>
            <p className="text-sm m-0 p-0">Instituição</p>
            <Input className='w-full' value='Instituição' disabled />
          </div>
          <div>
            <p className="text-sm m-0 p-0">Profissão</p>
            <Input className='w-full' value='Profissão' disabled />
          </div>
          <div>
            <p className="text-sm m-0 p-0">Contacto</p>
            <Input className='w-full' value='Contacto' disabled />
          </div>
          <div>
            <p className="text-sm m-0 p-0">Email</p>
            <Input className='w-full' value='Email' disabled />
          </div>
        </div>
        <div className="flex flex-row mt-5 gap-2">
          {/*<Button
            type="primary"
            icon={<EditOutlined />}
            className="flex items-center text-white font-bold ml-auto"
            style={{ backgroundColor: '#047D4B' }}
          >
            Editar
  </Button>*/}
          <Button
            type="primary"
            icon={<EditOutlined />}
            className="flex items-center text-white font-bold ml-auto"
            style={{ backgroundColor: '#047D4B' }}
            onClick={() => setModalPass(true)}
          >
            Alterar Senha
          </Button>
        </div>
        <Modal
          title="Alterar Password"
          visible={modalPass}
          onCancel={() => setModalPass(null)}
          width={500}
          footer={null}
        >
          <Form
            layout="vertical"
            form={form}
            onFinish={null}
          >
            <Form.Item
              name="novaPassword"
              label="Nova Password"
              rules={[{ required: true, message: 'Por favor insira a password' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirme a Password"
              rules={[{ required: true, message: 'Por favor insira a password' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button htmlType="submit" loading={loading} className='bg-blue-600 text-white font-bold'>
                Confirmar
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default ProfileLayout;