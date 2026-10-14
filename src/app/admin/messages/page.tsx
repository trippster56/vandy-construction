import { getContactMessages } from "@/db/queries";
import MessagesInbox from "./messages-inbox";

export default async function MessagesPage() {
  const messages = await getContactMessages();
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Estimate requests and subcontractor submissions from the contact form.
        </p>
      </div>
      <MessagesInbox messages={messages} />
    </>
  );
}
