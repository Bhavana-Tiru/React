// Category-> dropdown
//team1-> search
//team2 -> search
//status -> dropdown
// start date -> date
//odds-> float
// rating->number
//value-> number

import * as Yup from "yup";

const createbetValidations = Yup.object({
  team1: Yup.string().required("Team1 is required"),
  team2: Yup.string().required("Team2 is required"),
  betCategory: Yup.string().required("Category is required"),
  betStatus: Yup.string().required("Status is required"),

  betStartDate: Yup.date().required("Date is required"),
  betOdds: Yup.number().required("Odds is required"),
  betrating: Yup.number()
    .required("Rating is required")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be more than 5"),
  betValue: Yup.number()
    .required(" value is required")
    .min(0, " Odds should be single digit"),
});

export default createbetValidations;
