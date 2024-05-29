import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

function FloorPlan() {
  const divRef = useRef(null);

  var loadObjFile = function (filePath, successCallback) {
    const loader = new OBJLoader();

    // load a resource
    loader.load(
      filePath,
      function (object) {
        successCallback(object, 200);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (error) {
        console.log("Error: " + error);
      }
    );
  };

  var loadCube = function (successCallback) {
    const geometry = new THREE.BoxGeometry(3, 1, 3);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const object = new THREE.Mesh(geometry, material);
    material.dispose();
    geometry.dispose();
    successCallback(object, 10);
  };

  useEffect(function () {
    // loadCube(function (object, z) {
    loadObjFile("/models/Hexagon_case.obj", function (object, z) {
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
      if (divRef.current && divRef.current.children && divRef.current.children.length == 0) {
        divRef.current.appendChild(renderer.domElement);
        // divRef.current.addEventListener("mousewheel", zoom);
      }
      var scene = new THREE.Scene();

      // Add lighting to the scene
      const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(0, 1, 1).normalize();
      scene.add(directionalLight);

      scene.add(object);
      camera.position.z = z;
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
          object.rotation.x += 0.01;
          object.rotation.y += 0.01;
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
        if (divRef.current && divRef.current.children) {
          while (divRef.current.children.length > 0) {
            divRef.current.removeChild(renderer.domElement);
          }
        }
        renderer.dispose();
      };
    });
  }, []);
  return <div ref={divRef}></div>;
}

export default FloorPlan;
