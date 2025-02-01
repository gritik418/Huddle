import React, { JSX } from "react";
import ChatListItem from "../ChatListItem/ChatListItem";

const chats = [
  {
    firstName: "John",
    lastName: "Doe",
    lastMessage: "Hey, how's it going?",
    profilePicture:
      "https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    lastMessage: "I'll get back to you later.",
    profilePicture:
      "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  },
  {
    firstName: "Michael",
    lastName: "Johnson",
    lastMessage: "Can we talk tomorrow?",
    profilePicture:
      "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  },
  {
    firstName: "Emily",
    lastName: "Davis",
    lastMessage: "I loved your last post!",
    profilePicture:
      "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  },
  {
    firstName: "David",
    lastName: "Brown",
    lastMessage: "Are we still on for the meeting?",
    profilePicture:
      "https://images.unsplash.com/photo-1533636721434-0e2d61030955?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHByb2ZpbGUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  },
];

const ChatList = (): JSX.Element => {
  return (
    <div className="px-3">
      {chats.map((chat) => {
        return <ChatListItem key={chat.profilePicture} {...chat} />;
      })}
    </div>
  );
};

export default ChatList;
