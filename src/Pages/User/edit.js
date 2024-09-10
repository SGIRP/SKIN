import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification, Divider, Row, Col, Select, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { getGroups, getProvinces, getUnits, getUser } from '../../API/StaticGetters';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select

const EditUser = () => {
    const navigate = useNavigate()
    const [form] = useForm();
    const [provinces, setProvinces] = useState()
    const [loading, setLoading] = useState(false)
    const [loadingData, setLoadingData] = useState(true)
    const { id } = useParams()
    const [groups, setGroups] = useState([])
    const [data, setData] = useState()
    const [typeAccess, setTypeAccess] = useState()
    const [units, setUnits] = useState()
    const location = useLocation()

    useEffect(() => {
        localStorage.setItem('title', 'Editar Usuário');
        localStorage.setItem('type', '2');
        getData()
    }, [])

    const getData = async () => {
        setLoadingData(true)
        try {
            let estancias = await getUnits()
            let grp = []
            grp = await getGroups('all')
            let data = await getUser(id)
            console.log(data)
            form.setFieldsValue({
                name: data.first_user_name + ' ' + data.last_user_name,
                email: data.email,
                contact: data.contact,
                doc_num: data.doc_num,
                province: data.province,
                city: data.city,
                neighborhood: data.neighborhood,
                number: data.number,
                access: data.groups[0].id,
                unidade: data.unidade?.id
            })
            setUnits(estancias)
            setTypeAccess(data.groups[0].name)
            setData(data)
            setGroups(grp)
        } finally {
            setLoadingData(false)
        }
    }

    const handleSave = async () => {
        try {
            setLoading(true)
            await axios.put(localStorage.getItem('url') + '/api/user/admin/',
                {
                    id: id,
                    first_user_name: form.getFieldValue('name').split(' ')[0],
                    last_user_name: form.getFieldValue('name').split(' ').pop(),
                    doc_num: form.getFieldValue('doc_num'),
                    province: form.getFieldValue('province') || '',
                    city: form.getFieldValue('city') || '',
                    neighborhood: form.getFieldValue('neighborhood') || '',
                    number: form.getFieldValue('number') || '',
                    contact: form.getFieldValue('contact') || '',
                    active: true,
                    email: form.getFieldValue('email'),
                    groups: [form.getFieldValue('access')],
                    access: form.getFieldValue('access'),
                    unidade: form.getFieldValue('unidade')
                },
                {
                    headers: {
                        'Authorization': `Token ${sessionStorage.getItem('token')}`
                    },
                    params: {
                        id: id
                    }
                }).then(res => {
                    try { if (form.getFieldValue('confirm')) resetPassword() }
                    finally {
                        notification.success({
                            message: 'Usuário actualizado com sucesso'
                        })
                        navigate(sessionStorage.getItem('main'))
                    }
                }).catch(err => {
                    notification.error({
                        message: 'Erro ao actualizar usuário'
                    })
                })
        } finally {
            setLoading(false)
        }
    }

    const resetPassword = async () => {
        if (form.getFieldValue('confirm').length >= 5) {
            axios.post(localStorage.getItem('url') + '/api/user/resetpass/', {
                email: form.getFieldValue('email'),
                password: form.getFieldValue('confirm')
            })
                .then(res => res.data)
                .then(data => {
                }).catch(error => {
                }
                )
        }
    }

    return (
        <>
            <div className='w-full flex flex-col px-5 py-4'>
                <Spin spinning={loadingData}>
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
                                    rules={[{

                                        validator: (_, value) => {
                                            if (value != form.getFieldValue('password')) {
                                                return Promise.reject('As Palavras-passe não conscidem!')
                                            } else {
                                                return Promise.resolve()
                                            }
                                        }

                                    }]}
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
                                        onChange={(value) => {
                                            setTypeAccess(groups.find(group => group.id == value).name)
                                        }}
                                    >
                                        {groups.map((group, index) => {
                                            return <Option key={index} className='text' value={group.id}>{group.name}</Option>
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                            {(typeAccess == 'Administrador da Estancia' || typeAccess == 'Agente Alfandegario') && (
                                <Col span={6}>
                                    <Form.Item
                                        label={<p className='label-input'>Estância</p>}
                                        labelCol={{ span: 24 }}
                                        className='input'
                                        name="unidade"
                                        rules={[{ required: true, message: 'Por favor insira a Estancia' }]}
                                    >
                                        <Select
                                            placeholder="Estancia"
                                            style={{ borderRadius: '0px', marginTop: -10 }}
                                            className='input-form'
                                        >
                                            {units.map((group, index) => (
                                                <Option className='text' key={index} value={group.id}>{group.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            )}
                        </Row>
                        <Form.Item style={{ textAlign: 'right' }}>
                            <Button htmlType="submit" loading={loading} className='button-in'>
                                Actualizar
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </div>
        </>
    );
};

export default EditUser;