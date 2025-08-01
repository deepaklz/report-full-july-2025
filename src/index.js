import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { CircleGauge, Users, TrendingUp, TrendingDown, ChevronRight, PieChartIcon, FlaskConical, Factory, BarChart2, HardHat, FileText, Globe, CheckCircle, Lightbulb, UserX, AlertTriangle, MessageCircle, Tablet } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const COLORS = ['#6366f1', '#a5b4fc', '#e0e7ff'];
const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

const data = {
  summary: [
    { name: 'Paid Customers', 'Previous Period': 101, 'Current Period': 106 },
    { name: 'New Customers', 'Previous Period': 5, 'Current Period': 6 },
    { name: 'Dropped Customers', 'Previous Period': 8, 'Current Period': 0 },
  ],
  newCustomers: [
    { name: 'RBA EXPORTS PRIVATE LIMITED TN', feature: 'Suggestion + HMT + MTC', cluster: 'Tamil Nadu', subCluster: 'Coimbatore' },
    { name: 'Shimoga Precision Castings Pvt. Ltd.', feature: 'Suggestion Reading', cluster: 'Karnataka', subCluster: 'Shimoga' },
    { name: 'Plasma Alloys Pvt. Ltd.', feature: 'Only Reading + HMT + MTC', cluster: 'Gujarat', subCluster: 'Rajkot' },
    { name: 'Rekha Metals Pvt. Ltd.', feature: 'Suggestion Reading', cluster: 'Maharashtra', subCluster: 'Kolhapur' },
    { name: 'Indo Shell Cast Pvt Ltd (Unit 2)', feature: 'AI', cluster: 'Tamil Nadu', subCluster: 'Chennai' },
    { name: 'Parvati Industries', feature: 'HMT + MTC', cluster: 'Maharashtra', subCluster: 'Kolhapur' },
  ],
  usageGroups: {
    totalActive: 112,
    groups: [
      { name: 'ChargeMix Users', count: 5 },
      { name: 'Software Off', count: 4 },
      { name: 'Software ON', count: 103 },
    ],
    featureBreakdown: [
      { name: 'Whatsapp (Only Reading)', value: 5 },
      { name: 'Whatsapp (Compared Reading)', value: 11 },
      { name: 'Whatsapp (Suggestion Reading)', value: 87 },
    ],
  },
  chargemix: [
    { name: 'Alchemy Precision Cast Pvt Ltd', 'Prev': 42, 'Curr': 79, optimized: 78 },
    { name: 'Brakes India Foundry Division Shollinganallur', 'Prev': 14, 'Curr': 13, optimized: 13 },
    { name: 'Brakes India Foundry Division Naidupet', 'Prev': 20, 'Curr': 2, optimized: 2 },
    { name: 'Brakes India Pvt Ltd (Flometallic Unit)', 'Prev': 0, 'Curr': 0, optimized: 0 },
    { name: 'Brakes India Pvt Ltd UNIT2', 'Prev': 0, 'Curr': 0, optimized: 0 },
  ],
  softwareOff: [
    { name: 'CRESCENT FOUNDRY CO PVT.LTD.', remark: 'Previous Period', feature: 'Charge Mix', cluster: 'West Bengal', subCluster: 'Howrah' },
    { name: 'Airking Industries', remark: 'Previous Period', feature: 'Suggestion + HMT + MTC', cluster: 'Gujarat', subCluster: 'Rajkot' },
    { name: 'SAN PRECISION ALLOYS PRIVATE LIMITED', remark: 'Previous Period', feature: 'Compared Reading', cluster: 'Tamil Nadu', subCluster: 'Coimbatore' },
    { name: 'Top-Gear Metals Pvt Ltd', remark: 'Previous Period', feature: 'Suggestion', cluster: 'Maharashtra', subCluster: 'Kolhapur' },
  ],
  moduleUse: {
    productionPlan: [
      { name: 'CRESCENT FOUNDRY CO PVT.LTD.(GJ)', 'Plan Created Prev. Period': 6, 'Plan Created Curr. Period': 6 },
      { name: 'Sapre Precision Techologies', 'Plan Created Prev. Period': 5, 'Plan Created Curr. Period': 4 },
      { name: 'Mal Metalliks Pvt. Ltd.', 'Plan Created Prev. Period': 1, 'Plan Created Curr. Period': 0 },
      { name: 'Vishwakarma Founders Pvt Ltd', 'Plan Created Prev. Period': 1, 'Plan Created Curr. Period': 0 },
      { name: 'NIPHA EXPORTS PVT. LTD. SRP (FOUNDRY)', 'Plan Created Prev. Period': 0, 'Plan Created Curr. Period': 0 },
      { name: 'Shree Kedar metals', 'Plan Created Prev. Period': 0, 'Plan Created Curr. Period': 4 },
    ],
    heatPlan: [
      { name: 'CRESCENT FOUNDRY CO PVT.LTD.(GJ)', 'Created Prev': 98, 'Completed Prev': 66, 'Created Curr': 156, 'Completed Curr': 55, 'Last Completion Date': '20-July-25', 'Avg/Day': 10.4, 'Benchmark': 40 },
      { name: 'Mal Metalliks Pvt. Ltd.', 'Created Prev': 1440, 'Completed Prev': 483, 'Created Curr': 870, 'Completed Curr': 328, 'Last Completion Date': '30-July-25', 'Avg/Day': 39.55, 'Benchmark': 60 },
      { name: 'MANTRI METALLICS PVT LTD', 'Created Prev': 0, 'Completed Prev': 0, 'Created Curr': 154, 'Completed Curr': 65, 'Last Completion Date': '25-July-25', 'Avg/Day': 17.11, 'Benchmark': '-' },
      { name: 'NIPHA EXPORTS PVT. LTD. SRP (FOUNDRY)', 'Created Prev': 199, 'Completed Prev': 63, 'Created Curr': 49, 'Completed Curr': 18, 'Last Completion Date': '1-July-25', 'Avg/Day': 16.33, 'Benchmark': 70 },
      { name: 'P.C.Sons Castings Pvt Ltd', 'Created Prev': 0, 'Completed Prev': 0, 'Created Curr': 11, 'Completed Curr': 0, 'Last Completion Date': '-', 'Avg/Day': '11', 'Benchmark': '-' },
      { name: 'Sapre Precision Techologies', 'Created Prev': 71, 'Completed Prev': 16, 'Created Curr': 13, 'Completed Curr': 3, 'Last Completion Date': '15-July-25', 'Avg/Day': 2.17, 'Benchmark': 15 },
      { name: 'Shree Kedar metals', 'Created Prev': 110, 'Completed Prev': 83, 'Created Curr': 187, 'Completed Curr': 121, 'Last Completion Date': '30-July-25', 'Avg/Day': 9.84, 'Benchmark': 15 },
      { name: 'Vishwakarma Founders Pvt Ltd', 'Created Prev': 1937, 'Completed Prev': 561, 'Created Curr': 1662, 'Completed Curr': 553, 'Last Completion Date': '30-July-25', 'Avg/Day': 63.92, 'Benchmark': 45 },
      { name: 'Yash Metallics Pvt Ltd', 'Created Prev': 3, 'Completed Prev': 1, 'Created Curr': 0, 'Completed Curr': 0, 'Last Completion Date': '11-June-25', 'Avg/Day': 3, 'Benchmark': 60 },
    ],
    meltingSection: [
      { name: 'LOCO CASTINGS PRIVATE LIMITED', 'Prev Period': 62, 'Curr Period': 77 },
      { name: 'Titagarh Rail Systems Limited (HED)', 'Prev Period': 261, 'Curr Period': 268 },
      { name: 'TITAGARH STEEL', 'Prev Period': 245, 'Curr Period': 211 },
    ]
  },
  hmt: [
    { name: 'Vishwakarma Founders Pvt Ltd', reports: [
      { type: 'Hardness', lastCreated: '26-Jul-2025', prev: 375, curr: 290, failCount: 0, failRate: 0, remark: '' },
      { type: 'Microstructure', lastCreated: '30-Jul-2025', prev: 376, curr: 355, failCount: 40, failRate: 11.08, remark: 'Improper file format (Docx)' },
      { type: 'Tensile', lastCreated: '27-Jul-2025', prev: 38, curr: 33, failCount: 0, failRate: 0, remark: '' }
    ]},
    { name: 'MANTRI METALLICS PVT LTD', reports: [
      { type: 'Hardness', lastCreated: '30-Jul-2025', prev: 262, curr: 407, failCount: 14, failRate: 2.62, remark: 'OCR service unavailable' },
      { type: 'Microstructure', lastCreated: '30-Jul-2025', prev: 1553, curr: 1674, failCount: 0, failRate: 0, remark: '' },
      { type: 'Tensile', lastCreated: '30-Jul-2025', prev: 169, curr: 194, failCount: 8, failRate: 3.79, remark: 'File type change (csv to pdf)' }
    ]},
    { name: 'Mal Metalliks Pvt. Ltd.', reports: [
      { type: 'Hardness', lastCreated: '4-Jul-2025', prev: 61, curr: 17, failCount: 0, failRate: 0, remark: '' },
      { type: 'Microstructure', lastCreated: '21-Jul-2025', prev: 1159, curr: 1015, failCount: 20, failRate: 1.97, remark: 'Empty files' },
      { type: 'Tensile', lastCreated: '29-Jul-2025', prev: 2, curr: 0, failCount: null, failRate: null, remark: '' }
    ]},
    { name: 'CRESCENT FOUNDRY CO PVT.LTD.(GJ)', reports: [
      { type: 'Hardness', lastCreated: '19-Jul-2025', prev: 1, curr: 3, failCount: 0, failRate: 0, remark: '' },
      { type: 'Microstructure', lastCreated: '19-Jul-2025', prev: 7, curr: 0, failCount: 0, failRate: 0, remark: '' },
      { type: 'Tensile', lastCreated: '19-Jul-2025', prev: 1, curr: 1, failCount: 0, failRate: 0, remark: '' }
    ]},
    { name: 'RBA EXPORTS PRIVATE LIMITED TN', reports: [
      { type: 'Hardness', lastCreated: '29-Jul-2025', prev: 0, curr: 8, failCount: 1, failRate: 12.50, remark: 'Test file' },
      { type: 'Microstructure', lastCreated: '29-Jul-2025', prev: 0, curr: 7, failCount: 0, failRate: 0, remark: '' },
      { type: 'Tensile', lastCreated: '26-Jul-2025', prev: 0, curr: 7, failCount: 1, failRate: 14.29, remark: 'Test file' }
    ]},
    { name: 'NIPHA EXPORTS PVT. LTD. SRP', reports: [
      { type: 'Hardness', lastCreated: '6-Feb-2025', prev: 0, curr: 0, failCount: 0, failRate: 0, remark: '' },
      { type: 'Microstructure', lastCreated: '30-Jul-2025', prev: 672, curr: 669, failCount: 1, failRate: 0.15, remark: 'Test file' },
      { type: 'Tensile', lastCreated: '23-Jun-2025', prev: 1, curr: 0, failCount: 0, failRate: 0, remark: '' }
    ]},
    { name: 'Parvati Foundry', reports: [
      { type: 'Hardness', lastCreated: '17-Jul-2025', prev: 0, curr: 1, failCount: 1, failRate: 100, remark: 'File format not decided' },
      { type: 'Tensile', lastCreated: '17-Jul-2025', prev: 0, curr: 7, failCount: 7, failRate: 100, remark: 'New installation' }
    ]},
    { name: 'Unimech Industries Pvt Ltd', reports: [
      { type: 'Hardness', lastCreated: '21-Jul-2025', prev: 0, curr: 11, failCount: 0, failRate: 0, remark: '' },
      { type: 'Tensile', lastCreated: '30-Jul-2025', prev: 75, curr: 194, failCount: 0, failRate: 0, remark: '' }
    ]},
    { name: 'Mantri Metallics Pvt Ltd Pantnagar', reports: [
      { type: 'Hardness', lastCreated: '22-Jul-2025', prev: 30, curr: 139, failCount: 12, failRate: 8.0, remark: 'OCR service unavailable' },
      { type: 'Tensile', lastCreated: '30-Jul-2025', prev: 29, curr: 41, failCount: 3, failRate: 4.62, remark: 'Pending from P. Prakash' }
    ]},
    { name: 'KALYAN STEEL PRODUCTS PVT LTD', reports: [
      { type: 'Hardness', lastCreated: '23-Jun-2025', prev: 2, curr: 0, failCount: 0, failRate: 0, remark: '' },
      { type: 'Microstructure', lastCreated: '18-Jun-2025', prev: 1, curr: 0, failCount: 0, failRate: 0, remark: '' }
    ]},
    { name: 'Airking Industries', reports: [
      { type: 'Microstructure', lastCreated: '26-Jul-2025', prev: 156, curr: 19, failCount: 0, failRate: 0, remark: '' }
    ]},
    { name: 'Sapre Precision Techologies', reports: [
      { type: 'Microstructure', lastCreated: '23-Jul-2025', prev: 31, curr: 53, failCount: 0, failRate: 0, remark: '' },
      { type: 'Tensile', lastCreated: '20-Jul-2025', prev: 0, curr: 9, failCount: 0, failRate: 0, remark: '' }
    ]},
    { name: 'GOVIND STEEL', reports: [
      { type: 'Microstructure', lastCreated: '30-Jul-2025', prev: 583, curr: 1140, failCount: 0, failRate: 0, remark: '' }
    ]},
    { name: 'Shree Kedar metals', reports: [
      { type: 'Tensile', lastCreated: '25-Jul-2025', prev: 0, curr: 2, failCount: 0, failRate: 0, remark: '' }
    ]}
  ],
  mtc: [
    { name: 'Vishwakarma Founders Pvt Ltd', total: 11, pending: 6, completed: 5, prev: 3, curr: 0 },
    { name: 'Airking Industries', total: 3, pending: 2, completed: 1, prev: 1, curr: 0 },
    { name: 'NIPHA EXPORTS PVT. LTD. SRP (FOUNDRY)', total: 4, pending: 1, completed: 3, prev: 0, curr: 0 },
    { name: 'Mal Metalliks Pvt. Ltd.', total: 12, pending: 12, completed: 0, prev: 6, curr: 1 },
    { name: 'CRESCENT FOUNDRY CO PVT.LTD.(GJ)', total: 5, pending: 1, completed: 4, prev: 2, curr: 1 },
    { name: 'GOVIND Steel', total: 2, pending: 1, completed: 1, prev: 0, curr: 2 },
    { name: 'Unimech Industries Pvt Ltd', total: 2, pending: 2, completed: 0, prev: 0, curr: 2 },
    { name: 'KALYAN STEEL PRODUCTS PVT LTD', total: 0, pending: 0, completed: 0, prev: 0, curr: 0 },
    { name: 'Sapre Precision Techologies', total: 0, pending: 0, completed: 0, prev: 0, curr: 0 },
    { name: 'Luthra', total: 0, pending: 0, completed: 0, prev: 0, curr: 0 },
    { name: 'Shree Kedar metals', total: 0, pending: 0, completed: 0, prev: 0, curr: 0 },
  ],
  hardware: [
    { name: 'Spectro TV', onboarded: 47, assigned: 82, oneday: 40, fivedays: 47 },
    { name: 'Spectro-Tablet', onboarded: 11, assigned: 11, oneday: 2, fivedays: 2 },
    { name: 'DigiMelt-IF', onboarded: 6, assigned: 8, oneday: 4, fivedays: 4 },
    { name: 'DigiMelt-EAF', onboarded: 4, assigned: 5, oneday: 3, fivedays: 3 },
    { name: 'Heat Plan-Tablet', onboarded: 1, assigned: 4, oneday: 1, fivedays: 0 },
  ]
};

