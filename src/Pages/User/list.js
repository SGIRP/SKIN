import React, { useState, useEffect } from 'react';
import { Input, Table, notification, Divider, Modal, Button } from 'antd';
import { FaEdit, FaEye, FaToggleOn, FaToggleOff, FaPlus, FaUser } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUsers } from '../../API/StaticGetters';
import dayJS from 'dayjs';
import axios from 'axios';

const ListUser = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [modalView, setModalView] = useState(false)
    const [selectedRow, setSelectedRow] = useState([])
    const [selectedMenu, setSelectedMenu] = useState('list')
    const [search, setSearch] = useState('')
    const location = useLocation()

    useEffect(() => {
        localStorage.setItem('title', 'Usuários');
        localStorage.setItem('type', '2');
        getData()
    }, [])

    const getData = async () => {
        let dados = []
        dados = await getUsers('all')
        console.log(dados)
        setData(dados)
    }

    //Table
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Nome Completo',
            dataIndex: 'full_name',
            key: 'full_name',
            render: (text, record) => `${record.first_user_name} ${record.last_user_name}`,
            sorter: (a, b) => {
                const fullNameA = `${a.first_user_name} ${a.last_user_name}`;
                const fullNameB = `${b.first_user_name} ${b.last_user_name}`;
                return fullNameA.localeCompare(fullNameB);
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => { return a.email.localeCompare(b.email) }
        },
        {
            title: 'Contacto',
            dataIndex: 'contact',
            key: 'contact',
            sorter: (a, b) => { return a.contact.localeCompare(b.contact) }
        },
        {
            title: 'Tipo de Usuário',
            dataIndex: 'access',
            key: 'access',
            render: (text, record) => (
                <span>{record.groups.map(group => group.name).join(', ')} {record.unidade?.name}</span>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'active',
            key: 'active',
            render: (text, record) => (
                <span>
                    {record.active ? 'Activo' : 'Inactivo'}
                </span>
            )
        },
        {
            title: 'Acções',
            key: 'action',
            width: 75,
            render: (text, record) => (
                <span className='flex justify-center items-center'>
                    <a onClick={() => handleView(record)} >
                        <FaEye
                            size={17}
                            color="#047d4b"
                        />
                    </a>
                    <Divider type="vertical" />
                    <a onClick={() => goEdit(record.id)}>
                        <FaEdit
                            size={17}
                            color="#047d4b"
                        />
                    </a>
                    <Divider type="vertical" />
                    <a>
                        {record.active ?
                            <FaToggleOn
                                onClick={() => handleActive(record.id)}
                                size={17}
                                color="#047d4b"
                            />
                            :
                            <FaToggleOff
                                onClick={() => handleActive(record.id)}
                                size={17}
                                color="#047d4b"
                            />
                        }
                    </a>
                </span>
            ),
        },
    ];

    const [data, setData] = useState([])

    const handleView = (record) => {
        try {
            setSelectedRow(record)
        } finally {
            setModalView(true)
        }
    }

    const goEdit = (id) => {
        console.log(id)
        navigate('/usuarios/editar/' + id)
    }

    const handleActive = async (id) => {
        setLoading(true)
        await axios.put(localStorage.getItem('url') + '/api/user/' + id + '/',
            {
                first_user_name: data.find(item => item.id === id).first_user_name,
                last_user_name: data.find(item => item.id === id).last_user_name,
                email: data.find(item => item.id === id).email,
                contact: data.find(item => item.id === id).contact,
                function: data.find(item => item.id === id).function,
                role: data.find(item => item.id === id).role,
                groups: data.find(item => item.id === id).groups.map(group => group.id),
                active: !data.find(item => item.id === id).active
            },
            {
                headers: {
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }
            }).then(res => {
                getData()
            }
            ).catch(err => {
                notification.error({
                    message: 'Erro ao actualizar estado'
                })
            }
            ).finally(() => {
                setLoading(false)
            }
            )
    }

    const handleCreate = () => {
        navigate('/usuarios/novo')  
    }


    return (
        <>
            <div className='w-full flex flex-col px-5 py-4'>
                <div className='menu-bar'>
                    <div className={`menu-bar-item first ${selectedMenu === 'add' ? 'active' : ''}`} onClick={handleCreate}>
                        <FaPlus size={17} />
                        <p className='menu-bar-item-text'>Novo</p>
                    </div>
                    <div className={`menu-bar-item ${selectedMenu === 'list' ? 'active' : ''}`} onClick={() => setSelectedMenu('list')}>
                        <p className='menu-bar-item-text'>Usuários</p>
                    </div>
                </div>
                <Input
                    placeholder="Pesquisar"
                    style={{ borderRadius: '0px', width: '15rem' }}
                    className='input-form mb-4'
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Table size='middle'
                    dataSource={data.filter(item => item.first_user_name.toLowerCase().includes(search.toLowerCase()))}
                    columns={columns}
                    className='custom-table'
                    pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['5', '10', '15', '50', '100'] }}
                />
                <Modal
                    title={<p className='title'>DETALHES DO USUÁRIO</p>}
                    open={modalView}
                    onOk={() => setModalView(false)}
                    onCancel={() => setModalView(false)}
                    footer={null}
                    width={900}
                >
                    <div className='flex flex-row justify-between items-center'>
                        <div className='flex flex-col justify-center items-center'>
                            <div className='flex justify-center items-center mb-12 px-8'>
                                <FaUser size={180} color='#6c7072' />
                            </div>
                        </div>
                        <Divider type='vertical' style={{ height: 320 }} className='px-2' />
                        <div className=' w-full flex flex-col'>
                            <div className='grid grid-cols-2 gap-4 w-full'>
                                <div className='flex flex-col'>
                                    <p className='label-see'>Nome</p>
                                    <Input
                                        className='input-see'
                                        value={selectedRow.first_user_name + ' ' + selectedRow.last_user_name}
                                        disabled
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <p className='label-see'>BI/NUIT</p>
                                    <Input
                                        className='input-see'
                                        value={selectedRow.doc_num}
                                        disabled
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <p className='label-see'>Email</p>
                                    <Input
                                        className='input-see'
                                        value={selectedRow.email}
                                        disabled
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <p className='label-see'>Contacto</p>
                                    <Input
                                        className='input-see'
                                        value={selectedRow.contact}
                                        disabled
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <p className='label-see'>Acesso</p>
                                    <Input
                                        className='input-see'
                                        value={selectedRow.groups?.map(group => group.name).join(', ')}
                                        disabled
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <p className='label-see'>Status</p>
                                    <Input
                                        placeholder="Status"
                                        className='input-see'
                                        value={selectedRow.active ? 'Activo' : 'Inactivo'}
                                        disabled
                                    />
                                </div>
                                {selectedRow.unidade &&
                                    <div className='flex flex-col'>
                                        <p className='label-see'>Unidade</p>
                                        <Input
                                            placeholder="Status"
                                            className='input-see'
                                            value={selectedRow.unidade?.name}
                                            disabled
                                        />
                                    </div>
                                }
                                <div className='flex flex-col'>
                                    <p className='label-see'>Criado em</p>
                                    <Input
                                        placeholder="Criado em"
                                        className='input-see'
                                        value={dayJS(selectedRow.date_joined).format('DD-MM-YYYY HH:mm')}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='flex justify-end mt-4'>
                                <Button onClick={() => goEdit(selectedRow.id)} className='button-in'>
                                    Editar
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default ListUser;