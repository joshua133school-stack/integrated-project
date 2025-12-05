import * as THREE from 'three';

/**
 * FireflyTown - A 3D countryside experience with fireflies
 * Walk around a nighttime village and watch fireflies appear as you move
 */
class FireflyTown {
  constructor() {
    this.container = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.playerMesh = null;
    this.animationId = null;
    this.isPaused = false;
    this.clock = null;

    // Player state
    this.player = { x: 0, z: 0, speed: 0.3, isMoving: false, rotation: 0 };
    this.keys = { w: false, a: false, s: false, d: false };

    // Fireflies
    this.fireflies = [];
    this.fireflyMeshes = [];

    // Bind methods
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
  }

  addStyles() {
    if (!document.getElementById('firefly-town-styles')) {
      const style = document.createElement('style');
      style.id = 'firefly-town-styles';
      style.innerHTML = `
        .firefly-town-container {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          background: #000;
        }
        .firefly-town-container canvas {
          width: 100%;
          height: 100%;
          display: block;
        }
        .firefly-town-instructions {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          font-family: "Crimson Text", Georgia, serif;
          font-size: 16px;
          color: rgba(255, 255, 200, 0.7);
          letter-spacing: 2px;
          text-transform: lowercase;
          pointer-events: none;
          transition: opacity 2s ease;
          z-index: 10;
        }
      `;
      document.head.appendChild(style);
    }
  }

  createScene() {
    const wrapper = this.container.querySelector('.firefly-town-container');
    const w = wrapper.clientWidth || window.innerWidth;
    const h = wrapper.clientHeight || window.innerHeight;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050510);
    this.scene.fog = new THREE.Fog(0x050510, 20, 100);

    // Camera
    this.camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    this.camera.position.set(0, 8, 12);
    this.camera.lookAt(0, 0, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    wrapper.appendChild(this.renderer.domElement);

    // Ambient light
    const ambient = new THREE.AmbientLight(0x111122, 0.3);
    this.scene.add(ambient);

    // Moon light
    const moonLight = new THREE.DirectionalLight(0x6677aa, 0.4);
    moonLight.position.set(50, 100, 50);
    this.scene.add(moonLight);

    // Ground
    const groundGeo = new THREE.PlaneGeometry(200, 200);
    const groundMat = new THREE.MeshLambertMaterial({ color: 0x0a150a });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    this.scene.add(ground);

    // Create houses
    const housePositions = [
      { x: -15, z: -10 }, { x: 10, z: -18 }, { x: -22, z: 5 },
      { x: 18, z: 8 }, { x: -8, z: 15 }, { x: 25, z: -5 },
      { x: -25, z: -20 }, { x: 5, z: 22 }, { x: 20, z: 20 }
    ];
    housePositions.forEach(pos => this.createHouse(pos.x, pos.z));

    // Create trees
    for (let i = 0; i < 50; i++) {
      const tx = (Math.random() - 0.5) * 80;
      const tz = (Math.random() - 0.5) * 80;
      if (Math.abs(tx) > 5 || Math.abs(tz) > 5) {
        this.createTree(tx, tz);
      }
    }

    // Create stars
    this.createStars();

    // Create moon
    this.createMoon();

    // Create player
    this.createPlayer();

    // Clock
    this.clock = new THREE.Clock();
  }

