import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View, Button } from 'react-native';
import { Image } from 'expo-image';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';

export default function Home({ navigation }) {
  const Stack = createNativeStackNavigator();

  const [data, setData] = useState();
  const [buttonClicked, setButtonClicked] = useState(false); // State to track button click

  var apiKey = "8badaae52b3349f3ba1548f993c7a3a3";
  var type = "tesla";
  var dateFrom = "2023-09-25";
  var dateTo = "2023-09-25";
  var sortBy = "publishedAt";
  var pageSize = 5;

  const url = `https://newsapi.org/v2/everything?q=${type}&from=${dateFrom}&to=${dateTo}&sortBy=${sortBy}&pageSize=${pageSize}&apiKey=${apiKey}`;

  const GrabNews = () => {
    axios
      .get(url)
      .then((response) => {
        console.clear();
        setData(response.data);
        console.log(response.data);
        setButtonClicked(true); // Set the buttonClicked state to true after clicking
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      {!buttonClicked ? ( // Only render the button if it hasn't been clicked
        <Button onPress={() => GrabNews()} title="Grab Info" />
      ) : null}
      <ScrollView>
        {data &&
          data.articles.map((d, index) => {
            return (
              <View key={index}>
                <View style={styles.imageContainer}>
                  {d.urlToImage && (
                    <Image
                      source={d.urlToImage}
                      width={200}
                      height={200}
                      style={styles.image}
                      alt="Image"
                    />
                  )}
                </View>
                <Text style={styles.author}>{d.author}</Text>
                <Text style={styles.title}>{d.title}</Text>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll',
    padding: 10,
  },
  author: {
    fontSize: 16,
    color: 'gray',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 5,
  },
});
