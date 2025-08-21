export const toServerLabel = (s: string) => {
  if (s === "Wi-Fi") return "WiFi";
  if (s === "노트북 작업") return "노트북작업";
  return s;
};
