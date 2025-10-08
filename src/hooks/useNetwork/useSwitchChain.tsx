// import { useCallback } from 'react';

// const useSwitchChainTrigger = () => {
//     const chainIdConnected = useChainId();
//     const { chainId } = useAccount(); // Base Mainnet
//     const { switchChainAsync } = useSwitchChain();

//     const switchChainFn = useCallback(async () => {
//         if (!chainIdConnected) return;
//         try {
//             if (chainId !== chainIdConnected) {
//                 await switchChainAsync({ chainId: chainIdConnected });
//             }
//         } catch (error) {
//             console.log('Error switching chain:', error);
//         }
//     }, [chainId, chainIdConnected, switchChainAsync]);

//     return { switchChainFn };
// };

// export default useSwitchChainTrigger;
