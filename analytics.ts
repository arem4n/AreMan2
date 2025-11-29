/**
 * Simple analytics tracking utility.
 * In a real-world application, this could be extended to send data
 * to a service like Google Analytics, Plausible, etc.
 * @param eventName The name of the event to track.
 * @param properties Additional data associated with the event.
 */
export const trackEvent = (eventName: string, properties?: Record<string, any>): void => {
    // For now, we'll just log to the console for demonstration purposes.
    // This allows developers to see events firing in the browser console.
    console.log('[Analytics Event]', {
        eventName,
        ...properties,
        timestamp: new Date().toISOString(),
    });

    // Example of how you might integrate with a third-party service:
    // if (window.gtag) {
    //     window.gtag('event', eventName, properties);
    // }
};
