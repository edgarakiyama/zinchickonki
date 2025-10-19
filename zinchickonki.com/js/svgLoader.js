export default async function loadSvg(container, svgFilePath) {
  try {
    const response = await fetch(svgFilePath);
    if (!response.ok) {
      return Promise.reject(
        new Error(`Failed to load SVG: ${response.status} ${response.statusText}`),
      );
    }

    const svgText = await response.text();
    container.innerHTML = svgText;
    return container.querySelector('svg');
  } catch (error) {
    return Promise.reject(error);
  }
}
