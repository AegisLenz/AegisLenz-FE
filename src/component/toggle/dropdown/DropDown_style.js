import styled from "styled-components";

export const DropdownWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

export const SelectedOption = styled.div`
  background-color: #104f55;
  font-size: 0.6em;
  font-weight: 500;
  color: white;

  border-radius: 1em;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;

  border: 1px solid #ccc;

  border-radius: 0.1em;
  background-color: #ffffff;
  margin: 5px 0 0;

  padding: 0;
  list-style: none;

  text-align: center;

  overflow-y: auto;
`;

export const DropdownItem = styled.li`
  font-size: 0.6em;
  font-weight: 500;

  padding: 4%;
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: #eee;
  }
`;
