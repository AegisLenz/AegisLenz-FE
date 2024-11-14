import React, { useState } from "react";
import * as S from "./DropDown_style";

const CustomDropdown = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <S.DropdownWrapper>
      <S.SelectedOption onClick={handleToggle}>
        {selectedOption || "== Select =="}
      </S.SelectedOption>
      {isOpen && (
        <S.DropdownList>
          {options.map((option, index) => (
            <S.DropdownItem
              key={index}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </S.DropdownItem>
          ))}
        </S.DropdownList>
      )}
    </S.DropdownWrapper>
  );
};

export default CustomDropdown;
