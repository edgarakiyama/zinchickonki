let animTargetElements = [];
const threshold = 0.9;

export default function setIntersectionTrigger(animClassNames) {
  animTargetElements.length = 0;
  removeEventListener('scroll', checkIntersection);
  addEventListener('scroll', checkIntersection);

  animClassNames.forEach((animClassName) => {
    document.querySelectorAll(animClassName).forEach((target) => {
      target.classList.add('is-out-of-view');
      animTargetElements.push(target);
    });

    setTimeout(checkIntersection, 500);
  });
}

function checkIntersection() {
  animTargetElements.forEach((target) => {
    const interSectionY = window.innerHeight * threshold;
    const targetPosY = target.getClientRects().item(0).y;

    if (targetPosY < interSectionY) {
      target.classList.remove('is-out-of-view');
      target.classList.add('is-in-view');
      animTargetElements = animTargetElements.filter((x) => x !== target);
    }
  });
}
