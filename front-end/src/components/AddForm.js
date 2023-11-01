import axios from 'axios';
import React from 'react';
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";

import InputField from './InputField';


const AddForm = ({ setTasks }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { title, description } = data
    const taskPayload = { title, description }

    try {
      const { data } = await axios.post(`/api/v1/tasks`, {
        ...taskPayload
      })

      if (data) {
        const { data: { tasks } } = await axios.get('/api/v1/tasks')

        setTasks(tasks)
      }

      reset()
    } catch (error) {
      //logic to handle error
      console.log(error)
    }

  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputField
              name="Title"
              placeholder="Title"
              onChange={onChange}
              value={value}
              error={errors?.title?.message}
            />
          )}
          rules={{
            required: "Field is required",
            maxLength: { value: 50, message: "Max length: 50" },
            minLength: { value: 4, message: "Min length: 4" },
          }}
        />
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputField
              name="Description"
              placeholder="Description"
              onChange={onChange}
              value={value}
              error={errors?.description?.message}
            />
          )}
          rules={{
            required: "Field is required",
            maxLength: { value: 50, message: "Max length: 50" },
            minLength: { value: 10, message: "Min length: 10" },
          }}
        />
        <div className='add_wrapper'>
          <button type="submit">
            Add
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddForm;

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

  .add_wrapper {
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
