import { FC } from 'react';
import Tabs, { ITabsProps } from './tabs';
import TabItem, { ITabProps } from './tab';
import TabPanel, { ITabPanelProps } from './tabPanel';

export type ITabsComponent = FC<ITabsProps> & {
  Item: FC<ITabProps>;
  Panel: FC<ITabPanelProps>;
};

const TransTabs = Tabs as unknown as ITabsComponent;

TransTabs.Item = TabItem;
TransTabs.Panel = TabPanel;

export default TransTabs;
