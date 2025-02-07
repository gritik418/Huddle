import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FiPlus } from "react-icons/fi";
import { MdGroups2 } from "react-icons/md";

const ChatRequestDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex min-h-10 h-10 w-10 min-w-10 rounded-full items-center justify-center bg-gray-100">
          <FiPlus />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mt-4 w-full flex flex-col items-center">
            <button className="flex p-2 gap-3 rounded-lg w-full bg-[var(--secondary)] outline-none text-white">
              <MdGroups2 />
              Create group chat
            </button>
            <div className="h-1 border-b-2 mt-4 w-2/3"></div>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-1">
          <p className="text-xs text-gray-500">
            Search for users to send a chat request.
          </p>
          <input
            type="text"
            placeholder="Search users..."
            className="bg-gray-100 p-2 rounded-lg outline-[var(--secondary)]"
          />
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatRequestDialog;
