import findUp from "find-up";

export const getFindFile = async (
  filename: string | readonly string[],
  option?: findUp.Options
): Promise<string | undefined> => {
  const finded = await findUp(filename, option);
  return finded;
};
