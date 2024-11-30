import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, FlatList } from "react-native";
import Weather from "../components/Weather";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Search = () => {
    const [searchInput, setSearchInput] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState("");
    const [showSearchBar, setShowSearchBar] = useState(true);
    const [dailyData, setDailyData] = useState([]);
    const [saveMessage, setSaveMessage] = useState("");
    const [savedCities, setSavedCities] = useState([]);
    const API_KEY = "d4f3732fa26ca1a2748dddba22b9bc31";

    useEffect(() => {
        const fetchSavedCities = async () => {
            try {
                const cities =
                    JSON.parse(await AsyncStorage.getItem("savedCities")) || [];
                setSavedCities(cities);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSavedCities();
    }, []);

    useEffect(() => {
        if (!city) return;

        const fetchWeatherData = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=nl`
                );
                const data = await response.json();
                setWeatherData(data);

                const forecastResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=nl`
                );
                const forecastData = await forecastResponse.json();

                const dailyForecast = [];
                const forecastMap = {};
                forecastData.list.forEach((item) => {
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
        fetchWeatherData();
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
        setWeatherData(null);
        setSearchInput("");
        setCity("");
        setSaveMessage("");
    };

    const handleSaveCity = async () => {
        try {
            const cities =
                JSON.parse(await AsyncStorage.getItem("savedCities")) || [];
            if (!cities.includes(city)) {
                cities.push(city);
                await AsyncStorage.setItem("savedCities", JSON.stringify(cities));
                setSaveMessage("Stad succesvol opgeslagen!");
                setSavedCities(cities);
            } else {
                setSaveMessage("Stad is al opgeslagen.");
            }
        } catch (error) {
            console.error(error);
            setSaveMessage("Er is een fout opgetreden bij het opslaan van de stad.");
        }
    };

    const handleCityPress = (city) => {
        setCity(city);
        setShowSearchBar(false);
    };

    const getBackgroundColor = () => {
        if (!weatherData) return "#E0F7FA";
        const weatherMain = weatherData.weather[0].main.toLowerCase();
        switch (weatherMain) {
            case "clear":
                return "#FFD700";
            case "clouds":
                return "#B0C4DE";
            case "rain":
                return "#87CEEB";
            case "thunderstorm":
                return "#778899";
            case "snow":
                return "#FFFAFA";
            default:
                return "#E0F7FA";
        }
    };

    useEffect(() => {
        const saveWeatherData = async () => {
            if (weatherData) {
                try {
                    await AsyncStorage.setItem("weatherData", JSON.stringify(weatherData));
                } catch (error) {
                    console.error("Error saving weather data:", error);
                }
            }
        };
        saveWeatherData();
    }, [weatherData]);

    return (
        <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
            {showSearchBar && (
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Zoek een stad op"
                        value={searchInput}
                        onChangeText={handleChange}
                        style={styles.input}
                        placeholderTextColor="#0D47A1"
                    />
                    <Pressable
                        onPress={handleSearch}
                        style={styles.searchButton}
                        disabled={!searchInput.trim()}
                    >
                        <Text style={styles.buttonText}>Zoeken</Text>
                    </Pressable>
                </View>
            )}
            {showSearchBar && savedCities.length > 0 && (
                <View style={styles.savedCitiesContainer}>
                    <FlatList
                        data={savedCities}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => handleCityPress(item)}
                                style={styles.savedCityContainer}
                            >
                                <Text style={styles.savedCity}>{item}</Text>
                            </Pressable>
                        )}
                    />
                    <Pressable
                        onPress={async () => {
                            try {
                                await AsyncStorage.removeItem("savedCities");
                                setSavedCities([]);
                            } catch (error) {
                                console.error(error);
                            }
                        }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Verwijder opgeslagen steden</Text>
                    </Pressable>
                </View>
            )}
            {weatherData && (
                <View>
                    <Weather weatherData={weatherData} dailyData={dailyData} />
                    <Pressable onPress={handleBackToSearch} style={styles.button}>
                        <Text style={styles.buttonText}>Terug naar zoeken</Text>
                    </Pressable>
                    <Pressable onPress={handleSaveCity} style={styles.button}>
                        <Text style={styles.buttonText}>Opslaan</Text>
                    </Pressable>
                    {saveMessage ? (
                        <Text style={styles.saveMessage}>{saveMessage}</Text>
                    ) : null}
                </View>
            )}
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        paddingBottom: 100,
    },
    searchContainer: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "100%",
        marginTop: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        width: "100%",
    },
    searchButton: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    saveMessage: {
        marginTop: 10,
        color: "#007BFF",
        fontWeight: "bold",
    },
    savedCitiesContainer: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "100%",
        marginTop: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    savedCityContainer: {
        backgroundColor: "#E3F2FD",
        padding: 15,
        marginVertical: 8,
        alignItems: "center",
    },
    savedCity: {
        fontSize: 18,
        color: "#0D47A1",
        fontWeight: "bold",
    },
});