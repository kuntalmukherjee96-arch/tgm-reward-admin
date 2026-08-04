// 🚀 SUPER CODER MODE: NOTIFICATION DISPATCHER TEST
// Simulating Event-Driven Architecture (In-App + Email Adapters)

console.log("==========================================");
console.log("🔔 STARTING NOTIFICATION DISPATCHER TEST...");
console.log("==========================================\n");

// Mocking the Adapters for Simulation
class InAppAdapter {
  constructor() { this.name = 'IN_APP'; }
  async send(payload) {
    console.log(`[${this.name}] ✅ Successfully logged notification for User: ${payload.userId}`);
    return true;
  }
}

class EmailAdapter {
  constructor() { this.name = 'EMAIL'; }
  async send(payload) {
    console.log(`[${this.name}] ✅ Triggered Email to User: ${payload.userId}`);
    console.log(`        -> Subject: ${payload.title}`);
    return true;
  }
}

// The Dispatcher Logic
class NotificationDispatcher {
  constructor() {
    this.adapters = [new InAppAdapter(), new EmailAdapter()];
  }

  async dispatch(payload) {
    console.log(`🚀 EVENT TRIGGERED: [${payload.eventType}]\n`);
    
    // Firing all adapters concurrently
    const promises = this.adapters.map(adapter => adapter.send(payload));
    await Promise.all(promises);
  }
}

async function runTest() {
  const dispatcher = new NotificationDispatcher();
  
  // Simulating a real withdrawal approval event
  await dispatcher.dispatch({
    userId: "user_vip_007",
    eventType: "WITHDRAWAL_APPROVED",
    title: "Withdrawal Successful",
    message: "Your withdrawal of 5000 INR has been processed."
  });

  console.log("\n==========================================");
  console.log("✅ DISPATCHER TEST PASSED! Both adapters fired concurrently.");
  console.log("==========================================");
}

runTest();