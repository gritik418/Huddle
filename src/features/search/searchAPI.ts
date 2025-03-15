import axios from "axios";

export const search = async (
  searchQuery: string,
  type: string,
  page: number,
  limit: number
) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search?q=${searchQuery}&type=${type}&page=${page}&limit=${limit}`,
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
