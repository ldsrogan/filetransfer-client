import gql from 'graphql-tag';

const JOB_SUBSCRIPTION = gql`
  subscription {
    jobUpdated {
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

const CASE_SUBSCRIPTION = gql`
  subscription oncaseUpdated {
    caseUpdated {
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

export { JOB_SUBSCRIPTION, CASE_SUBSCRIPTION };
