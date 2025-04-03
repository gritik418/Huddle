import axios from "axios";

export const getJoinedChannels = async (page: number, limit: number) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/channel/joined?page=${page}&limit=${limit}`,
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
      message: "You haven't joined any channels yet.",
    };
  }
};

export const getCreatedChannels = async (page: number, limit: number) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/channel/created?page=${page}&limit=${limit}`,
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
      message: "You haven't joined any channels yet.",
    };
  }
};
