import { httpService } from "../../core/services/http.service";

const ThreeSecondsInMs = 3000;

const sendImpression = (itemId: string) => {
  return httpService.get(`https://backend.tedooo.com/?itemId=${itemId}`);
};

const impressionObserver: IntersectionObserver = ((options) => {
  const targetLastViewedMap: Map<Element, DOMHighResTimeStamp> = new Map();
  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const { target, time, isIntersecting } = entry;

      // * If user viewed an item for more than 3 seconds, send impression
      if (
        !isIntersecting &&
        targetLastViewedMap.has(target) &&
        time - targetLastViewedMap.get(target) > ThreeSecondsInMs
      ) {
        sendImpression(target.id);
        return;
      }
      // * Set new last viewed time for
      targetLastViewedMap.set(target, time);
    });
  }, options);
})({
  rootMargin: '0px',
  threshold: 1.0,
});

export const impressionService = {
  impressionObserver,
  sendImpression,
};
