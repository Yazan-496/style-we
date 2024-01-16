import { Fragment, Component } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import { default as DataTableBasic } from "react-data-table-component";
import { Card, Input, Label, Row, Col } from "reactstrap";
import _ from "lodash";
//************************************//
// import '@styles/react/libs/tables/react-dataTable-component.scss'
// import {trans} from '@utils'

import FilterForm from "./FilterForm";
//************************************//
const columns = (cols, state) => {
  const columns = [];
  columns.push({
    name: "#",
    cell: (row, index) => (state.page - 1) * state.limit + index + 1,
    grow: 0,
    minWidth: "75px",
  });
  _.map(cols, (c, k) => {
    if (c.translatable) {
      _.forEach(state.langArr, (lang, langK) => {
        if (state.langArr.includes(lang)) {
          const tc = { ...c };
          tc.name = (
            <span>
              {tc.name}
              <small className="text-lowercase text-muted">{`gen.lang.${lang}`}</small>
            </span>
          );
          tc.selector = `${tc.selector}.${lang}`;
          columns.push(tc);
        }
      });
    } else {
      columns.push(c);
    }
  });
  return columns;
};
//************************************//
class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{}],
      total: 1,
      limit: 100,
      page: 1,
      totalPages: 1,
      filter: {},
      sort: [],
      hasFilter: props.hasFilter ? props.hasFilter : false,
      langArr: props.langArr,
    };

    this._refresh = this._refresh.bind(this);
  }
  //************************************//
  componentDidMount() {
    // console.log(this.props);
    // this._fetchData();
    this.setState({
      data: this.props.data,
    });
  }
  //************************************//
  _fetchData = (params = {}) => {
    this.props._fetchData
      ? this.props._fetchData({ ...this.state, ...params }, (data) => {
          this.setState({
            data: data,
            //    total: data.original.pagination.total,
            //    limit: data.original.pagination.limit,
            //    page: data.original.pagination.current_page,
            //    totalPages: data.original.pagination.total_pages
          });
          //  console.log(this.state.data, "data")
        })
      : this.setState({
          data: this.props.data,
        });
  };
  //************************************//
  //************************************//

  //************************************//
  _refresh = () => {
    this._fetchData({});
  };
  //************************************//
  _handlePagination = (page) => {
    this._fetchData({ page: page.selected + 1 });
  };
  //************************************//
  // ** Function to handle per page
  _handlePerPage = (e) => {
    this._fetchData({ limit: parseInt(e.target.value) });
  };
  //************************************//
  _onSort = (column, sortDirection) => {
    this.setState(
      {
        sort: [
          {
            key: _.replace(column.selector, ".", "->"),
            direction: sortDirection,
          },
        ],
      },
      this._fetchData
    );
  };
  //************************************//
  _onFilter = (filter) => {
    this.setState({ filter, page: 1 }, this._fetchData);
  };
  //************************************//
  CustomPagination = () => {
    const { page, totalPages, total, limit } = { ...this.state };

    return (
      <Row>
        <Col>
          <div className="flex items-center w-full justify-center my-1 ">
            <Label className="px-1" for="sort-select">
              {"show"}
            </Label>
            <Input
              className="dataTable-select"
              type="select"
              id="sort-select"
              bsSize="sm"
              value={this.state.limit}
              onChange={(e) => this._handlePerPage(e)}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
              <option value={100}>100</option>
            </Input>
            <Label className="my-1 px-1">
              {/* {
                ("gen.datatable.totalRowsInfo",
                {
                  from: 1,
                  to: 1,
                  total
                })
              } */}
            </Label>
          </div>
        </Col>
        <Col>
          <ReactPaginate
            previousLabel={""}
            nextLabel={""}
            breakLabel="..."
            pageCount={totalPages || 1}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            activeClassName="active"
            forcePage={page !== 0 ? page - 1 : 0}
            onPageChange={(page) => this._handlePagination(page)}
            pageClassName={"page-item"}
            nextLinkClassName={"page-link"}
            nextClassName={"page-item next"}
            previousClassName={"page-item prev"}
            previousLinkClassName={"page-link"}
            pageLinkClassName={"page-link"}
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName={
              "pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
            }
          />
        </Col>
      </Row>
    );
  };
  //************************************//
  render() {
    return (
      <Fragment>
        {this.state.hasFilter && (
          <FilterForm columns={this.props.columns} onFilter={this._onFilter} />
        )}
        <Card>
          <DataTableBasic
            noHeader
            striped
            pagination
            paginationServer
            sortServer
            onSort={this._onSort}
            disabled={this.props.loading}
            noDataComponent="No Data Found"
            className="react-dataTable"
            columns={columns(this.props.columns, this.state)}
            sortIcon={<ChevronDown size={10} />}
            // paginationComponent={this.CustomPagination}
            data={this.state.data}
          />
        </Card>
      </Fragment>
    );
  }
}
//************************************//
const mapStateToProps = (store) => ({
  loading: store?.app?.loading,
});
export default connect(mapStateToProps, null, null, { forwardRef: true })(
  DataTable
);
