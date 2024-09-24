export type TextObject = {
  text: string;
};

export type ActionItem = {
  href?: string;
  text: string;
  visuallyHiddenText?: string;
};

export type ActionsObject = {
  items: ActionItem[];
};

export type SummaryListRow = {
  key: TextObject;
  value?: TextObject;
  actions: ActionsObject;
};

export type SummaryListContent = {
  rows?: SummaryListRow[];
};
