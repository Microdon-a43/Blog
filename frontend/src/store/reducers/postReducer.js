const initialState = {
  post: {
    title: '',
    category: '',
    description: '',
    picture: '',
    likes: [],
    views: 0,
  },

};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATEPOST':
      return {
        ...state,
        title: action.payload.title,
        category: action.payload.category,
        description: action.payload.description,
        picture: action.payload.picture,
      };

    default:
      return state;
  }
};