// Aggregate HMT data for the consolidated chart
const aggregateHmtData = () => {
  const aggregated = {};
  data.hmt.forEach(customer => {
    customer.reports.forEach(report => {
      if (!aggregated[report.type]) {
        aggregated[report.type] = {
          name: report.type,
          'Prev Period': 0,
          'Curr Period': 0,
          'Parsing Fail Count': 0
        };
      }
      aggregated[report.type]['Prev Period'] += report.prev || 0;
      aggregated[report.type]['Curr Period'] += report.curr || 0;
      aggregated[report.type]['Parsing Fail Count'] += report.failCount || 0;
    });
  });
  return Object.values(aggregated);
};

const aggregatedHmtData = aggregateHmtData();

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-gray-800 text-white rounded-md shadow-lg border border-gray-700">
        <p className="font-bold mb-1">{label}</p>
        {payload.map((p, index) => (
          <p key={index} style={{ color: p.color }}>
            {p.name}: <span className="font-semibold">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const InfoCard = ({ icon, title, value, subtext, color = 'bg-indigo-500' }) => (
  <div className={twMerge(`p-6 rounded-2xl shadow-xl flex items-center space-x-4 transition-all duration-300 transform hover:scale-105 ${color}`)}>
    <div className="p-3 bg-white bg-opacity-20 rounded-full text-white">
      {icon}
    </div>
    <div className="flex flex-col">
      <div className="text-4xl font-bold text-white">{value}</div>
      <div className="text-white text-opacity-80 text-sm mt-1">{title}</div>
      {subtext && <div className="text-xs text-white text-opacity-60 mt-2">{subtext}</div>}
    </div>
  </div>
);

const SectionTitle = ({ title, icon }) => (
  <h2 className="text-3xl font-extrabold text-gray-800 mb-6 flex items-center space-x-3">
    {icon}
    <span>{title}</span>
  </h2>
);

const DataGrid = ({ title, children, icon }) => (
  <div className="mb-12 p-8 bg-white rounded-2xl shadow-xl">
    <SectionTitle title={title} icon={icon} />
    {children}
  </div>
);

const InsightCard = ({ title, content, icon }) => (
  <div className="bg-gray-50 p-6 rounded-xl shadow-sm flex items-start space-x-4">
    <div className="p-3 bg-indigo-500 bg-opacity-20 rounded-full text-indigo-700">
      {icon}
    </div>
    <div>
      <h4 className="text-xl font-semibold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-600">{content}</p>
    </div>
  </div>
);

const App = () => {
  return (
    <div className="font-sans bg-gray-100 min-h-screen p-4 sm:p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700">
          Foundry Monitoring Report
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 mt-2">
          Interactive Infographic: July 2025
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Comparison: 1 July – 30 July 2025 vs. Previous Period
        </p>
      </header>

      {/* Summary Metrics */}
      <DataGrid title="1. Summary Metrics" icon={<CircleGauge className="text-indigo-500" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <InfoCard icon={<Users size={24} />} title="Paid Customers" value={data.summary[0]['Current Period']} subtext={`vs. ${data.summary[0]['Previous Period']} (Previous)`} color="bg-green-500" />
          <InfoCard icon={<TrendingUp size={24} />} title="New Customers" value={data.summary[1]['Current Period']} subtext={`vs. ${data.summary[1]['Previous Period']} (Previous)`} color="bg-blue-500" />
          <InfoCard icon={<TrendingDown size={24} />} title="Dropped Customers" value={data.summary[2]['Current Period']} subtext={`vs. ${data.summary[2]['Previous Period']} (Previous)`} color="bg-red-500" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.summary}>
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="Previous Period" fill="#a5b4fc" name="Previous Period" />
            <Bar dataKey="Current Period" fill="#6366f1" name="Current Period" />
          </BarChart>
        </ResponsiveContainer>
      </DataGrid>

      {/* New Customer Details */}
      <DataGrid title="2. New Customer Details" icon={<TrendingUp className="text-indigo-500" />}>
        <ul className="list-none space-y-4">
          {data.newCustomers.map((customer, index) => (
            <li key={index} className="bg-gray-50 p-4 rounded-xl flex items-center justify-between shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">{customer.name}</span>
                <span className="text-sm text-gray-500">{customer.cluster} - {customer.subCluster}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-indigo-600">
                <ChevronRight size={16} />
                <span>Opt-in Feature: {customer.feature}</span>
              </div>
            </li>
          ))}
        </ul>
      </DataGrid>
      
      {/* Key Usage Groupings */}
      <DataGrid title="3. Key Usage Groupings" icon={<PieChartIcon className="text-indigo-500" />}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg text-gray-700 mb-4">Total Active Paid Customers: <span className="font-bold text-indigo-600">{data.usageGroups.totalActive}</span></p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.usageGroups.groups}>
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="count" fill="#6366f1" name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Software ON - Feature Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={data.usageGroups.featureBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                  {
                    data.usageGroups.featureBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))
                  }
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </DataGrid>

      {/* ChargeMix Module Usage */}
      <DataGrid title="4. ChargeMix Module Usage" icon={<FlaskConical className="text-indigo-500" />}>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Customer Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Created/Modified (Prev)</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Created/Modified (Curr)</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Optimized ChargeMix Count</th>
              </tr>
            </thead>
            <tbody>
              {data.chargemix.map((row, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-4 py-2 text-sm text-gray-700">{row.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row['Prev']}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row['Curr']}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row.optimized}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data.chargemix}>
            <XAxis dataKey="name" interval={0} angle={-30} textAnchor="end" height={80} stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="Prev" fill="#a5b4fc" name="Created/Modified (Prev)" />
            <Bar dataKey="Curr" fill="#6366f1" name="Created/Modified (Curr)" />
            <Bar dataKey="optimized" fill="#10b981" name="Optimized ChargeMix Count" />
          </BarChart>
        </ResponsiveContainer>
      </DataGrid>
      
      {/* Customers with Software Turned Off */}
      <DataGrid title="5. Customers with Software Turned Off" icon={<Factory className="text-indigo-500" />}>
        <ul className="list-none space-y-4">
          {data.softwareOff.map((customer, index) => (
            <li key={index} className="bg-red-50 p-4 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <span className="font-semibold text-gray-800">{customer.name}</span>
                <span className="text-sm text-gray-500 block sm:inline ml-0 sm:ml-2">({customer.cluster})</span>
              </div>
              <div className="text-sm text-gray-600 mt-2 sm:mt-0">
                <span className="font-medium mr-2">Remarks:</span>
                {customer.remark} - {customer.feature}
              </div>
            </li>
          ))}
        </ul>
      </DataGrid>

      {/* Module Use Status */}
      <DataGrid title="6. Module Use Status" icon={<BarChart2 className="text-indigo-500" />}>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">6A. Production Plan</h3>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Customer Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Plan Created Prev. Period</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Plan Created Curr. Period</th>
              </tr>
            </thead>
            <tbody>
              {data.moduleUse.productionPlan.map((row, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-4 py-2 text-sm text-gray-700">{row.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row['Plan Created Prev. Period']}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row['Plan Created Curr. Period']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.moduleUse.productionPlan}>
            <XAxis dataKey="name" interval={0} angle={-30} textAnchor="end" height={80} stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="Plan Created Prev. Period" fill="#a5b4fc" name="Prev. Period" />
            <Bar dataKey="Plan Created Curr. Period" fill="#6366f1" name="Curr. Period" />
          </BarChart>
        </ResponsiveContainer>

        <h3 className="text-xl font-semibold text-gray-700 mt-8 mb-4">6B. Heat Plan</h3>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Customer Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Created Prev</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Completed Prev</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Created Curr</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Completed Curr</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Last Completed</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Avg/Day</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Benchmark</th>
              </tr>
            </thead>
            <tbody>
              {data.moduleUse.heatPlan.map((row, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-4 py-2 text-sm text-gray-700">{row.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row['Created Prev']}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row['Completed Prev']}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row['Created Curr']}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row['Completed Curr']}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row['Last Completion Date']}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row['Avg/Day']}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row['Benchmark']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.moduleUse.heatPlan}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" interval={0} angle={-30} textAnchor="end" height={80} stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="Created Prev" fill="#a5b4fc" name="Created (Prev)" />
            <Bar dataKey="Created Curr" fill="#6366f1" name="Created (Curr)" />
            <Bar dataKey="Completed Prev" fill="#10b981" name="Completed (Prev)" />
            <Bar dataKey="Completed Curr" fill="#f59e0b" name="Completed (Curr)" />
          </BarChart>
        </ResponsiveContainer>

        <h3 className="text-xl font-semibold text-gray-700 mt-8 mb-4">6C. Melting Section EAF</h3>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Customer Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Heats Submitted Prev</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Heats Submitted Curr</th>
              </tr>
            </thead>
            <tbody>
              {data.moduleUse.meltingSection.map((row, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-4 py-2 text-sm text-gray-700">{row.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row['Prev Period']}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row['Curr Period']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.moduleUse.meltingSection}>
            <XAxis dataKey="name" interval={0} angle={-30} textAnchor="end" height={80} stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="Prev Period" fill="#a5b4fc" name="Heats Submitted (Prev)" />
            <Bar dataKey="Curr Period" fill="#6366f1" name="Heats Submitted (Curr)" />
          </BarChart>
        </ResponsiveContainer>
      </DataGrid>

      {/* HMT Section - Test Report Processing */}
      <DataGrid title="7. HMT Section - Test Report Processing" icon={<HardHat className="text-indigo-500" />}>
        {data.hmt.map((customer, index) => (
          <div key={index} className="mb-8 p-6 bg-gray-50 rounded-xl shadow-md">
            <h4 className="font-bold text-lg text-gray-800 mb-4">{customer.name}</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Report Type</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Prev Period</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Curr Period</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Fail Count</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Fail %</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Last Created</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.reports.map((report, reportIndex) => (
                    <tr key={reportIndex} className="border-t border-gray-200">
                      <td className="px-4 py-2 text-sm text-gray-700">{report.type}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{report.prev}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{report.curr}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{report.failCount || '-'}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{report.failRate ? `${report.failRate}%` : '-'}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{report.lastCreated}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{report.remark || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        <h3 className="text-xl font-semibold text-gray-700 mt-8 mb-4">Consolidated HMT Report Data</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={aggregatedHmtData}>
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="Prev Period" fill="#a5b4fc" />
            <Bar dataKey="Curr Period" fill="#6366f1" />
            <Bar dataKey="Parsing Fail Count" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </DataGrid>

      {/* Casting Report - MTC */}
      <DataGrid title="8. Casting Report - MTC" icon={<FileText className="text-indigo-500" />}>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Customer Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Overall Certificates</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">MTC Prev</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">MTC Curr</th>
              </tr>
            </thead>
            <tbody>
              {data.mtc.map((row, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-4 py-2 text-sm text-gray-700">{row.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">Total: {row.total}, Pending: {row.pending}, Completed: {row.completed}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row.prev}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row.curr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data.mtc}>
            <XAxis dataKey="name" interval={0} angle={-30} textAnchor="end" height={80} stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="prev" fill="#a5b4fc" name="MTC Prev Period" />
            <Bar dataKey="curr" fill="#6366f1" name="MTC Curr Period" />
            <Bar dataKey="completed" fill="#10b981" name="Completed Certificates" />
            <Bar dataKey="pending" fill="#f59e0b" name="Pending Certificates" />
          </BarChart>
        </ResponsiveContainer>
      </DataGrid>

      {/* 15-Day Working Hardware Status */}
      <DataGrid title="9. 15-Day Working Hardware Status" icon={<Globe className="text-indigo-500" />}>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Hardware Classification</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Customers Onboarded</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Devices Assigned</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Customers (Device ON ≥1 day)</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Devices (ON ≥5 days)</th>
              </tr>
            </thead>
            <tbody>
              {data.hardware.map((row, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-4 py-2 text-sm text-gray-700">{row.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row.onboarded}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row.assigned}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row.oneday}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{row.fivedays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.hardware}>
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="onboarded" fill="#6366f1" name="Customers Onboarded" />
            <Bar dataKey="assigned" fill="#a5b4fc" name="Devices Assigned" />
            <Bar dataKey="oneday" fill="#10b981" name="ON ≥1 day" />
            <Bar dataKey="fivedays" fill="#f59e0b" name="ON ≥5 days" />
          </BarChart>
        </ResponsiveContainer>
      </DataGrid>

      {/* Conclusion & Meaningful Remarks */}
      <div className="mt-16 p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Meaningful Remarks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InsightCard
            icon={<CheckCircle size={24} />}
            title="Customer Growth & Stability"
            content="We've achieved a net gain in paid customers with a successful period of zero dropped customers. This stability is a strong indicator of customer satisfaction."
          />
          <InsightCard
            icon={<Lightbulb size={24} />}
            title="Feature Usage Insights"
            content="The 'Suggestion Reading' feature is highly popular, highlighting its value. This insight can guide future product development and marketing efforts."
          />
          <InsightCard
            icon={<TrendingUp size={24} />}
            title="ChargeMix Adoption"
            content="While one customer shows a healthy increase in ChargeMix usage, most have remained static. This presents a key opportunity for targeted engagement."
          />
          <InsightCard
            icon={<AlertTriangle size={24} />}
            title="HMT Parsing Issues"
            content="The HMT section reveals a high rate of parsing failures due to improper file formats and OCR issues. Enhanced customer support and training are needed here."
          />
          <InsightCard
            icon={<MessageCircle size={24} />}
            title="MTC Certificate Follow-up"
            content="A significant number of MTC reports are still pending. Proactive outreach to these customers is crucial to improve their experience and increase module adoption."
          />
          <InsightCard
            icon={<Tablet size={24} />}
            title="Hardware Engagement Gap"
            content="Usage of Spectro-Tablet and Heat Plan-Tablet is low compared to other devices. Focused support and troubleshooting are required to ensure customers use all hardware to its full potential."
          />
        </div>
      </div>
    </div>
  );
};

export default App;

