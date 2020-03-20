const moviesMock = [
  {
    _id: '70f94d08-9a2e-427f-92d5-bd76e2e3d95f',
    title: 'Logorama',
    year: 2040,
    cover: 'http://dummyimage.com/110x206.bmp/5fa2dd/ffffff',
    description:
      'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    duration: 132,
    contentRating: 'PG',
    source: 'https://tamu.edu/mauris/morbi/non/lectus/aliquam.jsp',
    tag: ['Comedy', 'Drama'],
  },
  {
    _id: 'aad853aa-4867-4aba-ba74-c66293921bab',
    title: 'Messiah of Evil',
    year: 2021,
    cover: 'http://dummyimage.com/186x155.bmp/cc0000/ffffff',
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    duration: 237,
    contentRating: 'NC-17',
    source: 'https://businessinsider.com/nunc/vestibulum/ante/ipsum/primis.js',
    tag: ['Crime|Film-Noir|Mystery|Thriller'],
  },
  {
    _id: 'b4519923-6707-48cf-a9ef-0269c7e142ad',
    title: 'River, The (He liu)',
    year: 2009,
    cover: 'http://dummyimage.com/160x186.bmp/5fa2dd/ffffff',
    description:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    duration: 179,
    contentRating: 'R',
    source: 'https://furl.net/vel/ipsum.html',
    tag: [
      'Documentary|Sci-Fi',
      'Adventure|Romance',
      'Drama',
      'Adventure|Romance|Western',
      'Documentary',
    ],
  },
  {
    _id: 'ef4f3db7-17d9-4286-85b2-473d4aad16e1',
    title: "Bells of St. Mary's, The",
    year: 2033,
    cover: 'http://dummyimage.com/117x236.png/cc0000/ffffff',
    description:
      'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    duration: 280,
    contentRating: 'PG-13',
    source: 'http://miibeian.gov.cn/amet/cursus/id/turpis/integer.xml',
    tag: ['Comedy|Crime', 'Drama', 'Comedy|Drama', 'Comedy|Drama'],
  },
  {
    _id: '041ba16d-6b88-4a8d-bb66-8a83a56ebb9d',
    title: 'Death Takes a Holiday',
    year: 1964,
    cover: 'http://dummyimage.com/109x175.png/ff4444/ffffff',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    duration: 237,
    contentRating: 'NC-17',
    source: 'https://utexas.edu/id/justo/sit/amet/sapien/dignissim.json',
    tag: ['Comedy|Drama', 'Horror', 'Children|Comedy'],
  },
  {
    _id: '1b67a64a-92e3-4a38-8b2a-23d5f1f22573',
    title: 'I Origins',
    year: 1969,
    cover: 'http://dummyimage.com/150x121.jpg/cc0000/ffffff',
    description:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    duration: 75,
    contentRating: 'PG-13',
    source: 'https://free.fr/odio/curabitur/convallis.jsp',
    tag: ['Drama|Romance|Thriller', 'Drama'],
  },
  {
    _id: '0aad7652-e3ad-42df-bb0c-1898f4aa29d4',
    title: 'Ringu (Ring)',
    year: 2040,
    cover: 'http://dummyimage.com/170x147.bmp/cc0000/ffffff',
    description:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    duration: 145,
    contentRating: 'PG-13',
    source: 'https://symantec.com/interdum.jsp',
    tag: ['Drama|Thriller', 'Action|Crime|Drama'],
  },
  {
    _id: 'fcd5aa3f-8aa7-4d6a-b933-91ed2bfc1d0d',
    title: 'Heli',
    year: 1981,
    cover: 'http://dummyimage.com/219x193.png/cc0000/ffffff',
    description:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    duration: 21,
    contentRating: 'G',
    source: 'http://liveinternet.ru/congue/vivamus/metus/arcu/adipiscing.xml',
    tag: [
      'Children|Comedy',
      'Drama|Romance',
      'Drama',
      'Comedy|Drama|Musical',
      'Drama',
    ],
  },
  {
    _id: 'ed2ced9c-bd19-406c-a720-cf60cf3340a3',
    title: 'Teacher, A',
    year: 1904,
    cover: 'http://dummyimage.com/135x209.bmp/5fa2dd/ffffff',
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    duration: 131,
    contentRating: 'PG-13',
    source: 'http://flavors.me/cras/in/purus/eu/magna.html',
    tag: ['Drama|Romance', 'Crime|Drama|Thriller', 'Drama'],
  },
  {
    _id: 'e7f2ad8e-0873-4ba1-8ed0-1012216ec418',
    title: 'Phantom Lover, The (Ye ban ge sheng)',
    year: 1981,
    cover: 'http://dummyimage.com/193x180.png/dddddd/000000',
    description:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    duration: 250,
    contentRating: 'PG-13',
    source: 'https://irs.gov/curae/duis.jpg',
    tag: ['Crime|Drama', 'Documentary', 'Thriller', '(no genres listed)'],
  },
];

function filteredMoviesMock(tag) {
  return moviesMock.filter((movie) => movie.tags.includes(tag));
}

class MoviesServiceMock {
  async getMovies() {
    return Promise.resolve(moviesMock);
  }

  async createMovie() {
    return Promise.resolve(moviesMock[0]);
  }
}

module.exports = {
  moviesMock,
  filteredMoviesMock,
  MoviesServiceMock,
};
