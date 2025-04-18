import { RecSizeTyre } from "@app/entities/Auto/module/types/autoSelectsTypes";

const compare = (val1, val2) => {
  if (val1 < val2) { return 1 }
  if (val1 > val2) { return -1 }
  return 0;
};

export const sortSizeTyres = (a: RecSizeTyre, b: RecSizeTyre) => {
  return (
    compare(Number(a.diameter), Number(b.diameter)) ||
    compare(Number(a.width), Number(b.width)) ||
    compare(Number(a.height), Number(b.height))
  );
};
