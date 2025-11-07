import RoutesTab from './adapters/ui/pages/RoutesTab';
import CompareTab from './adapters/ui/pages/CompareTab';
import BankingTab from './adapters/ui/pages/BankingTab';
import PoolingTab from './adapters/ui/pages/PoolingTab';
import { Tabs } from './adapters/ui/components/Tabs';

export default function App(){
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">FuelEU Compliance Dashboard</h1>
      <Tabs tabs={[
        { key:'routes',  label:'Routes',   content:<RoutesTab/> },
        { key:'compare', label:'Compare',  content:<CompareTab/> },
        { key:'banking', label:'Banking',  content:<BankingTab/> },
        { key:'pooling', label:'Pooling',  content:<PoolingTab/> },
      ]} />
    </div>
  );
}
