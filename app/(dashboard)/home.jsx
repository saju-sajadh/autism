import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Animated, { BounceIn } from 'react-native-reanimated';
import { router } from 'expo-router';
import { ResizeMode, Video } from 'expo-av';
import { useAuth } from '@clerk/clerk-expo';

const HomeScreen = () => {

  const video = useRef(null);
  const { signOut } = useAuth()

  const sections = [
    { name: 'Monitoring', screen: 'MonitoringScreen', color: '#E3F2FD' },
    { name: 'Settings', screen: 'SettingsScreen', color: '#FFCDD2' },
    { name: 'Data Center', screen: 'DataCenterScreen', color: '#C8E6C9' },
    { name: 'Reports', screen: 'ReportsScreen', color: '#FFF9C4' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Autism Monitoring</Text>
      <ScrollView>
        <View style={styles.gridContainer}>
          {sections.map((section, index) => (
            <Animated.View
              key={index}
              entering={BounceIn.delay(index * 100)} // Animation for each section
              style={[styles.animatedTouchable, { backgroundColor: section.color }]}
            >
              <TouchableOpacity onPress={() => {
                signOut().then(()=>{
                  router.replace('/')
                })
              }}>
                <Text style={styles.sectionText}>{section.name}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
        <View style={styles.videoContainer}>
          <Video
            ref={video}
            style={styles.video}
            source={require('../../assets/images/animated.mp4')}
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay={true}
      />
        </View>
        <View style={styles.videoContainer}>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
            }}
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay={true}
      />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingVertical: 50,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  animatedTouchable: {
    width: '45%',
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  videoContainer: {
    marginTop: 30,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
