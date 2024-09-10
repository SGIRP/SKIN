import React, { useState, useEffect } from 'react';
import { Input, Table, notification, Divider, Modal, Button } from 'antd';
import { FaEdit, FaEye, FaToggleOn, FaToggleOff, FaPlus, FaUser, FaPlusCircle } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProfilePicture, getUser, getUsers } from '../../API/StaticGetters';
import axios from 'axios';

const MeuPerfil = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [modalView, setModalView] = useState(false)
    const [selectedRow, setSelectedRow] = useState([])
    const [selectedMenu, setSelectedMenu] = useState('list')
    const [search, setSearch] = useState('')
    const location = useLocation()
    const [selectedImage, setSelectedImage] = useState(null)
    const [image, setImage] = useState(null)

    useEffect(() => {
        localStorage.setItem('title', 'Meu Perfil');
        localStorage.setItem('type', '2');
        getData()
        getProfile()
    }, [])

    const getData = async () => {
        setLoading(true)
        try {
            let dados = await getUser(JSON.parse(sessionStorage.getItem('user'))?.user)
            setSelectedRow(dados)
            console.log(dados)
        } finally {
            setLoading(false)
        }
    }

    const goEdit = () => {
        navigate('/editar-perfil/')
    }

    const getProfile = async () => {
        try{
            setLoading(true)
            axios.get(localStorage.getItem('url') + '/api/user/picture/',
                {
                    headers: {
                        'Authorization': `Token ${sessionStorage.getItem('token')}`,
                    },
                    responseType: 'blob'
                })
                .then(response => {
                    setImage(response.data)
                }).catch(error => {})
        }finally{
            setLoading(false)

        }
    }


    const updateProfile = async () => {
        if (selectedImage) {
            let formData = new FormData()
            formData.append('profile_picture', selectedImage)

            try {
                setLoading(true)
                axios.post(localStorage.getItem('url') + '/api/user/picture/',
                    formData
                    ,
                    {
                        headers: {
                            'Authorization': `Token ${sessionStorage.getItem('token')}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(response => {
                        getProfilePicture()
                        notification.success({
                            message: 'Sucesso',
                            description: 'Imagem de perfil atualizada com sucesso'
                        })
                        setModalView(false)
                        navigate('/')
                    })
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <>
            <div className='w-full flex flex-col px-5 py-4'>
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-col justify-center items-center'>
                        <div className='flex flex-col justify-center items-center mb-12 px-8 gap-2'>
                            {image ? <img src={URL.createObjectURL(image)} className='w-64 object-cover rounded-full' /> : <FaUser size={180} color='#6c7072' />}
                            <FaPlusCircle size={24} color='#6c7072' onClick={() => setModalView(true)} />
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
                        </div>
                    </div>
                </div>
                <div className='flex justify-end w-full'>
                    <Button onClick={goEdit} className='button-in'>
                        Editar Perfil
                    </Button>
                </div>

                <Modal
                    title={<p className='title'>SELECIONE A IMAGEM</p>}
                    visible={modalView}
                    onCancel={() => setModalView(false)}
                    footer={null}
                >
                    <div className=' w-full flex flex-col'>
                        <div className='grid grid-cols-1 gap-4 w-full'>
                            <div className='flex flex-col'>
                                <p className='label-see'>Selecione a Imagem</p>
                                <Input
                                    type='file'
                                    accept='image/*'
                                    className='input-see'
                                    onChange={(e) => setSelectedImage(e.target.files[0])}
                                />
                            </div>
                        </div>

                        {selectedImage && <img src={URL.createObjectURL(selectedImage)} className='w-64 h-64 object-cover rounded-full mx-auto mt-3' />}
                        <div className='flex flex-row justify-end items-center mt-4 gap-2'>
                            <Button loading={loading} className='button-out' onClick={() => setModalView(false)}>
                                Fechar
                            </Button>
                            <Button loading={loading} className='button-in' onClick={updateProfile}>
                                Salvar
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default MeuPerfil;