import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResultsList from '../ResultsList/ResultsList';
import { POSITION_SEARCH_RESULTS, EMPTY_FUNCTION, SORT_BY_PARENT_OBJECT } from '../../Constants/PropTypes';
import ViewComparisonLink from '../ViewComparisonLink/ViewComparisonLink';
import ResetComparisons from '../ResetComparisons/ResetComparisons';
import ResetFiltersConnect from '../ResetFilters/ResetFiltersConnect';
import Loading from '../Loading/Loading';
import Alert from '../Alert/Alert';
import SelectForm from '../SelectForm/SelectForm';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
    };
  }

  onChildToggle() {
    const key = Math.random();
    this.setState({ key });
    this.forceUpdate();
  }

  queryParamUpdate(e) {
    this.props.onQueryParamUpdate(e);
  }

  render() {
    const { results, isLoading, hasErrored, sortBy, defaultSort, pageSizes, defaultPageSize }
      = this.props;
    return (
      <div className="usa-grid-full results">
        <div className="usa-grid-full">
          <div className="usa-width-one-third" style={{ float: 'left', padding: '15px 5px 0 10px' }}>
            <ViewComparisonLink onToggle={() => this.onChildToggle()} />
          </div>
          <div className="usa-width-one-third" style={{ float: 'left', padding: '0px 0px 5px 0px', textAlign: 'center' }}>
            <ResetFiltersConnect />
          </div>
          <div className="usa-width-one-third" style={{ float: 'left', padding: '0px 0px 5px 0px', textAlign: 'right' }}>
            <ResetComparisons onToggle={() => this.onChildToggle()} />
          </div>
        </div>
        <div className="usa-grid-full">
          <div className="usa-width-one-half" style={{ float: 'left', padding: '0 0 10px 10px' }}>
            <SelectForm
              id="sort"
              label="Sort:"
              onSelectOption={e => this.queryParamUpdate({ ordering: e.target.value })}
              options={sortBy.options}
              defaultSort={defaultSort}
            />
          </div>
          <div className="usa-width-one-half" style={{ float: 'left', padding: '0 0 10px 10px' }}>
            <SelectForm
              id="pageSize"
              label="Page size:"
              onSelectOption={e => this.queryParamUpdate({ limit: e.target.value })}
              options={pageSizes.options}
              defaultSort={defaultPageSize}
            />
          </div>
        </div>
        <div className="usa-grid-full">
          {
            !isLoading && results.results && !!results.results.length &&
              <ResultsList
                key={this.state.key}
                onToggle={() => this.onChildToggle()}
                results={results}
              />
          }
          {
            // is not loading, results array exists, but is empty
            !isLoading && results.results && !results.results.length &&
              <div className="usa-grid-full no-results">
                <Alert title="No results found" messages={[{ body: 'Try broadening your search criteria' }]} />
              </div>
          }
          {
            <Loading isLoading={isLoading} hasErrored={hasErrored} />
          }
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  results: POSITION_SEARCH_RESULTS,
  onQueryParamUpdate: PropTypes.func.isRequired,
  sortBy: SORT_BY_PARENT_OBJECT.isRequired,
  defaultSort: PropTypes.node,
  pageSizes: SORT_BY_PARENT_OBJECT.isRequired,
  defaultPageSize: PropTypes.node,
};

Results.defaultProps = {
  results: { results: [] },
  hasErrored: false,
  isLoading: true,
  onQueryParamUpdate: EMPTY_FUNCTION,
  defaultSort: '',
  defaultPageSize: '',
};

Results.contextTypes = {
  router: PropTypes.object,
};

export default Results;
