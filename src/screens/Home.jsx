import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import SearchWeather from '../components/SearchWeather';
import LocationWeather from '../components/LocationWeather';
import GetLocation from 'react-native-get-location';

const Home = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchWeatherData, setSearchWeatherData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [city, setCity] = useState('');
  const apiKey = 'd4f3732fa26ca1a2748dddba22b9bc31';

  useEffect(() => {
    GetLocation.getCurrentPosition({
        timeout: 60000,
    })
    .then(async location => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric&lang=nl`);
        const data = await response.json();
        setLocationData(data);
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    });
}, []);

  useEffect(() => {
    if (!city) return;

    const fetchSearchWeatherData = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&=lang=nl`);
      const data = await response.json();
      setSearchWeatherData(data);
    };

    fetchSearchWeatherData();
  }, [city]);

  const handleChange = (value) => {
    setSearchInput(value);
  };

  const handleSearch = () => {
    setCity(searchInput);
  };

  return (
    <View style={styles.container}>
      {locationData && (
        <View style={styles.weatherContainer}>
          <LocationWeather locationData={locationData} />
        </View>
      )}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Zoek een stad op"
          value={searchInput}
          onChangeText={handleChange}
          style={styles.input}
          placeholderTextColor="#0D47A1" // Ik haat software waarom moet het zo moeilijk zijn
        />
        <Pressable onPress={handleSearch} style={styles.button}>
          <Text style={styles.buttonText}>Zoeken</Text>
        </Pressable>
      </View>
      {searchWeatherData && (
        <View style={styles.weatherContainer}>
          <SearchWeather searchWeatherData={searchWeatherData} />
        </View>
      )}
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
    marginTop: 20,
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
    marginBottom: 20,
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