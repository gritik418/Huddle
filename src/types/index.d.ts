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
