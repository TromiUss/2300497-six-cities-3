import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadOffersFromServer } from '../../store/thunks/offer-thunks';
import { State } from '../../types/state';
import OffersList from '../../components/OffersList';
import Map from '../../components/map';
import CityList from '../../components/city-list';
import SortOptions from '../../components/sort-options';
import Spinner from '../../components/spinner';
import Header from '../../components/header';
import { AppDispatch } from '../../store';
import MainEmpty from '../main-empty/main-empty';

function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const city = useSelector((state: State) => state.city);
  const allOffers = useSelector((state: State) => state.allOffers);
  const sortType = useSelector((state: State) => state.sortType);
  const isLoading = useSelector((state: State) => state.isLoading);

  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(loadOffersFromServer());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const offersInCurrentCity = allOffers.filter((offer) => offer.city.name === city);

  const sortedOffers = [...offersInCurrentCity];

  switch (sortType) {
    case 'Price: low to high':
      sortedOffers.sort((a, b) => a.price - b.price);
      break;
    case 'Price: high to low':
      sortedOffers.sort((a, b) => b.price - a.price);
      break;
    case 'Top rated first':
      sortedOffers.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  if (sortedOffers.length === 0) {
    return <MainEmpty city={city} />;
  }

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${sortedOffers.length} places to stay in ${city}`}</b>
              <SortOptions />
              <OffersList
                offersType={sortedOffers}
                onActiveCardChange={setActiveOfferId}
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={{
                  location: sortedOffers[0]?.city.location || {
                    latitude: 52.3909553943508,
                    longitude: 4.85309666406198,
                    zoom: 12,
                  },
                }}
                offers={sortedOffers}
                activeOfferId={activeOfferId}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
