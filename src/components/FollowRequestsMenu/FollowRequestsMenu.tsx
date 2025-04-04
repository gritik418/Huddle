import { selectFollowRequests } from "../../features/followRequest/followRequestSlice";
import { JSX } from "react";
import { IoIosPersonAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import FollowRequestItem from "../FollowRequestItem/FollowRequestItem";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";

const FollowRequestsMenu = (): JSX.Element => {
  const followRequests: FollowRequest[] = useSelector(selectFollowRequests);

  const renderContent = () => {
    if (!followRequests?.length) {
      return (
        <div className="flex items-center my-3 justify-center">
          <p className="text-xs">No requests found.</p>
        </div>
      );
    }

    return followRequests?.map((request: FollowRequest) => (
      <FollowRequestItem key={request._id} request={request} />
    ));
  };

  return (
    <Menubar asChild className="p-0 border-none">
      <MenubarMenu>
        <MenubarTrigger
          asChild
          className="cursor-pointer border-none outline-none bg-none p-0 rounded-full"
        >
          <div className="flex bg-gray-100 relative cursor-pointer h-10 w-10 items-center justify-center rounded-full">
            <IoIosPersonAdd className="text-xl text-gray-700" />

            {followRequests?.length > 0 && (
              <span className="absolute p-[1px] text-[10px] h-4 w-4 flex items-center justify-center text-white bg-red-400 rounded-full right-0 top-0">
                {followRequests.length > 9 ? "9+" : followRequests.length}
              </span>
            )}
          </div>
        </MenubarTrigger>
        <MenubarContent className="max-w-[500px] min-w-[300px]">
          <p className="p-1 text-sm font-medium text-gray-500">
            Follow Requests
          </p>
          <div className="flex flex-col max-h-[430px] overflow-y-scroll hide-scrollbar">
            {renderContent()}
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default FollowRequestsMenu;
