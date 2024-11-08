import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import SearchWeather from '../components/SearchWeather';

const Search = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchWeatherData, setSearchWeatherData] = useState(null);
    const [city, setCity] = useState('');
    const [showSearchBar, setShowSearchBar] = useState(true);
    const [dailyData, setDailyData] = useState([]);
    const API_KEY = 'd4f3732fa26ca1a2748dddba22b9bc31';

    useEffect(() => {
        if (!city) return;

        const fetchSearchWeatherData = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=nl`);
                const data = await response.json();
                setSearchWeatherData(data);

                const forecastResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=nl`
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
        fetchSearchWeatherData();
    }, [city]);

    const handleChange = (value) => {
        setSearchInput(value);
    };

    const handleSearch = () => {
        setCity(searchInput);
        setShowSearchBar(false);
    };

    const handleBackToSearch = () => {
        setShowSearchBar(true);
        setSearchWeatherData(null);
        setSearchInput('');
        setCity('');
    };

    return (
        <View style={styles.container}>
            {showSearchBar && (
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Zoek een stad op"
                        value={searchInput}
                        onChangeText={handleChange}
                        style={styles.input}
                        placeholderTextColor="#0D47A1"
                    />
                    <Pressable onPress={handleSearch} style={styles.button}>
                        <Text style={styles.buttonText}>Zoeken</Text>
                    </Pressable>
                </View>
            )}
            {searchWeatherData && (
                <View>
                    <SearchWeather searchWeatherData={searchWeatherData} dailyData={dailyData} />
                    <Pressable onPress={handleBackToSearch} style={styles.backButton}>
                        <Text style={styles.buttonText}>Terug naar zoeken</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
};

export default Search;

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
    backButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
});