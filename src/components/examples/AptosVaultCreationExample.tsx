// import React, { useState } from 'react';
// import { Button } from 'shadcn/button';
// import { Input } from 'shadcn/input';
// import { Card, CardContent, CardHeader, CardTitle } from 'shadcn/card';
// import useCreateAptosVault from 'src/hooks/usePersonalVaults/useCreateAptosVault';
// import useSummaryAptosConnect from 'src/states/wallets/aptos-blockchain/hooks/useSummaryAptosConnect';

// export default function AptosVaultCreationExample() {
//     const { address, status } = useSummaryAptosConnect();
//     const { createVaultFn } = useCreateAptosVault({
//         contractAddress: '0x1234567890abcdef1234567890abcdef12345678', // Replace with actual contract address
//         moduleName: 'vault_module',
//         waitForReceipt: true,
//         onCompletedAll: (hashes) => {
//             console.log('Vault creation completed with transaction hashes:', hashes);
//         },
//         onError: (error) => {
//             console.error('Vault creation failed:', error);
//         },
//     });

//     const [formData, setFormData] = useState({
//         vaultName: '',
//         vaultAssetAddress: '',
//         vaultShareTokenName: '',
//         vaultShareTokenSymbol: '',
//         profitMaxUnlockTime: 0,
//         managementFee: 0,
//     });

//     const [isCreating, setIsCreating] = useState(false);

//     const handleCreateVault = async () => {
//         if (status !== 'Connected') {
//             alert('Please connect your wallet first');
//             return;
//         }

//         if (!formData.vaultName || !formData.vaultAssetAddress) {
//             alert('Please fill in all required fields');
//             return;
//         }

//         setIsCreating(true);
//         try {
//             await createVaultFn(formData.vaultName, formData.vaultAssetAddress, formData.vaultShareTokenName, formData.vaultShareTokenSymbol, formData.profitMaxUnlockTime, formData.managementFee);
//         } catch (error) {
//             console.error('Error creating vault:', error);
//         } finally {
//             setIsCreating(false);
//         }
//     };

//     const handleInputChange = (field: string, value: string | number) => {
//         setFormData((prev) => ({
//             ...prev,
//             [field]: value,
//         }));
//     };

//     return (
//         <Card className="w-full max-w-2xl mx-auto">
//             <CardHeader>
//                 <CardTitle>Create Aptos Vault</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//                 <div>
//                     <label className="block text-sm font-medium mb-2">Vault Name</label>
//                     <Input value={formData.vaultName} onChange={(e) => handleInputChange('vaultName', e.target.value)} placeholder="Enter vault name" />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium mb-2">Vault Asset Address</label>
//                     <Input value={formData.vaultAssetAddress} onChange={(e) => handleInputChange('vaultAssetAddress', e.target.value)} placeholder="0x..." />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium mb-2">Share Token Name</label>
//                     <Input value={formData.vaultShareTokenName} onChange={(e) => handleInputChange('vaultShareTokenName', e.target.value)} placeholder="Enter share token name" />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium mb-2">Share Token Symbol</label>
//                     <Input value={formData.vaultShareTokenSymbol} onChange={(e) => handleInputChange('vaultShareTokenSymbol', e.target.value)} placeholder="Enter share token symbol" />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium mb-2">Profit Max Unlock Time (seconds)</label>
//                     <Input
//                         type="number"
//                         value={formData.profitMaxUnlockTime}
//                         onChange={(e) => handleInputChange('profitMaxUnlockTime', parseInt(e.target.value) || 0)}
//                         placeholder="Enter unlock time in seconds"
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium mb-2">Management Fee (%)</label>
//                     <Input
//                         type="number"
//                         value={formData.managementFee}
//                         onChange={(e) => handleInputChange('managementFee', parseInt(e.target.value) || 0)}
//                         placeholder="Enter management fee percentage"
//                     />
//                 </div>

//                 <Button onClick={handleCreateVault} disabled={isCreating || status !== 'Connected'} className="w-full">
//                     {isCreating ? 'Creating Vault...' : 'Create Vault'}
//                 </Button>

//                 {status !== 'Connected' && <p className="text-sm text-red-500 text-center">Please connect your wallet to create a vault</p>}
//             </CardContent>
//         </Card>
//     );
// }
