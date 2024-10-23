import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';

const HERE_MAPS_API_KEY = 'QTeFVTXxItm2HRWFT6z04kee_a9voX7WX0ZTMhwgtpA';

const LocationScreen = () => {
  const webViewRef = useRef(null);
  const location = useSelector((state) => state.location);

  useEffect(() => {
    if (webViewRef.current && location) {
      // Update the WebView with the new location
      const script = `updateLocation(${location.latitude}, ${location.longitude});`;
      webViewRef.current.injectJavaScript(script);
    }
  }, [location]);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
      <script src="https://js.api.here.com/v3/3.1/mapsjs-core.js"></script>
      <script src="https://js.api.here.com/v3/3.1/mapsjs-service.js"></script>
      <script src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"></script>
      <script src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"></script>
      <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" />
      <style>
        html, body {
          width: 100%; 
          height: 100%; 
          margin: 0;
          padding: 0;
        }
        #mapContainer {
          width: 100%;
          height: 100%;
        }
      </style>
    </head>
    <body>
      <div id="mapContainer"></div>
      <script>
        var platform = new H.service.Platform({
          apikey: '${HERE_MAPS_API_KEY}'
        });
        var defaultLayers = platform.createDefaultLayers();

        // Initialize the map with a default center
        var map = new H.Map(
          document.getElementById('mapContainer'),
          defaultLayers.raster.satellite.map,
          {
            zoom: 17,
            center: { lat: 37.7749, lng: -122.4194 },
            enableDrag: false, // Prevent map dragging
            zoomLevel: 17 // Prevent zooming
          }
        );

        // Enable map interactions
        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        // var ui = H.ui.UI.createDefault(map, defaultLayers);

        // Create a marker at the initial location
        var marker = new H.map.Marker({ lat: 37.7749, lng: -122.4194 });
        map.addObject(marker);

        // Function to update the map's center and marker position
        function updateLocation(latitude, longitude) {
          map.setCenter({ lat: latitude, lng: longitude });
          marker.setGeometry({ lat: latitude, lng: longitude });
        }
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error: ', nativeEvent);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  webview: {
    flex: 1,
  },
});

export default LocationScreen;
