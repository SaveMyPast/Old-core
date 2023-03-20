import { adapt } from "../../state-adapt";
import { toSource } from "@state-adapt/rxjs";
import userResponsesAdapter from "../adapters/userResponsesAdapter";
import userResponses$ from "../db/userResponses";

const userResponsesSource$ = userResponses$.pipe(toSource("userResponses$"));

export const userResponseStore = adapt(
  ["userResponses", [], userResponsesAdapter],
  userResponsesSource$
);
