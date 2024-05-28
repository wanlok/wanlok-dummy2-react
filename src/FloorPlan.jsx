import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function FloorPlan() {
  const divRef = useRef(null);
  useEffect(function () {
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
    // var zoom = function (event) {
    //   camera.position.z += event.deltaY / 240;
    // };
    if (divRef.current) {
      divRef.current.appendChild(renderer.domElement);
      // divRef.current.addEventListener("mousewheel", zoom);
    }
    var geometry = new THREE.BoxGeometry(3, 1, 3);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    var cube = new THREE.Mesh(geometry, material);
    var scene = new THREE.Scene();
    scene.add(cube);
    camera.position.z = 8;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    var dragging = false;
    var startDragging = function () {
      dragging = true;
    };
    controls.addEventListener("start", startDragging);
    var endDragging = function () {
      dragging = false;
    };
    controls.addEventListener("end", endDragging);
    // controls.touches.ONE = THREE.TOUCH.PAN; controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
    var animate = function () {
      requestAnimationFrame(animate);
      if (!dragging) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    };
    animate();
    var resize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", resize);
    return function () {
      window.removeEventListener("resize", resize);
      controls.removeEventListener("end", endDragging);
      controls.removeEventListener("start", startDragging);
      if (divRef.current) {
        // divRef.current.removeEventListener("mousewheel", zoom);
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
