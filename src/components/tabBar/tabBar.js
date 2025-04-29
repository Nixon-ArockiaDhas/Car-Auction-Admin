import * as React from 'react';
import {TabPanel ,TabList, TabContext, Tab, Box} from '../../MaterialComponents'
import "./tabBar.css"

const DynamicTabs = ({ tabs }) => {
  const [value, setValue] = React.useState('0');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1',marginTop:'1.25rem' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Tab Name" >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} value={index.toString()} />
            ))}
          </TabList>
        </Box>
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={index.toString()} className='tabDetails'>
            {tab.content ? tab.content : <div>This is default content</div>}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default DynamicTabs;
