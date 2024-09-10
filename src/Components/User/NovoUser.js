import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
} from 'antd';
import { DatePicker, Upload } from 'antd';
import countries from 'i18n-iso-countries';
import portuguese from 'i18n-iso-countries/langs/pt.json';


const { Option } = Select;

const NovoUser = ({ option }) => {
  countries.registerLocale(portuguese);
  const countryNames = countries.getNames('pt');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [formPage, setFormPage] = useState('dsd');
  const [resultPage, setResultPage] = useState(null);
  const [formData, setFormData] = useState({});
  const [modalConsult, setModalConsult] = useState(false);
  const [modalKey, setModalKey] = useState(); //This is to force the modal to re-render

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

  const goConsult = () => {
    setModalKey(Date.now());
    setModalConsult(true);
  }

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    setFormData(values);
    submit(values);
  };

  const submit = async (paciente) => {
  }

  return (
    <div className='flex flex-col gap-4'>
      {formPage && <>
        <Form
          form={form}
          layout='vertical'
          onFinish={onFinish}
          scrollToFirstError
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nome"
                label="Nome"
                rules={[{ required: true, message: 'Por favor insira o nome' }]}
              >
                <Input placeholder='Insira o Nome' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="genero"
                label="Genéro"
                rules={[{ required: true, message: 'Por favor seleccione o genéro' }]}
              >
                <Select placeholder="Seleccione o Genéro">
                  <Option value="masculino">Masculino</Option>
                  <Option value="feminino">Feminino</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dataNascimento"
                label="Data de Nascimento"
                rules={[{ required: true, message: 'Por favor insira a data de nascimento' }]}
              >
                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nacionalidade"
                label="Nacionalidade"
                rules={[{ required: true, message: 'Por favor seleccione a nacionalidade' }]}
              >
                <Select
                  placeholder="Seleccione a Nacionalidade"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {Object.entries(countryNames).map(([countryCode, countryName]) => (
                    <Option key={countryCode} value={countryName}>
                      {countryName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="provincia"
                label="Província"
                rules={[{ required: true, message: 'Por favor seleccione a província' }]}
              >
                <Select
                  placeholder="Seleccione a Província"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {provinces.map((province) => (
                    <Option key={province.id} value={province.name}>
                      {province.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="distrito"
                label="Distrito"
                rules={[{ required: true, message: 'Por favor seleccione o distrito' }]}
              >
                <Input placeholder='Seleccione o Distrito' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="instituicao"
                label="Insituição"
                rules={[{ required: true, message: 'Por favor seleccione a instituição' }]}
              >
                <Select
                  placeholder="Seleccione a Insituição"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {institutions.map((institution) => (
                    <Option key={institution.id} value={institution.name}>
                      {institution.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="profissao"
                label="Profissão"
                rules={[{ required: true, message: 'Por favor seleccione a profissão' }]}
              >
                <Input placeholder='Seleccione a Profissão' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="contacto"
                label="Contacto"
                rules={[
                  { len: 9, message: 'O contacto Inválido' },
                ]}
              >
                <Input
                  addonBefore="+258"
                  placeholder='Insira o Contacto'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { type: 'email', message: 'O email Inválido' },
                ]}
              >
                <Input placeholder='Insira o Email' />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button htmlType="submit" loading={loading} className='bg-blue-600 text-white font-bold'>
              Registar
            </Button>
          </Form.Item>
        </Form>
      </>}
    </div>
  );
}

export default NovoUser;