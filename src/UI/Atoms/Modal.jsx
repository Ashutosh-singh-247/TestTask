import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BackDropWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CardTitle = styled.h2`
  margin: 0;
`;

const CardModal = styled.div`
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  max-width: 600px;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
`;

const CardHeader = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
`;

const CardBody = styled.div`
    position: relative;
    flex: 1 1 auto;
    padding: 1rem;
`;

const CardCloseButton = styled.button`
  box-sizing: content-box;
  width: 1em;
  height: 1em;
  cursor: pointer;
  padding: 0.25em 0.25em;
  color: #000;
  background: transparent
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e")
    center/1em auto no-repeat;
  border: 0;
  border-radius: 0.25rem;
  opacity: 0.5;
`;

const Modal = ({
  isFromRight,
  cardTitle,
  closeFunction,
  cardHeading,
  cardContent,
  selectedValue1,
  selectedValue2,
  selectedValue3,
  selectedValue4,
}) => {
  return (
    <ModalWrapper>
      <BackDropWrapper />
      <CardModal>
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          <CardCloseButton onClick={closeFunction} />
        </CardHeader>
        <CardBody>
          <div>
            <h3>{cardHeading && cardHeading}</h3>
            <p>{cardContent && cardContent}</p>
            {isFromRight && !selectedValue1 && (
              <h1>
                Please select value from dropdown you will se output here...
              </h1>
            )}
            {selectedValue1 && (
              <>
                <h4>{selectedValue1 ? selectedValue1 : "Not Selected"}</h4>
                <h4>{selectedValue2 ? selectedValue2 : "Not Selected"}</h4>
                <h4>{selectedValue3 ? selectedValue3 : "Not Selected"}</h4>
                <h4>{selectedValue4 ? selectedValue4 : "Not Selected"}</h4>
              </>
            )}
          </div>
        </CardBody>
      </CardModal>
    </ModalWrapper>
  );
};

export default React.memo(Modal);
