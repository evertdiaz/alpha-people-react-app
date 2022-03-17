import { useMemo } from "react";

const useTruncatedAddress = (account) => {
  console.log('entering truncation')
  console.log(account)
  const truncated = useMemo(
    () => `${account?.substr(0, 6)}...${account?.substr(-4)}`,
    [account]
  );

  return truncated;
};

export default useTruncatedAddress;
