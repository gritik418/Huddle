"use client";

import { JSX, useState } from "react";
import NotificationToggle from "../NotificationToggle/NotificationToggle";

export function NotificationsForm(): JSX.Element {
  const [chatNotifications, setChatNotifications] = useState(true);
  const [followRequestNotifications, setFollowRequestNotifications] =
    useState(true);
  const [chatRequestNotifications, setChatRequestNotifications] =
    useState(true);

  return (
    <div className="space-y-4">
      <NotificationToggle
        label="Notification from Chat"
        description="Receive notifications when you get a new message."
        value={chatNotifications}
        onChange={setChatNotifications}
      />

      <NotificationToggle
        label="New Follow Request"
        description="Receive notifications when someone sends you a follow request."
        value={followRequestNotifications}
        onChange={setFollowRequestNotifications}
      />

      <NotificationToggle
        label="New Chat Request"
        description="Receive notifications when someone sends you a new chat request."
        value={chatRequestNotifications}
        onChange={setChatRequestNotifications}
      />
    </div>
  );
}
