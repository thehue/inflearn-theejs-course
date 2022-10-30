import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Color,
  DirectionalLight,
  MeshStandardMaterial
} from 'three';

// ----- 주제: 브라우저 창 사이즈 변경에 대응하기

export default function example() {
  //Renderer
  const canvas = document.querySelector('#three-canvas') as Element;
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  // renderer.setClearAlpha(0);
  renderer.setClearColor('blue');
  renderer.setClearAlpha(0.5);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // console.log(window.devicePixelRatio); // 2
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // 해상도 높이기

  // Scene
  const scene = new Scene();
  scene.background = new Color('pink');

  // Camera
  const fieldOfView = 75;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new PerspectiveCamera(fieldOfView, aspect, near, far);

  camera.position.set(2, 2, 5);
  camera.lookAt(0, 0, 0);
  camera.zoom = 0.5;
  camera.updateProjectionMatrix();

  scene.add(camera);

  // 빛(조명, light)
  const light = new DirectionalLight(0xffffff, 0.8);
  light.position.x = 7;
  light.position.z = 2;
  scene.add(light);

  // Mesh
  const geometry = new BoxGeometry(1, 1, 1);
  // MeshBasicMaterial - 빛의 영향을 받지 않는다.
  const material = new MeshStandardMaterial({
    color: 'green'
  });
  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  renderer.render(scene, camera);

  function setSize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    // updateProjectionMatrix: 카메라 투영에 관련된 값에 변화가 있을 경우 실행해야 함.
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener('resize', setSize);
}
