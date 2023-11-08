import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const API_KEY = '152f41397d36a9af171b938124f0281c';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleMoviePress = (movieId) => {
    navigation.navigate('MovieDetails', { id: movieId });
  };

  const renderMovie = (movie) => {
    return (
      <TouchableOpacity key={movie.id} style={styles.movie} onPress={() => handleMoviePress(movie.id)}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
          style={styles.poster}
        />
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.rating}>{movie.vote_average}/10</Text>
      </TouchableOpacity>
    );
  };

  const numColumns = 3;
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth / numColumns;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.movieContainer}>
        {movies.map(movie => renderMovie(movie))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  movieContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  movie: {
    width: Dimensions.get('window').width / 3 - 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  poster: {
    width: Dimensions.get('window').width / 3 - 10,
    height: Dimensions.get('window').width / 2,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  rating: {
    fontSize: 14,
    color: 'white',
  },
});

export default MovieList;