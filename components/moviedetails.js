
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const API_KEY = '152f41397d36a9af171b938124f0281c';

const MovieDetails = ({ route }) => {
  const { id } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        setMovieDetails(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  if (!movieDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movieDetails.title}</Text>
      <Text style={styles.overview}>{movieDetails.overview}</Text>
      <Text style={styles.rating}>Rating: {movieDetails.vote_average}/10</Text>
      <Text style={styles.releaseDate}>Release Date: {movieDetails.release_date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  poster: {
    width: 200,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
  },
  overview: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  releaseDate: {
    fontSize: 16,
    color: 'white',
  },
});

export default MovieDetails;