import * as THREE from "three";
import gsap from "gsap";
import { themes, getTheme, type ThemeId } from "./Themes";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createGlassRibbon, type RibbonControls } from "./GlassRibbon";

export type World = {
  dispose: () => void;
  reimagine: (theme?: ThemeId) => void;
  render: () => void;
  ribbon: RibbonControls;
};

export function createWorld(
  canvas: HTMLCanvasElement,
  root: HTMLElement,
  reduced: boolean,
  onReady: () => void,
): World {
  const mobile = matchMedia("(max-width: 767px)").matches;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  const gl = renderer.getContext(),
    debug = gl.getExtension("WEBGL_debug_renderer_info");
  const software = debug
    ? /swiftshader|llvmpipe|software/i.test(
        String(gl.getParameter(debug.UNMASKED_RENDERER_WEBGL)),
      )
    : false;
  const constrained = mobile || software || navigator.hardwareConcurrency <= 4;
  renderer.setPixelRatio(
    Math.min(devicePixelRatio, software ? 0.9 : constrained ? 1.25 : 1.65),
  );
  renderer.setClearColor(0, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    mobile ? 48 : 38,
    innerWidth / innerHeight,
    0.1,
    60,
  );
  camera.position.z = 12;
  const capture = new THREE.WebGLRenderTarget(256, 256, {
    depthBuffer: false,
    samples: 4,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
  });
  const ribbon = createGlassRibbon(constrained, capture.texture);
  const heroShape = {
    shape: 0,
    width: 1,
    stretch: 1,
    twist: 0,
  };
  Object.assign(ribbon.controls, heroShape);
  const group = new THREE.Group();
  group.add(ribbon.creature);
  scene.add(group);
  // A second compositing layer lets positive-depth portions cross DOM typography.
  // The WebGL scene remains one renderer; only the foreground is copied to 2D.
  const foreground = document.createElement("canvas");
  foreground.className = "ribbon-foreground";
  foreground.setAttribute("aria-hidden", "true");
  // Prepare the complete ribbon behind the loader before its exit begins.
  root.appendChild(foreground);
  const composite = foreground.getContext("2d", { alpha: true });
  const initialTheme = getTheme(root.dataset.theme);
  let themeId = initialTheme.id;
  const rgb = (hex: string) => new THREE.Color(hex).convertLinearToSRGB();
  ribbon.uniforms.uGlassTint.value.copy(rgb(initialTheme.ribbon));
  const paletteColors = {
    top: rgb(initialTheme.top),
    bottom: rgb(initialTheme.bottom),
    ribbon: ribbon.uniforms.uGlassTint.value,
    edge: ribbon.uniforms.uEdgeTint.value,
  };
  const backdropUniforms = {
    uTop: { value: paletteColors.top },
    uBottom: { value: paletteColors.bottom },
    uTime: { value: 0 },
    uDark: { value: 0 },
    uTint: { value: 0 },
    uAspect: { value: innerWidth / innerHeight },
  };
  const backdropMaterial = new THREE.ShaderMaterial({
    uniforms: backdropUniforms,
    depthTest: false,
    depthWrite: false,
    vertexShader:
      "varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,.999,1.);}",
    fragmentShader: `precision highp float;varying vec2 vUv;uniform float uTime;uniform float uDark;uniform float uAspect;uniform vec3 uTop;uniform vec3 uBottom;
      float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
      void main(){vec2 p=vUv;float cloud=sin(p.x*5.+p.y*3.+uTime*.05)*.5+.5;
        vec3 light=mix(uBottom,uTop,p.y);light+=cloud*.015;
        vec3 color=mix(light,vec3(.0196078,.0196078,.0235294),uDark);
        color+=(hash(gl_FragCoord.xy)-.5)*.006*(1.-uDark);gl_FragColor=vec4(color,1.);
      }`,
  });
  const backdrop = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    backdropMaterial,
  );
  backdrop.renderOrder = -100;
  backdrop.frustumCulled = false;
  scene.add(backdrop);
  const state = {
    x: mobile ? 0 : 2.3,
    y: mobile ? 0.1 : 0.65,
    z: 0,
    rx: 0.06,
    ry: -0.2,
    rz: -0.18,
    scale: mobile ? 0.56 : 0.9,
    cameraZ: 12,
    dark: 0,
  };

  const pointer = { x: 0, y: 0 },
    smooth = { x: 0, y: 0 };
  let dead = false,
    visible = !document.hidden,
    last = 0,
    frame = 0;
  const render = () => {
    if (dead || !visible) return;
    const seconds = reduced ? 0 : performance.now() / 1000;
    smooth.x += (pointer.x - smooth.x) * 0.035;
    smooth.y += (pointer.y - smooth.y) * 0.035;
    group.position.set(
      state.x + smooth.x * 0.22,
      state.y + (reduced ? 0 : Math.sin(seconds * 0.35) * 0.07),
      state.z,
    );
    group.rotation.set(
      state.rx + smooth.y * 0.08,
      state.ry + smooth.x * 0.09,
      state.rz,
    );
    group.scale.setScalar(state.scale);
    camera.position.z = state.cameraZ;
    camera.lookAt(0, 0, 0);
    ribbon.update(seconds, 0);
    backdropUniforms.uTime.value = seconds;
    backdropUniforms.uDark.value = state.dark;
    ribbon.uniforms.uDark.value = state.dark;
    ribbon.uniforms.uUnified.value =
      1 - THREE.MathUtils.smoothstep(ribbon.controls.shape, 0, 0.8);

    // Refraction buffer includes atmosphere and inner filaments, never the shell itself.
    ribbon.shell.visible = false;
    ribbon.uniforms.uLayer.value = 2;
    backdrop.visible = true;
    renderer.setRenderTarget(capture);
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
    ribbon.shell.visible = true;
    ribbon.uniforms.uLayer.value = 1;
    backdrop.visible = false;
    renderer.render(scene, camera);
    if (composite) {
      composite.clearRect(0, 0, foreground.width, foreground.height);
      composite.drawImage(canvas, 0, 0, foreground.width, foreground.height);
    }
    ribbon.uniforms.uLayer.value = 0;
    backdrop.visible = true;
    renderer.render(scene, camera);
  };
  const tick = (time: number) => {
    if (dead || !visible || (constrained && time - last < 1 / 30)) return;
    last = time;
    render();
  };
  const resize = () => {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    const dimensions = new THREE.Vector2();
    renderer.getDrawingBufferSize(dimensions);
    foreground.width = dimensions.x;
    foreground.height = dimensions.y;
    ribbon.uniforms.uResolution.value.copy(dimensions);
    backdropUniforms.uAspect.value = camera.aspect;
    const width = Math.min(software ? 512 : mobile ? 512 : 1024, innerWidth);
    capture.setSize(width, Math.round(width / camera.aspect));
    render();
  };
  const move = (event: PointerEvent) => {
    if (reduced || event.pointerType !== "mouse") return;
    pointer.x = event.clientX / innerWidth - 0.5;
    pointer.y = event.clientY / innerHeight - 0.5;
  };
  const visibility = () => {
    visible = !document.hidden;
    if (visible) render();
  };
  const context = gsap.context(() => {
    if (reduced) {
      const beginning = { ...state };
      ScrollTrigger.create({
        trigger: "#home",
        start: "top top",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) {
            Object.assign(state, beginning);
            Object.assign(ribbon.controls, heroShape);
            render();
          }
        },
      });
    }
    const chapters = [
      {
        id: "#story",
        x: mobile ? 0 : -2.1,
        y: mobile ? 1.2 : 0.2,
        rx: 0.04,
        ry: -0.06,
        rz: 0,
        scale: mobile ? 0.53 : 0.83,
        cameraZ: mobile ? 12 : 11.6,
        dark: 0,
        shape: 1,
        width: 1,
        stretch: 1,
        twist: 0,
      },
      {
        id: "#components",
        x: mobile ? 0 : 2.25,
        y: mobile ? 1.6 : 0.45,
        rx: 0.04,
        ry: -0.06,
        rz: 0,
        scale: mobile ? 0.46 : 0.85,
        cameraZ: mobile ? 12 : 12.3,
        dark: 0,
        shape: 2,
        width: 1,
        stretch: 1,
        twist: 0,
      },
      {
        id: "#interfaces",
        x: mobile ? 0 : -2.3,
        y: mobile ? 1.5 : 0.2,
        rx: 0,
        ry: 0,
        rz: 0,
        scale: mobile ? 0.5 : 0.86,
        cameraZ: 12,
        dark: 0.08,
        shape: 3,
        width: 1,
        stretch: 1,
        twist: 0,
      },
      {
        id: "#work",
        x: 0,
        y: mobile ? 1 : 0.15,
        rx: 0.05,
        ry: 0,
        rz: 0,
        scale: mobile ? 0.49 : 1.18,
        cameraZ: mobile ? 12 : 12.4,
        dark: 1,
        shape: 4,
        width: 1,
        stretch: 1,
        twist: 0,
      },
      {
        id: "#about",
        x: mobile ? 0 : 3.1,
        y: mobile ? 1.5 : 0.5,
        rx: 0,
        ry: 0,
        rz: 0,
        scale: mobile ? 0.6 : 0.77,
        cameraZ: 12,
        dark: 0,
        shape: 5,
        width: 1,
        stretch: 1,
        twist: 0,
      },
      {
        id: "#contact",
        x: 0,
        y: mobile ? 2.7 : 2.3,
        rx: 0.1,
        ry: 0,
        rz: 0.12,
        scale: mobile ? 0.53 : 1.2,
        cameraZ: mobile ? 12 : 11.7,
        dark: 1,
        shape: 6,
        width: 0.75,
        stretch: 1.2,
        twist: 0.12,
      },
    ];
    let previousState = { ...state },
      previousShape = { ...heroShape };
    for (const chapter of chapters) {
      const { id, shape, width, stretch, twist, ...pose } = chapter;
      const target = { shape, width, stretch, twist };
      if (reduced) {
        ScrollTrigger.create({
          trigger: id,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              Object.assign(state, pose);
              Object.assign(ribbon.controls, target);
              render();
            }
          },
        });
      } else {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: id,
            start: "top bottom",
            end: mobile ? "top 20%" : "top 15%",
            scrub: 1.05,
          },
        });
        timeline.fromTo(
          state,
          previousState,
          { ...pose, duration: 1, ease: "none", immediateRender: false },
          0,
        );
        timeline.fromTo(
          ribbon.controls,
          previousShape,
          { ...target, duration: 1, ease: "none", immediateRender: false },
          0,
        );
      }
      previousState = { ...state, ...pose };
      previousShape = target;
    }
    // Drift between the actual practice screen positions while retaining the same mesh.
    const practices = root.querySelectorAll<HTMLElement>(".practice");
    if (
      !reduced &&
      root.querySelector<HTMLElement>("#work")?.dataset.horizontal !== "true"
    )
      practices.forEach((practice, index) => {
        gsap.to(state, {
          y: mobile ? 1 : 0.6 - index * 0.55,
          rz: index % 2 ? 0.06 : -0.06,
          immediateRender: false,
          ease: "none",
          scrollTrigger: {
            trigger: practice,
            start: "top 75%",
            end: "top 30%",
            scrub: 1,
          },
        });
      });
  }, root);
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", move, { passive: true });
  document.addEventListener("visibilitychange", visibility);
  const contextLost = (event: Event) => {
    event.preventDefault();
    visible = false;
    foreground.style.opacity = "0";
    canvas.style.opacity = "0";
  };
  const contextRestored = () => {
    visible = !document.hidden;
    foreground.style.opacity = "1";
    canvas.style.opacity = "1";
    render();
  };
  canvas.addEventListener("webglcontextlost", contextLost);
  canvas.addEventListener("webglcontextrestored", contextRestored);
  // Present the first frame once, then reveal; no duplicated expensive first-frame render.
  renderer.setSize(innerWidth, innerHeight, false);
  frame = requestAnimationFrame(() => {
    resize();
    onReady();
    ScrollTrigger.refresh();
    if (!reduced) gsap.ticker.add(tick);
  });
  return {
    render,
    ribbon: ribbon.controls,
    reimagine: (id) => {
      const palette = id
        ? getTheme(id)
        : themes[
            (themes.findIndex((p) => p.id === themeId) + 1) % themes.length
          ];
      themeId = palette.id;
      const targets = {
        top: palette.top,
        bottom: palette.bottom,
        ribbon: palette.ribbon,
        edge: "#f5f9f5",
      };
      Object.entries(paletteColors).forEach(([key, color]) => {
        const target = rgb(targets[key as keyof typeof targets]);
        gsap.to(color, {
          r: target.r,
          g: target.g,
          b: target.b,
          duration: reduced ? 0 : 1.1,
          ease: "sine.inOut",
          overwrite: true,
          onUpdate: reduced ? render : undefined,
        });
      });
      if (!reduced)
        gsap.to(ribbon.controls, {
          twist: 0.55,
          duration: 1.8,
          repeat: 1,
          yoyo: true,
          ease: "sine.inOut",
        });
    },
    dispose: () => {
      dead = true;
      cancelAnimationFrame(frame);
      gsap.ticker.remove(tick);
      context.revert();
      gsap.killTweensOf(state);
      Object.values(paletteColors).forEach((color) => gsap.killTweensOf(color));
      gsap.killTweensOf(ribbon.controls);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", visibility);
      canvas.removeEventListener("webglcontextlost", contextLost);
      canvas.removeEventListener("webglcontextrestored", contextRestored);
      foreground.remove();
      const geometries = new Set<THREE.BufferGeometry>(),
        materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) geometries.add(mesh.geometry);
        if (mesh.material)
          (Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material]
          ).forEach((m) => materials.add(m));
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      capture.dispose();
      renderer.dispose();
    },
  };
}