  createHouse(x, z) {
    const group = new THREE.Group();
    const width = 3 + Math.random() * 2;
    const height = 2.5 + Math.random() * 1.5;
    const depth = 3 + Math.random() * 2;

    // House body
    const bodyGeo = new THREE.BoxGeometry(width, height, depth);
    const bodyMat = new THREE.MeshLambertMaterial({ color: 0x1a1510 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = height / 2;
    group.add(body);

    // Roof
    const roofGeo = new THREE.ConeGeometry(Math.max(width, depth) * 0.8, 2, 4);
    const roofMat = new THREE.MeshLambertMaterial({ color: 0x2a1a15 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = height + 1;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    // Window with light
    if (Math.random() > 0.3) {
      const windowGeo = new THREE.PlaneGeometry(0.8, 0.8);
      const windowMat = new THREE.MeshBasicMaterial({ color: 0xffcc66, transparent: true, opacity: 0.9 });
      const windowMesh = new THREE.Mesh(windowGeo, windowMat);
      windowMesh.position.set(0, height * 0.5, depth / 2 + 0.01);
      group.add(windowMesh);

      const windowLight = new THREE.PointLight(0xffaa44, 0.5, 8);
      windowLight.position.set(0, height * 0.5, depth / 2 + 1);
      group.add(windowLight);
    }

    group.position.set(x, 0, z);
    group.rotation.y = Math.random() * Math.PI * 2;
    this.scene.add(group);
  }

  createTree(x, z) {
    const group = new THREE.Group();
    const trunkHeight = 1.5 + Math.random() * 1;
    const canopyRadius = 1.5 + Math.random() * 1;

    const trunkGeo = new THREE.CylinderGeometry(0.15, 0.2, trunkHeight, 8);
    const trunkMat = new THREE.MeshLambertMaterial({ color: 0x1a1008 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = trunkHeight / 2;
    group.add(trunk);

    const canopyGeo = new THREE.SphereGeometry(canopyRadius, 8, 6);
    const canopyMat = new THREE.MeshLambertMaterial({ color: 0x0a1a0a });
    const canopy = new THREE.Mesh(canopyGeo, canopyMat);
    canopy.position.y = trunkHeight + canopyRadius * 0.6;
    group.add(canopy);

    group.position.set(x, 0, z);
    this.scene.add(group);
  }

  createStars() {
    const starGeo = new THREE.BufferGeometry();
    const starPositions = [];
    for (let i = 0; i < 500; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.4;
      const r = 150;
      starPositions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi) + 20,
        r * Math.sin(phi) * Math.sin(theta)
      );
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffee, size: 0.5, sizeAttenuation: true });
    const stars = new THREE.Points(starGeo, starMat);
    this.scene.add(stars);
  }

  createMoon() {
    const moonGeo = new THREE.SphereGeometry(5, 32, 32);
    const moonMat = new THREE.MeshBasicMaterial({ color: 0xffffdd });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    moon.position.set(60, 80, -80);
    this.scene.add(moon);
  }

  createPlayer() {
    const group = new THREE.Group();

    // Body
    const bodyGeo = new THREE.CylinderGeometry(0.3, 0.3, 1, 12);
    const bodyMat = new THREE.MeshLambertMaterial({ color: 0x2a2a3a });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.7;
    group.add(body);

    // Head
    const headGeo = new THREE.SphereGeometry(0.28, 16, 12);
    const headMat = new THREE.MeshLambertMaterial({ color: 0x3a3a4a });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 1.45;
    group.add(head);

    // Lantern light
    const lanternLight = new THREE.PointLight(0xffdd99, 1, 12);
    lanternLight.position.set(0.4, 0.8, 0);
    group.add(lanternLight);

    this.playerMesh = group;
    this.playerMesh.position.set(0, 0, 0);
    this.scene.add(this.playerMesh);
  }

  spawnFirefly() {
    if (this.fireflies.length < 100) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 2 + Math.random() * 4;
      const firefly = {
        x: this.player.x + Math.cos(angle) * dist,
        y: 0.5 + Math.random() * 2,
        z: this.player.z + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.02,
        vy: 0.01 + Math.random() * 0.02,
        vz: (Math.random() - 0.5) * 0.02,
        life: 1,
        decay: 0.003 + Math.random() * 0.004,
        pulse: Math.random() * Math.PI * 2
      };

      const fireflyGeo = new THREE.SphereGeometry(0.08, 8, 6);
      const fireflyMat = new THREE.MeshBasicMaterial({ color: 0xffff66, transparent: true, opacity: 1 });
      const fireflyMesh = new THREE.Mesh(fireflyGeo, fireflyMat);
      fireflyMesh.position.set(firefly.x, firefly.y, firefly.z);

      const glowLight = new THREE.PointLight(0xaaff44, 0.3, 3);
      fireflyMesh.add(glowLight);

      this.scene.add(fireflyMesh);
      this.fireflies.push(firefly);
      this.fireflyMeshes.push(fireflyMesh);
    }
  }

  updatePlayer() {
    let dx = 0, dz = 0;
    if (this.keys.w) dz -= 1;
    if (this.keys.s) dz += 1;
    if (this.keys.a) dx -= 1;
    if (this.keys.d) dx += 1;

    this.player.isMoving = (dx !== 0 || dz !== 0);

    if (this.player.isMoving) {
      const len = Math.sqrt(dx * dx + dz * dz);
      this.player.x += (dx / len) * this.player.speed;
      this.player.z += (dz / len) * this.player.speed;
      this.player.rotation = Math.atan2(dx, dz);

      if (Math.random() < 0.3) {
        this.spawnFirefly();
      }
    }

    if (this.playerMesh) {
      this.playerMesh.position.x = this.player.x;
      this.playerMesh.position.z = this.player.z;
      this.playerMesh.rotation.y = this.player.rotation;
    }

    // Third-person camera follow
    const targetCamX = this.player.x;
    const targetCamZ = this.player.z + 12;
    const targetCamY = 8;
    this.camera.position.x += (targetCamX - this.camera.position.x) * 0.05;
    this.camera.position.z += (targetCamZ - this.camera.position.z) * 0.05;
    this.camera.position.y += (targetCamY - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.player.x, 1, this.player.z);
  }

  updateFireflies() {
    for (let i = this.fireflies.length - 1; i >= 0; i--) {
      const f = this.fireflies[i];
      f.x += f.vx;
      f.y += f.vy;
      f.z += f.vz;
      f.vx += (Math.random() - 0.5) * 0.005;
      f.vz += (Math.random() - 0.5) * 0.005;
      f.pulse += 0.1;
      f.life -= f.decay;

      const mesh = this.fireflyMeshes[i];
      mesh.position.set(f.x, f.y, f.z);
      const pulse = 0.5 + Math.sin(f.pulse) * 0.5;
      mesh.material.opacity = f.life * pulse;
      if (mesh.children[0]) mesh.children[0].intensity = 0.3 * f.life * pulse;

      if (f.life <= 0) {
        this.scene.remove(mesh);
        mesh.geometry.dispose();
        mesh.material.dispose();
        this.fireflies.splice(i, 1);
        this.fireflyMeshes.splice(i, 1);
      }
    }
  }

  gameLoop() {
    if (this.isPaused) {
      this.animationId = requestAnimationFrame(this.gameLoop);
      return;
    }
    this.updatePlayer();
    this.updateFireflies();
    this.renderer.render(this.scene, this.camera);
    this.animationId = requestAnimationFrame(this.gameLoop);
  }

  handleKeyDown(e) {
    const key = e.key.toLowerCase();
    if (key === 'w' || key === 'arrowup') this.keys.w = true;
    if (key === 's' || key === 'arrowdown') this.keys.s = true;
    if (key === 'a' || key === 'arrowleft') this.keys.a = true;
    if (key === 'd' || key === 'arrowright') this.keys.d = true;
  }

  handleKeyUp(e) {
    const key = e.key.toLowerCase();
    if (key === 'w' || key === 'arrowup') this.keys.w = false;
    if (key === 's' || key === 'arrowdown') this.keys.s = false;
    if (key === 'a' || key === 'arrowleft') this.keys.a = false;
    if (key === 'd' || key === 'arrowright') this.keys.d = false;
  }

  handleResize() {
    if (this.renderer && this.camera && this.container) {
      const wrapper = this.container.querySelector('.firefly-town-container');
      let w = wrapper ? wrapper.clientWidth : window.innerWidth;
      let h = wrapper ? wrapper.clientHeight : window.innerHeight;
      if (w === 0) w = window.innerWidth;
      if (h === 0) h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    }
  }

  // Public API (matches legacy interface)
  init(parentElement) {
    this.container = parentElement;
    this.addStyles();

    this.container.innerHTML = `
      <div class="firefly-town-container">
        <div class="firefly-town-instructions">use wasd or arrow keys to walk</div>
      </div>
    `;

    // Reset state
    this.player = { x: 0, z: 0, speed: 0.3, isMoving: false, rotation: 0 };
    this.fireflies = [];
    this.fireflyMeshes = [];

    window.addEventListener('resize', this.handleResize);
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);

    // Create scene after DOM is ready
    setTimeout(() => {
      this.createScene();
      this.isPaused = false;
      this.gameLoop();
    }, 100);

    // Fade out instructions
    setTimeout(() => {
      const instr = this.container.querySelector('.firefly-town-instructions');
      if (instr) instr.style.opacity = '0';
    }, 5000);
  }

  start() {
    this.isPaused = false;
  }

  dispose() {
    this.isPaused = true;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    if (this.renderer) this.renderer.dispose();
    this.fireflies = [];
    this.fireflyMeshes = [];
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    if (this.container) this.container.innerHTML = '';
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }
}

// Export as both ES module and create legacy-compatible instance
export default FireflyTown;

// Create singleton instance for legacy compatibility
export const fireflyTownInstance = new FireflyTown();
