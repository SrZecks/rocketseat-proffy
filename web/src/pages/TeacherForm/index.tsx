import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css'
import api from '../../services/api';

export default function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: "", to: "" }
    ])

    const optionsArray = [
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

    const addNewSchedule = () => {
        setScheduleItems([
            ...scheduleItems,   // Spread operator (...) it copies all items of the array to a new one
            { week_day: 0, from: "", to: "" } // new value to be inserted on the array
        ])
    }

    const setScheduleItemValue = (position: Number, field: string, value: string) => {
        const newScheduleArray = scheduleItems.map((scheduleItem, index) => {
            if (index == position) {
                return { ...scheduleItem, [field]: value }
            } else {
                return scheduleItem;
            }
        })

        setScheduleItems(newScheduleArray)
    }

    const handleCreateClass = (e: FormEvent) => {
        e.preventDefault()
        let user = {
            profile: {
                name,
                avatar,
                whatsapp,
                bio
            },
            class: {
                subject,
                cost: Number(cost)
            },
            schedule: scheduleItems
        }

        api.post('/classes', { user })
            .then(result => {
                alert("Aula cadastrada com sucesso!")
                history.push('/')
            })
            .catch(err => {
                alert("Erro ao cadastrar aula")
            })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrivel que você quer dar aulas"
                description="O primeiro passo é preencher esse formulário de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus Dados</legend>
                        <Input name="name" label="Nome completo" value={name} onChange={(e) => { setName(e.target.value) }} />
                        <Input name="avatar" label="Avatar" value={avatar} onChange={(e) => { setAvatar(e.target.value) }} />
                        <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={(e) => { setWhatsapp(e.target.value) }} />
                        <Textarea name="bio" label="Biografia" value={bio} onChange={(e) => { setBio(e.target.value) }} />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            name="subject"
                            label="Materia"
                            options={optionsArray}
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                        />
                        <Input name="cost" label="Custo das sua hora por aula" value={cost} onChange={(e) => { setCost(e.target.value) }} />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponiveis
                        <button type="button" onClick={addNewSchedule}> + Novo horário</button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        options={weekOptionsArray}
                                        value={scheduleItem.week_day}
                                        onChange={(e) => setScheduleItemValue(index, 'week_day', e.target.value)}
                                    />
                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={(e) => setScheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={(e) => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            );
                        })}

                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>

                        <button type="submit">
                            Salvar cadastro
                </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}