import { box } from '@mui/material';
import CommerceNavTab from '../components/tabs/CommerceNavTab';

const Commerce = () => {
  const [CurrentRowInCommerceTab, setCurrentRowInCommerceTab] = useState(0);
  const [CurrentTabInPrincipalTab, setCurrentTabInPrincipalTab] = useState('PRODUCTOS');
  return (
    <box>
      <CommerceNavTab
        setCurrentRowInCommerceTab={setCurrentRowInCommerceTab}
        setCurrentTabInPrincipalTab={setCurrentTabInPrincipalTab}
      />
    </box>
  )
}
export default Commerce