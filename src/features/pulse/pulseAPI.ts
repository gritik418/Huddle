import axios from "axios";

export const getAllPulses = async (page: number, limit: number) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pulse?page=${page}&limit=${limit}`,
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

export const getUserPulses = async (page: number, limit: number) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pulse/me?page=${page}&limit=${limit}`,
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
