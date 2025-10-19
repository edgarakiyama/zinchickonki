import playPathTrimAnimation from './pathAnimation.js';
import loadSvg from './svgLoader.js';
import setIntersectionTrigger from './animationTrigger.js';

const breakPoint = 768;
let isSp = window.innerWidth <= breakPoint;
const spSvgAnimClasses = ['.st7'];
const pcSvgAnimClasses = ['.st1'];

addEventListener('DOMContentLoaded', setupSvg());
addEventListener('resize', () => updateCurrentDevice());

function updateCurrentDevice() {
  const isNowSp = window.innerWidth <= breakPoint;
  if (isNowSp === isSp) return;
  isSp = isNowSp;
  setupSvg();
}

function getSvgDataPathAttribute(width) {
  return width > breakPoint ? 'data-path-pc' : 'data-path-sp';
}

function setupSvg() {
  document.body.classList.remove('loaded');
  const svgContainerElement = document.getElementById('main-image');

  if (svgContainerElement.hasChildNodes) {
    svgContainerElement.childNodes.forEach((child) => svgContainerElement.removeChild(child));
  }

  const animationTargetClass = isSp ? spSvgAnimClasses : pcSvgAnimClasses;

  const svgFilePath = svgContainerElement.getAttribute(getSvgDataPathAttribute(window.innerWidth));
  loadSvg(svgContainerElement, svgFilePath).then((svgElement) => {
    setTimeout(()=>{
    playPathTrimAnimation(svgElement, animationTargetClass);
    setIntersectionTrigger(animationTargetClass);
    document.body.classList.add('loaded');
    },500);
  });
}
