import { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import heartOutlineIcon from '../../assets/icons/heart-outline.png';
import unFavoriteIcon from '../../assets/icons/unfavorite.png';
import whatsappIcon from '../../assets/icons/whatsapp.png';

import styles from './styles';
import { ScheduleItem } from '../ScheduleItem';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

export interface Teacher {
    user_id: number;
    avatar: string;
    bio: string;
    cost: number
    id_class: number
    name: string;
    last_name: string;
    subject: string;
    whatsapp: string;
    schedules: ScheduleItem[]
}

interface TeacherItemProps {
    teacher: Teacher,
    isFavoritedClass?: boolean
}

interface ScheduleItem {
    id: number,
    week_day: number;
    from: number;
    to: number;
}

export function TeacherItem({ teacher, isFavoritedClass = false }: TeacherItemProps) {
    const { user } = useAuth()
    const [isFavorited, setIsFavorited] = useState(false);

    async function handleToggleFavorites() {

        if (isFavorited) {
            removeFavoriteTeacher()
        } else {
            addNewFavoriteTeacher()
        }
    }

    useEffect(() => {
        if (isFavoritedClass) {
            setIsFavorited(true)
        }
    }, [])

    async function addNewFavoriteTeacher() {
        api.post("/favorites", { user_id: user?.id, teacher_id: teacher.user_id })
            .then(() => {
                setIsFavorited(true)
            })
    }

    async function removeFavoriteTeacher() {
        api.delete("/favorites", { data: { user_id: user?.id, teacher_id: teacher.user_id } })
            .then(() => {
                setIsFavorited(false)
            })
    }

    async function createNewConnection() {
        await api.post('/connections', {
            user_id: teacher.user_id,
        })
    }

    return (
        <View style={[styles.container, { zIndex: 100 }]}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: "https://avatars.githubusercontent.com/u/2254731?v=4" }}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{`${teacher.name} ${teacher.last_name}`}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>{teacher.bio}</Text>

            <View style={styles.schedule}>
                <ScheduleItem schedules={teacher.schedules} />
            </View>

            <View style={styles.footer}>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>Preço da minha hora:</Text>
                    <Text style={styles.priceValue}>{`R$ ${teacher.cost} reais`}</Text>
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={[
                            styles.favoriteButton,
                            isFavorited ? styles.favorited : {}
                        ]}
                        activeOpacity={0.8}
                        onPress={() => handleToggleFavorites()}
                    >
                        {
                            isFavorited
                                ?
                                <Image source={unFavoriteIcon} />
                                :
                                <Image source={heartOutlineIcon} />
                        }
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.contactButton}
                        activeOpacity={0.8}
                        onPress={() => createNewConnection()}
                    >
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>
                            Entrar em contato
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}