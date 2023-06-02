import { Box, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMetaMask } from "../../hooks/useMetaMask";

export const MetaMaskWalletInfo = () => {
  const { wallet } = useMetaMask();

  const formatChainAsNum = (chainIdHex) => {
    const chainIdNum = parseInt(chainIdHex);
    return chainIdNum;
  };

  const formatAddress = (addr) => {
    return `${addr.substring(0, 8)}...`;
  };

  return (
    <Box>
      {wallet.accounts.length > 0 && (
        <>
          <Text>
            Etherscan Wallet Account:{" "}
            <Link
              as={NextLink}
              href={`https://etherscan.io/address/${wallet.accounts[0]}`}
              target="_blank"
            >
              {formatAddress(wallet.accounts[0])}
            </Link>
          </Text>
          <Text>Wallet Balance: {wallet.balance}</Text>
          <Text>Hex ChainId: {wallet.chainId}</Text>
          <Text>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</Text>
        </>
      )}
    </Box>
  );
};
