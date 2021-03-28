export const initialHomePageState = {
  content: [
    [
      'This is a description of our first lexiQL feature,  which will have some words in and and take up some amount of space.',
      '../assets/visualizer-sample.png',
      'Title for #1'
    ],
    [
      'This is a description of our second lexiQL feature,  which will have some words in and and take up some amount of space.',
      '../assets/visualizer-sample.png',
      'Title for #2'
    ],
    [
      'This is a description of our third lexiQL feature,  which will have some words in and and take up some amount of space.',
      '../assets/visualizer-sample.png',
      'Title for #3'
    ]
  ],
  teamMembers: [
    // need to add Carney's LinkedIn when he makes a profile
    { name: 'Chris Carney', headshot: '../assets/empty-headshot.jpg', github: 'https://github.com/Carthanial', linkedin: 'https://www.linkedin.com' },
    { name: 'Stacy Learn', headshot: '../assets/empty-headshot.png', github: 'https://github.com/hello-stacy', linkedin: 'https://www.linkedin.com/in/stacy-learn/' },
    { name: 'John Li', headshot: '../assets/empty-headshot.png', github: 'https://github.com/john-li7', linkedin: 'https://www.linkedin.com/in/john-li-cpa-7327a380/' },
    { name: 'Ryan McDaniel', headshot: '../assets/empty-headshot.png', github: 'https://github.com/ryanmcd118', linkedin: 'https://www.linkedin.com/in/ryanpmcdaniel/' }
  ]
};

export const homePageReducer = (state, action) => {
  switch (action.type) {
  case 'HOMEPAGE_LOAD':
    return {
      ...state,
    }

  case 'TEAM_LOAD':
    return {
      ...state,
    }
  }
};
