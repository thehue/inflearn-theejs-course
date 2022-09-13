import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh
} from 'three';

// 동적으로 캔버스 조립하기
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// html에서 캔버스 가져와서 시작하기
const canvas = document.querySelector('#three-canvas') as Element;
const renderer = new WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Scene
const scene = new Scene();

// Camera
const fieldOfView = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
const camera = new PerspectiveCamera(fieldOfView, aspect, near, far);

camera.position.set(1, 1, 5);
scene.add(camera);

// Mesh
const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshBasicMaterial({
  color: 'aqua'
});
const mesh = new Mesh(geometry, material);
scene.add(mesh);

// 그리기
renderer.render(scene, camera);
