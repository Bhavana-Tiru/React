//match name->textfield
//category, league name, status, team1, team2->dropdown
//start date-> date

import * as Yup from "yup";

const matchValidations = Yup.object({
  matchName: Yup.string()
    .required("Match Name is required")
    .min(2, " Match Name must be at least 3 characters"),
  preCategoryDetails: Yup.string().required("Category is required"),
  preleagueName: Yup.string().required("League is required"),
  status: Yup.string().required("Status is required"),
  team1: Yup.string().required("Team 1 is required"),
  team2: Yup.string().required("Team 2 is required"),
  date: Yup.date().required("Date is required"),
});

export default matchValidations;
