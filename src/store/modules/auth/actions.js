export default {
  async login(context, payload) {
    context.dispatch('auth',{
      ...payload,
      mode:'login'
    })
  },
  async signup(context, payload) {
    context.dispatch('auth',{
      ...payload,
      mode:'signup'
    })
  },

  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxAq9RZNXr0Sq-LNV-XpzibnAEwVp5xaA";

    url =
      mode == "login"
        ? url
        : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxAq9RZNXr0Sq-LNV-XpzibnAEwVp5xaA";
    const response = await fetch(
      url,
      {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.error.errors[0].message || "Filed to Signup"
      );
      throw error;
    }

    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },

  logout(context) {
    context.commit("setUser", {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};
