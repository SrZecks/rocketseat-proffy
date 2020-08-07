import React, { useState } from 'react'
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { View, Text, AsyncStorage } from 'react-native'
import { Feather } from '@expo/vector-icons'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'

import styles from './styles'
import api from '../../services/api'
import { useFocusEffect } from '@react-navigation/native'


function Study() {
    const [isFilterVisible, setIsFilterVisible] = useState(false)
    const [teacherArray, setTeacherArray] = useState([])
    const [favorites, setFavorites] = useState<number[]>([])
    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    const loadFavorites = () => {
        AsyncStorage.getItem('favorites').then(result => {
            if (result) {
                const favoritedTeachers = JSON.parse(result)
                const favoritedTeachersId = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id
                })
                setFavorites(favoritedTeachersId)
            }
        })
    }

    const handleToggleFilters = () => {
        setIsFilterVisible(!isFilterVisible)
    }

    const handleTeacherFilter = () => {
        loadFavorites();

        var teacherForm = {
            subject: subject.toLowerCase(),
            week_day,
            time,
        }
        api.get('/classes', {
            params: teacherForm
        })
            .then(result => {
                setIsFilterVisible(false)
                setTeacherArray(result.data)
            })
            .catch(err => {
                console.log(err)
                setTeacherArray([])
            })
    }
    
    return (
        <View style={styles.container}>
            <PageHeader
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFilters}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )}
            >
                {isFilterVisible && (<View style={styles.searchForm}>
                    <Text style={styles.label}>matéria</Text>
                    <TextInput
                        style={styles.input}
                        value={subject}
                        onChangeText={text => setSubject(text)}
                        placeholder="Qual a matéria?"
                        placeholderTextColor="#c1bccc"
                    />

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <TextInput
                                style={styles.input}
                                value={week_day}
                                onChangeText={text => setWeek_day(text)}
                                placeholder="Qual o dia?"
                                placeholderTextColor="#c1bccc"
                            />
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput
                                style={styles.input}
                                value={time}
                                onChangeText={text => setTime(text)}
                                placeholder="Qual o horário?"
                                placeholderTextColor="#c1bccc"
                            />
                        </View>
                    </View>

                    <RectButton
                        onPress={handleTeacherFilter}
                        style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>
                </View>)}
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}>
                {
                    teacherArray.map((teacher: Teacher) => {
                        return (
                            <TeacherItem
                                key={teacher.id}
                                teacher={teacher}
                                favorited={favorites.includes(teacher.id)}
                            />
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default Study;