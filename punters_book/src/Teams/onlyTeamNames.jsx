import { getTeams, teamByCategory} from "../services/AllApiServices";


//team names by category id
export const fetchOnlyTeamNames = async (id) => {
  try {
    const data = await teamByCategory(id); // Fetch categories data
    console.log("Fetched teamcategories data:", data);

    // Check if data and categories exist
    if (data && data.teams) {
      return data.teams.map((teams) => teams); // Extract category names
    } else {
      console.error("Unexpected data format:", data);
      return [];
    }
  } catch (err) {
    console.error("Error fetching teamcategories:", err);
    throw new Error("Failed to load teamcategories"); // Handle error
  }
};

//team names
export const fetchTeamNames = async () => {
  try {
    const data = await getTeams(); // Fetch team data
    console.log("Fetched team data:", data);

    // Check if data and categories exist
    if (data && data.teams) {
      return data.teams.map((teams) => teams); // Extract category names
    } else {
      console.error("Unexpected data format:", data);
      return [];
    }
  } catch (err) {
    console.error("Error fetching team:", err);
    throw new Error("Failed to load team"); // Handle error
  }
};