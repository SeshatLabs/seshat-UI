import { useEffect } from "react";
import Auth0Lock from "auth0-lock";

export default function LoginPage() {
  useEffect(() => {
    // Create an instance of Auth0Lock with your credentials
    const lock = new Auth0Lock(
      process.env.AUTH0_CLIENT_ID,
      process.env.AUTH0_ISSUER_BASE_URL,
      {
        additionalSignUpFields: [
          // Add any additional sign-up fields here
          {
            name: "full_name",
            placeholder: "Enter your full name",
            icon: "https://example.com/full_name_icon.png",
            validator: function (value) {
              // Validate the user's full name
              return {
                valid: value.length >= 3,
                hint: "Full name must be at least 3 characters",
              };
            },
          },
        ],
      }
    );

    // Show the Auth0Lock widget on page load
    lock.show();

    // Listen for the authenticated event
    lock.on("authenticated", function (authResult) {
      // Retrieve the user's profile and access token
      lock.getUserInfo(authResult.accessToken, function (error, profile) {
        if (error) {
          // Handle error
        } else {
          // Store the user's profile and access token
          localStorage.setItem("userProfile", JSON.stringify(profile));
          localStorage.setItem("accessToken", authResult.accessToken);

          // Redirect to the main application page
          window.location.href = "/";
        }
      });
    });

    // Clean up the Auth0Lock instance on page unload
    return function cleanup() {
      lock.hide();
    };
  }, []);

  return null;
}
