import { getBetOptions } from "../services/AllApiServices";

export const fetchOptionNames = async () => {
  try {
    const data = await getBetOptions(); // Fetch categories data
    console.log("Fetched categories data:", data);

    // Check if data and categories exist
    if (data && data.options) {
      return data.options.map((options) => options); // Extract category names
    } else {
      console.error("Unexpected data format:", data);
      return [];
    }
  } catch (err) {
    console.error("Error fetching categories:", err);
    throw new Error("Failed to load categories"); // Handle error
  }
};
