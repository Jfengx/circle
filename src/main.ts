import createREGL from 'regl';
import vert from './shader/circle.vert';
import frag from './shader/circle.frag';

import './style.css';

type Config = 'strength' | 'amplitude';

type Props = Record<Config, number> & { res: number[] };

const MAX_STRENGTH = 10;
const MAX_AMPLITUDE = 110;

const config: Pick<Props, Config> = {
  strength: 1,
  amplitude: 105,
};

const canvas = document.querySelector<HTMLCanvasElement>('canvas')!;

const dpr = window.devicePixelRatio;
const canvasWidth = canvas.offsetWidth * dpr;
const canvasHeight = canvas.offsetHeight * dpr;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

const regl = createREGL({ canvas });

const circle = regl({
  vert,
  frag,
  attributes: {
    a_position: [
      [-1, 1, 0],
      [-1, -1, 0],
      [1, -1, 0],
      [1, 1, 0],
    ],
  },
  uniforms: {
    u_res: (_, { res }: Props) => res,
    u_time: ({ time }) => time,
    u_strength: (_, { strength }) => [strength, MAX_STRENGTH - strength],
    u_amplitude: (_, { amplitude }) => [amplitude, amplitude],
  },
  count: 4,
  primitive: 'triangle fan',
  blend: {
    enable: true,
    func: {
      src: 'src alpha',
      dst: 'one minus src alpha',
    },
  },
});

const windowSize = {
  x: window.innerWidth,
  y: window.innerHeight,
};

window.addEventListener('mousemove', (e) => {
  config.strength = (e.clientX * MAX_STRENGTH) / windowSize.x;
  config.amplitude = ((e.clientY / windowSize.y) * 2 - 1) * MAX_AMPLITUDE;
});

regl.frame(() => {
  circle({ res: [canvasWidth, canvasHeight], ...config });
});
