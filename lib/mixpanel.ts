// Mixpanel helper functions for event tracking

import mixpanel from 'mixpanel-browser';

export const MIXPANEL_TOKEN = 'f6c4e96428d53c44776d7a54fcac42fb';

/**
 * Track an event in Mixpanel
 */
export function trackMixpanelEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    try {
      mixpanel.track(eventName, properties || {});
    } catch (error) {
      console.error('Mixpanel track error:', error);
    }
  }
}

/**
 * Identify a user in Mixpanel
 */
export function identifyMixpanelUser(userId: string, userProperties?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    try {
      mixpanel.identify(userId);
      if (userProperties) {
        mixpanel.people.set(userProperties);
      }
    } catch (error) {
      console.error('Mixpanel identify error:', error);
    }
  }
}

/**
 * Reset Mixpanel user (on logout)
 */
export function resetMixpanelUser() {
  if (typeof window !== 'undefined') {
    try {
      mixpanel.reset();
    } catch (error) {
      console.error('Mixpanel reset error:', error);
    }
  }
}

/**
 * Set user properties in Mixpanel
 */
export function setMixpanelUserProperties(properties: Record<string, any>) {
  if (typeof window !== 'undefined') {
    try {
      mixpanel.people.set(properties);
    } catch (error) {
      console.error('Mixpanel set user properties error:', error);
    }
  }
}
