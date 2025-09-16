import { Card, CardContent } from 'shadcn/card';
import TabCustom from 'src/components/customs/TabCustom';
import Deposit from './Deposit';
import Withdraw from './Withdraw';

export default function ActionPanel() {
    return (
        <Card>
            <CardContent>
                <TabCustom
                    height={44}
                    tabs={[
                        { value: 'deposit', label: 'Deposit', content: <Deposit /> },
                        { value: 'withdraw', label: 'Withdraw', content: <Withdraw /> },
                    ]}
                />
            </CardContent>
        </Card>
    );
}
