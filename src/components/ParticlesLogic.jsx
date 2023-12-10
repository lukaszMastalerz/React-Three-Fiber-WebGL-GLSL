export const TRIANGLE_SIZE = 3.0;
export const PARTICLE_UPDATE_SPEED = 0.1;
export const PARTICLE_AMPLITUDE = 0.1;
export const PARTICLE_COUNT = 15000;

export function generateRandomTriangleCoordinates() {
  const halfSize = TRIANGLE_SIZE / 2;
  const vertices = [
    [0, halfSize, 0],
    [-halfSize, -halfSize, 0],
    [halfSize, -halfSize, 0],
  ];

  const edges = [
    [0, 1],
    [1, 2],
    [2, 0],
  ];

  const positions = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const edgeIndex = i % 3;
    const [startIndex, endIndex] = edges[edgeIndex];
    const randomT = Math.random();
    const [startX, startY, startZ] = vertices[startIndex];
    const [endX, endY, endZ] = vertices[endIndex];

    const index = i * 3;
    positions[index] = startX + randomT * (endX - startX);
    positions[index + 1] = startY + randomT * (endY - startY);
    positions[index + 2] = startZ + randomT * (endZ - startZ);
  }

  return positions;
}

export function applyBouncingAnimation(array, time) {
  const updateSpeed = PARTICLE_UPDATE_SPEED * 0.04;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const index3 = i * 3;
    const sinValue = Math.sin(time + i * updateSpeed);
    array[index3 + 2] = sinValue * PARTICLE_AMPLITUDE + i * 0.04;
  }
}
