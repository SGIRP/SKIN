import React, { useState, useEffect } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined, User } from '@ant-design/icons';
import { Card } from 'antd';
import { QuestionCircleOutlined, MailOutlined, PhoneOutlined, PlusCircleFilled } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';
import { FaHistory, FaUser, FaUserAlt, FaUserPlus, FaUsers} from 'react-icons/fa';
import { MdEditDocument } from 'react-icons/md';

const Menu = (props) => {

  useEffect(() => {
    localStorage.setItem('title', 'Bem-vindo a Plataforma');
    localStorage.setItem('type', '1');
  }, [])

  const links = [
    {
      title: 'Nova Planificação',
      icon: <MdEditDocument style={{ fontSize: '60px', color: '#047D4B' }} />,
      link: '/nova-planificacao',
      group: 'All'
    },
    {
      title: 'Meu Perfil',
      icon: <FaUserAlt style={{ fontSize: '60px', color: '#047D4B' }} />,
      link: '/meu-perfil',
      group: 'All'
    }
  ]

  const filteredLinks = links.filter(link => link.group === 'All' || link.group.includes(sessionStorage.getItem('access')));


  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4  gap-4 p-2 sm:p-8">
        {filteredLinks.map((link, index) => (
          <Link to={link.link} key={index}>
            <Card
              bordered={false}
              hoverable
              cover={link.icon}
            >
              <div className="text-sm sm:text-lg text-center">{link.title}</div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Menu;