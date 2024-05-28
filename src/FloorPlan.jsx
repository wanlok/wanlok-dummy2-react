import * as THREE from "three";

import { useEffect, useRef } from "react";

function FloorPlan() {
  const divRef = useRef(null);
  useEffect(() => {
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
    if (divRef.current) {
      divRef.current.appendChild(renderer.domElement);
    }
    var geometry = new THREE.BoxGeometry(3, 1, 3);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    var cube = new THREE.Mesh(geometry, material);
    var scene = new THREE.Scene();
    scene.add(cube);
    camera.position.z = 10;
    var animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
    var resize = function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (divRef.current) {
        divRef.current.removeChild(renderer.domElement);
      }
      material.dispose();
      geometry.dispose();
      renderer.dispose();
    };
  }, []);
  return <div ref={divRef}></div>;
}

export default FloorPlan;