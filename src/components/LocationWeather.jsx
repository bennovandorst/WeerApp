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
          <Text style={styles.text}>Datum: {new Date(locationData.dt * 1000).toLocaleDateString()}</Text>
          <Text style={styles.text}>Land: {locationData.sys.country}</Text>
          <Text style={styles.text}>Weersomstandigheden: {locationData.weather[0].description}</Text>
          <Text style={styles.text}>Temperatuur: {locationData.main.temp} °C</Text>
          <Text style={styles.text}>Gevoelstemperatuur: {locationData.main.feels_like} °C</Text>
          <Text style={styles.text}>Luchtvochtigheid: {locationData.main.humidity}%</Text>
          <Text style={styles.text}>Windsnelheid: {locationData.wind.speed} m/s</Text>
          <Text style={styles.text}>Zonsopgang: {new Date(locationData.sys.sunrise * 1000).toLocaleTimeString()}</Text>
          <Text style={styles.text}>Zonsondergang: {new Date(locationData.sys.sunset * 1000).toLocaleTimeString()}</Text>
          <Text style={styles.text}>Zichtbaarheid: {locationData.visibility} m</Text>
          <Text style={styles.text}>Bewolking: {locationData.clouds.all}%</Text>
          <Text style={styles.text}>Druk: {locationData.main.pressure} hPa</Text>
          <Text style={styles.text}>Minimum temperatuur: {locationData.main.temp_min} °C</Text>
          <Text style={styles.text}>Maximum temperatuur: {locationData.main.temp_max} °C</Text>
          <Text style={styles.text}>Windrichting: {locationData.wind.deg}°</Text>
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
      color: "#0D47A1"
    },
    icon: {
      width: 50,
      height: 50,
      marginLeft: 10,
    },
    text: {
      fontSize: 18,
      marginBottom: 5,
      color: "#0D47A1"
    },
  });