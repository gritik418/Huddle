interface User {
  _id: string;
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  password?: string;
  coverImage?: string;
  profilePicture?: string;
  bio?: string;
  showActiveStatus: boolean;
  allowMentions: boolean;
  isPrivate: boolean;
  isVerified: boolean;
  isDeactivated: boolean;
  isActive: boolean;
  provider: "credentials" | "google";
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  blockedUsers: Types.ObjectId[];
  posts: Types.ObjectId[];
  verificationCode?: string;
  verificationCodeExpiry?: Date;
  passwordResetToken?: string;
  passwordResetTokenExpiry?: Date;
}

interface Post {
  _id: string;
  userId: Follower;
  content: string;
  mediaUrls?: string[];
  likes: Types.ObjectId[];
  comments: Types.ObjectId[];
  location?: string;
  mentions?: Types.ObjectId[];
  hashtags?: string[];
}

interface Follower {
  _id: string;
  firstName: string;
  lastName?: string;
  username: string;
  profilePicture?: string;
  coverImage?: string;
}

interface SearchedUserForChat {
  _id: string;
  username: string;
  profilePicture?: string;
  firstName: string;
  lastName?: string;
}

interface ChatRequestSender {
  _id: string;
  username: string;
  profilePicture?: string;
  firstName: string;
  lastName?: string;
}

interface ChatRequest {
  _id: string;
  receiver: string;
  sender: ChatRequestSender;
  status: "pending" | "accepted" | "rejected";
}

interface FollowRequestSender {
  _id: string;
  username: string;
  profilePicture?: string;
  firstName: string;
  lastName?: string;
}

interface FollowRequest {
  _id: string;
  receiver: string;
  sender: FollowRequestSender;
  status: "pending" | "accepted" | "rejected";
}

interface Chat {
  _id: string;
  isGroupChat: boolean;
  groupName?: string;
  groupDescription?: string;
  groupIcon?: string;
  members: ChatMember[];
  admins?: Types.ObjectId[];
  lastMessage?: {
    _id: string;
    content: string;
    sender: string;
    updatedAt: string;
  };
  groupStatus?: "active" | "deleted";
  deletedAt?: Date;
  deletedBy?: Types.ObjectId;
  deletedFor: Types.ObjectId[];
  updatedAt: string;
}

interface Group {
  _id: string;
  isGroupChat: boolean;
  groupName?: string;
  groupIcon?: string;
  members: ChatMember[];
  admins: Types.ObjectId[];
  lastMessage?: string;
  groupDescription?: string;
  groupStatus?: "active" | "deleted";
  deletedAt?: Date;
  deletedBy?: Types.ObjectId;
  deletedFor: Types.ObjectId[];
}

interface ChatMember {
  _id: string;
  firstName: string;
  lastName?: string;
  username: string;
  profilePicture?: string;
  coverImage?: string;
}

interface MessageSender {
  _id: string;
  firstName: string;
  lastName?: string;
  username: string;
  profilePicture?: string;
}

interface Message {
  _id: string;
  chatId: Types.ObjectId;
  sender: MessageSender;
  content?: string;
  attachment?: Attachment[];
  sentAt?: Date;
  readAt?: Date;
  status: "sent" | "delivered" | "read" | "failed";
  deletedFor: Types.ObjectId[];
  updatedAt: string;
}

interface Attachment {
  filename: string;
  fileType?: string;
  filePath: string;
  size: number;
}

interface Pulse {
  _id: Types.ObjectId;
  userId: Follower;
  content: string;
  createdAt: Date;
}

interface Channel {
  _id: Types.ObjectId;
  name: string;
  description: string;
  type: "public" | "private" | "invite-only";
  creatorId: Follower;
  members: Follower[];
  isActive: boolean;
  sendMessagePermission: "creator" | "members" | "everyone";
}

interface NotificationData {
  id: string;
  type:
    | "CHAT_REQUEST"
    | "NEW_MESSAGE"
    | "NEW_GROUP"
    | "FOLLOW_REQUEST"
    | "ADDED_TO_GROUP"
    | "NEW_MENTION"
    | "NEW_CHANNEL_MESSAGE"
    | "ACCEPTED_FOLLOW_REQUEST";
  followRequestReceiver?: Follower;
  chatRequest?: ChatRequest;
  message?: Message;
  followRequest?: FollowRequest;
  creator?: Follower;
  postId?: string;
  chat?: Chat;
  channel?: Channel;
  channelMessage?: ChannelMessage;
}

interface ChannelMessage {
  _id: string;
  channelId: string;
  sender: Follower;
  content?: string;
  attachment?: Attachment[];
  sentAt?: Date;
  status: "sent" | "delivered" | "failed";
  deletedFor: string[];
}

interface Story {
  _id: string;
  userId: Follower;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  caption?: string;
  createdAt: string;
  expiresAt: string;
  viewsCount?: number;
  viewers?: Follower[];
}

interface JoinRequest {
  _id: string;
  userId: Follower;
  channelId: string;
  status: "pending" | "accepted" | "rejected";
}

interface ChannelInvite {
  _id: string;
  receiverId: Follower;
  senderId: Follower;
  channelId: {
    _id: string;
    creatorId: string;
    name: string;
    description: string;
    members: string[];
    type: "public" | "private" | "invite-only";
  };
  status: "pending" | "accepted" | "rejected";
}

interface NotificationSettings {
  allowChatRequestNotification: boolean;
  allowNewMessageNotification: boolean;
  allowNewGroupNotification: boolean;
  allowFollowRequestNotification: boolean;
  allowAddedToGroupNotification: boolean;
  allowNewMentionNotification: boolean;
  allowNewChannelMessageNotification: boolean;
  allowAcceptedFollowRequestNotification: boolean;
}
