import { leagueByCategory } from "../services/AllApiServices";

export const fetchLeagueNames = async (id) => {
  try {
    const data = await leagueByCategory(id); // Fetch categories data
    console.log("Fetched categories data:", data);

    // Check if data and categories exist
    if (data && data.leagues) {
      return data.leagues.map((leagues) => leagues); // Extract category names
    } else {
      console.error("Unexpected data format:", data);
      return [];
    }
  } catch (err) {
    console.error("Error fetching categories:", err);
    throw new Error("Failed to load categories"); // Handle error
  }
};