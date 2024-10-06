import { getCategories } from "../services/AllApiServices";

export const fetchCategoryNames = async () => {
  try {
    const data = await getCategories(); // Fetch categories data
    console.log("Fetched categories data:", data);

    // Check if data and categories exist
    if (data && data.categories) {
      return data.categories.map((category) => category); // Extract category names
    } else {
      console.error("Unexpected data format:", data);
      return [];
    }
  } catch (err) {
    console.error("Error fetching categories:", err);
    throw new Error("Failed to load categories"); // Handle error
  }
};
