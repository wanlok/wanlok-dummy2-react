import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { FBXLoader } from "three/examples/jsm/Addons.js";

function FloorPlan() {
  const divRef = useRef(null);

  var getLoader = function (filePath) {
    var loader = null;
    var fileExtension = null;
    const slices = filePath.split(".");
    if (slices.length > 0) {
      fileExtension = slices[slices.length - 1];
    }
    if (fileExtension == "obj") {
      console.log("OBJLoader");
      loader = new OBJLoader();
    } else if (fileExtension == "fbx") {
      console.log("FBXLoader");
      loader = new FBXLoader();
    }
    return loader;
  };

  var loadModel = function (filePath, successCallback) {
    const loader = getLoader(filePath);
    // load a resource
    loader.load(
      filePath,
      function (object) {
        successCallback(object, 20000);
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

  const fbxLoader = new FBXLoader();

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100000
  );

  const profiles = [
    [10, 40, 0],
    [20, 30, -60],
    [24, 33, -11],
    [3.8, 46.62, -33.626],
    [-11, 38, -56],
  ];

  // useEffect(function () {
  //   console.log("Hello World");

  //   var renderer = new THREE.WebGLRenderer();
  //   //     renderer.setSize(window.innerWidth, window.innerHeight);
  //   //     // document.body.appendChild( renderer.domElement );
  //   //     // use ref as a mount point of the Three.js scene instead of the document.body
  //   //     // var zoom = function (event) {
  //   //     //   camera.position.z += event.deltaY / 240;
  //   //     // };
  //   if (
  //     divRef.current &&
  //     divRef.current.children &&
  //     divRef.current.children.length == 0
  //   ) {
  //     console.log("appendChild");
  //     divRef.current.appendChild(renderer.domElement);
  //   }

  //   // const manager = new MouseEventManager(scene, camera, renderer.domElement);
  //   // console.log(manager);
  //   renderer.setPixelRatio(window.devicePixelRatio);
  //   renderer.setSize(window.innerWidth, window.innerHeight);

  //   // const controls = new OrbitControls(camera, renderer.domElement);
  //   // controls.addEventListener("change", () => {
  //   //   viewLockTimestamp = Date.now() / 1000;
  //   // });

  //   // // const axisHelper = new THREE.AxesHelper(250);
  //   // // scene.add(axisHelper);

  //   fbxLoader.load("/models/model.fbx", (obj) => {
  //     obj.scale.set(0.01, 0.01, 0.01);
  //     obj.rotateY(-Math.PI);
  //     scene.add(obj);
  //     console.log("loaded");
  //   });
  // }, []);

  useEffect(function () {
    // loadCube(function (object, z) {
    loadModel("/models/model.fbx", function (object, z) {
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
      if (
        divRef.current &&
        divRef.current.children &&
        divRef.current.children.length == 0
      ) {
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

      object.scale.set(0.01, 0.01, 0.01);
      object.rotateY(-Math.PI);

      scene.add(object);
      camera.position.z = 500;
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
        // if (!dragging) {
        //   object.rotation.x += 0.01;
        //   object.rotation.y += 0.01;
        // }
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
