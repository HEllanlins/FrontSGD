import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  border: 1px solid #ccc;
  padding: 8px;
  background-color: #f4f4f4;
`;

export const Td = styled.td`
  border: 1px solid #ccc;
  padding: 8px;
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;
