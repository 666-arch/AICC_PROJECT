import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./index.less";
import gsap from "gsap";
import { Timeout } from "ahooks/lib/useRequest/src/types";

interface IProps {
  data: number[];
  colors?: string[];
  siderColor?: string[];
  active?: number;
}

const ThreePieChart: React.FC<IProps> = ({ data, colors = ["#E6C04D", "#54B9FF", "#00FF86"], siderColor, active }) => {
  const wrapper = useRef<HTMLDivElement>(null);
  const scene = useRef<THREE.Scene | null>();
  const renderer = useRef<THREE.WebGLRenderer | null>();
  const camera = useRef<THREE.PerspectiveCamera | null>(null);
  const light = useRef<THREE.AmbientLight | null>(null);
  const pies = useRef<THREE.Object3D[]>([]);
  const frameId = useRef<number | null>(null);
  const swiperIndex = useRef<number>(-1);

  const swiperInterval = useRef<Timeout | null>(null);

  useEffect(() => {
    if (wrapper.current) {
      const { clientWidth, clientHeight } = wrapper.current;
      scene.current = new THREE.Scene();
      scene.current.background = null;

      renderer.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.current.setSize(clientWidth, clientHeight);
      renderer.current.setPixelRatio(window.devicePixelRatio);

      renderer.current.shadowMap.enabled = true;

      camera.current = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 0.1, 1000);
      camera.current.position.set(0, -90, 45);
      camera.current.lookAt(0, 0, 0);

      if (wrapper.current.childNodes[0]) {
        wrapper.current.removeChild(wrapper.current.childNodes[0]);
      }
      wrapper.current.appendChild(renderer.current.domElement);

      const handleResize = () => {
        if (renderer.current) {
          renderer.current.setSize(clientWidth, clientHeight);
          renderer.current.setPixelRatio(window.devicePixelRatio);
        }
      };

      light.current = new THREE.AmbientLight("", 1);
      light.current.position.set(0, 0, 0);

      scene.current.add(light.current);

      window.addEventListener("resize", handleResize);

      handleAnimation();

      return () => {
        frameId.current && cancelAnimationFrame(frameId.current);
        frameId.current = null;
        handleClearInterval();

        window.removeEventListener("resize", handleResize);

        if (light.current) {
          light.current.dispose();
          light.current = null;
        }

        if (camera.current) {
          camera.current?.clear();
          camera.current = null;
        }

        if (scene.current) {
          scene.current.traverse((child) => {
            // @ts-ignore
            if (child.material) {
              // @ts-ignore
              child.material.dispose && child.material.dispose();
            }
            // @ts-ignore
            if (child.geometry) {
              // @ts-ignore
              child.geometry.dispose && child.geometry.dispose();
            }
            // @ts-ignore
            child = null;
          });
          scene.current.clear();
        }

        pies.current.forEach((pie) => pie.clear());
        pies.current.length = 0;

        if (renderer.current) {
          // renderer.current.forceContextLoss();
          renderer.current.dispose();
          renderer.current = null;
        }
      };
    }
  }, []);

  useEffect(() => {
    const total = data.reduce((pre, cur) => pre + cur, 0);

    let currentAngle = (-90 * Math.PI) / 180;
    data.forEach((value, index) => {
      const percent = value / total;
      if (!isNaN(percent)) {
        const angle = percent * 2 * Math.PI;
        handleDrawShape(currentAngle, currentAngle + angle, 40, 32, colors[index], 10);
        currentAngle += angle;
      }
    });

    // handleStartSwiper();

    return () => {
      handleClearInterval();
    };
  }, [data]);

  useEffect(() => {
    if (typeof active === "number") {
      pies.current.forEach((pie, index) => {
        if (index === active) {
          gsap.to(pie.scale, { duration: 1, z: 1.5 });
        } else if (pie.scale.z !== 1) {
          gsap.to(pie.scale, { duration: 1, z: 1 });
        }
      });
    } else {
      pies.current.forEach((pie, index) => {
        if (pie.scale.z !== 1) {
          gsap.to(pie.scale, { duration: 1, z: 1 });
        }
      });
    }
  }, [active]);

  const handleDrawShape = (
    startAngle: number,
    endAngle: number,
    radius: number,
    innerRadius: number,
    color: string,
    depth: number
  ) => {
    if (scene.current) {
      const outPoints: Array<THREE.Vector2> = [];
      const innerPoints: Array<THREE.Vector2> = [];

      for (let i = 0; i < endAngle - startAngle; i += Math.PI / 180) {
        const currentAngle = startAngle + i;
        outPoints.push(new THREE.Vector2(Math.cos(currentAngle) * radius, -Math.sin(currentAngle) * radius));
        innerPoints.unshift(
          new THREE.Vector2(Math.cos(currentAngle) * innerRadius, -Math.sin(currentAngle) * innerRadius)
        );
      }

      const shape = new THREE.Shape(outPoints.concat(innerPoints));

      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: false,
      });
      const bottomGeometry = new THREE.ShapeGeometry(shape);
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 1,
      });

      const materialSide = new THREE.MeshToonMaterial({
        color,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(geometry, [material, materialSide]);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const bottom = new THREE.Mesh(bottomGeometry, material);
      const wrapper = new THREE.Object3D();
      wrapper.add(mesh);
      wrapper.add(bottom);
      scene.current.add(wrapper);
      pies.current.push(wrapper);
    }
  };

  const handleAnimation = () => {
    frameId.current = requestAnimationFrame(handleAnimation);
    if (renderer.current && camera.current && scene.current) {
      renderer.current.render(scene.current, camera.current);
    }
  };

  const handleStartSwiper = () => {
    swiperInterval.current = setInterval(() => {
      const lastIndex = swiperIndex.current;
      swiperIndex.current++;

      if (swiperIndex.current >= data.length) {
        swiperIndex.current = 0;
      }

      const lastPie = pies.current[lastIndex];

      const currentPie = pies.current[swiperIndex.current];

      lastPie && gsap.to(lastPie.scale, { duration: 1, x: 1, y: 1, z: 1 });
      currentPie && gsap.to(currentPie.scale, { duration: 1, x: 1, y: 1, z: 1.5 });
    }, 3000);
  };

  const handleClearInterval = () => {
    if (swiperInterval.current) {
      clearInterval(swiperInterval.current);
      swiperInterval.current = null;
      swiperIndex.current = -1;
    }
  };

  return <div ref={wrapper} className="three-pie-chart-wrapper"></div>;
};

export default ThreePieChart;
