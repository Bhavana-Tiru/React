import * as Yup from "yup";

const updatePreSche = Yup.object({
  rating: Yup.number()
    .required("Rating is required")
    .min(1, "Rating should be at least 1")
    .max(5, "Rating should be at most 5"),
  is_free: Yup.string().required("Is_Free is required"),
  is_tranding: Yup.string().required("Trading is required"),
  prediction_value: Yup.string().required("Prediction Value is required"),
  team1_prediction: Yup.string().required("Team1 Prediction is required"),
  team2_predicition: Yup.string().required(" Team2 Prediction is required"),
  team1_score: Yup.string().required("Team1 Score is required"),
  team2_score: Yup.string().required(" Team2 Score is required"),
  Odds: Yup.string().required("Odds is required"),
  result: Yup.string().required("Result is required"),
});

export default updatePreSche;
