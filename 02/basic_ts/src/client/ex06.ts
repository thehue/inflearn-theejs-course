import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  Mesh,
  Color,
  DirectionalLight,
  MeshStandardMaterial,
  Clock
} from 'three';

// ----- 주제: 애니메이션 기본

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

  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);
  camera.zoom = 0.5;
  camera.updateProjectionMatrix();

  scene.add(camera);

  // 빛(조명, light)
  const light = new DirectionalLight(0xffffff, 1);
  light.position.x = 1;
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

  const clock = new Clock();

  // 그리기
  function draw(): void {
    const delta = clock.getDelta(); // 시간 간격
    // 각도는 Radian을 사용
    // 360는 2파이
    mesh.position.y += delta;
    mesh.rotation.y += delta * 2;
    if (mesh.position.y > 3) {
      mesh.position.y = 0;
    }
    renderer.render(scene, camera);

    // requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw); // AR, VR 컨텐츠 만들때 setAnimationLoop를 사용해줘야한다.
  }

  function setSize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    // updateProjectionMatrix: 카메라 투영에 관련된 값에 변화가 있을 경우 실행해야 함.
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener('resize', setSize);

  draw();
}
