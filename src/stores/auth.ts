import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string>(localStorage.getItem("token") || "");
  const isLogin = computed(() => token.value !== "");

  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem("token", newToken);
  }

  function logout() {
    token.value = "";
    localStorage.removeItem("token");
  }

  return { token, isLogin, setToken, logout };
});