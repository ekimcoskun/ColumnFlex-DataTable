import React, { useCallback } from "react";
import { debounce } from "lodash";
type DebounceTextInputProps = {
  placeHolder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  delay?: number;
  minLetter?: number;
  className?: string;
};

const DebounceTextInput: React.FC<DebounceTextInputProps> = ({
  placeHolder = "",
  onChange = () => {},
  disabled = false,
  delay = 0,
  minLetter = 0,
  className = "w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:border-gray-500 ",
}) => {
  const debounceFilter = useCallback(
    debounce((value: string) => {
      if (value.length >= minLetter) {
        onChange(value);
      }
    }, delay),
    [minLetter, delay, onChange]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceFilter(e.target.value);
  };

  return (
    <input
      type="text"
      className={className}
      placeholder={placeHolder}
      onChange={handleInputChange}
      disabled={disabled}
    />
  );
};

export default DebounceTextInput;
