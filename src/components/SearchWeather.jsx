import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchWeather = ({ searchWeatherData, hourlyData }) => {

  const renderHourlyForecast = () => {
    return (
        <FlatList
            data={hourlyData}
            horizontal
            keyExtractor={(item) => item.dt.toString()}
            renderItem={({ item }) => (
                <View style={styles.forecastItem}>
                    <Text style={styles.forecastTime}>
                        {new Date(item.dt * 1000).getHours()}:00
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
        {searchWeatherData ? (
            <>
                {/* Header with location */}
                <Text style={styles.locationText}>
                    {searchWeatherData.name}, {searchWeatherData.sys.country}
                </Text>

                {/* Main weather icon and temperature */}
                <Image
                    source={{
                        uri: `https://openweathermap.org/img/wn/${searchWeatherData.weather[0].icon}@4x.png`,
                    }}
                    style={styles.weatherIcon}
                />
                <Text style={styles.temperatureText}>
                    {Math.round(searchWeatherData.main.temp)}°C
                </Text>
                <Text style={styles.weatherDescription}>
                    {searchWeatherData.weather[0].description}
                </Text>

                {/* Additional Info (wind, humidity, daylight) */}
                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <Icon name="weather-windy" size={25} color="#0D47A1" />
                        <Text style={styles.infoValue}>{searchWeatherData.wind.speed} km/h</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Icon name="water-percent" size={25} color="#0D47A1" />
                        <Text style={styles.infoValue}>{searchWeatherData.main.humidity}%</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Icon name="weather-sunset" size={25} color="#0D47A1" />
                        <Text style={styles.infoValue}>
                            {new Date(searchWeatherData.sys.sunset * 1000).toLocaleTimeString()}
                        </Text>
                    </View>
                </View>
                <View style={styles.forecastContainer}>{renderHourlyForecast()}</View>
            </>
        ) : (
            <Text style={styles.loadingText}>Loading weather data...</Text>
        )}
    </View>
);
};

export default SearchWeather;

// StyleSheet for design

const styles = StyleSheet.create({
background: {
flex: 1,
resizeMode: 'cover',
},
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
infoText: {
color: '#0D47A1',
fontSize: 15,
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
forecastTime: {
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