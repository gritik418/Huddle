import axios from "axios";

export const searchUsersForChatRequest = async (searchQuery: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat-requests/search?q=${searchQuery}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data;
      }
    }
    return {
      success: false,
      message: "We couldn't find any matching users.",
    };
  }
};
