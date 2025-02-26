import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
  effects: [
    ({ setSelf }) => {
      const savedMode = localStorage.getItem("isDark");
      if (savedMode !== null) {
        setSelf(JSON.parse(savedMode));
      }
    },
    ({ onSet }) => {
      onSet((newMode) =>
        localStorage.setItem("isDark", JSON.stringify(newMode))
      );
    },
  ],
});
