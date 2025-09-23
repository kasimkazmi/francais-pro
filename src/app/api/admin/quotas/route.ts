import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const projectId = process.env.GCP_PROJECT_ID;
    const hasCreds = !!process.env.GOOGLE_APPLICATION_CREDENTIALS;

    // Not configured yet: return informative payload
    if (!projectId || !hasCreds) {
      return NextResponse.json(
        {
          configured: false,
          message:
            'Cloud Monitoring not configured. Set GCP_PROJECT_ID and GOOGLE_APPLICATION_CREDENTIALS to enable live quotas.',
          readsToday: null,
          writesToday: null,
          deletesToday: null,
          storageBytes: null,
          egressBytesMonth: null,
          window: null,
        },
        { status: 200 }
      );
    }

    // Set time range for today
    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    // For now, return a message about billing requirement
    // Cloud Monitoring API requires billing to be enabled
    return NextResponse.json(
      {
        configured: true,
        message: 'Cloud Monitoring requires billing to be enabled. Enable billing on your Google Cloud project to see live metrics.',
        readsToday: 0,
        writesToday: 0,
        deletesToday: 0,
        storageBytes: 0,
        egressBytesMonth: 0,
        window: { 
          start: startOfDay.toISOString(), 
          end: now.toISOString() 
        },
        billingRequired: true,
        billingUrl: `https://console.developers.google.com/billing/enable?project=${projectId}`
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in quotas API:', error);
    return NextResponse.json(
      {
        configured: false,
        message: `Failed to load quotas: ${error}`,
        readsToday: null,
        writesToday: null,
        deletesToday: null,
        storageBytes: null,
        egressBytesMonth: null,
        window: null,
      },
      { status: 500 }
    );
  }
}


