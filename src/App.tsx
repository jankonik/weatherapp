import React from 'react';
import Layout from './components/layout/main-layout';
import Search from './components/search/search';
import AvgTemp from './components/avgTemp/avgTemp';
import DailyTemp from './components/dailyTemp/dailyTemp';

function App() {
  return (
    <div className="App">
      <Layout>
        <Search />
        <AvgTemp />
        <DailyTemp />
      </Layout>
    </div>
  );
}

export default App;
