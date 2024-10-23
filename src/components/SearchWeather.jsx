import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const WeatherInfo = ({ searchWeatherData }) => {
  return (
    <View>
      <Text style={styles.title}>
        {searchWeatherData.name}
        <Image
          source={{ uri: `https://openweathermap.org/img/wn/${searchWeatherData.weather[0].icon}@2x.png` }}
          style={styles.icon}
        />
      </Text>
      <Text style={styles.text}>Temperatuur: {searchWeatherData.main.temp} °C</Text>
      <Text style={styles.text}>Gevoelstemperatuur: {searchWeatherData.main.feels_like} °C</Text>
      <Text style={styles.text}>Luchtvochtigheid: {searchWeatherData.main.humidity}%</Text>
      <Text style={styles.text}>Windsnelheid: {searchWeatherData.wind.speed} m/s</Text>
    </View>
  );
};

export default WeatherInfo;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
});