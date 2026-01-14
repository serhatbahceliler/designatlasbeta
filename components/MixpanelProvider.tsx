"use client";

import { useEffect } from "react";
import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = "f6c4e96428d53c44776d7a54fcac42fb";

export default function MixpanelProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Mixpanel
    mixpanel.init(MIXPANEL_TOKEN, {
      autocapture: true,
      record_sessions_percent: 100,
      api_host: 'https://api-eu.mixpanel.com',
    });
  }, []);

  return <>{children}</>;
}
