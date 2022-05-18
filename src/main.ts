import createREGL from 'regl';
import vert from './shader/circle.vert';
import frag from './shader/circle.frag';

import './style.css';

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
    u_res: (_, props: { res: number[] }) => props.res,
    u_time: ({ time }) => time,
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

regl.frame(() => {
  circle({ res: [canvasWidth, canvasHeight] });
});
