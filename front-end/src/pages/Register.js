import React from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";

import useLocalState from "../utils/localState";
import InputField from "../components/InputField";
import { emailRule } from "../utils/validationsRules";

const Register = React.memo(() => {
  const history = useHistory();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { isError, setLoading, isLoading, setError } = useLocalState();


  const onSubmit = async (data) => {
    setLoading(true);
    setError(false);

    const { name, email, password } = data
    const registerNewUser = { name, email, password };

    try {
      await axios.post(
        `/api/v1/auth/register`,
        registerNewUser
      );

      history.push("/login");
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  };

  return (
    <>
      <Wrapper >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>{isError && <p>Wrong credentials</p>}</div>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputField
                name="Name"
                placeholder="Name"
                onChange={onChange}
                value={value}
                error={errors?.name?.message}
              />
            )}
            rules={{
              required: "Field is required",
              maxLength: { value: 50, message: "Max length: 50" },
              minLength: { value: 6, message: "Min length: 6" },
            }}
          />
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
                error={errors?.password?.message}
              />
            )}
            rules={{
              required: "Field is required",
              maxLength: { value: 50, message: "Max length: 50" },
              minLength: { value: 4, message: "Min length: 4" },
            }}
          />
          <div className='register_wrapper'>
            <button disabled={isLoading} type="submit">
              Register
            </button>
          </div>
          <p>
            Already a have an account?
            <Link to="/login" className="login-link">
              Log In
            </Link>
          </p>
        </form>
      </Wrapper>
    </>
  );
})

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

  .register_wrapper {
    display: flex;
    justify-content: center;

    button {
      padding: 10px 20px;
      background-color: var(--primary-500);
      border: 1px solid var(--primary-600);
      cursor: pointer;
    }
  }

  .login-link {
    margin-left: 20px;
  }
`;


export default Register;
