import { actions } from "../actions/actions";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postReducer = (state, action) => {
  switch (action.type) {
    case actions.post.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }

    case actions.post.DATA_FETCHED: {
      return {
        ...state,
        posts: action.data,
        loading: false,
      };
    }

    case actions.post.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case actions.post.DATA_CREATED: {
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.data],
      };
    }

    case actions.post.POST_DELETED: {
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((item) => item.id !== action.data),
      };
    }

    // case actions.post.DATA_EDITED: {
    //   return {
    //     ...state,
    //     loading: false,
    //     posts: state.posts.map((post) => {
    //       if (post.id === action.data.id) {
    //         return action.data;
    //       } else {
    //         return post;
    //       }
    //     }),
    //   };
    // }

    case actions.post.DATA_EDITED: {
      const updatedPosts = state.posts.map((post) =>
        post.id === action.data.id ? { ...post, ...action.data } : post
      );

      return {
        ...state,
        loading: false,
        posts: updatedPosts,
      };
    }

    case actions.post.DATA_DELETED: {
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post.id !== action.id),
      };
    }

    default: {
      return state;
    }
  }
};

export { initialState, postReducer };

