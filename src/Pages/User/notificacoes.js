import React, { useState, useEffect } from 'react';
import Basic from '../../Components/headers/Basic';
import { Input, Table, notification, Divider, Modal, Button } from 'antd';
import { FaEdit, FaEye, FaToggleOn, FaToggleOff, FaPlus, FaUser } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUser, getUsers } from '../../API/StaticGetters';
import dayJS from 'dayjs';
import axios from 'axios';
import { set } from 'date-fns';
import FichaModel from '../../Components/documents/modelo-ficha';
import { List } from 'antd';
import { getNotifications } from '../../API/StaticGetters';

const Notificacoes = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [modalView, setModalView] = useState(false)
    const [selectedRow, setSelectedRow] = useState([])
    const [selectedMenu, setSelectedMenu] = useState('list')
    const [search, setSearch] = useState('')
    const location = useLocation()
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let dados = await getNotifications(false, true)
        if (dados != null) {
            setNotifications(dados.reverse())
        }

    }


    return (
        <>
            <div className='w-full flex flex-col px-8 pt-6 pb-2'>
                <Basic text="Central de Notificações" active={true} />
                <List
                    itemLayout="horizontal"
                    dataSource={notifications}
                    size='small'
                    renderItem={(notification, index) => (
                        <List.Item>
                            <List.Item.Meta className='bg-red'
                                description={
                                    <div className='relative'>
                                        <p className={`absolute flex justify-center items-center right-0 top-0 w-2 h-2 bg-orange-500 text-white rounded-full ${notification.status=='Sent' ? 'visible' : 'invisible'}`}>
                                        </p>
                                        <h3 className='text' style={{ fontWeight: 'bold' }}>{notification.title}</h3>
                                        <p className='text'>{notification.message}</p>
                                        <p className='text-right text' style={{ position: 'absolute', right: 0, bottom:0 }}>{dayJS(notification.created_at).format('DD/MM/YYYY')}</p>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>
        </>
    );
};

export default Notificacoes;