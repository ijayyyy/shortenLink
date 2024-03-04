import React from "react";
import "./TextInput.css";

type Props = {
  label?: string;
  placeholder?: string;
  onChange: (val: string | number) => void;
  type?: "text" | "password";
  value: string;
  className?: string;
  style?: {}
};

const TextInput: React.FC<Props> = ({
  label,
  placeholder,
  onChange,
  type = "text",
  value,
  className,
  style
}) => {
  return (
    <div className="TextInput">
      {Boolean(label) && <label htmlFor="">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
      />
    </div>
  );
};

export default TextInput;
