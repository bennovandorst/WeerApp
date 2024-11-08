import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import GetLocation from 'react-native-get-location';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const API_KEY = 'd4f3732fa26ca1a2748dddba22b9bc31';

const Location = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [dailyData, setDailyData] = useState([]);

    const fetchWeatherData = async (lat, lon) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=nl`
            );
            const data = await response.json();
            setWeatherData(data);

            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=nl`
            );
            const forecastData = await forecastResponse.json();
            
            const dailyForecast = [];
            const forecastMap = {};
            forecastData.list.forEach(item => {
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

    const renderDailyForecast = () => {
        return (
            <FlatList
                data={dailyData}
                horizontal
                keyExtractor={(item) => item.dt.toString()}
                renderItem={({ item }) => (
                    <View style={styles.forecastItem}>
                        <Text style={styles.forecastDay}>
                            {new Date(item.dt * 1000).toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit' })}
                        </Text>
                        <Image
                            source={{
                                uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                            }}
                            style={styles.forecastIcon}
                        />
                        <Text style={styles.forecastTemp}>{Math.round(item.main.temp)}°</Text>
                    </View>
                )}
            />
        );
    };

    return (
        <View style={styles.container}>
            {weatherData ? (
                <>
                    <Text style={styles.locationText}>
                        {weatherData.name}, {weatherData.sys.country}
                    </Text>

                    <Image
                        source={{
                            uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`,
                        }}
                        style={styles.weatherIcon}
                    />
                    <Text style={styles.temperatureText}>
                        {Math.round(weatherData.main.temp)}°C
                    </Text>
                    <Text style={styles.weatherDescription}>
                        {weatherData.weather[0].description}
                    </Text>

                    <View style={styles.infoContainer}>
                        <View style={styles.infoItem}>
                            <Icon name="weather-windy" size={25} color="#0D47A1" />
                            <Text style={styles.infoValue}>{weatherData.wind.speed} km/h</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Icon name="water-percent" size={25} color="#0D47A1" />
                            <Text style={styles.infoValue}>{weatherData.main.humidity}%</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Icon name="weather-sunset" size={25} color="#0D47A1" />
                            <Text style={styles.infoValue}>
                                {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.forecastContainer}>{renderDailyForecast()}</View>
                </>
            ) : (
                <Text style={styles.loadingText}>Loading weather data...</Text>
            )}
        </View>
    );
};

export default Location;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0F7FA',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 24,
        color: '#0D47A1',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    weatherIcon: {
        width: 150,
        height: 150,
        marginBottom: 10,
    },
    temperatureText: {
        fontSize: 64,
        color: '#0D47A1',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    weatherDescription: {
        fontSize: 20,
        color: '#0D47A1',
        textTransform: 'capitalize',
        marginBottom: 20,
    },
    infoContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    infoItem: {
        alignItems: 'center',
    },
    infoValue: {
        color: '#0D47A1',
        fontSize: 18,
        fontWeight: 'bold',
    },
    forecastContainer: {
        marginTop: 20,
        width: '100%',
    },
    forecastItem: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginRight: 10,
    },
    forecastDay: {
        color: '#0D47A1',
        fontSize: 16,
        marginBottom: 5,
    },
    forecastIcon: {
        width: 50,
        height: 50,
    },
    forecastTemp: {
        color: '#0D47A1',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingText: {
        fontSize: 18,
        color: '#0D47A1',
    },
});