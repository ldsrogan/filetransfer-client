import styled from 'styled-components';

const Dropzone = styled.div`
  height: 200px;
  width: 200px;
  background-color: ${props =>
    props.highlight ? 'rgb(188, 185, 236)' : '#fff'};
  border: 2px dashed rgb(187, 186, 186);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;
`;

const Icon = styled.div`
  opacity: 0.7;
  height: 64px;
  width: 64px;
  margin-bottom: -15px;
  margin-left: 30px;
`;

const FileInput = styled.div`
  display: none;
`;

export { Dropzone, Icon, FileInput };
