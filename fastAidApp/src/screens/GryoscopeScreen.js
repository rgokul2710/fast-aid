import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet } from 'react-native';
import { gyroscope, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { useSelector } from 'react-redux';

export default function Gyroscope() {
  const rotation = useSelector((state) => state.gyro);

  const htmlContent = `
    <html>
      <head>
        <style>
          body { margin: 0; overflow: hidden; }
          canvas { display: block; }
        </style>
      </head>
      <body>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/OBJLoader.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/MTLLoader.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
        <script>
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
          const renderer = new THREE.WebGLRenderer({ alpha: true });
          renderer.setSize(window.innerWidth, window.innerHeight);
          document.body.appendChild(renderer.domElement);

          // Add lighting
          const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
          scene.add(ambientLight);

          const pointLight = new THREE.PointLight(0xffffff, 1);
          pointLight.position.set(0, 0, 3);
          scene.add(pointLight);

          let object;
          const mtlLoader = new THREE.MTLLoader();
          mtlLoader.load(
            'https://raw.githubusercontent.com/rgokul2710/fast-aid/refs/heads/main/fastAidApp/src/assets/materials.mtl',
            (materials) => {
              materials.preload();
              const objLoader = new THREE.OBJLoader();
              objLoader.setMaterials(materials);
              objLoader.load(
                'https://raw.githubusercontent.com/rgokul2710/fast-aid/refs/heads/main/fastAidApp/src/assets/model.obj',
                (loadedObject) => {
                  object = loadedObject;
                  object.scale.set(3, 3, 3);
                  object.rotation.y = Math.PI;
                  scene.add(object);
                  camera.position.z = 3;
                }
              );
            }
          );

          const controls = new THREE.OrbitControls(camera, renderer.domElement);
          controls.enableZoom = false;
          controls.enablePan = false;
          controls.enableRotate = false;

          function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
          }

          animate();

          // Listen for rotation data from React Native
          document.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            if (data && data.rotation && object) {
              object.rotation.x = data.rotation.x;
              object.rotation.y = data.rotation.y;
              object.rotation.z = data.rotation.z;
            }
          });

          // Send a message back to React Native
          setInterval(() => {
            if (object) {
              const rotationData = {
                x: object.rotation.x,
                y: object.rotation.y,
                z: object.rotation.z,
              };
              window.ReactNativeWebView.postMessage(JSON.stringify({ rotationData }));
            }
          }, 1000);
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
        onMessage={(event) => {
          const data = JSON.parse(event.nativeEvent.data);
        }}
        ref={(webview) => {
          if (webview && rotation) {
            const message = JSON.stringify({ rotation });
            webview.postMessage(message);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
