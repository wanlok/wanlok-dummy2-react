import * as THREE from "three";

import { useEffect, useRef } from "react";

function MyThree() {
  const refContainer = useRef(null);
  useEffect(() => {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    if (refContainer.current) {
        refContainer.current.appendChild(renderer.domElement);
    }
    var geometry = new THREE.BoxGeometry(3, 1, 3);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
    return () => {
        // Remove the renderer's canvas element
        if (refContainer.current) {
          refContainer.current.removeChild(renderer.domElement);
        }
        // Dispose renderer
        renderer.dispose();
      };
  }, []);
  return <div ref={refContainer}></div>;
}

export default MyThree;
