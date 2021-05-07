import gql from 'graphql-tag';

const GET_ALL_JOBS = gql`
  {
    jobs {
      id
      created
      title
      description
      status
      workunitstatus
      log
      user {
        id
        username
      }
    }
  }
`;

const GET_JOB_BY_ID = gql`
  query job($id: ID!) {
    job(id: $id) {
      id
      created
      title
      description
      status
      workunitstatus
      log
      user {
        username
        id
      }
    }
  }
`;

const GET_ALL_CASES = gql`
  {
    cases {
      id
      name
      created
      assigned
      jobDefinition {
        id
      }
      files {
        id
        name
        extension
        size
        location
      }
    }
  }
`;

const GET_CASES_BY_ID = gql`
  query case($id: ID!) {
    case(id: $id) {
      id
      name
      created
      assigned
      jobDefinition {
        id
      }
      files {
        id
        name
        extension
        size
        location
      }
    }
  }
`;

const GET_ALL_FILES = gql`
  query fileConnection($first: Int!, $before: String, $after: String) {
    fileConnection(first: $first, before: $before, after: $after)
      @connection(key: "fileConnection", filter: ["after"]) {
      edges {
        id
        name
        extension
        location
        size
      }
      pageInfo {
        endCursor
        hasNextPage
        startCursor
        hasPrevPage
      }
      totalCount
    }
  }
`;

const GET_ALL_JOBDEFINITIONS = gql`
  {
    jobDefinitions {
      id
      name
      status
      definition
      created
    }
  }
`;

const GET_ALL_PRINTERS = gql`
  {
    printers {
      id
      technology
      modelName
      nickName
      ipAddress
      status
      cartridges
      lastUpdated
      description
    }
  }
`;

const GET_CONNECTION_INFO = gql`
  {
    connectionInfo {
      serverConnected
      dbConnected
      amsConnected
      dbHost
      dbPort
      amsServerIp
      amsServerPort
    }
  }
`;

const GET_CLIENT_ROLE_INFO = gql`
  query {
    role @client
  }
`;

const GET_CLIENT_USER_INFO = gql`
  query {
    isLoggedIn @client
    tenantName @client
  }
`;

export {
  GET_ALL_JOBS,
  GET_JOB_BY_ID,
  GET_ALL_CASES,
  GET_CASES_BY_ID,
  GET_ALL_FILES,
  GET_ALL_JOBDEFINITIONS,
  GET_ALL_PRINTERS,
  GET_CONNECTION_INFO,
  GET_CLIENT_ROLE_INFO,
  GET_CLIENT_USER_INFO,
};
