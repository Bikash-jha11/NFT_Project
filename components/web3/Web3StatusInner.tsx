import React, { useEffect, useMemo } from 'react';
import ReactGA from 'react-ga4';
import { useAccount, useBalance } from 'wagmi';
import classNames from 'classnames';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { shortenAddress } from '@/utils';
import { isBABTHolderAtom } from '@/store/web3/state';
import { useBABTBalanceOf } from '@/hooks/useContract';
import { gamerEmailInfoAtom } from '@/store/gamer/state';
import Popover from '../popover';
import { useLogoutCallback } from '@/hooks/user';

function Web3StatusInner() {
  const { address, connector, isConnected } = useAccount();
  const { data: babtBalance } = useBABTBalanceOf({ address });

  // 1. Fetching the native balance (ETH/MATIC/BNB)
  const { data: balanceData, isLoading: isBalanceLoading } = useBalance({ address });

  const gamerEmailInfo = useRecoilValue(gamerEmailInfoAtom);
  const setIsBABTHolder = useSetRecoilState(isBABTHolderAtom);
  const isBABTHolder = useMemo(() => !!(babtBalance && babtBalance.toString() !== '0'), [babtBalance]);
  const logout = useLogoutCallback();

  // 2. Format the balance to 4 decimal places
  const formattedBalance = useMemo(() => {
    if (!balanceData) return '0.0000';
    return parseFloat(balanceData.formatted).toFixed(4);
  }, [balanceData]);

  useEffect(() => {
    if (!address) return;
    if (isBABTHolder) {
      ReactGA.event({ action: 'BABT', category: 'Show', label: address });
    }
    setIsBABTHolder(isBABTHolder);
  }, [isBABTHolder, setIsBABTHolder, address]);

  if (address) {
    return (
      <Popover
        placement="bottom-end"
        className="z-40 border-none bg-transparent"
        render={() => (
          <div className="flex items-start gap-3">
            <div className="backdrop-box flex flex-col gap-3 rounded-lg p-3">
              <p>{gamerEmailInfo.email}</p>
              <div
                className="flex-center cursor-pointer rounded-lg p-2.5 hover:bg-white/[0.12] hover:backdrop-blur-lg"
                onClick={logout}
              >
                <img className="h-5 w-5" src="/svg/logout.svg" alt="" />
                Disconnect
              </div>
            </div>
            {connector?.id === 'particleAuth' && (
              <div className="backdrop-box rounded-2xl p-3">
                <iframe
                  className="z-40 h-[37.5rem] w-[min(370px,90vw)] rounded-xl"
                  src="https://wallet.particle.network/"
                  allow="camera"
                />
              </div>
            )}
          </div>
        )}
      >
        <div
          className={classNames(
            'flex h-10 cursor-pointer items-center justify-center pl-3 pr-1.5 text-sm font-medium',
            isBABTHolder ? 'overflow-hidden rounded-full bg-gradient-babt' : 'rounded-full bg-white/10',
          )}
        >
          {/* 3. Display Balance to the left of the address */}
          {!isBalanceLoading && (
            <div className={classNames('mr-3 border-r border-white/20 pr-3', isBABTHolder && 'border-black/20 text-black')}>
              {formattedBalance} {balanceData?.symbol}
            </div>
          )}

          <p className={classNames(isBABTHolder && 'font-medium text-black')}>{shortenAddress(address)}</p>

          <div className="ml-3 h-6.5 w-6.5 overflow-hidden rounded-full border border-white bg-p12-gradient sm:hidden">
            {isBABTHolder ? (
              <img
                width={28}
                height={28}
                src="https://raw.githubusercontent.com/projecttwelve/icons/main/token/bab.jpg"
                alt="bnb"
              />
            ) : (
              <Jazzicon diameter={28} seed={jsNumberForAddress(address ?? '')} />
            )}
          </div>
        </div>
      </Popover>
    );
  }
  return null;
}

export default Web3StatusInner;
