import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import queryString from 'query-string';
import { resultsFetchData } from '../../actions/results';
import ResultsPage from '../../Components/ResultsPage/ResultsPage';
import { POSITION_SEARCH_RESULTS } from '../../Constants/PropTypes';
import { PUBLIC_ROOT } from '../../login/DefaultRoutes';
import { POSITION_SEARCH_SORTS, POSITION_PAGE_SIZES } from '../../Constants/Sort';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
      query: { value: window.location.search.replace('?', '') || '' },
      defaultSort: { value: '' },
      defaultPageSize: { value: '' },
    };
  }

  componentWillMount() {
    if (!this.props.isAuthorized()) {
      this.props.onNavigateTo(PUBLIC_ROOT);
    } else {
      // set our default ordering
      this.setState({ defaultSort: { value:
        (queryString.parse(this.state.query.value)).ordering || POSITION_PAGE_SIZES.defaultSort,
      } });
      // set our default page size
      this.setState({ defaultPageSize: { value:
        (queryString.parse(this.state.query.value)).limit || POSITION_PAGE_SIZES.defaultSort,
      } });
      this.callFetchData(`position/?${this.state.query.value}`);
    }
  }

  onQueryParamUpdate(q) {
    const parsedQuery = queryString.parse(this.state.query.value);
    const newQuery = Object.assign({}, parsedQuery, q);
    const newQueryString = queryString.stringify(newQuery);
    this.context.router.history.push({
      search: newQueryString,
    });
  }

  onChildToggle() {
    const key = Math.random();
    this.setState({ key });
    this.forceUpdate();
  }

  callFetchData(q) {
    const api = this.props.api;
    this.props.fetchData(`${api}/${q}`);
  }

  render() {
    const { results, hasErrored, isLoading } = this.props;
    return (
      <div className="usa-grid-full">
        <ResultsPage
          results={results}
          hasErrored={hasErrored}
          isLoading={isLoading}
          sortBy={POSITION_SEARCH_SORTS}
          defaultSort={this.state.defaultSort.value}
          pageSizes={POSITION_PAGE_SIZES}
          defaultPageSize={this.state.defaultPageSize.value}
          onQueryParamUpdate={q => this.onQueryParamUpdate(q)}
        />
      </div>
    );
  }
}

Results.propTypes = {
  api: PropTypes.string.isRequired,
  onNavigateTo: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  results: POSITION_SEARCH_RESULTS,
  isAuthorized: PropTypes.func.isRequired,
};

Results.defaultProps = {
  results: { results: [] },
  hasErrored: false,
  isLoading: true,
};

Results.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = state => ({
  results: state.results,
  hasErrored: state.resultsHasErrored,
  isLoading: state.resultsIsLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(resultsFetchData(url)),
  onNavigateTo: dest => dispatch(push(dest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
