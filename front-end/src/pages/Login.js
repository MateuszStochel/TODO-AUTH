import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import InputField from "../components/InputField";
import { useGlobalContext } from "../context";
import useLocalState from "../utils/localState";
import { emailRule } from "../utils/validationsRules";


const Login = React.memo(() => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { saveUser } = useGlobalContext();
  const history = useHistory();

  const { isError, setLoading, isLoading, setError } = useLocalState();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(false);

    const { email, password } = data;
    const loginCredentials = { email, password }
    try {
      const { data } = await axios.post(`/api/v1/auth/login`, loginCredentials);

      setLoading(false);
      saveUser(data.user);
      history.push("/dashboard");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>{isError && <p>Wrong credentials</p>}</div>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputField
              name="Email"
              placeholder="Email"
              onChange={onChange}
              value={value}
              error={errors?.email?.message}
            />
          )}
          rules={{ required: "Field is required", pattern: emailRule }}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputField
              name="Password"
              placeholder="Password"
              onChange={onChange}
              value={value}
              type='password'
              error={errors?.password?.message}
            />
          )}
          rules={{
            required: "Field is required",
            maxLength: { value: 50, message: "Max length: 50" },
            minLength: { value: 4, message: "Min length: 4" },
          }}
        />
        <div className="login_wrapper">
          <button disabled={isLoading} type="submit">
            Login
          </button>
        </div>
        <div>
          <p>
            Don't have an account?
            <Link to="/register" className="register-link">
              Register
            </Link>
          </p>
        </div>
      </form>
    </Wrapper>
  );
})

export default Login;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  form {
    border: 1px solid var(--primary-100);
    background-color: var(--primary-100);
    padding: 20px;
    width: 100%;

    input {
      width: 100%;
      height: 40px;
    }
  }

  label {
    margin-right: 20px;
  }

  p {
    color: var(--red-dark);
  }

  .login_wrapper {
    display: flex;
    justify-content: center;

    button {
      padding: 10px 20px;
      background-color: var(--primary-500);
      border: 1px solid var(--primary-600);
      cursor: pointer;
    }
  }

  .register-link {
    margin-left: 20px;
  }
`;
