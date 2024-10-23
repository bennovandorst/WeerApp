import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const WeatherInfo = ({ weatherData }) => {
  return (
    <View>
      <Text style={styles.title}>
        {weatherData.name}
        <Image
          source={{ uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` }}
          style={styles.icon}
        />
      </Text>
      <Text style={styles.text}>Temperatuur: {weatherData.main.temp} °C</Text>
      <Text style={styles.text}>Gevoelstemperatuur: {weatherData.main.feels_like} °C</Text>
      <Text style={styles.text}>Luchtvochtigheid: {weatherData.main.humidity}%</Text>
      <Text style={styles.text}>Windsnelheid: {weatherData.wind.speed} m/s</Text>
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