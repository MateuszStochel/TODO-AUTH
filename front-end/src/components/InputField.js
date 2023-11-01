import styled from "styled-components";

const InputField = ({ name, placeholder, onChange, value = '', error, type = 'text' }) => {
  return (
    <FieldWrapper>
      <label>{name}:</label>
      <input
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        type={type}
      />
      {error && <p>{error}</p>}
    </FieldWrapper>
  );
}

export default InputField

const FieldWrapper = styled.div`
  margin-bottom: 20px;

  p {
    color: var(--red-dark);
  }
`;