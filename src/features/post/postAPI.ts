import axios from "axios";

export const getFeed = async (limit: number, page: number) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/feed?page=${page}&limit=${limit}`,
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
      message: "We couldn't find any matching results.",
    };
  }
};

export const getPostsByFollowings = async (limit: number, page: number) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/following?page=${page}&limit=${limit}`,
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
      message: "We couldn't find any matching results.",
    };
  }
};
