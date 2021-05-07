/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import LoopIcon from '@material-ui/icons/Loop';
import SearchBar from './searchbar';

import Progressbar from './progressbar';

const filterList = [];

const STable = styled.div`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  td {
    border-top: 0.1rem solid #a7a7a7;
    border-bottom: 0.1rem solid #a7a7a7;
    background: #f7f7f7;
    color: #868686;
    font-size: 0.8rem;
    font-weight: bold;
    padding: 8px;
  }
  th {
    color: black;
    background: white;
    font-size: 0.8rem;
    padding: 8px;
    text-align: left;
  }
`;

const Status = styled.div`
  display: flex;
`;
const IconContainer = styled.div`
  margin-right: 5px;
`;
export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.items,
      searchText: '',
    };
  }

  onValueChanged(event) {
    const text = event.target.value;
    if (text === '') {
      this.setState({
        data: this.props.items,
        searchText: text,
      });
      return;
    }

    let filtered = [];
    filterList.forEach(filterOpt => {
      const result = this.props.items
        .map(datum => {
          if (
            datum[filterOpt].toLowerCase().indexOf(text.toLowerCase()) === 0
          ) {
            return datum;
          }
          return undefined;
        })
        .filter(item => {
          if (item === undefined) {
            return false;
          }
          return true;
        });
      if (filtered === undefined) {
        filtered = result;
      } else {
        filtered = Object.assign([], filtered, result);
      }
    });

    this.setState({
      data: filtered,
      searchText: text,
    });
  }

  onFilterMenuCheck(item) {
    if (filterList.indexOf(item) === -1) {
      filterList.push(item);
    } else {
      const index = filterList.indexOf(item);
      if (index !== -1) filterList.splice(index, 1);
    }
  }

  drawIcon(status) {
    if (status === 'Printing' || status === 'Idle') {
      return <CheckCircleIcon style={{ fontSize: 17, color: '#77cc46' }} />;
    }
    if (status === 'Error') {
      return <ErrorIcon style={{ fontSize: 17, color: '#cc4646' }} />;
    }
    if (status === 'Warning') {
      return <WarningIcon style={{ fontSize: 17, color: '#fcc912' }} />;
    }
    if (status === 'Receiving') {
      return <LoopIcon style={{ fontSize: 17 }} />;
    }
  }

  renderHeaderRow() {
    const header = Object.keys(this.state.data[0]);
    return header
      .filter(key => {
        if (key === 'id') {
          return false;
        }
        return true;
      })
      .map((key, index) => {
        return <th key={index}>{key.replace('_', ' ')}</th>;
      });
  }

  renderCell(datum) {
    const keys = Object.keys(datum);
    return keys.map((key, index) => {
      if (key === 'Progress') {
        return (
          <td key={index}>
            <Progressbar status={datum.Status} value={datum[key]} />
          </td>
        );
      }
      if (key === 'Status') {
        return (
          <td key={index}>
            <Status>
              <IconContainer>{this.drawIcon(datum[key])}</IconContainer>

              {datum[key]}
            </Status>
          </td>
        );
      }
      return <td key={index}>{datum[key]}</td>;
    });
  }

  renderRow() {
    const { data } = this.state;
    return data.map((datum, index) => {
      return <tr key={index}>{this.renderCell(datum)}</tr>;
    });
  }

  renderTable() {
    const { data } = this.state;
    if (data.length === 0) {
      return <h3>Not Found</h3>;
    }
    return (
      <table>
        <tbody>
          <tr>{this.renderHeaderRow()}</tr>
          {this.renderRow()}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <STable>
        <SearchBar
          text={this.state.searchText}
          onChanged={this.onValueChanged.bind(this)}
          menuItems={Object.keys(this.props.items[0])}
          checkList={filterList}
          onChecked={this.onFilterMenuCheck.bind(this)}
        />
        {this.renderTable()}
      </STable>
    );
  }
}
