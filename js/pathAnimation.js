const BASE_DURATION_SEC = 1;

export default function setPathTrimAnimation(svgElement, animatableQueries) {
  animatableQueries.forEach((animatableQuery) => {
    const paths = svgElement.querySelectorAll(animatableQuery);
    if (!paths) return;

    const pathLengthData = getPathLength(paths);

    paths.forEach((path, i) => {
      const length = pathLengthData.lengths[i] || 0;
      path.style.setProperty('--dash', length);

      const animDuration =
        (1.5 + BASE_DURATION_SEC * (length / (pathLengthData.max || 1))).toFixed(2) + 's';
      path.style.setProperty('--dur', animDuration);

      const delayScale = svgElement.parentElement.getAttribute('data-delay-scale') || 0.05;
      const baseDelayTime = svgElement.parentElement.getAttribute('data-base-delay') || 0;
      const delay = (i * delayScale).toFixed(2) + baseDelayTime + 's';

      path.style.animationDelay = delay;
    });
  });
}

function getPathLength(svgPaths) {
  let maxLength = 0;

  const lengths = Array.from(svgPaths).map((p) => {
    const pathLength = typeof p.getTotalLength === 'function' ? p.getTotalLength() : 0;
    if (pathLength > maxLength) maxLength = pathLength;
    return pathLength;
  });

  return {
    lengths: lengths,
    max: maxLength,
  };
}
