import axios from "axios";
import { GUEST_URL } from "../environmentApi";

export const Login = async (values) => {
  //   try {
  const data = {
    email: values.emailName,
    password: values.password,
  };

  const response = await axios.post(`${GUEST_URL}/login`, data);
  const { token } = response;
  localStorage.setItem("token", token);
  localStorage.getItem("token");

  return response.data;
};

//For category
export const createCategory = async (values) => {
  // Create a new FormData object
  const formData = new FormData();
  formData.append("name", values.categoryName); // Append category name
  formData.append("icon", values.categoryImage); // Append the image file

  const token = localStorage.getItem("token"); // Get the token from local storage (or wherever you store it)
  console.log("Authorization Token:", token);
  try {
    // Make the POST request with the FormData and authorization header
    const response = await axios.post(
      `${GUEST_URL}/create-category`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the authorization header
          "Content-Type": "multipart/form-data", // Set the content type for file uploads
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error(
      "Error creating category:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw to handle in the calling function
  }
};

export const buttonAction = async (id) => {
  const token = localStorage.getItem("token");
  console.log(token);
  const data = { category_id: id };
  const response = await axios.post(
    `${GUEST_URL}/change-category-status`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getCategories = async () => {
  const requestData = {
    // Add any necessary data here if your API requires it
  };
  const response = await axios.post(
    `${GUEST_URL}/get-categories`,
    requestData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with actual token if necessary
        "Content-Type": "application/json", // Ensure the content type is correct
      },
    }
  );

  return response.data;
};

//for category-option
export const categoryOption = async (values) => {
  console.log(values);
  console.log(values.betOptCategoryId);

  // Create a new FormData object
  const catOpt = new FormData();
  if (values.betOptCategoryId)
    catOpt.append("category_id", values.betOptCategoryId);

  if (values.betoptionName) catOpt.append("name", values.betoptionName);

  // Log FormData to see if it's correctly populated
  for (let pair of catOpt.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  const token = localStorage.getItem("token"); // Get the token from local storage (or wherever you store it)
  console.log("Authorization Token:", token);
  try {
    // Make the POST request with the FormData and authorization header
    const response = await axios.post(`${GUEST_URL}/create-option`, catOpt, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the authorization header
        "Content-Type": "multipart/form-data", // Set the content type for file uploads
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error(
      "Error creating category:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw to handle in the calling function
  }
};

//delete category
export const deleteCategoryButton = async (id) => {
  const token = localStorage.getItem("token");
  console.log("Delete category Button id: ", id);

  const data = { category_id: id };
  const response = await axios.post(`${GUEST_URL}/delete-category`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//Update Category
export const UpdateCategory = async (values) => {
  console.log(values);
  console.log(values.updateCatName);

  // Create a new FormData object
  const updateCat = new FormData();
  if (values.updateCatName) updateCat.append("name", values.updateCatName);
  if (values.updateCatImg) updateCat.append("icon", values.updateCatImg);
  if (values.updateCatId) updateCat.append("category_id", values.updateCatId);
  // Log FormData to see if it's correctly populated
  for (let pair of updateCat.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  const token = localStorage.getItem("token"); // Get the token from local storage (or wherever you store it)
  console.log("Authorization Token:", token);
  try {
    // Make the POST request with the FormData and authorization header
    const response = await axios.post(
      `${GUEST_URL}/update-category`,
      updateCat,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the authorization header
          "Content-Type": "multipart/form-data", // Set the content type for file uploads
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error(
      "Error creating category:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw to handle in the calling function
  }
};

//For League
export const addLeague = async (values) => {
  console.log(values);
  console.log(values.leagueName);

  // Create a new FormData object
  const leagueData = new FormData();
  if (values.leagueName) leagueData.append("name", values.leagueName);
  if (values.leagueLogo) leagueData.append("icon", values.leagueLogo);
  if (values.colorPicker) leagueData.append("color", values.colorPicker);
  if (values.category_id) leagueData.append("category_id", values.category_id);

  // Log FormData to see if it's correctly populated
  for (let pair of leagueData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  const token = localStorage.getItem("token"); // Get the token from local storage (or wherever you store it)
  console.log("Authorization Token:", token);
  try {
    // Make the POST request with the FormData and authorization header
    const response = await axios.post(
      `${GUEST_URL}/create-league`,
      leagueData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the authorization header
          "Content-Type": "multipart/form-data", // Set the content type for file uploads
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error(
      "Error creating category:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw to handle in the calling function
  }
};

//get leagues
export const getLeagues = async () => {
  const requestData = {
    // Add any necessary data here if your API requires it
  };
  const response = await axios.post(`${GUEST_URL}/get-leagues`, requestData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with actual token if necessary
      "Content-Type": "application/json", // Ensure the content type is correct
    },
  });

  return response.data;
};

//for teams
export const getTeams = async () => {
  const requestData = {
    // Add any necessary data here if your API requires it
  };

  try {
    const response = await axios.post(`${GUEST_URL}/get-teams`, requestData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Corrected syntax for the template literal
        "Content-Type": "application/json", // Ensure the content type is correct
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching leagues:", error); // Log any error for debugging
    throw error; // Re-throw the error if you want to handle it upstream
  }
};

export const buttonTeam = async (id) => {
  const token = localStorage.getItem("token");
  console.log(token);
  const data = { team_id: id };
  const response = await axios.post(`${GUEST_URL}/change-team-status`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addTeam = async (values) => {
  console.log(values);
  console.log(values.teamName);

  // Create a new FormData object
  const teamData = new FormData();
  if (values.teamName) teamData.append("name", values.teamName);
  if (values.teamLogo) teamData.append("icon", values.teamLogo);
  if (values.category_id) teamData.append("category_id", values.category_id);

  // Log FormData to see if it's correctly populated
  for (let pair of teamData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  const token = localStorage.getItem("token"); // Get the token from local storage (or wherever you store it)
  console.log("Authorization Token:", token);
  try {
    // Make the POST request with the FormData and authorization header
    const response = await axios.post(`${GUEST_URL}/create-team`, teamData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the authorization header
        "Content-Type": "multipart/form-data", // Set the content type for file uploads
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error(
      "Error creating category:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw to handle in the calling function
  }
};

//PREDICTION
export const getPrediction = async () => {
  const requestData = {};

  try {
    const response = await axios.post(
      `${GUEST_URL}/get-predictions`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Correctly format the Authorization header
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // Return the response data
  } catch (error) {
    console.error("Error fetching leagues:", error); // Log any errors that occur
    throw error; // Rethrow the error for further handling
  }
};

export const addPredictions = async (values) => {
  console.log(values);
  console.log(values.matchName);

  // Create a new FormData object
  const addPreData = new FormData();
  if (values.matchName) addPreData.append("name", values.matchName);
  if (values.preCategoryDetails)
    addPreData.append("category_id", values.preCategoryDetails);
  if (values.preleagueName)
    addPreData.append("league_id", values.preleagueName);
  if (values.status) addPreData.append("status", values.status);
  if (values.team1) addPreData.append("team1_id", values.team1);
  if (values.team2) addPreData.append("team2_id", values.team2);
  if (values.date) addPreData.append("start_at", values.date);
  if (values.rating) addPreData.append("rating", values.rating);
  if (values.is_free) addPreData.append("is_free", values.is_free);
  if (values.is_trading) addPreData.append("is_tranding", values.is_trading);
  if (values.prediction_value)
    addPreData.append("prediction_value", values.prediction_value);
  if (values.team1_prediction)
    addPreData.append("team1_prediction", values.team1_prediction);
  if (values.team2_prediction)
    addPreData.append("team2_prediction", values.team2_prediction);
  if (values.reason) addPreData.append("reason", values.reason);
  if (values.odds) addPreData.append("odds", values.odds);

  // Log FormData to see if it's correctly populated
  for (let pair of addPreData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  const token = localStorage.getItem("token"); // Get the token from local storage (or wherever you store it)
  console.log("Authorization Token:", token);
  try {
    // Make the POST request with the FormData and authorization header
    const response = await axios.post(
      `${GUEST_URL}/create-prediction`,
      addPreData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the authorization header
          "Content-Type": "multipart/form-data", // Set the content type for file uploads
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error(
      "Error creating category:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw to handle in the calling function
  }
};

export const UpdatePredictions = async (values) => {
  console.log(values);
  console.log(values.team1_score);

  // Create a new FormData object
  const updatepre = new FormData();
  if (values.rating) updatepre.append("rating", values.rating);
  if (values.is_free) updatepre.append("is_free", values.is_free);
  if (values.is_tranding) updatepre.append("is_tranding", values.is_tranding);
  if (values.prediction_value)
    updatepre.append("prediction_value", values.prediction_value);
  if (values.team1_prediction)
    updatepre.append("team1_prediction", values.team1_prediction);
  if (values.team2_predicition)
    updatepre.append("team2_prediction", values.team2_predicition);
  if (values.team1_score) updatepre.append("team1_score", values.team1_score);
  if (values.team2_score) updatepre.append("team2_score", values.team2_score);
  if (values.reason) updatepre.append("reason", values.reason);
  if (values.Odds) updatepre.append("odds", values.Odds);
  if (values.result) updatepre.append("result", values.result);
  if (values.predicition_id)
    updatepre.append("prediction_id", values.predicition_id);

  // Log FormData to see if it's correctly populated
  for (let pair of updatepre.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  const token = localStorage.getItem("token"); // Get the token from local storage (or wherever you store it)
  console.log("Authorization Token:", token);
  try {
    // Make the POST request with the FormData and authorization header
    const response = await axios.post(
      `${GUEST_URL}/update-prediction`,
      updatepre,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the authorization header
          "Content-Type": "multipart/form-data", // Set the content type for file uploads
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error(
      "Error creating category:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw to handle in the calling function
  }
};

//prediction status update
export const preStatusUpdate = async (id, status) => {
  const token = localStorage.getItem("token");
  console.log(token);
  const data = { prediction_id: id, status:status };
  const response = await axios.post(
    `${GUEST_URL}/update-prediction-status`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const teamByCategory = async (id) => {
  const token = localStorage.getItem("token");
  console.log(token);
  const data = { category_id: id };
  const response = await axios.post(
    `${GUEST_URL}/get-teams-by-category`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const leagueByCategory = async (id) => {
  const token = localStorage.getItem("token");
  console.log(token);
  const data = { category_id: id };
  const response = await axios.post(
    `${GUEST_URL}/get-leagues-by-category`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

////////////////////////////////////////////////////////////////

//Multi-Parlay
export const createMulti = async (values) => {
  console.log(values);
  console.log(values.ParCategory);
  console.log(values.IsFree);
  console.log(values.IsStar);

  // Create a new FormData object
  const multiData = new FormData();
  if (values.ParCategoryId)
    multiData.append("category_id", values.ParCategoryId);
  if (values.ParStatus) multiData.append("status", values.ParStatus);
  if (values.ParOdds) multiData.append("odds", values.ParOdds);
  if (values.ParRating) multiData.append("rating", values.ParRating);
  if (values.IsFree !== undefined && values.IsFree !== null)
    multiData.append("is_free", values.IsFree);
  if (values.ParValue !== undefined && values.ParValue !== null)
    multiData.append("value", values.ParValue);
  if (values.IsStar !== undefined && values.IsStar !== null)
    multiData.append("is_star", values.IsStar);
  if (values.ParStart) multiData.append("start_at", values.ParStart);
  // if (values.IsFree) multiData.append("is_free", values.IsFree);
  // if (values.IsStar) multiData.append("is_star", values.IsStar);

  // Log FormData to see if it's correctly populated
  for (let pair of multiData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  const token = localStorage.getItem("token"); // Get the token from local storage (or wherever you store it)
  console.log("Authorization Token:", token);
  try {
    // Make the POST request with the FormData and authorization header
    const response = await axios.post(`${GUEST_URL}/create-parlay`, multiData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the authorization header
        "Content-Type": "multipart/form-data", // Set the content type for file uploads
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error(
      "Error creating category:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw to handle in the calling function
  }
};

export const getParlays = async () => {
  const requestData = {
    // Add any necessary data here if your API requires it
  };

  const token = localStorage.getItem("token"); // Get the token from local storage
  const response = await axios.post(`${GUEST_URL}/get-parlays`, requestData, {
    headers: {
      Authorization: `Bearer ${token}`, // Use template literal properly
      "Content-Type": "application/json", // Ensure the content type is correct
    },
  });

  return response.data;
};

export const conditionMultiButton = async (id) => {
  const token = localStorage.getItem("token");
  console.log("Parlay Button id: ", id);

  const data = { parlay_id: id };
  const response = await axios.post(
    `${GUEST_URL}/get-parlay-conditions`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
export const MultiAction = async (id, status) => {
  const token = localStorage.getItem("token");
  console.log("Sgm id: ", id);
  console.log("Sgm status: ", status);
  const data = { parlay_id: id, status: status };
  const response = await axios.post(`${GUEST_URL}/update-parlay-status`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//yes, idle, void in parlay
export const parlayConditionAction = async (id, status) => {
  const token = localStorage.getItem("token");
  console.log("parlay_condition_id: ", id);
  console.log("betbuilder_condition_id status: ", status);
  const data = { parlay_condition_id: id, status: status };
  const response = await axios.post(
    `${GUEST_URL}/update-parlay-condition-status`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

//addUpdateCondition-parlay

// /add-parlay-condition
export const addInsideConditionMulti = async (values) => {
  console.log(values);
  console.log(values.title);

  // Create a new FormData object
  const addConditionMulti = new FormData();
  if (values.parlay_id) addConditionMulti.append("parlay_id", values.parlay_id);
  if (values.team1_id) addConditionMulti.append("team1_id", values.team1_id);
  if (values.team2_id) addConditionMulti.append("team2_id", values.team2_id);
  if (values.odds) addConditionMulti.append("odds", values.odds);
  if (values.status) addConditionMulti.append("status", values.status);
  if (values.start_at) addConditionMulti.append("start_at", values.start_at);
  if (values.title) addConditionMulti.append("title", values.title);
  if (values.option_id) addConditionMulti.append("option_id", values.option_id);

  // Log FormData to see if it's correctly populated
  for (let pair of addConditionMulti.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  const token = localStorage.getItem("token"); // Get the token from local storage (or wherever you store it)
  console.log("Authorization Token:", token);
  try {
    // Make the POST request with the FormData and authorization header
    const response = await axios.post(
      `${GUEST_URL}/add-parlay-condition`,
      addConditionMulti,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the authorization header
          "Content-Type": "multipart/form-data", // Set the content type for file uploads
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error(
      "Error creating category:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw to handle in the calling function
  }
};

//delete button in add/update parlay
export const deleteparlayButton = async (id) => {
  const token = localStorage.getItem("token");
  console.log("Delete condition Button id: ", id);

  const data = { parlay_condition_id: id };
  const response = await axios.post(
    `${GUEST_URL}/delete-parlay-condition`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

///////////////////////////////////////////////

//SGM- bet Builder
export const getBetBuilders = async () => {
  const requestData = {
    // Add any necessary data here if your API requires it
  };

  const token = localStorage.getItem("token"); // Get the token from local storage
  const response = await axios.post(
    `${GUEST_URL}/get-bet-builders`,
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Use template literal properly
        "Content-Type": "application/json", // Ensure the content type is correct
      },
    }
  );

  return response.data;
};
export const betAction = async (id, status) => {
  const token = localStorage.getItem("token");
  console.log("Sgm id: ", id);
  console.log("Sgm status: ", status);
  const data = { betbuilder_id: id, status: status };
  const response = await axios.post(
    `${GUEST_URL}/update-bet-builder-status`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

//betbuilder_condition_id
export const betConditionAction = async (id, status) => {
  const token = localStorage.getItem("token");
  console.log("betbuilder_condition_id: ", id);
  console.log("betbuilder_condition_id status: ", status);
  const data = { betbuilder_condition_id: id, status: status };
  const response = await axios.post(
    `${GUEST_URL}/update-bet-builder-condition-status`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

//bet-builder add
export const addSGM = async (values) => {
  console.log(values);
  console.log(values.betCateId);

  // Create a new FormData object
  const createSGm = new FormData();
  if (values.betCateId) createSGm.append("category_id", values.betCateId);
  if (values.betOdds) createSGm.append("odds", values.betOdds);
  if (values.betValue) createSGm.append("value", values.betValue);
  if (values.betrating) createSGm.append("rating", values.betrating);
  if (values.betStatus) createSGm.append("status", values.betStatus);
  if (values.isstar !== undefined && values.isstar !== null)
    createSGm.append("is_star", values.isstar);
  if (values.betStartDate) createSGm.append("start_at", values.betStartDate);
  if (values.isFree !== undefined && values.isFree !== null)
    createSGm.append("is_free", values.isFree);
  if (values.team1) createSGm.append("team1_id", values.team1);
  if (values.team2) createSGm.append("team2_id", values.team2);

  // Log FormData to see if it's correctly populated
  for (let pair of createSGm.entries()) {
    console.log("Create SGM: ", `${pair[0]}: ${pair[1]}`);
  }

  const token = localStorage.getItem("token"); // Get the token from local storage (or wherever you store it)
  console.log("Authorization Token:", token);
  try {
    // Make the POST request with the FormData and authorization header
    const response = await axios.post(
      `${GUEST_URL}/create-bet-builder`,
      createSGm,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the authorization header
          "Content-Type": "multipart/form-data", // Set the content type for file uploads
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error(
      "Error creating category:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw to handle in the calling function
  }
};

///get-bet-builder-conditions
export const conditionButton = async (id) => {
  const token = localStorage.getItem("token");
  console.log("Sgm Button id: ", id);

  const data = { betbuilder_id: id };
  const response = await axios.post(
    `${GUEST_URL}/get-bet-builder-conditions`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

//bet-options
export const getBetOptions = async () => {
  const requestData = {
    // Add any necessary data here if your API requires it
  };

  const token = localStorage.getItem("token"); // Get the token from local storage
  const response = await axios.post(`${GUEST_URL}/get-options`, requestData, {
    headers: {
      Authorization: `Bearer ${token}`, // Use template literal properly
      "Content-Type": "application/json", // Ensure the content type is correct
    },
  });

  return response.data;
};

//update/ add condition  delete button function
///delete-condition-to-bet-builder
export const deleteButton = async (id) => {
  const token = localStorage.getItem("token");
  console.log("Delete condition Button id: ", id);

  const data = { betbuilder_condition_id: id };
  const response = await axios.post(
    `${GUEST_URL}/delete-condition-to-bet-builder`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

//add condition
///add-condition-to-bet-builder
export const createConditionSGM = async (values) => {
  console.log(values);
  console.log(values.title);

  // Create a new FormData object
  const addConditionSgm = new FormData();
  if (values.betbuilder_id)
    addConditionSgm.append("betbuilder_id", values.betbuilder_id);
  if (values.option_id) addConditionSgm.append("option_id", values.option_id);
  if (values.title) addConditionSgm.append("title", values.title);
  if (values.rating) addConditionSgm.append("rating", values.rating);
  if (values.status) addConditionSgm.append("status", values.status);

  // Log FormData to see if it's correctly populated
  for (let pair of addConditionSgm.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  const token = localStorage.getItem("token"); // Get the token from local storage (or wherever you store it)
  console.log("Authorization Token:", token);
  try {
    // Make the POST request with the FormData and authorization header
    const response = await axios.post(
      `${GUEST_URL}/add-condition-to-bet-builder`,
      addConditionSgm,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the authorization header
          "Content-Type": "multipart/form-data", // Set the content type for file uploads
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error(
      "Error creating category:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw to handle in the calling function
  }
};
