import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios'
import { useState } from 'react';

export default function About({navigation}) {
    const Stack = createNativeStackNavigator();

    const [data, setData] = useState();
  
    var apiKey = "8badaae52b3349f3ba1548f993c7a3a3";
    var type = "tesla";
    var dateFrom = "2023-09-25";
    var dateTo = "2023-09-25";
    var sortBy = "publishedAt";
    var pageSize = 5;
  
    const url = `https://newsapi.org/v2/everything?q=${type}&from=${dateFrom}&to=${dateTo}&sortBy=${sortBy}&pageSize=${pageSize}&apiKey=${apiKey}`
  
    const GrabNews = () => {
      axios.get(url)
        .then((response) => {
          console.clear();
          setData(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }


    return (
        <View>
            <Button onPress={() => GrabNews()} title="Grab Info" />
                {
                data && data.articles.map((d, index) => {
                    return(
                    <View key={index}>
                        {d.urlToImage && <Image source={d.urlToImage} width={150} height={150} alt="Image"/>}
                        <Text>{d.author}</Text>
                        <Text>{d.title}</Text>
                    </View>
                    )
                })
                }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
