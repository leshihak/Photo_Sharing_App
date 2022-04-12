import { Box } from "@mui/material";
import TabPanel from "components/ui/TabPanel/TabPanel";
import Tabs from "components/ui/Tabs/Tabs";
import { TabType } from "models/ui.model";
import { FC, useState, SyntheticEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EditProfile from "./EditProfile";

const TABS: TabType[] = [
  {
    label: "Edit Profile",
  },
  {
    label: "Professional Account",
  },
  {
    label: "Change Password",
  },
];

const tabNameToIndex: { [key: number]: string } = {
  0: "/accounts/edit",
  1: "/accounts/professional_account_settings",
  2: "/accounts/change_password",
};

const indexToTab: { [key: string]: number } = {
  "/accounts/edit": 0,
  "/accounts/professional_account_settings": 1,
  "/accounts/change_password": 2,
};

const Settings: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabValue, setTabValue] = useState(indexToTab[location.pathname] ?? 0);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    navigate(tabNameToIndex[newValue]);
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "common.white",
        display: "flex",
        border: "1px solid #dbdbdb",
      }}
    >
      <Box borderRight="1px solid #dbdbdb" minWidth={236}>
        <Tabs
          tabs={TABS}
          onChange={handleTabChange}
          value={tabValue}
          orientation="vertical"
        />
      </Box>
      <TabPanel value={tabValue} index={0}>
        <EditProfile />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
};

export default Settings;
