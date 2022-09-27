import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from '@material-tailwind/react';

export default function BusinessTabs({ views }: any) {
    type data = {
        label: string;
        value: string;
        view: any;
    };
    let data: data[] = [
        {
            label: 'List View',
            value: 'list',
            view: views[0],
        },
        {
            label: 'Map View',
            value: 'map',
            view: views[1],
        },
    ];
    return (
        <Tabs value="list">
            <TabsHeader className="mx-auto max-w-sm">
                {data.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
            <div className="mx-auto my-2  md:my-4  bg-gray-100 rounded-lg  max-w-xl md:max-w-3xl lg:max-w-6xl">
                <TabsBody>
                    {data.map(({ value, view }) => (
                        <TabPanel key={value} value={value}>
                            {view}
                        </TabPanel>
                    ))}
                </TabsBody>
            </div>
        </Tabs>
    );
}
