import React, { useRef, useCallback } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight, BoxGeometry, MeshBasicMaterial, Mesh } from "three";

const mapContainerStyle = { width: "100%", height: "500px" };
const center = { lat: 37.7749, lng: -122.4194 }; // San Francisco

export default function MapWithOverlay() {
    const mapRef = useRef();
    const glRef = useRef(null);
    const sceneRef = useRef(new Scene());
    const cameraRef = useRef(new PerspectiveCamera());
    const rendererRef = useRef();
    const cubeRef = useRef();




    const onLoad = useCallback((map) => {
        console.log('onLoad function');
        console.log(window.google.maps.WebGLOverlayView);
        mapRef.current = map;

        const webGLOverlayView = new window.google.maps.WebGLOverlayView();

        webGLOverlayView.onAdd = () => {
            console.log('add function');
            // Set up the Three.js scene, camera, and lighting
            const scene = sceneRef.current;
            const camera = cameraRef.current;

            // Position and zoom camera
            camera.position.set(0, 0, 5);

            // Add lighting
            const ambientLight = new AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            const directionalLight = new DirectionalLight(0xffffff, 0.5);
            directionalLight.position.set(1, 1, 1).normalize();
            scene.add(directionalLight);

            // Create a simple cube
            const geometry = new BoxGeometry(1, 1, 1);
            const material = new MeshBasicMaterial({ color: 0x0077ff });
            const cube = new Mesh(geometry, material);
            scene.add(cube);
            cubeRef.current = cube;
        };

        webGLOverlayView.onContextRestored = ({ gl }) => {
            glRef.current = gl;

            // Initialize WebGLRenderer with the map's WebGL context
            const renderer = new WebGLRenderer({ canvas: gl.canvas, context: gl });
            renderer.autoClear = false;
            rendererRef.current = renderer;
        };

        webGLOverlayView.draw = ({ timestamp }) => {
            const gl = glRef.current;
            const renderer = rendererRef.current;
            const scene = sceneRef.current;
            const camera = cameraRef.current;
            const cube = cubeRef.current;

            if (!gl || !renderer || !scene || !camera || !cube) return;

            // Rotate the cube over time
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            // Clear the canvas and render the scene
            renderer.clear();
            renderer.render(scene, camera);
        };

        webGLOverlayView.onRemove = () => {
            // Clean up Three.js objects
            sceneRef.current.clear();
            rendererRef.current.dispose();
            glRef.current = null;
        };

        webGLOverlayView.setMap(map);
    }, []);

    return (
        <LoadScript googleMapsApiKey="AIzaSyDC1rdf12jCvTnZg1IeHBHWD1DRJhAhk8w">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                mapTypeId="satellite"
            />
        </LoadScript>
    );
}
