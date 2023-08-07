type InputType = "STRING" | "NUMBER" | "EMAIL";

export interface BaseInput {
  name: string;
  label: string;
  type: InputType;
}

export interface StringInput extends BaseInput {
  type: "STRING";
  max_length: number;
  min_length: number;
  regex: string;
}

export interface NumberInput extends BaseInput {
  type: "NUMBER";
  min: number;
  max: number;
}

export interface EmailInput extends BaseInput {
  type: "EMAIL"
}

export type FormInput = StringInput | NumberInput | EmailInput;