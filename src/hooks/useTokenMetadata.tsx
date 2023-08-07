import {AssetBalance} from '@aragon/sdk-client';
import {TokenType} from '@aragon/sdk-client-common';
import {constants} from 'ethers';
import {useMemo} from 'react';
import {useNetwork} from 'context/network';
import {CHAIN_METADATA} from 'utils/constants';
import {HookData, TokenWithMetadata} from 'utils/types';
import {useTokenList} from 'services/token/queries/use-token';

export const useTokenMetadata = (
  assets: AssetBalance[] = []
): HookData<TokenWithMetadata[]> => {
  const {network} = useNetwork();

  const tokenListParams = assets.map(asset => ({
    address:
      asset.type !== TokenType.NATIVE ? asset.address : constants.AddressZero,
    network,
    symbol: asset.type !== TokenType.NATIVE ? asset.symbol : undefined,
  }));
  const tokenResults = useTokenList(tokenListParams);

  const isLoading = tokenResults.some(result => result.isLoading);
  const isError = tokenResults.some(result => result.isError);
  const tokens = tokenResults.map(result => result.data);

  const processedTokens = useMemo(() => {
    if (isLoading) {
      return [];
    }

    const tokensWithMetadata = assets.map((asset, index) => ({
      balance: asset.type !== TokenType.ERC721 ? asset.balance : BigInt(0),
      metadata: {
        ...(asset.type === TokenType.ERC20
          ? {
              id: asset.address,
              decimals: asset.decimals,
              name: tokens[index]?.name ?? asset.name,
              symbol: tokens[index]?.symbol ?? asset.symbol,
            }
          : {
              id: constants.AddressZero,
              decimals: CHAIN_METADATA[network].nativeCurrency.decimals,
              name:
                tokens[index]?.name ??
                CHAIN_METADATA[network].nativeCurrency.name,
              symbol:
                tokens[index]?.symbol ??
                CHAIN_METADATA[network].nativeCurrency.symbol,
            }),

        price: tokens[index]?.price,
        apiId: tokens[index]?.id,
        imgUrl: tokens[index]?.imgUrl ?? '',
      },
    }));

    return tokensWithMetadata;
  }, [assets, tokens, isLoading, network]);

  return {data: processedTokens, isLoading, isError};
};
