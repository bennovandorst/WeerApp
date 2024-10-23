import { View, Text, Image, StyleSheet } from 'react-native';

const LocationWeather = ({ locationData }) => {

    return ( 
        <>
    <View>
      {locationData && (
        <>
          <Text style={styles.title}>
            {locationData.name}
            <Image
              source={{ uri: `https://openweathermap.org/img/wn/${locationData.weather[0].icon}@2x.png` }}
              style={styles.icon}
            />
          </Text>
          <Text style={styles.text}>Temperatuur: {locationData.main.temp} °C</Text>
          <Text style={styles.text}>Gevoelstemperatuur: {locationData.main.feels_like} °C</Text>
          <Text style={styles.text}>Luchtvochtigheid: {locationData.main.humidity}%</Text>
          <Text style={styles.text}>Windsnelheid: {locationData.wind.speed} m/s</Text>
        </>
      )}
    </View>
        </>
    );
}
 
export default LocationWeather;

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