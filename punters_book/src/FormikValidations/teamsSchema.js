// team name -> textfield
//category -> dropdown
//team logo

import * as Yup from "yup";

const teamSchema = Yup.object({
  teamName: Yup.string()
    .required("Team Name is required")
    .min(2, " Team Name must be at least 3 characters"),
  teamcategoryDetails: Yup.string().required("Category is required"),
  teamLogo: Yup.mixed().required("Team Logo is required"),
});

export default teamSchema;
