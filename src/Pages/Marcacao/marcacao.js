import { Button, Col, Form, Input, Modal, Row, Select, Table, Tag, DatePicker } from "antd";
import { useEffect, useState } from 'react';
import { useForm } from 'antd/es/form/Form';

export default function Marcacao() {

    useEffect(() => {
        localStorage.setItem('title', 'Gestão de Marcações');
        localStorage.setItem('type', '2');
    }, [])

    //menu
    const [selectedMenu, setSelectedMenu] = useState(0);

    //Table Information
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            width: '10%'
        },
        {
            title: 'Nome do Estudante',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'Data',
            dataIndex: 'data',
            key: 'data',
        },
        {
            title: 'Local',
            dataIndex: 'local',
            key: 'local',
        },
        {
            title: 'Tipo(s) de Refeição',
            dataIndex: 'tipo',
            key: 'tipo',
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
                    Detalhes
                </Button>
            },
            width: '10%'
        }
    ];

    const dataSource = [
        {
            id: 1,
            nome: 'Estudante 1',
            data: '2021-10-10',
            local: 'Residencia 1',
            tipo: 'Pequeno Almoço',
            status: 'Ativo',
            acoes: 'Editar'
        },
        {
            id: 2,
            nome: 'Estudante 2',
            data: '2021-10-10',
            local: 'Residencia 2',
            tipo: 'Almoço',
            status: 'Ativo',
            acoes: 'Editar'
        },
    ];

    //handles
    const handleEdit = (id) => {
        setTypeAction('edit');
        setModal(true);
        form.setFieldsValue({
            data: '2021-10-10',
            referencia: 'Estudante 1',
            nome: 'Estudante 1',
            local: 'Residencia 1',
            pequenoAlmoco: 'Pequeno Almoço',
            almoco: 'Almoço',
            jantar: 'Jantar'
        });
    }
    const [typeAction, setTypeAction] = useState('add');
    //Form
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = useForm();

    const submitEdit = (values) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setModal(false);
        }, 2000);
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
            <div className="flex flex-row grid grid-cols-4 gap-2">
                <DatePicker.RangePicker
                    className='input-form w-full'
                    placeholder={['Data Inicial', 'Data Final']}
                />
                <Select
                    className='input-form w-full'
                    placeholder='Selecione o Local'
                >
                    <Select.Option value="1">Local 1</Select.Option>
                    <Select.Option value="2">Local 2</Select.Option>
                    <Select.Option value="3">Local 3</Select.Option>
                </Select>
                <Select
                    className='input-form w-full'
                    placeholder='Selecione o Tipo de Refeição'
                >
                    <Select.Option value="1">Pequeno Almoço</Select.Option>
                    <Select.Option value="2">Almoço</Select.Option>
                    <Select.Option value="3">Jantar</Select.Option>
                </Select>
            </div>
            {selectedMenu === 0 && <>
                <Table size="small" className="custom-table mt-3" columns={columns} dataSource={dataSource} />
            </>}
            <Modal
                open={modal}
                title='Detalhes da Marcação'
                onCancel={() => setModal(false)}
                footer={false}
                width={600}
            >
                <Form
                    form={form}
                    name="basic"
                    initialValues={{ remember: true }}
                    style={{ width: '100%' }}
                    onFinish={submitEdit}
                    className="bg-white"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Referencia do Estudante"
                                name="referencia"
                                labelCol={{ span: 24 }}
                            >
                                <Input
                                    disabled
                                    placeholder="Nome do Estudante"
                                    style={{ borderRadius: '0px', marginTop: -10 }}
                                    className='input-form'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Nome do Estudante"
                                name="nome"
                                labelCol={{ span: 24 }}
                            >
                                <Input
                                    disabled
                                    placeholder="Nome do Estudante"
                                    style={{ borderRadius: '0px', marginTop: -10 }}
                                    className='input-form'
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Local da Refeição"
                                name="local"
                                labelCol={{ span: 24 }}
                                rules={[{ required: true, message: 'Introduza o local da refeição!' }]}
                            >
                                <Input
                                    placeholder="Local da Refeição"
                                    style={{ borderRadius: '0px', marginTop: -10 }}
                                    className='input-form'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Data de Marcação"
                                name="data"
                                labelCol={{ span: 24 }}
                                rules={[{ required: true, message: 'Introduza a data de marcação!' }]}
                            >
                                <Input
                                    disabled
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
                            Editar
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>
        </div>
    )
}