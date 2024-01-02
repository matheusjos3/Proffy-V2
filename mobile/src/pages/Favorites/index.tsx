import { useCallback, useEffect, useState } from "react"
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";

import { useAuth } from "../../contexts/AuthContext";

import { PageHeader } from '../../components/PageHeader';
import { Teacher, TeacherItem } from '../../components/TeacherItem';

import api from "../../services/api";
import styles from './styles';

export function Favorites() {

  interface Favorite {
    teacher_id: number
  }

  const { user } = useAuth()
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [favoritesId, setFavoritesId] = useState<Favorite[]>([]);
  const isFavorited = (t: Teacher) => favoritesId.map(item => item.teacher_id).includes(t.user_id)

  async function loadFavorites() {
    await api.get('/favorites', { params: { user_id: user?.id, page: 1 } })
      .then(response => {
        setFavoritesId(response.data.favorites_id)
        setTeachers(response.data.classes)
        setCurrentPage(currentPage => currentPage + 1)
      })
  }

  useFocusEffect(
    useCallback(() => {
      loadFavorites()
    }, [])
  )

  async function loadMore() {
    if (hasMore) {
      setIsLoading(true)
      await api('/favorites', { params: { user_id: user?.id, page: currentPage } })
        .then(response => {
          if (response.data.classes.length !== 0) {
            setTeachers(prev => prev.concat(response.data.classes))
            setCurrentPage(currentPage => currentPage + 1)
          } else {
            setHasMore(false)
          }
        })

      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <PageHeader
        headerTitle='Estudar'
        pageHeaderTitle={`Meus proffys\nFavoritos`}
        emoji='😍'
        textInfo={`${teachers.length} proffy`}
      />

      {teachers.length != 0 &&
        <FlatList
          style={styles.teacherList}
          data={teachers}
          keyExtractor={(item) => String(item.id_class)}
          renderItem={({ item }) => <TeacherItem teacher={item} isFavoritedClass={isFavorited(item)} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            isLoading ?
              <ActivityIndicator style={styles.indicator} size={"large"} color={"#6A6180"} />
              :
              <Text style={styles.textEnd}>Estes são todos os resultados</Text>
          }
        />}

    </View>
  );
}