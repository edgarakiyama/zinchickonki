import loadSvg from './svgLoader.js';
import setPathTrimAnimation from './pathAnimation.js';
import setElementVisibilityTrigger from './visibilityTrigger.js';

const SVG_CONTAINER_ID = 'main-image';
const LOAD_COMPLETED_CLASS = 'loaded';
const BREAKPOINT_PX = 768;
const STATIC_LOADING_DURATION_MS = 500;
const SVG_ANIM_QUERIES_SP = ['.st4'];
const SVG_ANIM_QUERIES_PC = ['.st3'];
let isSp = window.innerWidth <= BREAKPOINT_PX;

addEventListener('DOMContentLoaded', () => initializeSvgSetup());
addEventListener('resize', () => handleResize());

function initializeSvgSetup() {
  updateDeviceState();
  setupSvg();
}

function handleResize() {
  const isNowSp = window.innerWidth <= BREAKPOINT_PX;
  if (isNowSp !== isSp) {
    isSp = isNowSp;
    setupSvg();
  }
}

function setupSvg() {
  document.body.classList.remove(LOAD_COMPLETED_CLASS);
  const svgContainerElement = document.getElementById(SVG_CONTAINER_ID);
  clearSvgContainer(svgContainerElement);

  const animatableQueries = getAnimatableQueries();
  const svgFilePath = getSvgFilePath(svgContainerElement);

  loadSvg(svgFilePath, svgContainerElement)
    .then((svgElement) => {
      setTimeout(() => {
        setPathTrimAnimation(svgElement, animatableQueries);
        setElementVisibilityTrigger(animatableQueries);
        document.body.classList.add(LOAD_COMPLETED_CLASS);
      }, STATIC_LOADING_DURATION_MS);
    });
}

function clearSvgContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function getAnimatableQueries() {
  return isSp ? SVG_ANIM_QUERIES_SP : SVG_ANIM_QUERIES_PC;
}

function getSvgFilePath(container) {
  const attr = (window.innerWidth > BREAKPOINT_PX) ? 'data-path-pc' : 'data-path-sp';
  return container.getAttribute(attr);
}

function updateDeviceState() {
  isSp = window.innerWidth <= BREAKPOINT_PX;
}