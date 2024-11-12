import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { WebView } from 'react-native-webview';
import Sound from 'react-native-sound';
import { useSelector } from 'react-redux';

const HERE_MAPS_API_KEY = 'QTeFVTXxItm2HRWFT6z04kee_a9voX7WX0ZTMhwgtpA';

const AmbulanceScreen = ({ navigation }) => {
  const [count, setCount] = useState(5);
  const [showWebView, setShowWebView] = useState(false);
  const bounceValue = new Animated.Value(1);

  const accidentDetected = useSelector((state) => state.accident.accidentDetected);

  // Initialize beep sound
  const beepSound = new Sound('beep', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
    }
  });

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        playBeep();
        setCount((prevCount) => prevCount - 1);
        animateBounce();
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Countdown completed
      setShowWebView(true);
    }
  }, [count]);

  // Play beep sound
  const playBeep = () => {
    beepSound.stop();
    beepSound.play((success) => {
      if (!success) {
        console.log('Sound playback failed');
      }
    });
  };

  // Bounce animation effect
  const animateBounce = () => {
    Animated.sequence([
      Animated.timing(bounceValue, {
        toValue: 1.2,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(bounceValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Cancel button handler
  const handleCancel = () => {
    navigation.navigate('Home'); // Replace with your target screen name
  };

  // Enhanced inline HTML content for HERE Map
  const hereMapHTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HERE Maps with Local Ambulance and Person Markers</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f0f0f0;
        padding: 20px;
      }
      #map {
        width: 100%;
        height: 600px;
        max-width: 800px;
        margin-bottom: 20px;
        border: 2px solid #0073e6;
        border-radius: 8px;
      }
      #route-info {
        padding: 10px;
        background: #ffffff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        max-width: 800px;
        width: 100%;
      }
    </style>
    <script src="https://js.api.here.com/v3/3.1/mapsjs-core.js"></script>
    <script src="https://js.api.here.com/v3/3.1/mapsjs-service.js"></script>
    <script src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"></script>
    <script src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"></script>
  </head>
  <body>
    <h1>HERE Maps with Local Image Markers</h1>
    <div id="map"></div>
    <div id="route-info"></div>

    <script>
      const platform = new H.service.Platform({
        apikey: "QTeFVTXxItm2HRWFT6z04kee_a9voX7WX0ZTMhwgtpA"
      });

      const defaultLayers = platform.createDefaultLayers();
      const map = new H.Map(
        document.getElementById('map'),
        defaultLayers.raster.satellite.map,
        {
          zoom: 14,
          center: { lat: 52.5160, lng: 13.3779 }
        }
      );

      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      const ui = H.ui.UI.createDefault(map, defaultLayers);

      const router = platform.getRoutingService(null, 8);
      const routeRequestParams = {
        transportMode: 'car',
        routingMode: 'fast',
        origin: '52.5160,13.3779',
        destination: '52.5206,13.3862',
        return: 'polyline,summary'
      };

      // Define local image paths for ambulance and person markers
      const ambulanceIcon = new H.map.Icon('https://raw.githubusercontent.com/rgokul2710/fast-aid/refs/heads/main/fastAidApp/src/assets/ambulance.svg', { size: { w: 32, h: 32 } });
      const personIcon = new H.map.Icon('https://raw.githubusercontent.com/rgokul2710/fast-aid/refs/heads/main/fastAidApp/src/assets/accident.svg', { size: { w: 32, h: 32 } });

      // Add ambulance marker for the start
      const startMarker = new H.map.Marker({ lat: 52.5160, lng: 13.3779 }, { icon: ambulanceIcon });
      map.addObject(startMarker);

      // Add person marker for the destination
      const endMarker = new H.map.Marker({ lat: 52.5206, lng: 13.3862 }, { icon: personIcon });
      map.addObject(endMarker);

      function onSuccess(result) {
        if (result.routes.length === 0) {
          alert('No routes found.');
          return;
        }

        const route = result.routes[0];
        const routeShape = H.geo.LineString.fromFlexiblePolyline(route.sections[0].polyline);
        const summary = route.sections[0].summary;

        const polyline = new H.map.Polyline(routeShape, {
          style: { lineWidth: 5, strokeColor: '#0073e6' }
        });
        map.addObject(polyline);

        map.getViewModel().setLookAtData({ bounds: polyline.getBoundingBox() });

        const travelTime = (summary.duration / 60).toFixed(2);
        const travelDistance = (summary.length / 1000).toFixed(2);
        document.getElementById('route-info').innerHTML = \`
          <h3>Route Summary</h3>
          <p><strong>Travel Time:</strong> \${travelTime} minutes</p>
          <p><strong>Distance:</strong> \${travelDistance} km</p>
        \`;
      }

      function onError(error) {
        console.error('Error calculating route:', error);
        alert('Could not calculate the route. Please try again later.');
      }

      router.calculateRoute(routeRequestParams, onSuccess, onError);
    </script>
  </body>
</html>

`;

  // Display WebView if countdown finishes
  if (showWebView) {
    return (
      <WebView
        originWhitelist={['*']}
        source={{ html: hereMapHTML }}
        style={{ flex: 1 }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Call the ambulance in</Text>
      <Animated.Text style={[styles.counter, { transform: [{ scale: bounceValue }] }]}>
        {count}
      </Animated.Text>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  counter: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#d9534f',
  },
  cancelButton: {
    marginTop: 40,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#007bff',
    borderRadius: 10,
  },
  cancelButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AmbulanceScreen;
