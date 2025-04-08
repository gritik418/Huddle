"use client";
import { Dialog, Portal } from "@chakra-ui/react";
import { JSX } from "react";
import ChannelInviteItem from "../ChannelInviteItem/ChannelInviteItem";
import Spinner from "../Spinner/Spinner";
import { useSelector } from "react-redux";
import {
  selectInvites,
  selectInvitesLoading,
} from "../../features/channelInvites/channelInvitesSlice";

const InvitesContainer = (): JSX.Element => {
  const isLoading: boolean = useSelector(selectInvitesLoading);
  const invites: ChannelInvite[] = useSelector(selectInvites);

  function renderContent(): JSX.Element {
    if (isLoading) {
      return (
        <div className="flex flex-col gap-3 max-h-96 py-8 items-center justify-center">
          <Spinner variant={"small"} />
        </div>
      );
    }

    if (!invites || invites.length === 0) {
      return (
        <div className="flex flex-col gap-3 max-h-96 py-8 items-center justify-center text-center">
          <p className="text-lg font-medium text-gray-600">
            You're all caught up!
          </p>
          <p className="text-sm text-gray-500">
            You have no pending invites at the moment.
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3 max-h-96 overflow-y-scroll">
        {invites.map((invite: ChannelInvite) => (
          <ChannelInviteItem key={invite._id} invite={invite} />
        ))}
      </div>
    );
  }

  return (
    <Dialog.Root placement={"center"} motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <div className="flex relative pr-2 font-bold cursor-pointer text-blue-600">
          Invites
          {invites && invites.length > 0 && (
            <span className="h-4 w-4 text-[10px] text-white flex items-center justify-center bg-red-400 absolute -top-1 -right-1 rounded-full">
              {invites.length > 9 ? "9+" : invites.length}
            </span>
          )}
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
            <Dialog.Body>{renderContent()}</Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default InvitesContainer;
