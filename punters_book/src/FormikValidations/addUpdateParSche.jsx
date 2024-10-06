import * as Yup from "yup";

const addUpdateParSche = Yup.object({
  team1_id: Yup.string().required("Team1 is required"),
  team2_id: Yup.string().required("Team2 is required"),
  conditionOdds: Yup.string().required("Odds is required"),
  status: Yup.string().required('Status is required'),
  start_at:Yup.string().required("Start Date is required"),
  title: Yup.string().required("Title is required"),
  option_id: Yup.string().required("Option is required"),// deopdown
});

export default addUpdateParSche;
