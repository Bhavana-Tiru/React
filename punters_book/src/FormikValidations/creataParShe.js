// top beside Create parlay-> Parlays List(button) Category(dropdown),status(dropdown),
//  odds(input), rating(i/p), isFree(checkbox), value(i/p), button

import * as Yup from "yup";

const createParSchema = Yup.object().shape({
  ParCategory: Yup.string().required(" Category is required"),
  ParStatus: Yup.string().required(" Status is required"),
  ParOdds: Yup.number().required("Odds are required"),
  ParRating: Yup.number()
    .required("Rating is required")
    .min(1, "Rating should be at least 1")
    .max(5, "Rating should be at most 5"),
  ParValue: Yup.number()
    .required("Value is required")
    .min(0, "Value must have atleast one number"),
  ParStart: Yup.date().required("Date is required"),
});

export default createParSchema;
