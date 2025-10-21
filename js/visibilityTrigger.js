const CLASS_OUT_OF_VIEW = 'is-out-of-view';
const CLASS_IN_VIEW = 'is-in-view';
const SCREEN_THRESHOLD_Y = 1;
const PASSED_RATIO_THRESHOLD = 0.8;
const INITIAL_DELAY_MS = 500;
let elementsToWatch = [];

export default function setElementVisibilityTrigger(watchQueries) {
  elementsToWatch.length = 0;
  removeEventListener('scroll', triggerViewStateChanges);
  addEventListener('scroll', triggerViewStateChanges);

  watchQueries.forEach((query) => {
    const targetElements = document.querySelectorAll(query);
    targetElements.forEach((ele) => {
      ele.classList.add(CLASS_OUT_OF_VIEW);
      elementsToWatch.push(ele);
    });
  });

  setTimeout(triggerViewStateChanges, INITIAL_DELAY_MS);
}

function triggerViewStateChanges() {
  const thresholdY = window.innerHeight * SCREEN_THRESHOLD_Y;

  elementsToWatch.forEach((targetElement) => {
    const passedRatio = calcPassedRatio(targetElement, thresholdY);
    if (passedRatio < PASSED_RATIO_THRESHOLD) return;

    triggerInView(targetElement);
    elementsToWatch = elementsToWatch.filter((ele) => ele !== targetElement);
  });
}

function calcPassedRatio(element, checkY) {
  const rect = element.getBoundingClientRect();
  return Math.min(Math.max((checkY - rect.top) / (rect.bottom - rect.top), 0), 1);
}

function triggerInView(element) {
  element.classList.remove(CLASS_OUT_OF_VIEW);
  element.classList.add(CLASS_IN_VIEW);
}
