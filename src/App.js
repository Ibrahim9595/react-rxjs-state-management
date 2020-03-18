import React, { useEffect, useState } from 'react';
import './App.css';
import { store } from './services';
import { Filter } from './services/core/filtrationHelper';
import { MovieComponent } from './components/Movie';
import { Loading } from './components/Loading';

function App() {
  const [data, setData] = useState({ loading: true, data: [] });
  useEffect(() => {
    store.setFilters([new Filter('contains', 'man', 'Title', 's')]);
    let subscription = store.uiData.subscribe(d => setData(d));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      <input placeholder="Search for a movie" className="search-box" onChange={(e) =>
        store.setFilters([new Filter('contains', e.target.value, 'Title', 's')])} />

      {!data.loading && <nav className="nav-btns-container">
        <button onClick={() => store.loadPrevious()}> {'< previous'} </button>
        <button onClick={() => store.loadNext()}>{'next >'}</button>
      </nav>}

      {data.loading ?
        <Loading /> :
        <div className="container">
          {data.data.map(movie => <MovieComponent key={movie.imdbID} data={movie} />)}
        </div>
      }
    </div>
  );
}

export default App;
