import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

const GeneralError = (message) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertDescription>{message}</AlertDescription>
      <CloseButton position="absolute" right="8px" top="8px" />
    </Alert>
  );
};

export default GeneralError;