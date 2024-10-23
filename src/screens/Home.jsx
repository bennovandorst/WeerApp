import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image } from 'react-native';
import WeatherInfo from '../components/WeatherInfo';

const Home = () => {
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const apiKey = '1e30fd44ccc54c5f601162c743d72a5c';

  useEffect(() => {
    if (!city) return;

    const fetchWeatherData = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      setWeatherData(data);
    };

    fetchWeatherData();
  }, [city]);

  const handleChange = (value) => {
    setSearchInput(value);
  };

  const handleSearch = () => {
    setCity(searchInput);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        {/** Zoekbalk */}
        <TextInput
          placeholder="Zoek een stad op"
          value={searchInput}
          onChangeText={handleChange}
          style={styles.input}
          placeholderTextColor="#000" // Ik haat software waarom moet het zo moeilijk zijn
        />
        <Pressable onPress={handleSearch} style={styles.button}>
          <Text style={styles.buttonText}>Zoeken</Text>
        </Pressable>
      </View>
      {/** Weer container */}
      {weatherData && (
        <View style={styles.weatherContainer}>
          <WeatherInfo weatherData={weatherData} />
        </View>
      )}
      {/** Iets anders */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  searchContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  weatherContainer: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});