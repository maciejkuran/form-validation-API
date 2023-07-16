# Form Validation API ⚡

<p align="center">
  <img width="200" src="/public/icon.png">
</p>

You don't have to worry about form validation anymore, and write boilerplate code 😩. This API handles validation out-of-the-box 📦! It's as simple as that.

🔗 API URL: `https://form-validation-api.vercel.app/api`

## API Endpoints

There are 4 endpoints to choose from.
You can expect a response with a status code of `400` (if validation failed), and `200` if succeded. More in the examples section.

| Description            | Method   | Expected req.body                                              | Endpoint      |
| ---------------------- | -------- | -------------------------------------------------------------- | ------------- |
| Validate password      | \`POST\` | `{password: $value}`                                           | \`/password\` |
| Validate email address | \`POST\` | \`{email: $value}\`                                            | \`/email\`    |
| Sign In Form           | \`POST\` | \`{email: $value, password: $value}\`                          | \`/sign-in\`  |
| Sign Up Form           | \`POST\` | \`{email: $value, password: $value, confirmPassword: $value}\` | \`/sign-up\`  |

### Validating Only Password 🔑

👉 Endpoint: `/password`

We check whether the password:

- is not empty,
- contains at least 8 characters,
- contains at least 1 digit,
- contains at least 1 capital letter,
- contains at least 1 special character.

### Validating Only Email Address 📧

👉 Endpoint: `/email`

We check whether the email address:

- is not empty,
- doesn't contain special characters such as `!#$%^&\*(),?\":{}|<>~^+/=`,
- has no spaces,
- contains the @ symbol,
- does not have an additional @ in the username portion,
- does not contain offensive, vulgar, or inappropriate content (example words will not be mentioned for ethical reasons).

### Sign In Form Validation

👉 Endpoint: `/sign-in`

- validating both: email & password.

### Sign Up Form Validation

👉 Endpoint: `/sign-up`

- validating: email, password & password match.

## Example

In the example provided below, I am validating the user's password. The same analogy applies to each available form of validation.

```
const url = 'https://form-validation-api.vercel.app/api';

  const reqConfig = (method: string, body: {}): {} => {
    return {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  };

  const validatePassword = async (password: string) => {
    try {
      const res = await fetch(`${url}/password`, reqConfig('POST', { password: password }));
      const validationResult = await res.json();

      if (!res.ok) throw new Error(validationResult.error); // if 400 code, 'error' key is available on the response object

      //If we got here, it means that validation is successful
      console.log(validationResult.success); //if 200 code, 'success' key is available on the res. object
    } catch (error) {
      console.log((error as Error).message);
    }
  };

```

## Rate Limit Middleware

Rate limiting is a strategy employed to restrict network traffic and prevent potential abuse of APIs. Each API route is equipped with its own `rateLimiter` variable, which records the `timestamps` of user requests. That, in essence, summarizes the concept.

The number of permitted requests per user, per minute for each API route is set at `10`.

## Contribution

Hey there, awesome folks! 👋 We're on a mission to make magic happen, and we need your collaboration superpowers! Let's team up, share ideas, and pool our talents to create something useful 🚀💫. Feel free to `fork` repo and `pull requests` or submit your request via `issues`.

#CollaborationNation
