import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification, Divider, Row, Col, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { getGroups, getProvinces, getUnits } from '../../API/StaticGetters';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import Password from 'antd/es/input/Password';
import { useLocation } from 'react-router-dom';
import '../../Components/css/forms.css'
const { Option } = Select

const CreateUser = (props) => {
    const navigate = useNavigate();
    const [form] = useForm();
    const [provinces, setProvinces] = useState()
    const [loading, setLoading] = useState(false)
    const [groups, setGroups] = useState([])
    const [units, setUnits] = useState([])
    const location = useLocation();
    const [typeAccess, setTypeAccess] = useState('')

    useEffect(() => {
        localStorage.setItem('title', 'Registar Usuário');
        localStorage.setItem('type', '2');
        getData()
    }, [])

    const getData = async () => {
        let estancias = []
        let data = []
        estancias = await getUnits()
        data = await getGroups('all')
        setGroups(data)
        setUnits(estancias)
    }


    const handleSave = async () => {
        try {
            setLoading(true)
            await axios.post(localStorage.getItem('url') + '/api/user/admin/',
                {
                    first_user_name: form.getFieldValue('name').split(' ')[0],
                    last_user_name: form.getFieldValue('name').split(' ').pop(),
                    doc_num: form.getFieldValue('doc_num'),
                    province: form.getFieldValue('province') || '',
                    city: form.getFieldValue('city') || '',
                    neighborhood: form.getFieldValue('neighborhood') || '',
                    number: form.getFieldValue('number') || '',
                    contact: form.getFieldValue('contact') || '',
                    password: form.getFieldValue('password'),
                    active: true,
                    email: form.getFieldValue('email'),
                    access: form.getFieldValue('access'),
                    unidade: form.getFieldValue('unidade')
                },
                {
                    headers: {
                        'Authorization': `Token ${sessionStorage.getItem('token')}`
                    }
                }).then(res => {
                    notification.success({
                        message: 'Usuário criado com sucesso'
                    })
                    navigate('/usuarios')
                }).catch(err => {
                    notification.error({
                        message: 'Erro ao criar usuário'
                    })
                })
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <div className='w-full flex flex-col px-5 py-4'>
                <Form
                    form={form}
                    name="basic"
                    initialValues={{ remember: true }}
                    style={{ width: '100%' }}
                    onFinish={handleSave}
                    className="bg-white px-6"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label={<p className='label-input'>Nome</p>}
                                labelCol={{ span: 24 }}
                                name="name"
                                className='input'
                                rules={[{ required: true, message: 'Por favor insira o seu nome!' }]}
                            >
                                <Input
                                    placeholder="Nome"
                                    style={{ borderRadius: '0px', marginTop: -10 }}
                                    className='input-form'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={<p className='label-input'>BI/NUIT</p>}
                                labelCol={{ span: 24 }}
                                name="doc_num"
                                className='input'
                                rules={[{ required: true, message: 'Por favor insira o seu BI/NUIT!' }]}
                            >
                                <Input
                                    placeholder="BI/NUIT"
                                    style={{ borderRadius: '0px', marginTop: -10 }}
                                    className='input-form'
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label={<p className='label-input'>Email</p>}
                                labelCol={{ span: 24 }}
                                name="email"
                                className='input'
                                rules={[{ required: true, message: 'Por favor insira o Email!' },
                                {
                                    type: 'email',
                                    message: 'Email inválido!'
                                },
                                {
                                    validator: (_, value) => {
                                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                        if (!emailRegex.test(value)) {
                                            return Promise.resolve()
                                        }

                                        return axios.get(localStorage.getItem('url') + `/api/user/verify/`, { params: { search: value } })
                                            .then(res => {
                                                if (res.status === 200) {
                                                    return Promise.resolve();
                                                } else {
                                                    return Promise.reject('Email em Uso!');
                                                }
                                            }).catch((error) => {
                                                if (error.response && error.response.status === 404) {
                                                    return Promise.reject('Email em Uso!');
                                                } else {
                                                    return Promise.resolve();
                                                }
                                            });
                                    }
                                }
                                ]}
                            >
                                <Input
                                    placeholder="Email"
                                    style={{ borderRadius: '0px', marginTop: -10 }}
                                    className='input-form'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={<p className='label-input'>Contacto</p>}
                                labelCol={{ span: 24 }}
                                name="contact"
                                className='input'
                                rules={[{ required: true, message: 'Por favor insira o Contacto!' },
                                { len: 9, message: 'Contacto inválido!' },
                                {
                                    validator: (_, value) => {
                                        if (value.length < 9) {
                                            return Promise.resolve()
                                        }

                                        return axios.get(localStorage.getItem('url') + `/api/user/verify/`, { params: { search: value } })
                                            .then(res => {
                                                if (res.status === 200) {
                                                    return Promise.resolve();
                                                } else {
                                                    return Promise.reject('Contacto em Uso!');
                                                }
                                            }).catch((error) => {
                                                if (error.response && error.response.status === 404) {
                                                    return Promise.reject('Contacto em Uso!');
                                                } else {
                                                    return Promise.resolve();
                                                }
                                            });
                                    }
                                }

                                ]}
                            >
                                <Input
                                    placeholder="Contacto"
                                    maxLength={9}
                                    style={{ borderRadius: '0px', marginTop: -10 }}
                                    className='input-form'
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item
                                label={<p className='label-input'>Província</p>}
                                labelCol={{ span: 24 }}
                                name="province"
                                className='input'
                            >
                                <Input
                                    placeholder="Província"
                                    style={{ borderRadius: '0px', marginTop: -10 }}
                                    className='input-form'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label={<p className='label-input'>Cidade/Distrito</p>}
                                labelCol={{ span: 24 }}
                                name="city"
                                className='input'
                            >
                                <Input
                                    placeholder="Cidade/Distrito"
                                    style={{ borderRadius: '0px', marginTop: -10 }}
                                    className='input-form'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label={<p className='label-input'>Bairro</p>}
                                labelCol={{ span: 24 }}
                                name="neighborhood"
                                className='input'
                            >
                                <Input
                                    placeholder="Bairro"
                                    style={{ borderRadius: '0px', marginTop: -10 }}
                                    className='input-form'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label={<p className='label-input'>Número</p>}
                                labelCol={{ span: 24 }}
                                name="number"
                                className='input'
                            >
                                <Input
                                    placeholder="Número"
                                    style={{ borderRadius: '0px', marginTop: -10 }}
                                    className='input-form'
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item
                                label={<p className='label-input'>Palavra-passe</p>}
                                labelCol={{ span: 24 }}
                                name="password"
                                className='input'
                                rules={[{ required: true, message: 'Por favor insira a sua palavra-passe!' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    placeholder="Password"
                                    style={{ borderRadius: '0px', marginTop: -10 }}
                                    className='input-form'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label={<p className='label-input'>Confirmar Palavra-passe</p>}
                                labelCol={{ span: 24 }}
                                name="confirm"
                                className='input'
                                rules={[{ required: true, message: 'Por favor confirme a sua palavra-passe!' },
                                {
                                    validator: (_, value) => {
                                        if (value != form.getFieldValue('password')) {
                                            return Promise.reject('As Palavras-passe não conscidem!')
                                        } else {
                                            return Promise.resolve()
                                        }
                                    }
                                }
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    placeholder="Confirmar Password"
                                    style={{ borderRadius: '0px', marginTop: -10 }}
                                    className='input-form'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label={<p className='label-input'>Tipo de Acesso</p>}
                                labelCol={{ span: 24 }}
                                name="access"
                                className='input'
                                rules={[{ required: true, message: 'Por favor insira o Acesso' }]}
                            >
                                <Select
                                    placeholder="Tipo de Acesso"
                                    style={{ borderRadius: '0px', marginTop: -10 }}
                                    className='input-form'
                                    onChange={(value) => { setTypeAccess(value) }}
                                >
                                    {groups.map((group, index) => (
                                        <Option className='text' key={index} value={group.name}>{group.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label={<p className='label-input'>Unidade</p>}
                                labelCol={{ span: 24 }}
                                className='input'
                                name="unidade"
                                rules={[{ required: true, message: 'Por favor insira a Unidade' }]}
                            >
                                <Select
                                    placeholder="Unidade"
                                    style={{ borderRadius: '0px', marginTop: -10 }}
                                    className='input-form'
                                >
                                    {units.map((group, index) => (
                                        <Option className='text' key={index} value={group.id}>{group.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item style={{ textAlign: 'right' }}>
                        <Button htmlType="submit" loading={loading} className='button-in'>
                            Registar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default CreateUser;