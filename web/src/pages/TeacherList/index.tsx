import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

import './styles.css'

export default function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    const [noTeachers, setNoTeachers] = useState(false)

    const subjectOptionsArray = [
        { value: "javascript", label: "Javascript" },
        { value: "typescript", label: "Typescript" },
        { value: "nodejs", label: "Node JS" },
        { value: "reactjs", label: "React JS" },
        { value: "reactnative", label: "React Native" },
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
        { value: "php", label: "PHP" },
        { value: "ruby", label: "Ruby" },
    ]

    const weekOptionsArray = [
        { value: "0", label: "Domingo" },
        { value: "1", label: "Segunda" },
        { value: "2", label: "Terça" },
        { value: "3", label: "Quarta" },
        { value: "4", label: "Quinta" },
        { value: "5", label: "Sexta" },
        { value: "6", label: "Sábado" },
    ]

    const handleTeacherList = (e: FormEvent) => {
        e.preventDefault();
        var teacherForm = {
            subject,
            week_day,
            time,
        }
        api.get('/classes', {
            params: teacherForm
        })
            .then(result => {
                (result.data.length > 0) ? setNoTeachers(false) : setNoTeachers(true)
                setTeachers(result.data)
            })
            .catch(err => {
                console.log(err)
                setTeachers([])
            })
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os professores disponiveis:">
                <form onSubmit={handleTeacherList} id="search-teachers">
                    <Select
                        name="subject"
                        label="Materia"
                        options={subjectOptionsArray}
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
                    />
                    <Select
                        name="week_day"
                        label="Dia da Semana"
                        options={weekOptionsArray}
                        value={week_day}
                        onChange={(e) => { setWeek_day(e.target.value) }}
                    />
                    <Input
                        type="time"
                        name="hour"
                        label="hora"
                        value={time}
                        onChange={(e) => { setTime(e.target.value) }}
                    />

                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {noTeachers && <div className="no-teachers">Nenhum professor encontrado com sua pesquisa</div>}
                {
                    teachers.map((teacher: Teacher) => {
                        return <TeacherItem key={teacher.id} teacher={teacher} />
                    })
                }
            </main>

        </div>
    )
}
