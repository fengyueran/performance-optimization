import { square } from './math';
// import('./math').then((math) => {
//   console.log(math.square(16, 26));
// });

const test = async () => {
  // const info = { x: 1, y: 3 };
  // const res = { ...info, name: 'test' };
  console.log('res', square(1));
};

test();
