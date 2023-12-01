// we want to export an object that contains subscriptions, mutations and queries
import gql from "graphql-tag";

const commentOperations = {
  Mutations: {
    createComment: gql`
      mutation Mutation($comment: String) {
        createComment(comment: $comment) {
          id
          comment
        }
      }
    `,
  },
  Queries: {
    getAllComment: gql`
      query Query {
        getComments {
          id
          comment
        }
      }
    `,
  },

  Subscriptions: {
    commentCreated: gql`
      subscription CommentCreated {
        commentCreated {
          id
          comment
        }
      }
    `,
  },
};

export default commentOperations;
