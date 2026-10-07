import * as THREE from "three";

export type RibbonControls = {
  shape: number;
  flow: number;
  twist: number;
  width: number;
  stretch: number;
};

/** One swept, closed glass strip. Every pose has identical vertex topology. */
export function createGlassRibbon(constrained: boolean, buffer: THREE.Texture) {
  const creature = new THREE.Group();
  const controls: RibbonControls = {
    shape: 0,
    flow: 1,
    twist: 0,
    width: 1,
    stretch: 1,
  };
  const flowerPoints = Array.from({ length: 97 }, (_, i) => {
    const angle = -Math.PI / 2 + (i / 96) * Math.PI * 2;
    const radius = 1.55 + 0.58 * Math.cos(5 * (angle + Math.PI / 2));
    return new THREE.Vector3(
      radius * Math.cos(angle),
      radius * Math.sin(angle) + 0.4,
      0.13 * Math.sin(angle * 5),
    );
  });
  flowerPoints.push(
    new THREE.Vector3(-0.08, -2.1, 0),
    new THREE.Vector3(0.52, -2.1, 0.05),
    new THREE.Vector3(0.62, -2.45, 0.1),
    new THREE.Vector3(0, -2.35, 0),
    new THREE.Vector3(-0.08, -2.85, 0),
  );
  // The same continuous strip sweeps through tapered lashes, lids and iris.
  const eyePoints: THREE.Vector3[] = [];
  const eyeWidths: number[] = [];
  const eyePoint = (point: THREE.Vector3, width = 1) => {
    eyePoints.push(point);
    eyeWidths.push(width);
  };
  const upperLashes = new Set([5, 10, 15, 65, 70, 75]);
  for (let i = 0; i <= 80; i++) {
    const angle = Math.PI / 2 + (i / 80) * Math.PI * 2;
    const base = new THREE.Vector3(
      3.55 * Math.cos(angle),
      2.1 * Math.sin(angle) * Math.pow(Math.abs(Math.sin(angle)), 0.35),
      0.12 * Math.cos(angle * 2),
    );
    eyePoint(base);
    if (upperLashes.has(i)) {
      const direction = new THREE.Vector3(base.x * 0.19, 1, 0.08).normalize();
      const tangent = new THREE.Vector3(
        -Math.sin(angle),
        Math.cos(angle),
        0,
      ).normalize();
      const length = 0.66;
      eyePoint(base.clone().addScaledVector(direction, length * 0.5), 0.42);
      eyePoint(
        base
          .clone()
          .addScaledVector(direction, length)
          .addScaledVector(tangent, 0.13),
        0.09,
      );
      eyePoint(
        base
          .clone()
          .addScaledVector(direction, length * 0.4)
          .addScaledVector(tangent, 0.09),
        0.32,
      );
      eyePoint(base.clone().addScaledVector(tangent, 0.08), 0.8);
    }
  }
  eyePoint(new THREE.Vector3(-0.35, 2.03, -0.08));
  eyePoint(new THREE.Vector3(-0.42, 1.7, 0.02));
  eyePoint(new THREE.Vector3(-0.2, 1.4, 0.12));
  for (let i = 0; i <= 96; i++) {
    const t = i / 96;
    const angle = Math.PI / 2 - t * Math.PI * 4;
    // Hold the outer iris round, then smoothly tighten into the pupil.
    const progress = THREE.MathUtils.smoothstep(t, 0.4, 0.8);
    const radius = THREE.MathUtils.lerp(1.36, 0.43, progress);
    eyePoint(
      new THREE.Vector3(
        radius * Math.cos(angle),
        radius * Math.sin(angle),
        0.16 + 0.12 * progress,
      ),
    );
  }
  const curves = [
    new THREE.CatmullRomCurve3(
      [
        [-3.5, 1.8, -0.8],
        [-2, 2.1, 0.4],
        [-0.4, 1.25, 1.2],
        [1.6, 1.5, -0.6],
        [3, 0.35, -0.8],
        [1.65, -0.6, 1],
        [0.05, -1.1, -0.7],
        [-1.65, -1.8, 0.8],
        [-0.8, -2.5, 1.1],
        [1.8, -2.1, -0.7],
      ].map((p) => new THREE.Vector3(...p)),
    ),
    // A continuous lightbulb contour and filament: curiosity taking shape.
    new THREE.CatmullRomCurve3(
      [
        [-0.34, -1.95, 0],
        [-0.65, -1.65, 0],
        [0.55, -1.5, 0.05],
        [-0.55, -1.25, 0.03],
        [0.48, -1.05, 0],
        [0.55, -0.85, 0],
        [0.95, -0.5, 0],
        [1.4, 0.35, 0.1],
        [1.15, 1.35, 0.1],
        [0, 1.95, 0],
        [-1.15, 1.35, 0.1],
        [-1.4, 0.35, 0.1],
        [-0.95, -0.5, 0],
        [-0.55, -0.85, 0],
        [-0.45, -0.25, 0.03],
        [0, 0.3, 0.15],
        [0.45, -0.25, 0.03],
        [0.34, -0.8, 0],
      ].map((p) => new THREE.Vector3(...p)),
    ),
    new THREE.CatmullRomCurve3(flowerPoints),
    roundedFrame(),
    new THREE.CatmullRomCurve3(eyePoints),
    new THREE.CatmullRomCurve3(
      [
        [-2.4, -1.25, 0],
        [-1.5, 1.25, 0],
        [-0.6, -1.25, 0],
        [-0.95, -0.2, 0],
        [-2.03, -0.2, 0],
        [-0.95, -0.2, 0.03],
        [-0.6, -1.25, 0],
        [0.05, -1.25, 0],
        [0.05, 1.25, 0],
        [1.05, -0.35, 0],
        [2.05, 1.25, 0],
        [2.05, -1.25, 0],
      ].map((p) => new THREE.Vector3(...p)),
      false,
      "centripetal",
      0.1,
    ),
  ];
  const segments = constrained ? 260 : 460,
    around = constrained ? 32 : 48;
  const geometry = new THREE.BufferGeometry();
  const indices: number[] = [],
    uv: number[] = [];
  const positionNames = [
    "position",
    "aIdea",
    "aFlower",
    "aFrame",
    "aWeave",
    "aAM",
  ];
  const centerNames = [
    "aCenter",
    "aIdeaCenter",
    "aFlowerCenter",
    "aFrameCenter",
    "aWeaveCenter",
    "aAMCenter",
  ];
  const normalNames = [
    "normal",
    "aIdeaNormal",
    "aFlowerNormal",
    "aFrameNormal",
    "aWeaveNormal",
    "aAMNormal",
  ];
  curves.forEach((curve, pose) => {
    // Dense arc-length lookup avoids uneven sampling and scalloped reflections.
    curve.arcLengthDivisions = 4096;
    curve.updateArcLengths();
    const positions: number[] = [],
      centers: number[] = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments,
        center = curve.getPointAt(t),
        tangent = curve
          .getTangentAt(Math.min(0.99999, Math.max(0.00001, t)))
          .normalize();
      let side = new THREE.Vector3()
        .crossVectors(tangent, new THREE.Vector3(0, 0, 1))
        .normalize();
      const angle = pose !== 0 ? 0 : t * Math.PI * 3.2 + Math.sin(t * 9) * 0.35;
      side.applyAxisAngle(tangent, angle);
      const normal = new THREE.Vector3()
        .crossVectors(tangent, side)
        .normalize();
      const taper = 0.16 + 0.84 * Math.pow(Math.sin(Math.PI * t), 0.24);
      const eyeIndex =
        pose === 4 ? curve.getUtoTmapping(t, 0) * (eyeWidths.length - 1) : 0;
      const eyeFloor = Math.floor(eyeIndex);
      const lashWidth =
        pose === 4
          ? THREE.MathUtils.lerp(
              eyeWidths[eyeFloor],
              eyeWidths[Math.min(eyeFloor + 1, eyeWidths.length - 1)],
              eyeIndex - eyeFloor,
            )
          : 1;
      const width =
        (pose === 0
          ? 0.34
          : pose === 1
            ? 0.16
            : pose === 2
              ? 0.23
              : pose === 3
                ? 0.16
                : pose === 4
                  ? 0.17
                  : 0.18) *
        taper *
        lashWidth;
      for (let j = 0; j <= around; j++) {
        const a = (j / around) * Math.PI * 2;
        const vertex = center
          .clone()
          .addScaledVector(side, Math.cos(a) * width)
          .addScaledVector(
            normal,
            Math.sin(a) * (pose === 0 ? 0.045 : 0.065) * taper,
          );
        positions.push(vertex.x, vertex.y, vertex.z);
        centers.push(center.x, center.y, center.z);
        if (pose === 0) {
          uv.push(t, j / around);
          if (i < segments && j < around) {
            const k = i * (around + 1) + j,
              b = k + around + 1;
            indices.push(k, b, k + 1, b, b + 1, k + 1);
          }
        }
      }
    }
    geometry.setAttribute(
      positionNames[pose],
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setAttribute(
      centerNames[pose],
      new THREE.Float32BufferAttribute(centers, 3),
    );
  });
  // Differentiate the swept surface in both directions, including curvature and twist.
  // This keeps reflections smooth instead of averaging individual triangle faces.
  const along = new THREE.Vector3(),
    across = new THREE.Vector3(),
    sample = new THREE.Vector3();
  positionNames.forEach((name, pose) => {
    const positions = geometry.getAttribute(name) as THREE.BufferAttribute;
    const values = new Float32Array(positions.count * 3);
    for (let i = 0; i <= segments; i++)
      for (let j = 0; j <= around; j++) {
        const ring = j % around;
        along
          .fromBufferAttribute(
            positions,
            Math.min(segments, i + 1) * (around + 1) + ring,
          )
          .sub(
            sample.fromBufferAttribute(
              positions,
              Math.max(0, i - 1) * (around + 1) + ring,
            ),
          );
        across
          .fromBufferAttribute(
            positions,
            i * (around + 1) + ((ring + 1) % around),
          )
          .sub(
            sample.fromBufferAttribute(
              positions,
              i * (around + 1) + ((ring - 1 + around) % around),
            ),
          );
        along.cross(across).normalize();
        const offset = (i * (around + 1) + j) * 3;
        values[offset] = along.x;
        values[offset + 1] = along.y;
        values[offset + 2] = along.z;
      }
    geometry.setAttribute(
      normalNames[pose],
      new THREE.Float32BufferAttribute(values, 3),
    );
  });
  // Close the narrow ends; the frame pose joins these same rings into its seam.
  const end = segments * (around + 1);
  for (let j = 1; j < around - 1; j++)
    indices.push(0, j, j + 1, end, end + j + 1, end + j);
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();
  // Only two adjacent poses live on the GPU, keeping the attribute count below 16.
  const poses = curves.map((_, i) => ({
    position: geometry.getAttribute(positionNames[i]).array as Float32Array,
    center: geometry.getAttribute(centerNames[i]).array as Float32Array,
    normal: geometry.getAttribute(normalNames[i]).array as Float32Array,
  }));
  for (const name of [...positionNames, ...centerNames, ...normalNames])
    geometry.deleteAttribute(name);
  const active = {
    position: new THREE.Float32BufferAttribute(poses[0].position.slice(), 3),
    aNext: new THREE.Float32BufferAttribute(poses[1].position.slice(), 3),
    aCenter: new THREE.Float32BufferAttribute(poses[0].center.slice(), 3),
    aNextCenter: new THREE.Float32BufferAttribute(poses[1].center.slice(), 3),
    normal: new THREE.Float32BufferAttribute(poses[0].normal.slice(), 3),
    aNextNormal: new THREE.Float32BufferAttribute(poses[1].normal.slice(), 3),
  };
  Object.entries(active).forEach(([name, attribute]) => {
    attribute.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute(name, attribute);
  });
  let activePose = 0;
  const uniforms = {
    uShape: { value: 0 },
    uBlend: { value: 0 },
    uGlassTint: { value: new THREE.Color(0.83, 0.58, 0.79) },
    uEdgeTint: { value: new THREE.Color(1, 0.92, 0.99) },
    uTime: { value: 0 },
    uFlow: { value: 1 },
    uTwist: { value: 0 },
    uWidth: { value: 1 },
    uStretch: { value: 1 },
    uScene: { value: buffer },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uTint: { value: 0 },
    uLayer: { value: 0 },
    uDark: { value: 0 },
    uUnified: { value: 1 },
  };
  const vertexShader = `
    attribute vec3 aNext; attribute vec3 aCenter; attribute vec3 aNextCenter; attribute vec3 aNextNormal;
    uniform float uBlend; uniform float uShape; uniform float uTime; uniform float uFlow; uniform float uTwist; uniform float uWidth; uniform float uStretch; uniform float uInset;
    varying vec3 vNormal; varying vec3 vView; varying vec3 vLocal; varying vec2 vUv; varying float vDepth;
    void main(){
      vec3 center=mix(aCenter,aNextCenter,uBlend);
      vec3 surface=mix(position,aNext,uBlend);
      vec3 p=center+(surface-center)*uInset*uWidth;
      float quiet=1.;
      quiet*=1.-.9*exp(-pow((uShape-1.)*4.,2.));
      quiet*=1.-.8*exp(-pow((uShape-2.)*4.,2.));
      quiet*=1.-exp(-pow((uShape-3.)*4.,2.));
      quiet*=1.-.85*exp(-pow((uShape-4.)*4.,2.));
      quiet*=1.-exp(-pow((uShape-5.)*4.,2.));
      float wave=uTime*.65-uv.x*10.;
      p.y+=sin(wave)*.13*uFlow*quiet;
      p.z+=sin(wave*.8+uv.x*5.)*.19*uFlow*quiet;
      float angle=uTwist*sin(uv.x*6.283+uTime*.2);
      p.xz=mat2(cos(angle),-sin(angle),sin(angle),cos(angle))*p.xz;
      p.x*=uStretch;
      vec3 localNormal=mix(normal,aNextNormal,uBlend);
      localNormal.xz=mat2(cos(angle),-sin(angle),sin(angle),cos(angle))*localNormal.xz;
      localNormal.x/=uStretch;
      vNormal=normalize(normalMatrix*localNormal);
      vec4 world=modelMatrix*vec4(p,1.); vec4 view=viewMatrix*world;
      vView=view.xyz;vLocal=p;vDepth=world.z;vUv=uv;
      gl_Position=projectionMatrix*view;
    }`;
  const layer = `if(uLayer<.5 && vDepth>.35) discard; float frontFill=max(uDark,uUnified); if(uLayer>.5 && uLayer<1.5 && vDepth<=.35 && frontFill<.001) discard; float layerAlpha=uLayer<.5?1.-uUnified:((uLayer<1.5 && vDepth<=.35)?frontFill:1.);`;
  const glass = new THREE.ShaderMaterial({
    uniforms: { ...uniforms, uInset: { value: 1 } },
    vertexShader,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    fragmentShader: `
      precision highp float;
      uniform sampler2D uScene; uniform vec2 uResolution; uniform float uShape; uniform float uTint; uniform float uLayer; uniform float uDark; uniform float uUnified; uniform vec3 uGlassTint; uniform vec3 uEdgeTint;
      varying vec3 vNormal; varying vec3 vView; varying vec3 vLocal; varying vec2 vUv; varying float vDepth;
      void main(){
        ${layer}
        vec3 n=normalize(vNormal); if(!gl_FrontFacing)n=-n;
        vec3 eye=normalize(-vView); float facing=abs(dot(n,eye));float fresnel=pow(1.-facing,2.8);
        vec2 screen=gl_FragCoord.xy/uResolution;
        vec3 bend=refract(-eye,n,1./1.48);
        float thickness=.035+.09*pow(abs(sin(vUv.y*6.283)),.7);
        vec2 offset=bend.xy*thickness;
        vec3 transmitted=vec3(texture2D(uScene,clamp(screen+offset*1.045,.002,.998)).r,texture2D(uScene,clamp(screen+offset,.002,.998)).g,texture2D(uScene,clamp(screen+offset*.955,.002,.998)).b);
        vec3 reflection=reflect(-eye,n);
        float panel=pow(max(0.,1.-abs(reflection.x*.6+reflection.y*.75-.2)),24.);
        float rim=pow(max(0.,dot(reflection,normalize(vec3(-.5,.9,1.)))),14.);
        float strip=pow(max(0.,1.-abs(reflection.x*.8-reflection.y*.35+.12)),65.);
        vec3 spectral=.5+.5*cos(vec3(0.,2.1,4.2)+facing*5.+vUv.x*2.);
        vec3 tint=uGlassTint;
        vec3 color=transmitted*mix(vec3(1.),tint,.12)+tint*.015;
        float shadowPanel=pow(max(0.,1.-abs(reflection.y*.75-reflection.x*.4+.4)),14.);
        vec3 studio=mix(tint*.6+spectral*.22,mix(vec3(.13,.08,.18),vec3(.045,.15,.11),uTint),shadowPanel*.65);
        color=mix(color,studio,.045+fresnel*.39);
        color+=uEdgeTint*(panel*.36+rim*.28+strip*.2)+spectral*fresnel*.1;
        // Bright, neutral studio reflections emerge continuously with the eye pose.
        float eyeShine=exp(-pow((uShape-4.)*3.,2.));
        color+=eyeShine*vec3(1.)*(panel*.5+rim*.35+strip*.65+fresnel*.07);
        // Studio fill keeps the entire transparent contour readable over black.
        color+=uDark*(tint*.105+uEdgeTint*(.035+fresnel*.1));
        gl_FragColor=vec4(color,(.7+fresnel*.16)*layerAlpha);
      }`,
  });
  const filament = new THREE.ShaderMaterial({
    uniforms: { ...uniforms, uInset: { value: 0.055 } },
    vertexShader,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    fragmentShader: `precision highp float; uniform float uTint; uniform float uDark; uniform float uUnified; uniform vec3 uGlassTint; uniform float uLayer; varying vec3 vView;varying vec3 vLocal;varying vec2 vUv;varying float vDepth;
      void main(){${layer}float light=.4+.3*sin(vUv.x*8.);gl_FragColor=vec4(mix(uGlassTint,vec3(1.),.4),(.25+light*.15)*layerAlpha);}`,
  });
  const shell = new THREE.Mesh(geometry, glass),
    core = new THREE.Mesh(geometry, filament);
  shell.frustumCulled = core.frustumCulled = false;
  core.renderOrder = 1;
  shell.renderOrder = 2;
  creature.add(core, shell);
  return {
    creature,
    controls,
    shell,
    core,
    uniforms,
    update: (seconds: number, tint: number) => {
      const shape = THREE.MathUtils.clamp(controls.shape, 0, 6);
      const index = Math.min(5, Math.floor(shape));
      if (index !== activePose) {
        const first = poses[index],
          next = poses[(index + 1) % poses.length];
        const data = [
          first.position,
          next.position,
          first.center,
          next.center,
          first.normal,
          next.normal,
        ];
        Object.values(active).forEach((attribute, i) => {
          attribute.array.set(data[i]);
          attribute.needsUpdate = true;
        });
        activePose = index;
      }
      const blend = shape - index;
      uniforms.uBlend.value = blend * blend * (3 - 2 * blend);
      uniforms.uShape.value = shape;
      uniforms.uTime.value = seconds;
      uniforms.uFlow.value = controls.flow;
      uniforms.uTwist.value = controls.twist;
      uniforms.uWidth.value = controls.width;
      uniforms.uStretch.value = controls.stretch;
      uniforms.uTint.value = tint;
    },
  };
}

function roundedFrame() {
  const path = new THREE.CurvePath<THREE.Vector3>();
  const w = 2.55,
    h = 1.55,
    r = 0.3;
  const v = (x: number, y: number) => new THREE.Vector3(x, y, 0);
  path.add(new THREE.LineCurve3(v(-w + r, h), v(w - r, h)));
  path.add(new THREE.QuadraticBezierCurve3(v(w - r, h), v(w, h), v(w, h - r)));
  path.add(new THREE.LineCurve3(v(w, h - r), v(w, -h + r)));
  path.add(
    new THREE.QuadraticBezierCurve3(v(w, -h + r), v(w, -h), v(w - r, -h)),
  );
  path.add(new THREE.LineCurve3(v(w - r, -h), v(-w + r, -h)));
  path.add(
    new THREE.QuadraticBezierCurve3(v(-w + r, -h), v(-w, -h), v(-w, -h + r)),
  );
  path.add(new THREE.LineCurve3(v(-w, -h + r), v(-w, h - r)));
  path.add(
    new THREE.QuadraticBezierCurve3(v(-w, h - r), v(-w, h), v(-w + r, h)),
  );
  return path;
}
