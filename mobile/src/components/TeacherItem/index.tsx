import React, { useState } from 'react'
import { View, Text, Image, Linking, AsyncStorage } from 'react-native'
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

import api from '../../services/api';
import styles from './styles';
import Favorites from '../../pages/Favorites';

export interface Teacher {
    id: number,
    name: string,
    subject: string,
    avatar: string,
    bio: string,
    cost: number,
    whatsapp: string,
    favorite: boolean
}

interface TeacherItemProps {
    teacher: Teacher,
    favorited: boolean
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
    const [isFavorited, setIsFavorited] = useState(favorited)

    const handleLinkWhatsapp = () => {
        api.post('/connections', { user_id: teacher.id }).then(result =>{
            Linking.openURL(`whatsapp://send?text=Olá!&phone=5511949122854`)
        })
    }

    const handleToggleFavorited = async () => {
        const favorites = await AsyncStorage.getItem('favorites')
        let favoritesArray = [];
        favoritesArray = (favorites) ? JSON.parse(favorites) : [];

        if (isFavorited) {
            const favoriteIndex = favoritesArray.findIndex((teacherItem:Teacher) => {
                return teacherItem.id === teacher.id
            })

            favoritesArray.splice(favoriteIndex, 1);
            setIsFavorited(true)
        } else {
            favoritesArray.push(teacher);
            setIsFavorited(true)
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
    }
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image style={styles.avatar} source={{ uri: teacher.avatar }} />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>{teacher.bio}</Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora <Text style={styles.priceValue}>{teacher.cost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton
                        onPress={handleToggleFavorited}
                        style={[styles.favoriteButton, isFavorited && styles.unfavoriteButton]}>
                        <Image source={isFavorited ? unfavoriteIcon : heartOutlineIcon}></Image>
                    </RectButton>

                    <RectButton onPress={handleLinkWhatsapp} style={styles.contactButton}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem;