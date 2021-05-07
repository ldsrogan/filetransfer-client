import gql from 'graphql-tag';

const ADD_CASE = gql`
  mutation onAddCase($name: String!, $fileids: [ID!]!) {
    addCase(name: $name, fileids: $fileids) {
      id
      name
      created
      assigned
      jobDefinition {
        id
      }
    }
  }
`;

const REMOVE_CASE = gql`
  mutation onRemoveCase($id: ID!) {
    removeCase(id: $id)
  }
`;

const ADD_FILE = gql`
  mutation onAddFile(
    $name: String!
    $extension: String!
    $location: String!
    $size: Int!
  ) {
    addFile(
      name: $name
      extension: $extension
      location: $location
      size: $size
    ) {
      id
      name
      extension
      location
      size
    }
  }
`;

const REMOVE_FILE = gql`
  mutation onRemoveFile($id: ID!) {
    removeFile(id: $id)
  }
`;

const ADD_JOBDEFINITION = gql`
  mutation onAddJobDefinition($name: String!, $definition: String!) {
    addJobDefinition(name: $name, definition: $definition) {
      id
      name
      created
      definition
    }
  }
`;

const REMOVE_JOBDEFINITION = gql`
  mutation onRemoveJobDefinition($id: ID!) {
    removeJobDefinition(id: $id)
  }
`;

const ADD_PRINTER = gql`
  mutation onAddPrinter($name: String!, $definition: String!) {
    addPrinter(name: $name, definition: $definition) {
      id
      name
      created
      definition
    }
  }
`;

const FIND_PRINTER = gql`
  mutation onFindPrinter($ipAddress: String) {
    findPrinter(ipAddress: $ipAddress) {
      id
      ipAddress
      status
      technology
      nickName
    }
  }
`;

const REMOVE_PRINTER = gql`
  mutation onRemovePrinter($id: ID!) {
    removePrinter(id: $id)
  }
`;

const SIGNUP = gql`
  mutation signUp($id: String, $pwd: String) {
    signUp(id: $id, pwd: $pwd) {
      result
      msg
    }
  }
`;

const CHECK_LOGIN = gql`
  mutation checkLogin($id: String, $pwd: String) {
    checkLogin(id: $id, pwd: $pwd) {
      result
      token
      msg
      id
      role
      tenant_name
    }
  }
`;

const PROCESS_JOB = gql`
  mutation processJob($id: ID!, $status: String!) {
    processJob(id: $id, status: $status)
  }
`;

const MUTATE_RUN_AUTOMATION = gql`
  mutation onRunAutomation($id: ID!) {
    runAutomation(id: $id) {
      id
      title
      status
      description
    }
  }
`;

export {
  ADD_CASE,
  REMOVE_CASE,
  ADD_FILE,
  REMOVE_FILE,
  ADD_JOBDEFINITION,
  REMOVE_JOBDEFINITION,
  PROCESS_JOB,
  MUTATE_RUN_AUTOMATION,
  ADD_PRINTER,
  REMOVE_PRINTER,
  SIGNUP,
  CHECK_LOGIN,
  FIND_PRINTER,
};
