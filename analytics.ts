import { track } from "@vercel/analytics";

type AllowedValue = string | number | boolean | null;

export const trackEvent = (eventName: string, properties?: Record<string, AllowedValue>): void => {
    track(eventName, properties);
};
