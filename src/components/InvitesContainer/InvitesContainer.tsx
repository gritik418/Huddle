import { Dialog, Portal } from "@chakra-ui/react";
import React, { JSX } from "react";
import ChannelInviteItem from "../ChannelInviteItem/ChannelInviteItem";

const invites: ChannelInvite[] = [
  {
    _id: "67f3d0801248e09efe6a50d6",
    channelId: {
      _id: "67e6f35efcc6985b0227a5f2",
      creatorId: "67d70298559797abea6b5068",
      name: "My Channel",
      description: "Hello Channel",
      members: ["67d70298559797abea6b5068", "67d70298559797abea6b5068"],
      type: "public",
    },
    receiverId: {
      _id: "67d86eafb31852b954870581",
      firstName: "Ritik",
      lastName: "Gupta",
      username: "ritik_dev",
    },
    senderId: {
      _id: "67d70298559797abea6b5068",
      firstName: "Ritik",
      lastName: "",
      username: "ritik123",
      profilePicture:
        "https://huddle-server.onrender.com/uploads/67d70298559797abea6b5068/profilePicture/joshua-koblin-eqW1MPinEV4-unsplash.jpg",
      coverImage:
        "https://huddle-server.onrender.com/uploads/67d70298559797abea6b5068/coverImage/peter-broomfield-m3m-lnR90uM-unsplash.jpg",
    },
    status: "pending",
  },
];

const InvitesContainer = (): JSX.Element => {
  return (
    <Dialog.Root placement={"center"} motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <div className="flex font-bold cursor-pointer text-blue-600">
          Invites
        </div>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title className="text-xl font-semibold">
                Channel Invites
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <div className="flex flex-col gap-3 max-h-96 overflow-y-scroll">
                {invites.map((invite: ChannelInvite) => (
                  <ChannelInviteItem key={invite._id} invite={invite} />
                ))}
              </div>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default InvitesContainer;
