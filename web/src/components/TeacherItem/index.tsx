import React from 'react'
import { Link } from 'react-router-dom';

import whatsAppIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css'
import api from '../../services/api';

export interface Teacher {
    id: string,
    name: string,
    subject: string,
    avatar: string,
    bio: string,
    cost: string,
    whatsapp:string,
}


interface TeacherItemProps {
    teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    const addConnection = () => {
        api.post('/connections', { user_id: teacher.id })
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name} />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject.charAt(0).toUpperCase() + teacher.subject.slice(1)}</span>
                </div>
            </header>

            <p> {teacher.bio} </p>

            <footer>
                <p>
                    Preço/hora <strong>{Number(teacher.cost).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
                </p>
                <a onClick={addConnection} target="blank" href={`http://wa.me/${teacher.whatsapp}`} >
                    <img src={whatsAppIcon} alt="WhatsApp" />
                        Entrar em contato
                    </a>
            </footer>
        </article>
    )
}

export default TeacherItem;