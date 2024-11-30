import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import GetLocation from 'react-native-get-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Weather from '../components/Weather';

const Location = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [dailyData, setDailyData] = useState([]);
    const API_KEY = 'd4f3732fa26ca1a2748dddba22b9bc31';

    const fetchWeatherData = async (latitude, longitude) => {
        try {
            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=nl`
            );
            const weather = await weatherResponse.json();
            setWeatherData(weather);

            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=nl`
            );
            const forecast = await forecastResponse.json();

            const dailyForecast = [];
            const forecastMap = {};
            forecast.list.forEach((item) => {
                const date = new Date(item.dt * 1000).toLocaleDateString();
                if (!forecastMap[date]) {
                    forecastMap[date] = item;
                    dailyForecast.push(item);
                }
            });

            setDailyData(dailyForecast.slice(0, 5));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then((location) => {
                fetchWeatherData(location.latitude, location.longitude);
            })
            .catch((error) => {
                console.warn(error.code, error.message);
            });
    }, []);

    useEffect(() => {
        const loadWeatherData = async () => {
            try {
                const savedWeatherData = await AsyncStorage.getItem('weatherData');
                const savedDailyData = await AsyncStorage.getItem('dailyData');
                if (savedWeatherData && savedDailyData) {
                    setWeatherData(JSON.parse(savedWeatherData));
                    setDailyData(JSON.parse(savedDailyData));
                }
            } catch (error) {
                console.error(error);
            }
        };

        loadWeatherData();
    }, []);

    useEffect(() => {
        const saveWeatherData = async () => {
            try {
                if (weatherData) {
                    await AsyncStorage.setItem('weatherData', JSON.stringify(weatherData));
                }
                if (dailyData.length > 0) {
                    await AsyncStorage.setItem('dailyData', JSON.stringify(dailyData));
                }
            } catch (error) {
                console.error(error);
            }
        };

        saveWeatherData();
    }, [weatherData, dailyData]);

    return (
        <View style={styles.container}>
            {weatherData && (
                <View>
                    <Weather weatherData={weatherData} dailyData={dailyData} />
                </View>
            )}
        </View>
    );
};

export default Location;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});