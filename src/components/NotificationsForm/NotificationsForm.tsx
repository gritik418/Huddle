"use client";
import { JSX } from "react";
import { useSelector } from "react-redux";
import NotificationToggle from "../NotificationToggle/NotificationToggle";
import { selectNotificationSettings } from "../../features/notificationSettings/notificationSettingsSlice";
import { useUpdateNotificationSettingMutation } from "../../features/api/notificationSettingsApi";

export function NotificationsForm(): JSX.Element {
  const settings = useSelector(selectNotificationSettings);
  const [updateNotificationSetting] = useUpdateNotificationSettingMutation();

  if (!settings) {
    return (
      <div className="text-center text-gray-500 py-8 text-sm space-y-1">
        <p>We couldn&apos;t load your notification settings right now.</p>
        <p>This might just be a small hiccup.</p>
        <p>Try refreshing the page or check back in a little while 💫</p>
      </div>
    );
  }

  const handleToggle =
    (key: keyof typeof settings) => async (value: boolean) => {
      await updateNotificationSetting({ key, value });
    };

  return (
    <div className="space-y-4">
      <NotificationToggle
        label="New Chat Request"
        description="Get notified when someone sends you a new chat request."
        value={settings.allowChatRequestNotification}
        onChange={handleToggle("allowChatRequestNotification")}
      />

      <NotificationToggle
        label="New Message"
        description="Get notified when you receive a new message."
        value={settings.allowNewMessageNotification}
        onChange={handleToggle("allowNewMessageNotification")}
      />

      <NotificationToggle
        label="New Group Created"
        description="Get notified when you're invited to a new group."
        value={settings.allowNewGroupNotification}
        onChange={handleToggle("allowNewGroupNotification")}
      />

      <NotificationToggle
        label="New Follow Request"
        description="Get notified when someone sends you a follow request."
        value={settings.allowFollowRequestNotification}
        onChange={handleToggle("allowFollowRequestNotification")}
      />

      <NotificationToggle
        label="Added to Group"
        description="Get notified when someone adds you to a group."
        value={settings.allowAddedToGroupNotification}
        onChange={handleToggle("allowAddedToGroupNotification")}
      />

      <NotificationToggle
        label="New Mention"
        description="Get notified when someone mentions you in a message."
        value={settings.allowNewMentionNotification}
        onChange={handleToggle("allowNewMentionNotification")}
      />

      <NotificationToggle
        label="New Channel Message"
        description="Get notified when there’s a new message in a channel you’re in."
        value={settings.allowNewChannelMessageNotification}
        onChange={handleToggle("allowNewChannelMessageNotification")}
      />

      <NotificationToggle
        label="Follow Request Accepted"
        description="Get notified when someone accepts your follow request."
        value={settings.allowAcceptedFollowRequestNotification}
        onChange={handleToggle("allowAcceptedFollowRequestNotification")}
      />
    </div>
  );
}
