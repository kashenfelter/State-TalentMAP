import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import PositionsSectionTitle from '../PositionsSectionTitle';
import HomePagePositionsList from '../HomePagePositionsList';
import Alert from '../Alert';
import { POSITION_DETAILS_ARRAY, FAVORITE_POSITIONS_ARRAY, BID_RESULTS, HOME_PAGE_CARD_TYPE } from '../../Constants/PropTypes';

const propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  viewMoreLink: PropTypes.string,
  positions: POSITION_DETAILS_ARRAY,
  favorites: FAVORITE_POSITIONS_ARRAY,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  toggleBid: PropTypes.func.isRequired,
  bidList: BID_RESULTS.isRequired,
  type: HOME_PAGE_CARD_TYPE,
};

const defaultProps = {
  icon: 'star',
  viewMoreLink: '/results',
  positions: undefined,
  favorites: [],
  isLoading: false,
  type: 'default',
};

const HomePagePositionsSection = ({ title, icon, viewMoreLink, positions, toggleFavorite,
  favorites, isLoading, bidList, userProfileFavoritePositionIsLoading,
  userProfileFavoritePositionHasErrored, toggleBid, type }) => {
  const listIsReady = !!(positions && Object.keys(positions).length);
  const shouldShowAlert = positions && !positions.length;
  return (
    <div className="usa-grid-full positions-section">
      <PositionsSectionTitle
        title={
          <span className="positions-section-title">
            <FontAwesome name={icon} />
            {title}
          </span>
        }
        viewMoreLink={viewMoreLink}
      />
      {
        listIsReady &&
          <HomePagePositionsList
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
            userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
            positions={positions}
            isLoading={isLoading}
            toggleBid={toggleBid}
            bidList={bidList}
            type={type}
          />
      }
      {
        shouldShowAlert && <Alert title="No results match this criteria" />
      }
    </div>
  );
};

HomePagePositionsSection.propTypes = propTypes;

HomePagePositionsSection.defaultProps = defaultProps;

export default HomePagePositionsSection;
