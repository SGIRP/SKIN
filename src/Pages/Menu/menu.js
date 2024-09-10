import { Button, Col, Form, Input, Modal, Row, Select, Table, Tag } from "antd";
import { useForm } from 'antd/es/form/Form';
import { te } from "date-fns/locale";
import { useEffect, useState } from "react";


export default function GestaoMenu() {
    const [selectedMenu, setSelectedMenu] = useState(0);
    const [modalAdd, setModalAdd] = useState(false);

    useEffect(() => {
        localStorage.setItem('title', 'Gestão de Menu');
        localStorage.setItem('type', '2');
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            width: '10%'
        },
        {
            title: 'Locais das Refeições',
            dataIndex: 'locais',
            key: 'locais',
        },
        {
            title: 'Data',
            dataIndex: 'data',
            key: 'data',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (index, text) => {
                return <Tag color={index === 'Ativo' ? 'green' : 'red'}>{index}</Tag>
            }
        },
        {
            title: 'Ações',
            dataIndex: 'acoes',
            key: 'acoes',
            render: (index, text) => {
                return <Button className="button-in" onClick={() => handleEdit(text.id)}>
                    {index}
                </Button>
            },
            width: '10%'
        }
    ];

    const dataSource = [
        {
            id: 1,
            locais: 'Residencia 1, Residencia 2',
            data: '2021-10-10',
            status: 'Ativo',
            acoes: 'Editar'
        },
        {
            id: 2,
            locais: 'Residencia 1, Residencia 2',
            data: '2021-10-10',
            status: 'Ativo',
            acoes: 'Editar'
        }
    ];

    //handles
    const handleAdd = () => {
        setTypeAction('add');
        setModalAdd(true);
    }
    const handleEdit = (id) => {
        setTypeAction('edit');
        setModalAdd(true);
        form.setFieldsValue({
            data: '2021-10-10',
            pequenoAlmoco: 'Pão, Manteiga, Café',
            almoco: 'Arroz, Feijão, Carne',
            jantar: 'Sopa, Pão, Carne'
        });
    }
    const [typeAction, setTypeAction] = useState('add');
    //Form
    const [loading, setLoading] = useState(false);
    const [form] = useForm();
    const submitMenu = (values) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setModalAdd(false);
        }, 3000);
    }

    return (
        <div className='w-full flex flex-col px-5 py-4'>
            <div className="menu-bar">
                <div className={`menu-bar-item ${selectedMenu === 0 ? 'active' : ''}`} onClick={() => setSelectedMenu(0)}>
                    Activos
                </div>
                <div className={`menu-bar-item ${selectedMenu === 1 ? 'active' : ''}`} onClick={() => setSelectedMenu(1)}>
                    Histórico
                </div>
            </div>
            <div className="flex flex-row justify-end mb-2">
                <Button className='button-in' onClick={handleAdd}>Adicionar</Button>
            </div>
            {selectedMenu === 0 && <>
                <Table size="small" className="custom-table" columns={columns} dataSource={dataSource} />
            </>}

            <Modal
                open={modalAdd}
                title={typeAction === 'add' ? 'Adicionar Menu' : 'Editar Menu'}
                onCancel={() => setModalAdd(false)}
                footer={false}
                width={500}
            >
                <Form
                    form={form}
                    name="basic"
                    initialValues={{ remember: true }}
                    style={{ width: '100%' }}
                    onFinish={submitMenu}
                    className="bg-white"
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Data de Marcação"
                                name="data"
                                labelCol={{ span: 24 }}
                                rules={[{ required: true, message: 'Introduza a data de marcação!' }]}
                            >
                                <Input
                                    type="date"
                                    placeholder="Data de Marcação"
                                    style={{ borderRadius: '0px', marginTop: -10 }}
                                    className='input-form'
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Pequeno Almoço"
                                name="pequenoAlmoco"
                                labelCol={{ span: 24 }}
                                rules={[{ required: true, message: 'Introduza o pequeno almoço!' }]}
                            >
                                <Input.TextArea
                                    placeholder="Pequeno Almoço"
                                    style={{ borderRadius: '0px', marginTop: -10 }}
                                    className='input-form'
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Almoço"
                                name="almoco"
                                labelCol={{ span: 24 }}
                                rules={[{ required: true, message: 'Introduza o almoço!' }]}
                            >
                                <Input.TextArea
                                    placeholder="Almoço"
                                    style={{ borderRadius: '0px', marginTop: -10 }}
                                    className='input-form'
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Jantar"
                                name="jantar"
                                labelCol={{ span: 24 }}
                                rules={[{ required: true, message: 'Introduza o jantar!' }]}
                            >
                                <Input.TextArea
                                    placeholder="Jantar"
                                    style={{ borderRadius: '0px', marginTop: -10 }}
                                    className='input-form'
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item style={{ textAlign: 'right' }}>
                        <Button htmlType="submit" loading={loading} className='button-in'>
                            {typeAction === 'add' ? 'Adicionar' : 'Editar'}
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>

        </div>
    );
}