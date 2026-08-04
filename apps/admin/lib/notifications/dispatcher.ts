// 🚀 SPRINT 9.5 PHASE C - EVENT-DRIVEN NOTIFICATION ENGINE
// Mentor's Architecture: Adapter Pattern for In-App, Email, Telegram

export interface NotificationPayload {
  userId: string;
  eventType: string; // e.g., 'WITHDRAWAL_APPROVED', 'KYC_REJECTED'
  title: string;
  message: string;
  metadata?: any;
}

// 🔌 Base Adapter Interface (Rule: Extensibility for API Marketplace)
export interface NotificationAdapter {
  name: string;
  send(payload: NotificationPayload): Promise<boolean>;
}

// 📱 1. IN-APP ADAPTER (Writes to our immutable notification_events table)
export class InAppAdapter implements NotificationAdapter {
  name = 'IN_APP';
  
  async send(payload: NotificationPayload): Promise<boolean> {
    console.log(`[${this.name}] Logging notification for User: ${payload.userId}`);
    // Next Step: We will connect this to Supabase DB Insert
    return true;
  }
}

// 📧 2. EMAIL ADAPTER (Dormant/Mocked for now, ready for SendGrid)
export class EmailAdapter implements NotificationAdapter {
  name = 'EMAIL';
  
  async send(payload: NotificationPayload): Promise<boolean> {
    console.log(`[${this.name}] Sending Email to User: ${payload.userId} - Subject: ${payload.title}`);
    return true;
  }
}

// 🧠 THE CORE DISPATCHER
export class NotificationDispatcher {
  private adapters: NotificationAdapter[] = [];

  constructor() {
    // Registering Active Adapters
    this.adapters.push(new InAppAdapter());
    
    // Email adapter is ready but can be conditionally fired based on user preferences
    this.adapters.push(new EmailAdapter()); 
  }

  // Event Driven Trigger
  async dispatch(payload: NotificationPayload) {
    console.log(`🔔 Event Triggered: ${payload.eventType}`);
    
    // Run all registered adapters concurrently (Performance Optimized)
    const promises = this.adapters.map(adapter => adapter.send(payload));
    const results = await Promise.allSettled(promises);
    
    results.forEach((res, index) => {
      if (res.status === 'rejected') {
        console.error(`❌ Adapter ${this.adapters[index].name} failed:`, res.reason);
      }
    });
  }
}

// Export a singleton instance
export const notificationDispatcher = new NotificationDispatcher();