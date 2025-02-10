interface User {
  _id: Types.ObjectId;
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  password?: string;
  profilePicture?: string;
  bio?: string;
  isVerified: boolean;
  isActive: boolean;
  provider: "credentials" | "google";
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  followRequests: Types.ObjectId[];
  blockedUsers: Types.ObjectId[];
  posts: Types.ObjectId[];
  verificationCode?: string;
  verificationCodeExpiry?: Date;
  passwordResetToken?: string;
  passwordResetTokenExpiry?: Date;
}

interface SearchedUserForChat {
  _id: string;
  username: string;
  profilePicture?: string;
  firstName: string;
  lastName?: string;
}

interface ChatRequestUser {
  _id: string;
  username: string;
  profilePicture?: string;
  firstName: string;
  lastName?: string;
}

interface ChatRequest {
  _id: string;
  receiver: string;
  sender: ChatRequestUser;
  status: "pending" | "accepted" | "rejected";
}

interface Chat {
  _id: string;
  isGroupChat: boolean;
  groupName?: string;
  groupIcon?: string;
  members: ChatMember[];
  admins?: Types.ObjectId[];
  lastMessage?: string;
}

interface ChatMember {
  _id: string;
  firstName: string;
  lastName?: string;
  username: string;
  profilePicture?: string;
}

interface Message {
  _id: string;
  chatId: Types.ObjectId;
  sender: Types.ObjectId;
  content?: string;
  attachment?: Attachment[];
  sentAt?: Date;
  readAt?: Date;
  status: "sent" | "delivered" | "read" | "failed";
}
