export const convertFormDataToJSON = (formData: FormData) => {
  const json = {} as any;
  formData.forEach((value, key) => {
    json[key] = value;
  });
  return json;
}